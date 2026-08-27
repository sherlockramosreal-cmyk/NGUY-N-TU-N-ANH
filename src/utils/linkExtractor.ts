/**
 * Link Content Extractor & Smart Lesson Structurer
 * Fetches, parses and semantically structures web content into:
 * 1. Lesson Title (Tên bài học)
 * 2. Table of Contents & Outline (Mục lục & Dàn ý cấu trúc)
 * 3. Key Vocabulary list with definitions and examples (Danh sách từ vựng chuẩn hóa)
 * 4. Key Grammar & Theory focus (Lý thuyết trọng tâm)
 */

export interface LinkExtractionResult {
  title: string;
  outline: string[];
  tableOfContentsText: string;
  extractedVocabText: string;
  theorySummaryText: string;
  structuredContent?: string;
  content: string;
  sourceUrl: string;
  wordCount: number;
  vocabCount: number;
}

/**
 * Normalizes URL and handles special services like Google Docs or Wikipedia
 */
function normalizeUrlForExtraction(rawUrl: string): { fetchUrl: string; isSpecial: boolean; specialType?: string } {
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  // Google Docs format: https://docs.google.com/document/d/{DOC_ID}/edit -> export as txt
  const gDocMatch = url.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (gDocMatch && gDocMatch[1]) {
    return {
      fetchUrl: `https://docs.google.com/document/d/${gDocMatch[1]}/export?format=txt`,
      isSpecial: true,
      specialType: 'gdoc',
    };
  }

  // Wikipedia article
  const wikiMatch = url.match(/([a-z]{2})\.wikipedia\.org\/wiki\/([^#?]+)/);
  if (wikiMatch && wikiMatch[1] && wikiMatch[2]) {
    const lang = wikiMatch[1];
    const pageTitle = decodeURIComponent(wikiMatch[2]);
    return {
      fetchUrl: `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`,
      isSpecial: true,
      specialType: 'wiki',
    };
  }

  return { fetchUrl: url, isSpecial: false };
}

/**
 * Common English stop words to ignore when mining vocabulary candidates
 */
const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he',
  'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
  'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
  'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
  'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how',
  'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
  'most', 'us', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'does', 'did', 'doing', 'is', 'am'
]);

/**
 * Helper to extract key terms and collocations from text
 */
function extractKeyTermsFromSentences(sentences: string[]): { term: string; example: string }[] {
  const termMap = new Map<string, string>();

  // Check for pre-formatted lines with ':' or '-'
  for (const sentence of sentences) {
    const colonMatch = sentence.match(/^([a-zA-Z\s]{3,35})\s*[:=]\s*(.+)$/);
    if (colonMatch) {
      const term = colonMatch[1].trim();
      if (!termMap.has(term.toLowerCase())) {
        termMap.set(term.toLowerCase(), `${term} : ${colonMatch[2].trim()}`);
      }
      continue;
    }

    const hyphenMatch = sentence.match(/^([a-zA-Z\s]{3,35})\s*[-–—]\s*(.+)$/);
    if (hyphenMatch) {
      const term = hyphenMatch[1].trim();
      if (!termMap.has(term.toLowerCase())) {
        termMap.set(term.toLowerCase(), `${term} - ${hyphenMatch[2].trim()}`);
      }
      continue;
    }
  }

  // If already found structured terms, return them
  if (termMap.size >= 4) {
    return Array.from(termMap.values()).map((v) => {
      const parts = v.split(/[:=–—-]/);
      return {
        term: parts[0]?.trim() || '',
        example: parts[1]?.trim() || '',
      };
    });
  }

  // Scan sentences for meaningful academic vocabulary & phrases (length 6-25, not stop words)
  const extractedList: { term: string; example: string }[] = [];
  const seenTerms = new Set<string>();

  for (const sentence of sentences) {
    if (sentence.length < 25 || sentence.length > 220) continue;

    // Look for bold words or significant words
    const words = sentence.match(/[bcdfghjklmnpqrstvwxyz][a-zA-Z]{5,18}/gi) || [];
    for (const w of words) {
      const lower = w.toLowerCase();
      if (!STOP_WORDS.has(lower) && !seenTerms.has(lower) && lower.length >= 7) {
        seenTerms.add(lower);
        extractedList.push({
          term: lower,
          example: sentence.trim(),
        });
        if (extractedList.length >= 15) break;
      }
    }
    if (extractedList.length >= 15) break;
  }

  return extractedList;
}

/**
 * Clean and structure HTML into Title, Outline, Vocabulary, and Content
 */
function cleanAndStructureHtml(html: string, sourceUrl: string): {
  title: string;
  outline: string[];
  tableOfContentsText: string;
  extractedVocabText: string;
  theorySummaryText: string;
  structuredContent: string;
  wordCount: number;
  vocabCount: number;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Extract clean title
  let rawTitle = doc.querySelector('title')?.innerText || doc.querySelector('h1')?.innerText || 'Tài liệu học tập từ Web';
  rawTitle = rawTitle.replace(/\s*[-|–—].*$/, '').replace(/^Wikipedia:\s*/i, '').trim();
  const title = rawTitle || 'Tài liệu học tập tiếng Anh';

  // Remove unwanted elements
  const removeSelectors = [
    'script', 'style', 'noscript', 'iframe', 'nav', 'footer', 'header', '.ads', '.ad',
    '#sidebar', '.sidebar', '.menu', '.nav', '.comments', 'svg', 'form', 'button',
    '.cookie-banner', '#cookie-notice', '.social-share', '.related-posts'
  ];
  removeSelectors.forEach((sel) => {
    doc.querySelectorAll(sel).forEach((el) => el.remove());
  });

  // Prefer main content containers
  const contentContainer =
    doc.querySelector('article') ||
    doc.querySelector('main') ||
    doc.querySelector('.content') ||
    doc.querySelector('#content') ||
    doc.querySelector('.post-content') ||
    doc.querySelector('.entry-content') ||
    doc.querySelector('.article-body') ||
    doc.body;

  if (!contentContainer) {
    return {
      title,
      outline: [],
      tableOfContentsText: '',
      extractedVocabText: '',
      theorySummaryText: '',
      structuredContent: '',
      wordCount: 0,
      vocabCount: 0,
    };
  }

  // 1. Extract Headings for Table of Contents / Outline
  const headings = contentContainer.querySelectorAll('h1, h2, h3');
  const outlineList: string[] = [];
  headings.forEach((h) => {
    const text = h.textContent?.replace(/\s+/g, ' ').trim();
    if (text && text.length > 3 && text.length < 80 && !outlineList.includes(text) && !/comments|share|subscribe/i.test(text)) {
      outlineList.push(text);
    }
  });

  // 2. Extract Sentences and Paragraphs
  const pElements = contentContainer.querySelectorAll('p, li, blockquote');
  const paragraphs: string[] = [];
  const rawSentences: string[] = [];

  pElements.forEach((el) => {
    const text = el.textContent?.replace(/\s+/g, ' ').trim();
    if (text && text.length > 20 && !paragraphs.includes(text)) {
      paragraphs.push(text);
      const splitSentences = text.split(/(?<=[.?!])\s+/);
      splitSentences.forEach((s) => {
        if (s.length > 15) rawSentences.push(s.trim());
      });
    }
  });

  // 3. Extract Terms and Vocabulary
  const candidateTerms = extractKeyTermsFromSentences(rawSentences);
  const vocabLines: string[] = [];

  if (candidateTerms.length > 0) {
    candidateTerms.forEach((item) => {
      if (item.example.includes(':') || item.example.includes('-')) {
        vocabLines.push(item.example);
      } else {
        vocabLines.push(`${item.term} : [Từ khóa học thuật cốt lõi] - Example: "${item.example}"`);
      }
    });
  }

  // 4. Generate Table of Contents Text
  let tableOfContentsText = '';
  if (outlineList.length > 0) {
    tableOfContentsText = outlineList.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
  } else {
    tableOfContentsText = `1. Tổng quan bài học: ${title}\n2. Thuật ngữ & Từ vựng cốt lõi\n3. Cấu trúc ngữ pháp & Phân tích ngữ cảnh\n4. Bài tập phản xạ & Trắc nghiệm ghi nhớ`;
  }

  // 5. Generate Theory & Grammar Summary
  const topParagraphs = paragraphs.slice(0, 3).join('\n\n');
  const theorySummaryText = `[TÓM TẮT LÝ THUYẾT & QUY TẮC TRỌNG TÂM - ${title}]
- Chủ đề: ${title}
- Cấu trúc bài học:
${tableOfContentsText}

- Điểm ngữ pháp / Quy tắc cần ghi nhớ:
+ Nhận diện đúng dạng từ (Part of Speech) và phiên âm chuẩn theo ngữ cảnh.
+ Chú ý cách kết hợp từ (Collocations) và trật tự câu S-V-O khi thực hành đặt câu.
+ Bẫy sai thường gặp: Nhầm lẫn giữa Danh từ / Tính từ có tiền tố hoặc hậu tố tương tự.`;

  // 6. Build Master Structured Content
  const vocabSection = vocabLines.length > 0
    ? vocabLines.join('\n')
    : `${title.toLowerCase()} : chủ đề bài học chính - We are studying ${title}.`;

  const readingText = paragraphs.slice(0, 8).join('\n\n');

  const structuredContent = `[BÀI HỌC: ${title}]
[NGUỒN LIÊN KẾT: ${sourceUrl}]

[MỤC LỤC & CẤU TRÚC KIẾN THỨC]:
${tableOfContentsText}

[DANH SÁCH TỪ VỰNG & THUẬT NGỮ CỐT LÕI (Đã chuẩn hóa cú pháp ngắt : và -)]:
${vocabSection}

[ĐOẠN VĂN ĐỌC HIỂU & NGỮ CẢNH HỌC TẬP]:
${readingText}`;

  const wordCount = structuredContent.split(/\s+/).filter(Boolean).length;
  const vocabCount = vocabLines.length;

  return {
    title,
    outline: outlineList,
    tableOfContentsText,
    extractedVocabText: vocabSection,
    theorySummaryText,
    structuredContent,
    wordCount,
    vocabCount,
  };
}

/**
 * Fetch and extract text content from any public URL using server proxy & multi-fallback
 */
export async function extractContentFromWebLink(rawUrl: string): Promise<LinkExtractionResult> {
  const normalized = normalizeUrlForExtraction(rawUrl);
  const targetUrl = normalized.fetchUrl;

  let rawData = '';

  // 1. Try local server proxy (/api/proxy-fetch) first - works reliably in node container
  try {
    const localProxyRes = await fetch(`/api/proxy-fetch?url=${encodeURIComponent(targetUrl)}`);
    if (localProxyRes.ok) {
      rawData = await localProxyRes.text();
    }
  } catch {
    // Continue to fallback
  }

  // 2. If special Wikipedia REST API summary
  if (!rawData && normalized.specialType === 'wiki') {
    try {
      const wikiRes = await fetch(targetUrl);
      if (wikiRes.ok) {
        const json = await wikiRes.json();
        if (json.extract) {
          const title = json.title || 'Wikipedia';
          const sentences = (json.extract as string).split(/(?<=[.?!])\s+/);
          const candidateTerms = extractKeyTermsFromSentences(sentences);
          const vocabLines = candidateTerms.map(t => `${t.term} : [Thuật ngữ Wikipedia] - ${t.example}`);
          const vocabSection = vocabLines.join('\n');

          const tableOfContentsText = `1. Giới thiệu tổng quan: ${title}\n2. Định nghĩa & Khái niệm\n3. Thuật ngữ cốt lõi\n4. Ứng dụng & Bài tập đánh giá`;
          const theorySummaryText = `[LÝ THUYẾT & KIẾN THỨC CỐT LÕI: ${title}]\n- Tóm tắt: ${json.description || title}\n- Quy tắc: Nắm vững định nghĩa, phiên âm và ngữ cảnh sử dụng của thuật ngữ.`;

          const structuredContent = `[BÀI HỌC: ${title}]\n[NGUỒN: Wikipedia]\n\n[MỤC LỤC & CẤU TRÚC KIẾN THỨC]:\n${tableOfContentsText}\n\n[DANH SÁCH TỪ VỰNG & THUẬT NGỮ CỐT LÕI]:\n${vocabSection}\n\n[NỘI DUNG ĐỌC HIỂU CHI TIẾT]:\n${json.extract}`;

          return {
            title,
            outline: ['Giới thiệu', 'Khái niệm', 'Ứng dụng'],
            tableOfContentsText,
            extractedVocabText: vocabSection,
            theorySummaryText,
            structuredContent,
            content: structuredContent,
            sourceUrl: rawUrl,
            wordCount: structuredContent.split(/\s+/).filter(Boolean).length,
            vocabCount: vocabLines.length,
          };
        }
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 3. Try direct fetch in browser
  if (!rawData) {
    try {
      const directRes = await fetch(targetUrl, {
        headers: { Accept: 'text/html, text/plain, application/json, */*' },
      });
      if (directRes.ok) {
        rawData = await directRes.text();
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 4. Cycle through public CORS proxies
  if (!rawData) {
    const proxies = [
      (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
      (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
      (u: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
    ];

    for (const proxyGen of proxies) {
      try {
        const proxyUrl = proxyGen(targetUrl);
        const res = await fetch(proxyUrl);
        if (res.ok) {
          rawData = await res.text();
          if (rawData && rawData.length > 20) {
            break;
          }
        }
      } catch {
        // Try next proxy
      }
    }
  }

  if (!rawData || rawData.trim().length === 0) {
    throw new Error(
      `Không thể tải trực tiếp liên kết này (do trang web chặn bot hoặc yêu cầu đăng nhập). Bạn hãy copy (Ctrl+C) văn bản bài học từ trang web rồi dán (Ctrl+V) vào ô nhập liệu bên trên nhé!`
    );
  }

  // Process raw text / HTML into structured content
  const structured = cleanAndStructureHtml(rawData, rawUrl);

  if (!structured.structuredContent || structured.structuredContent.length < 20) {
    throw new Error('Nội dung trang web quá ngắn hoặc không chứa bài đọc tiếng Anh có thể trích xuất.');
  }

  return {
    title: structured.title,
    outline: structured.outline,
    tableOfContentsText: structured.tableOfContentsText,
    extractedVocabText: structured.extractedVocabText,
    theorySummaryText: structured.theorySummaryText,
    structuredContent: structured.structuredContent,
    content: structured.structuredContent,
    sourceUrl: rawUrl,
    wordCount: structured.wordCount,
    vocabCount: structured.vocabCount,
  };
}
