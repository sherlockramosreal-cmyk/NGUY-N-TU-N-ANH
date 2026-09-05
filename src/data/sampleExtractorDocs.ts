import { ExtractedCard, KnowledgeLayer } from '../types';

export interface SampleDoc {
  id: string;
  title: string;
  category: string;
  topic: string;
  text: string;
}

export const SAMPLE_DOCUMENTS: SampleDoc[] = [
  {
    id: 'sgk12_env',
    title: '🌿 SGK Lớp 12 - Unit 9: Protecting the Environment',
    category: 'SGK GDPT 2018',
    topic: 'Protecting the Ecosystems & Climate Change Mitigation',
    text: `Unit 9: Protecting the Environment and Biodiversity

1. Core Concepts:
- **biodiversity** /ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/ (noun): the variety of plant and animal life in a particular habitat or the world.
Example: Human activities are threatening the rich biodiversity of tropical rainforests.
- **sustainable** /səˈsteɪ.nə.bəl/ (adjective): causing little or no damage to the environment and therefore able to continue for a long time.
Example: We need to adopt more sustainable agricultural practices to conserve soil quality.
- **carbon footprint** /ˈkɑːr.bən ˌfʊt.prɪnt/ (noun): the amount of carbon dioxide released into the atmosphere as a result of the activities of a particular individual, organization, or community.
Example: Riding bicycles instead of driving cars dramatically reduces your daily carbon footprint.
- **deforestation** /diːˌfɔːr.əˈsteɪ.ʃən/ (noun): the cutting down of trees in a large area, or the destruction of forests by people.
Example: Deforestation leads to severe soil erosion and the displacement of indigenous wildlife.

2. Essential Collocations and Formulas:
- **pose a threat to**: to create a dangerous or difficult situation for something.
Example: Plastic pollution poses a grave threat to marine life worldwide.
- **make a breakthrough in**: to achieve an important discovery or advancement.
Example: Scientists have made a remarkable breakthrough in solar energy conversion.
- **play a pivotal role in**: to be of crucial importance in something.
Example: Renewable energy plays a pivotal role in curbing global emissions.
- **exert an impact on**: to have a noticeable effect or influence on someone or something.
Example: Urbanization exerts a heavy impact on natural water filtration systems.

3. Grammatical Rules and Processes:
- **Inversion with Negative Adverbials**:
Rule: Never / Rarely / Seldom + Auxiliary Verb + Subject + Main Verb...
Example: Rarely have we witnessed such extreme weather anomalies across the continents.
- **Reduced Relative Clauses with Participles**:
Rule: Use Present Participle (V-ing) for active meaning and Past Participle (V3/ed) for passive meaning.
Example: The environmental summit organized in Paris reached a landmark consensus.

4. Contextual Applications & Real-World Examples:
- **greenhouse effect**: the trapping of the sun's warmth in a planet's lower atmosphere.
Example: Carbon dioxide and methane accelerate the greenhouse effect, raising ocean temperatures.
- **eco-friendly**: not harmful to the environment.
Example: Consumers prefer purchasing eco-friendly packaging made from biodegradable materials.`
  },
  {
    id: 'ielts_ai',
    title: '🎓 IELTS Academic Reading: AI & Technological Disruption',
    category: 'IELTS Academic C1',
    topic: 'Artificial Intelligence & Algorithmic Automation in Society',
    text: `Passage 1: The Transformative Power of Artificial Intelligence

Artificial intelligence is reshaping contemporary economies and educational paradigms at an unprecedented velocity.

Key Terminology:
- **autonomous** /ɔːˈtɑː.nə.məs/ (adjective): having the freedom to act independently or functioning without direct human control.
Example: Autonomous electric vehicles rely on neural networks to navigate intricate urban corridors.
- **algorithmic** /ˌæl.ɡəˈrɪð.mɪk/ (adjective): relating to or using a set of rules or calculations.
Example: Algorithmic bias in hiring software can unintentionally perpetuate systemic prejudices.
- **paradigm** /ˈper.ə.daɪm/ (noun): a typical example or pattern of something; a distinct set of concepts.
Example: The transition to renewable energy represents a fundamental paradigm shift in global industry.
- **disruption** /dɪsˈrʌp.ʃən/ (noun): radical change to an existing industry or market through innovation.
Example: Generative AI tools have caused profound disruption in traditional content creation sectors.

High-Band Collocations:
- **unprecedented velocity**: at a speed never before experienced or seen.
Example: Machine learning capabilities are expanding at an unprecedented velocity.
- **catalyze innovation**: to accelerate the introduction of novel methodologies and products.
Example: Open-source research collaborations catalyze innovation across biomedical engineering.
- **mitigate potential risks**: to make potential hazards or negative consequences less severe.
Example: Policymakers must devise robust guidelines to mitigate potential risks associated with deepfakes.

Syntax and Advanced Structures:
- **Conditional Inversion Type 3**:
Structure: Had + S + V3, S + would/could + have + V3.
Example: Had governments enacted antitrust regulations sooner, tech monopolies would have been curtailed.
- **Double Comparative**:
Structure: The + comparative + S + V, the + comparative + S + V.
Example: The more sophisticated automated systems become, the greater our vigilance must be.`
  },
  {
    id: 'grammar_mastery',
    title: '📚 Chuyên đề Ngữ pháp THPT QG: Đảo ngữ & Phân từ',
    category: 'Luyện thi THPT QG',
    topic: 'Advanced Inversion, Participial Clauses & Causal Conjunctions',
    text: `Chuyên đề Trọng điểm Ngữ pháp Ôn thi THPT Quốc Gia

I. Tầng 1 - Định nghĩa và Quy tắc Ngữ pháp Trọng tâm:
- **inversion** /ɪnˈvɝː.ʒən/ (noun): the act of changing the usual order of words, typically putting the auxiliary verb before the subject.
Định nghĩa: Đảo trợ động từ lên trước chủ ngữ nhằm mục đích nhấn mạnh.
Example: Not only did she finish top of the class, but she also won a prestigious scholarship.
- **participle** /ˈpɑːr.tə.sɪ.pəl/ (noun): a word formed from a verb and used as an adjective or to make compound verb forms.
Example: Having reviewed the exam questions meticulously, Minh felt fully prepared.

II. Tầng 2 - Cụm liên từ và Cấu trúc đặc biệt:
- **no sooner ... than**: dùng để diễn tả một hành động vừa mới xảy ra thì hành động khác tiếp diễn.
Cấu trúc: No sooner had + S + V3/ed + than + S + V-ed.
Example: No sooner had the bell rung than the students rushed out of the classroom.
- **hardly ... when**: mang ý nghĩa tương tự 'no sooner... than' (Vừa mới... thì...).
Cấu trúc: Hardly had + S + V3/ed + when + S + V-ed.
Example: Hardly had we stepped outside when the tropical storm erupted.

III. Tầng 3 - Quy trình biến đổi câu và Rút gọn Mệnh đề:
- **Rút gọn bằng Having + V3/ed**: Dùng khi hành động ở mệnh đề trạng ngữ xảy ra TRƯỚC hành động ở mệnh đề chính.
Ví dụ: Having completed the assignment ahead of schedule, Nam decided to play soccer with his friends.
- **Rút gọn Bị động với Having been + V3/ed hoặc V3/ed**:
Ví dụ: Warned about the hazardous road conditions, the truck driver slowed down carefully.

IV. Tầng 4 - Ngữ cảnh bẫy đề thi và Ví dụ ứng dụng:
- **Bẫy thì với Only when / Only after**: Mệnh đề ngay sau Only giữ nguyên trật tự, chỉ đảo ngữ ở mệnh đề chính sau nó!
Ví dụ: Only when the results were announced did the candidates heave a sigh of relief.`
  }
];

/**
 * BƯỚC 1: XỬ LÝ DỮ LIỆU NGẦM (SILENT AUTO-CLEAN)
 * Tự động chạy ngầm việc dọn dẹp khoảng trắng thừa và nối các câu bị rớt dòng (do copy từ PDF)
 * trước khi đưa vào hàm bóc tách chính. Người dùng không cần thao tác thêm.
 */
export function cleanPdfAndWhitespace(rawText: string): string {
  if (!rawText) return '';

  // 1. Chuẩn hóa xuống dòng và khoảng trắng Unicode (non-breaking space, zero-width, v.v.)
  const normalized = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u00A0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/g, ' ');

  const rawLines = normalized.split('\n');
  const cleanedLines: string[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    // Thu gọn khoảng trắng thừa liên tiếp trong từng dòng
    const line = rawLines[i].replace(/[ \t]+/g, ' ').trim();
    if (!line) continue;

    if (cleanedLines.length > 0) {
      const prevLine = cleanedLines[cleanedLines.length - 1];

      // Dấu hiệu dòng mới là một mục độc lập / bullet / tiêu đề:
      // - Gạch đầu dòng: -, *, •, +, –, —
      // - Đánh số: 1., 2), [1]
      // - Khối tiêu đề: Tầng 1, Chương 1, Mục 1, Phần 1...
      // - Dòng ví dụ minh họa: Example:, Ví dụ:, Ex:
      const isNewItem = /^[-*•+–—]|\b\d+[\.\)]|^\*{1,2}[^*]+\*{1,2}|^(?:Tầng\s*\d|Chương\s*\d|Phần\s*\d|Mục\s*\d|Example:|Ví dụ:|Ex:)/i.test(line);

      // Kiểm tra dòng trước có kết thúc bằng dấu nối từ do ngắt dòng PDF (hyphenated word-break): "inter-" + "national"
      const prevEndsWithHyphen = /[-–—]$/.test(prevLine);
      if (prevEndsWithHyphen && !isNewItem) {
        cleanedLines[cleanedLines.length - 1] = prevLine.slice(0, -1) + line;
        continue;
      }

      // Kiểm tra xem dòng trước có kết thúc bằng dấu chấm câu hoàn chỉnh (. ! ? ;)
      const prevEndsWithSentencePunct = /[.?!;]$/.test(prevLine);
      // Dòng trước kết thúc lửng lơ bằng dấu phẩy, mở ngoặc, hai chấm hoặc liên từ
      const prevEndsWithCommaOrConjunction = /[,(:]$/.test(prevLine) ||
        /\b(and|or|of|to|in|for|with|is|are|the|a|an|that|which|là|và|của|với|cho|bằng|do|khi|mà|được|như)$/i.test(prevLine);
      // Dòng hiện tại bắt đầu bằng chữ thường (dấu hiệu rớt dòng điển hình khi copy từ PDF)
      const currentStartsLowerCase = /^[a-zà-ỹ]/.test(line);
      // Dòng trước đang là một định nghĩa dở (chứa : hoặc -) nhưng chưa có dấu chấm hết câu và dòng sau không phải mục mới
      const prevIsOngoingDef = (prevLine.includes(':') || prevLine.includes(' - ')) && !prevEndsWithSentencePunct && !isNewItem;

      if ((currentStartsLowerCase || prevEndsWithCommaOrConjunction || prevIsOngoingDef) && !isNewItem) {
        cleanedLines[cleanedLines.length - 1] = prevLine + ' ' + line;
        continue;
      }
    }

    cleanedLines.push(line);
  }

  return cleanedLines.join('\n');
}

/**
 * Thuật toán bóc tách tự động tài liệu thành 4 tầng kiến thức sư phạm:
 * Tầng 1: Khái niệm & Từ khóa cốt lõi (Core Concepts & Keywords)
 * Tầng 2: Công thức & Mối liên kết (Formulas & Linkages)
 * Tầng 3: Quy luật & Logic (Rules, Laws & Logic)
 * Tầng 4: Ứng dụng & Mở rộng (Applications & Extensions)
 * 
 * Tích hợp cơ chế:
 * - BƯỚC 1: Tự động chạy ngầm dọn dẹp khoảng trắng và nối câu rớt dòng từ PDF
 * - BƯỚC 2: Smart Fallback: Nếu danh sách không có dấu ":" hoặc "-", tự động lấy nguyên dòng
 *   làm mặt trước thẻ (word), để trống mặt sau (defVi/defEn rỗng) và tự động xếp vào Tầng 1.
 */
export function extractKnowledgeLayers(rawText: string): ExtractedCard[] {
  const cards: ExtractedCard[] = [];
  // BƯỚC 1: Tự động làm sạch dữ liệu ngầm trước khi bóc tách
  const cleanedText = cleanPdfAndWhitespace(rawText);
  const lines = cleanedText.split('\n').map(l => l.trim()).filter(Boolean);

  let currentLayer: KnowledgeLayer = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Nhận diện tiêu đề tầng kiến thức nếu có trong văn bản
    const lower = line.toLowerCase();
    const isLayer1Heading = /^(?:#+\s*|==+)?\s*(?:1[\.\)]|tầng\s*1|khái niệm|từ khóa|concept|định nghĩa)/i.test(lower);
    const isLayer2Heading = /^(?:#+\s*|==+)?\s*(?:2[\.\)]|tầng\s*2|công thức|liên kết|cụm từ|collocation|formula)/i.test(lower);
    const isLayer3Heading = /^(?:#+\s*|==+)?\s*(?:3[\.\)]|tầng\s*3|quy luật|logic|quy trình|cấu trúc|syntax|ngữ pháp)/i.test(lower);
    const isLayer4Heading = /^(?:#+\s*|==+)?\s*(?:4[\.\)]|tầng\s*4|ứng dụng|mở rộng|ngữ cảnh|ví dụ|context)/i.test(lower);

    if (isLayer1Heading) currentLayer = 1;
    else if (isLayer2Heading) currentLayer = 2;
    else if (isLayer3Heading) currentLayer = 3;
    else if (isLayer4Heading) currentLayer = 4;

    // Bỏ qua nếu dòng này là dòng tiêu đề phân cách thuần túy
    const isPureHeading = /^(?:#+\s*|===+\s*|--+\s*|Tầng\s*[1-4]\s*:?$|Phần\s*\d+\s*:?$)/i.test(line);
    if (isPureHeading) {
      continue;
    }

    // Pattern 1: Bold keywords with phonetic, POS and definition: - **term** [ipa] (noun): definition
    const boldMatch = line.match(/^[-*•]?\s*\*\*([^*]+)\*\*(?:\s*(?:\[([^\]]+)\]|\/([^/]+)\/))?(?:\s*\(([^)]+)\))?\s*[:\-–—]\s*(.+)$/i);
    if (boldMatch) {
      const term = boldMatch[1].trim();
      const phonetic = (boldMatch[2] ? `[${boldMatch[2].trim()}]` : boldMatch[3] ? `/${boldMatch[3].trim()}/` : '');
      const posRaw = boldMatch[4]?.toLowerCase() || '';
      const definition = boldMatch[5]?.trim() || '';

      // Kiểm tra dòng kế tiếp xem có câu ví dụ minh họa hay không
      let example = '';
      if (i + 1 < lines.length && (lines[i + 1].startsWith('Example:') || lines[i + 1].startsWith('Ví dụ:') || lines[i + 1].startsWith('Ex:'))) {
        example = lines[i + 1].replace(/^(?:Example|Ví dụ|Ex):\s*/i, '').trim();
        i++; // bỏ qua dòng ví dụ đã gom
      }

      let pos: ExtractedCard['pos'] = 'Noun';
      if (posRaw.includes('adj')) pos = 'Adjective';
      else if (posRaw.includes('verb') || posRaw.includes('v.')) pos = 'Verb';
      else if (posRaw.includes('adv')) pos = 'Adverb';
      else if (posRaw.includes('phrase') || term.includes(' ')) pos = 'Phrase';
      else if (posRaw.includes('noun') || posRaw.includes('n.')) pos = 'Noun';
      else pos = inferPOS(term);

      cards.push({
        id: `card_${Date.now()}_${cards.length + 1}`,
        term,
        phonetic,
        pos,
        definition,
        example: example || `Áp dụng "${term}" trong ngữ cảnh thực hành.`,
        layer: currentLayer,
      });
      continue;
    }

    // Pattern 2: Dòng có dấu phân cách ":" hoặc "-" hoặc "–" kèm định nghĩa
    const sepMatch = line.match(/^[-*•+–—]?\s*(?:(?:\d+[\.\)])\s*)?([^:–—=]+?)\s*[:–—=]\s*(.+)$/);
    if (sepMatch) {
      const term = sepMatch[1].replace(/\*\*/g, '').trim();
      const def = sepMatch[2].replace(/\*\*/g, '').trim();

      // Nếu độ dài hợp lý thì bóc tách thành thẻ hoàn chỉnh
      if (term.length <= 80 && def.length >= 1) {
        let example = '';
        if (i + 1 < lines.length && (lines[i + 1].startsWith('Example:') || lines[i + 1].startsWith('Ví dụ:') || lines[i + 1].startsWith('Ex:'))) {
          example = lines[i + 1].replace(/^(?:Example|Ví dụ|Ex):\s*/i, '').trim();
          i++;
        }

        const layerAssigned: KnowledgeLayer = term.includes(' ') && term.split(' ').length >= 3 
          ? 2 
          : (lower.includes('rule') || lower.includes('cấu trúc') || lower.includes('inversion') ? 3 : currentLayer);

        cards.push({
          id: `card_${Date.now()}_${cards.length + 1}`,
          term,
          pos: inferPOS(term),
          definition: def,
          example: example || `Áp dụng "${term}" trong các bài tập và ngữ cảnh thực tế.`,
          layer: layerAssigned,
        });
        continue;
      }
    }

    // BƯỚC 2: CƠ CHẾ BÓC TÁCH LINH HOẠT (SMART FALLBACK)
    // Nếu người dùng nhập/dán một danh sách không có dấu ":" hoặc "-", thuật toán không được báo lỗi hay bỏ qua.
    // Thay vào đó, tự động lấy nguyên dòng text đó làm mặt trước thẻ (word), để trống mặt sau (defVi/defEn rỗng) và tự động xếp thẻ đó vào Tầng 1.
    const cleanWord = line
      .replace(/^[-*•+–—\d]+[\.\)]\s*/, '')
      .replace(/^[-*•+–—]\s*/, '')
      .replace(/\*\*/g, '')
      .trim();

    if (cleanWord.length > 0) {
      cards.push({
        id: `card_${Date.now()}_${cards.length + 1}`,
        term: cleanWord,
        phonetic: '',
        pos: inferPOS(cleanWord),
        definition: '', // để trống mặt sau (defVi/defEn rỗng)
        example: '',    // để trống
        layer: 1,       // tự động xếp thẻ đó vào Tầng 1
      });
    }
  }

  return cards;
}

function inferPOS(term: string): ExtractedCard['pos'] {
  const lower = term.toLowerCase().trim();
  if (lower.includes(' ')) {
    if (lower.startsWith('if ') || lower.startsWith('had ') || lower.startsWith('no sooner') || lower.startsWith('hardly')) {
      return 'Grammar';
    }
    return 'Phrase';
  }
  if (lower.endsWith('ly')) return 'Adverb';
  if (lower.endsWith('ive') || lower.endsWith('ful') || lower.endsWith('ous') || lower.endsWith('able') || lower.endsWith('al') || lower.endsWith('ent') || lower.endsWith('ic')) return 'Adjective';
  if (lower.endsWith('tion') || lower.endsWith('ness') || lower.endsWith('ment') || lower.endsWith('ity') || lower.endsWith('er') || lower.endsWith('or') || lower.endsWith('ance') || lower.endsWith('ence')) return 'Noun';
  if (lower.endsWith('ize') || lower.endsWith('ise') || lower.endsWith('ate') || lower.endsWith('en') || lower.endsWith('ify')) return 'Verb';
  return 'Noun';
}
