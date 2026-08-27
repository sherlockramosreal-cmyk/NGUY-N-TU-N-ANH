import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Khai báo lấy worker từ CDN, sử dụng chính xác biến version của thư viện để không bao giờ bị lệch
if (typeof window !== 'undefined') {
  const version = pdfjsLib.version || '6.2.108';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
}

/**
 * Fallback lightweight text extractor for PDF files when WebWorker is restricted in iframe/sandbox
 */
async function extractTextFromPdfFallback(arrayBuffer: ArrayBuffer, fileName: string): Promise<string> {
  try {
    const uint8 = new Uint8Array(arrayBuffer);
    let rawStr = '';
    
    // Convert buffer to string in chunks to avoid call stack limits
    const chunkSize = 8192;
    for (let i = 0; i < uint8.length; i += chunkSize) {
      const slice = uint8.subarray(i, Math.min(i + chunkSize, uint8.length));
      rawStr += String.fromCharCode.apply(null, Array.from(slice));
    }

    // Try finding uncompressed or standard text blocks: (text) Tj or [(t) (e) (x) (t)] TJ
    const textMatches: string[] = [];
    
    // Pattern 1: Parenthesized text inside TJ / Tj blocks
    const tjRegex = /\(([^)]+)\)\s*(?:Tj|'|")/g;
    let match;
    while ((match = tjRegex.exec(rawStr)) !== null) {
      const clean = match[1].replace(/\\([()\\])/g, '$1').trim();
      if (clean.length > 0 && !clean.match(/^[\x00-\x1F\x7F]+$/)) {
        textMatches.push(clean);
      }
    }

    // Pattern 2: Array formatted text: [(text) -10 (more)] TJ
    const tjArrayRegex = /\[((?:\([^)]*\)|[0-9.-]|\s+)+)\]\s*TJ/g;
    while ((match = tjArrayRegex.exec(rawStr)) !== null) {
      const inner = match[1];
      const innerTextParts: string[] = [];
      const partRegex = /\(([^)]*)\)/g;
      let partMatch;
      while ((partMatch = partRegex.exec(inner)) !== null) {
        innerTextParts.push(partMatch[1].replace(/\\([()\\])/g, '$1'));
      }
      const combined = innerTextParts.join('').trim();
      if (combined.length > 0) {
        textMatches.push(combined);
      }
    }

    if (textMatches.length > 5) {
      // Group lines naturally
      const reconstructed = textMatches.join(' ')
        .replace(/\s+/g, ' ')
        .replace(/\. /g, '.\n')
        .trim();
      return reconstructed;
    }
  } catch (fallbackErr) {
    console.warn('Fallback PDF text extraction attempt error:', fallbackErr);
  }

  return `[Tệp PDF "${fileName}" không thể trích xuất tự động do tài liệu scan ảnh hoặc bị mã hóa. Vui lòng dán văn bản bài học trực tiếp].`;
}

/**
 * Extract clean text content from a PDF file using PDF.js with automatic fallback
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Strategy 1: Attempt standard pdfjsLib parsing
  try {
    const version = pdfjsLib.version || '6.2.108';
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
    
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
      stopAtErrors: false,
    });
    
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;
    const pageTexts: string[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let lastY: number | null = null;
        let pageStr = '';
        
        for (const item of textContent.items) {
          if ('str' in item) {
            const currentY = (item as any).transform?.[5];
            if (lastY !== null && Math.abs(currentY - lastY) > 5) {
              pageStr += '\n';
            } else if (pageStr.length > 0 && !pageStr.endsWith(' ') && !pageStr.endsWith('\n')) {
              pageStr += ' ';
            }
            pageStr += item.str;
            lastY = currentY;
          }
        }
        
        if (pageStr.trim()) {
          pageTexts.push(`--- Trang ${pageNum} ---\n${pageStr.trim()}`);
        }
      } catch (pageErr) {
        console.warn(`Lỗi đọc trang ${pageNum}:`, pageErr);
      }
    }

    const result = pageTexts.join('\n\n');
    if (result.trim().length > 0) {
      return result;
    }
  } catch (pdfJsErr: any) {
    console.warn('PDF.js standard parsing encountered issue, attempting fallback text extraction:', pdfJsErr);
  }

  // Strategy 2: Resilient fallback
  return await extractTextFromPdfFallback(arrayBuffer, file.name);
}

/**
 * Extract clean text content from a DOCX Word file
 */
export async function extractTextFromDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim() || `[Tệp DOCX "${file.name}" không có nội dung văn bản]`;
  } catch (err: any) {
    console.error('Error parsing DOCX file:', err);
    throw new Error(`Không thể đọc tệp DOCX: ${err?.message || 'Lỗi cấu trúc tệp Word'}`);
  }
}

/**
 * Universal file text extractor supporting PDF, DOCX, TXT, MD, CSV, JSON
 */
export async function extractTextFromFile(file: File): Promise<{ text: string; fileName: string; sizeKb: number; type: string }> {
  const fileName = file.name;
  const sizeKb = Math.round(file.size / 1024);
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  let extractedText = '';
  let fileType = 'text';

  if (ext === 'pdf' || file.type === 'application/pdf') {
    fileType = 'PDF';
    extractedText = await extractTextFromPdf(file);
  } else if (ext === 'docx' || file.type.includes('wordprocessingml')) {
    fileType = 'DOCX';
    extractedText = await extractTextFromDocx(file);
  } else {
    fileType = ext.toUpperCase() || 'TXT';
    extractedText = await file.text();
  }

  return {
    text: extractedText,
    fileName,
    sizeKb,
    type: fileType,
  };
}
