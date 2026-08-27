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
  let title = 'Tài liệu học tập tiếng Anh';
  const outlineList: string[] = [];
  const paragraphs: string[] = [];
  const rawSentences: string[] = [];

  if (html.startsWith('Title: ') && html.includes('Markdown Content:')) {
    // Jina Reader Markdown mode
    const titleMatch = html.match(/^Title:\s*(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1].replace(/\s*[-|–—].*$/, '').replace(/^Wikipedia:\s*/i, '').trim();
    }
    
    const markdownContentIdx = html.indexOf('Markdown Content:');
    let markdown = html.substring(markdownContentIdx + 17).trim();
    
    const lines = markdown.split('\n');
    let currentParagraph = '';
    
    lines.forEach(line => {
      line = line.trim();
      if (!line) {
        if (currentParagraph && currentParagraph.length > 20) {
          paragraphs.push(currentParagraph);
          const splitSentences = currentParagraph.split(/(?<=[.?!])\s+/);
          splitSentences.forEach((s) => {
             if (s.length > 15) rawSentences.push(s.trim());
          });
        }
        currentParagraph = '';
      } else if (line.startsWith('#')) {
        const hText = line.replace(/^#+\s*/, '').replace(/\[(.*?)\]\(.*?\)/g, '$1').trim();
        if (hText.length > 3 && hText.length < 80 && !outlineList.includes(hText) && !/comments|share|subscribe/i.test(hText)) {
          outlineList.push(hText);
        }
      } else if (line.startsWith('![')) {
        // skip image
      } else if (line.startsWith('[')) {
         const cleanLine = line.replace(/\[(.*?)\]\(.*?\)/g, '$1');
         currentParagraph += (currentParagraph ? ' ' : '') + cleanLine;
      } else {
         currentParagraph += (currentParagraph ? ' ' : '') + line;
      }
    });
    
    if (currentParagraph && currentParagraph.length > 20) {
      paragraphs.push(currentParagraph);
      const splitSentences = currentParagraph.split(/(?<=[.?!])\s+/);
      splitSentences.forEach((s) => {
         if (s.length > 15) rawSentences.push(s.trim());
      });
    }
  } else {
    // Standard HTML mode
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 1. Remove technical tags and UI frames
    const tagBlacklist = [
      'script', 'style', 'noscript', 'iframe', 'canvas', 'svg', 
      'form', 'button', 'input', 'select', 'textarea', 'dialog',
      'nav', 'header', 'footer', 'aside'
    ];
    doc.querySelectorAll(tagBlacklist.join(',')).forEach(el => el.remove());

    // 2. Remove ads, social, and comments
    const junkPattern = /(comment|disqus|sidebar|breadcrumb|footer|header|banner|advert|ad-|ads-|social|share|sponsor|taboola|outbrain|popup|modal|cookie|widget|related-posts|nav-|menu-)/i;
    doc.querySelectorAll('div, section, article, aside, ul, ol, p, span').forEach(el => {
      const className = el.getAttribute('class') || '';
      const idName = el.getAttribute('id') || '';
      const roleName = el.getAttribute('role') || '';
      const classAndId = `${className} ${idName} ${roleName}`;
      
      if (junkPattern.test(classAndId)) {
        // Keep main container if it matched
        const isMainContainer = /(article-body|post-content|main-content|entry-content|story-body)/i.test(classAndId);
        if (!isMainContainer) el.remove();
      }
    });

    // 3. Find main content container via text/link density
    let contentRoot = doc.querySelector('article, main, [role="main"], .post-content, .article-body, .entry-content, #content, .content, .story-body') as HTMLElement;
    
    if (!contentRoot) {
      let bestCandidate: HTMLElement = doc.body;
      let maxTextLength = 0;
      doc.querySelectorAll('div, section').forEach(el => {
        const htmlEl = el as HTMLElement;
        const totalText = htmlEl.textContent || '';
        let linkText = '';
        htmlEl.querySelectorAll('a').forEach(a => {
          linkText += a.textContent || '';
        });
        const linkDensity = totalText.length > 0 ? (linkText.length / totalText.length) : 1;
        
        // If link density is < 35% and has largest text capacity -> It is the main body
        if (linkDensity < 0.35 && totalText.length > maxTextLength) {
          maxTextLength = totalText.length;
          bestCandidate = htmlEl;
        }
      });
      contentRoot = bestCandidate || doc.body;
    }

    // 4. Extract structured content (headings, paragraphs, lists)
    let rawTitle = doc.querySelector('h1')?.textContent?.trim() || doc.querySelector('title')?.textContent?.trim() || 'Tài liệu học tập từ Web';
    rawTitle = rawTitle.replace(/\s*[-|–—•].*$/, '').replace(/^Wikipedia:\s*/i, '').trim();
    title = rawTitle || 'Tài liệu học tập tiếng Anh';

    const walker = doc.createTreeWalker(
      contentRoot,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          const tag = (node as HTMLElement).tagName.toLowerCase();
          if (['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote'].includes(tag)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        }
      }
    );

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      const htmlNode = currentNode as HTMLElement;
      const tag = htmlNode.tagName.toLowerCase();
      const text = (htmlNode.textContent || '').trim().replace(/\s+/g, ' ');
      
      if (text.length < 5) continue;

      if (tag.startsWith('h')) {
        if (text.length > 3 && text.length < 80 && !outlineList.includes(text) && !/comments|share|subscribe/i.test(text)) {
          outlineList.push(text);
        }
      } else {
        if (text.length > 20 && !paragraphs.includes(text)) {
          paragraphs.push(text);
          const splitSentences = text.split(/(?<=[.?!])\s+/);
          splitSentences.forEach((s) => {
            if (s.length > 15) rawSentences.push(s.trim());
          });
        }
      }
    }
  }

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

  const readingText = paragraphs.join('\n\n');

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

  // 1. Try direct fetch in browser
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

  // 3. Cycle through public CORS proxies
  if (!rawData) {
    const proxies = [
      async (u: string) => {
        const res = await fetch(`https://r.jina.ai/${u}`);
        if (!res.ok) throw new Error('Proxy error');
        return await res.text();
      },
      async (u: string) => {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(u)}`);
        if (!res.ok) throw new Error('Proxy error');
        const data = await res.json();
        return data.contents;
      },
      async (u: string) => {
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(u)}`);
        if (!res.ok) throw new Error('Proxy error');
        return await res.text();
      },
      async (u: string) => {
        const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`);
        if (!res.ok) throw new Error('Proxy error');
        return await res.text();
      }
    ];

    for (const proxyFetch of proxies) {
      try {
        rawData = await proxyFetch(targetUrl);
        if (rawData && rawData.trim().length > 20) {
          break;
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
