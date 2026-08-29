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
 * Thuật toán bóc tách tự động tài liệu thành 4 tầng kiến thức sư phạm:
 * Tầng 1: Định nghĩa & Khái niệm cốt lõi (Definitions)
 * Tầng 2: Cụm từ, Collocations & Công thức (Phrases & Formulas)
 * Tầng 3: Quy trình & Cấu trúc ngữ pháp (Processes & Syntax)
 * Tầng 4: Ngữ cảnh & Ví dụ ứng dụng thực tế (Context & Examples)
 */
export function extractKnowledgeLayers(rawText: string): ExtractedCard[] {
  const cards: ExtractedCard[] = [];
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  let currentLayer: KnowledgeLayer = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect layer headings if present
    const lower = line.toLowerCase();
    if (lower.includes('1.') || lower.includes('định nghĩa') || lower.includes('concept') || lower.includes('tầng 1')) {
      currentLayer = 1;
    } else if (lower.includes('2.') || lower.includes('cụm từ') || lower.includes('collocation') || lower.includes('công thức') || lower.includes('tầng 2')) {
      currentLayer = 2;
    } else if (lower.includes('3.') || lower.includes('quy trình') || lower.includes('cấu trúc') || lower.includes('syntax') || lower.includes('ngữ pháp') || lower.includes('tầng 3')) {
      currentLayer = 3;
    } else if (lower.includes('4.') || lower.includes('ngữ cảnh') || lower.includes('ví dụ') || lower.includes('context') || lower.includes('tầng 4')) {
      currentLayer = 4;
    }

    // Pattern 1: Bold keywords with phonetic and POS: - **term** [ipa] / /ipa/ (noun/adj): definition
    const boldMatch = line.match(/^[-*•]?\s*\*\*([^*]+)\*\*(?:\s*(?:\[([^\]]+)\]|\/([^/]+)\/))?(?:\s*\(([^)]+)\))?\s*[:\-–]\s*(.+)$/i);
    if (boldMatch) {
      const term = boldMatch[1].trim();
      const phonetic = (boldMatch[2] ? `[${boldMatch[2].trim()}]` : boldMatch[3] ? `/${boldMatch[3].trim()}/` : '');
      const posRaw = boldMatch[4]?.toLowerCase() || '';
      const definition = boldMatch[5]?.trim() || '';

      // Check next line for Example:
      let example = '';
      if (i + 1 < lines.length && (lines[i + 1].startsWith('Example:') || lines[i + 1].startsWith('Ví dụ:'))) {
        example = lines[i + 1].replace(/^(?:Example|Ví dụ):\s*/i, '').trim();
        i++; // skip example line
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
        example: example || `The term "${term}" is commonly utilized in academic and communicative English contexts.`,
        layer: currentLayer,
      });
      continue;
    }

    // Pattern 2: Dash item with colon: - term: definition
    const dashMatch = line.match(/^[-*•]\s*([^:–]+)\s*[:–]\s*(.+)$/);
    if (dashMatch) {
      const term = dashMatch[1].replace(/\*\*/g, '').trim();
      const def = dashMatch[2].replace(/\*\*/g, '').trim();

      // Ignore section headers
      if (term.length > 50 || def.length < 2) continue;

      let example = '';
      if (i + 1 < lines.length && (lines[i + 1].startsWith('Example:') || lines[i + 1].startsWith('Ví dụ:'))) {
        example = lines[i + 1].replace(/^(?:Example|Ví dụ):\s*/i, '').trim();
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
        example: example || `Practicing "${term}" helps solidify deep understanding of English language patterns.`,
        layer: layerAssigned,
      });
      continue;
    }
  }

  // Fallback: If no structured items detected, extract key vocabulary phrases
  if (cards.length === 0) {
    const words = rawText.match(/\b[A-Za-z\-]{4,}\b/g) || [];
    const uniqueWords = Array.from(new Set(words)).slice(0, 8);

    uniqueWords.forEach((word, idx) => {
      const layer = ((idx % 4) + 1) as KnowledgeLayer;
      cards.push({
        id: `card_auto_${idx + 1}`,
        term: word.toLowerCase(),
        pos: inferPOS(word),
        definition: `Khái niệm hoặc thuật ngữ học thuật trích xuất từ tài liệu: "${word}".`,
        example: `Students should actively apply "${word}" when writing essays and taking tests.`,
        layer,
      });
    });
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
