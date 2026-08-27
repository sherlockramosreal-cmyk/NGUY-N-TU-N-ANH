import { PromptConfig, GradeLevel, ExamTarget, StudyMode, MiniGameId } from '../types';

export const GRADE_CONFIGS: Record<GradeLevel, { title: string; subtitle: string; tag: string }> = {
  lop10: {
    title: 'Lớp 10',
    subtitle: 'Chương trình GDPT 2018 - Nền tảng nhận biết & thông hiểu',
    tag: 'Global Success / Friends Global',
  },
  lop11: {
    title: 'Lớp 11',
    subtitle: 'Chương trình GDPT 2018 - Mở rộng & Phân tích ngữ cảnh',
    tag: 'Collocations & Phân từ',
  },
  lop12: {
    title: 'Lớp 12',
    subtitle: 'Chương trình GDPT 2018 - Nâng cao & B2-C1 chuyên sâu',
    tag: 'Học thuật & Đảo ngữ',
  },
};

export const EXAM_CONFIGS: Record<ExamTarget, { label: string; desc: string; icon: string }> = {
  thptqg: {
    label: 'Ôn thi THPT Quốc Gia',
    desc: 'Bẫy đề thi, ngữ pháp trọng điểm, nhận diện phát âm/trọng âm',
    icon: 'GraduationCap',
  },
  ielts: {
    label: 'IELTS Academic',
    desc: 'Từ vựng AWL, Collocations C1, Paraphrase theo Band điểm',
    icon: 'BookOpen',
  },
  vact: {
    label: 'VACT - ĐGNL ĐHQG TP.HCM',
    desc: 'Tư duy đọc hiểu logic, tính mạch lạc, chọn từ theo sắc thái',
    icon: 'Brain',
  },
  giaotiep: {
    label: 'Giao tiếp & Phản xạ thực tế',
    desc: 'Idioms, Phrasal Verbs, nối âm Connected Speech & Intonation',
    icon: 'MessageSquare',
  },
};

export const STUDY_MODE_CONFIGS: Record<StudyMode, { title: string; desc: string; icon: string }> = {
  doc_extractor: {
    title: 'Form Nạp Dữ Liệu',
    desc: 'Khung nhập liệu & Bóc tách từ vựng',
    icon: 'FileText',
  },
  flashcard3d: {
    title: 'Flashcard 3D',
    desc: 'Lật thẻ từ vựng thông minh',
    icon: 'Layers',
  },
  active_recall: {
    title: 'Active Recall',
    desc: 'Trắc nghiệm phản xạ nhanh',
    icon: 'HelpCircle',
  },
  exam_mode: {
    title: 'Exam Mode',
    desc: 'Thi thử có tính giờ',
    icon: 'CheckSquare',
  },
  export_pdf: {
    title: 'Xuất PDF / In ấn Flashcard',
    desc: 'Tối ưu định dạng in ấn khổ giấy A4 dạng lưới để in cắt thẻ học giấy hoặc học offline',
    icon: 'Printer',
  },
};

export const MINI_GAME_CONFIGS: Record<MiniGameId, { name: string; tag: string; desc: string; emoji: string; category: string }> = {
  tetris: {
    name: 'Xếp Gạch Trí Tuệ (Block Puzzle 5x5)',
    tag: 'POS-Coded & AI Revive',
    desc: 'Lưới 5x5; gạch phân màu theo Từ loại (Danh từ: Xanh dương, Động từ: Đỏ, Tính từ: Vàng, Trạng từ: Xanh lá). Đặt 4 khối kích hoạt AI Quiz (+200đ); khi thua có AI Cứu Mạng dọn sạch 3x3.',
    emoji: '🧱',
    category: 'Arcade Engine',
  },
  dino: {
    name: 'Khủng Long Vượt Ải (Dino Runner NCKH)',
    tag: 'Chạy né vật cản & Cứu nạn khẩn cấp',
    desc: 'Nhảy né vật cản tự do (Space/Touch). Chỉ khi đâm vật cản mới dừng hiện hộp thoại Cứu nạn; đúng hồi sinh (+2000đ) & khiên 1.5s; về đích gặp & HUN Khủng Long Hồng kèm mưa tim.',
    emoji: '🦖',
    category: 'Action Canvas',
  },
  penalty: {
    name: 'Sút Penalty Trí Tuệ (19 CLB Bóng Đá)',
    tag: '19 Top Clubs Shootout',
    desc: 'Chọn 1 trong 19 CLB hàng đầu (Man City, Real Madrid, Arsenal...). Loạt sút luân lưu 5 lượt gắn với câu hỏi trắc nghiệm và 4 góc sút khung thành.',
    emoji: '⚽',
    category: 'Sports Simulator',
  },
  dragdrop: {
    name: 'Kéo Thả Trí Tuệ (2 Chế Độ)',
    tag: '5x5 Matching & Cloze Test',
    desc: '2 chế độ: (1) Nối 2 cột từ vựng - nghĩa 5x5; (2) Điền từ vào đoạn văn đục lỗ ngữ cảnh (Cloze test). Nối đúng khóa màu xanh (+50đ).',
    emoji: '🎯',
    category: 'Interactive Matching',
  },
  truefalse: {
    name: 'Đúng Hay Sai Chớp Nhoáng',
    tag: 'Speed True/False & Combo x5',
    desc: 'Đếm ngược 3 giây; phản xạ Đúng/Sai chớp nhoáng. Chuỗi trả lời đúng liên tiếp kích hoạt Combo Multiplier nhân điểm x2, x3, x5.',
    emoji: '⚡',
    category: 'Speed Reaction',
  },
  scramble: {
    name: 'Sắp Xếp Cấu Trúc Câu',
    tag: 'Sentence Builder & S-V-O',
    desc: 'Ráp các mảnh từ theo đúng trật tự cú pháp và Collocations, phân tích cấu trúc ngữ pháp S-V-O.',
    emoji: '🧩',
    category: 'Grammar Syntax',
  },
  hangman: {
    name: 'Đoán Chữ Cứu Mạng (Hangman)',
    tag: '6 Lives & Auto Space',
    desc: '6 mạng sống; tự động mở sẵn khoảng trắng cho các cụm từ dài. Bàn phím ảo A-Z và đồ họa người treo cổ sinh động.',
    emoji: '🪢',
    category: 'Word Puzzle',
  },
};

export const COLOR_THEME_OPTIONS = [
  { id: 'indigo', name: 'Đen Tuyền', desc: 'Sang trọng, Tối giản', primary: '#18181b', secondary: '#27272a' },
  { id: 'emerald', name: 'Emerald & Teal', desc: 'Tươi sáng, Sinh thái', primary: '#059669', secondary: '#0d9488' },
  { id: 'amber', name: 'Amber & Rose', desc: 'Năng động, Sáng tạo', primary: '#d97706', secondary: '#e11d48' },
  { id: 'ocean', name: 'Ocean & Cyan', desc: 'Biển sâu, Hiện đại', primary: '#0284c7', secondary: '#06b6d4' },
  { id: 'ruby', name: 'Ruby (Học Thuộc)', desc: 'Phong cách Học Thuộc Thông Minh', primary: '#e11d48', secondary: '#9f1239' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', desc: 'Game Arcade Đậm nét', primary: '#06b6d4', secondary: '#8b5cf6' },
  { id: 'slate', name: 'Xám Trắng', desc: 'Sáng sủa, Thanh lịch', primary: '#f1f5f9', secondary: '#e2e8f0' },
];

export const UI_STYLE_OPTIONS = [
  { id: 'minimalist', name: 'Clean Minimalist (Vercel / Linear)', desc: 'Tối giản, phẳng, border siêu mảnh, khoảng trắng chuẩn mực' },
  { id: 'glassmorphism', name: 'Glassmorphism Hiện Đại', desc: 'Kính mờ backdrop-blur, viền phát sáng nhẹ, gradient tinh tế' },
  { id: 'playful', name: 'Gamified Arcade Playful', desc: 'Thân thiện học sinh, nút bấm 3D nổi bật, badge sao thưởng sinh động' },
  { id: 'neumorphism', name: 'Neumorphism Soft UI', desc: 'Đổ bóng kép dập nổi/chìm mềm mại, chiều sâu thị giác ấn tượng' },
];

export const FONT_OPTIONS = [
  { id: 'vietnam', name: 'Be Vietnam Pro', desc: 'Chuẩn hiển thị tiếng Việt & typography quốc tế' },
  { id: 'montserrat', name: 'Montserrat', desc: 'Hình khối hiện đại, tiêu đề khỏe khoắn' },
  { id: 'jetbrains', name: 'JetBrains Mono', desc: 'Đậm chất code & game terminal kỹ thuật số' },
  { id: 'inter', name: 'Inter Display', desc: 'Giao diện ứng dụng số tinh tế chuẩn công nghệ' },
  { id: 'geist', name: 'Geist', desc: 'Sắc sảo, phong cách developer tối giản' },
  { id: 'jakarta', name: 'Plus Jakarta Sans', desc: 'Rõ ràng, chuyên nghiệp cho bảng điều khiển' },
  { id: 'outfit', name: 'Outfit', desc: 'Hình học bo tròn thân thiện, xu hướng' },
  { id: 'lexend', name: 'Lexend', desc: 'Dễ đọc, hỗ trợ người mắc chứng khó đọc' },
  { id: 'grotesk', name: 'Space Grotesk', desc: 'Phá cách, cảm hứng vũ trụ và kỹ thuật' },
  { id: 'sora', name: 'Sora', desc: 'Sáng sủa, sắc nét cho giao diện web3' },
];

export const SYSTEM_UTILITY_OPTIONS = [
  { id: 'streak_heatmap', label: 'Chuỗi ngày học & Lịch nhiệt lượng', desc: 'Lưu LocalStorage theo dõi chuỗi Streak và biểu đồ heatmap học tập' },
  { id: 'web_audio', label: 'Hiệu ứng âm thanh Game (Web Audio API)', desc: 'Tạo tiếng bíp, ding, jump, goal khi tương tác qua AudioContext không cần file mp3 ngoài' },
  { id: 'dark_mode', label: 'Chế độ Sáng / Tối (Light & Dark Mode)', desc: 'Nút gạt chuyển đổi giao diện mượt mà lưu trạng thái theo người dùng' },
];

export const TOPIC_PRESETS = [
  'Environment, Tech & Education 4.0 Collocations',
  'Artificial Intelligence & Smart Automation',
  'Global Warming, Climate Change & Green Living',
  'Health, Wellness & Balanced Lifestyle',
  'Urbanization, Megacities & Smart Transportation',
  'Cultural Heritage & Global Identity',
  'E-Commerce & Digital Economy in 2026',
];

export const SAMPLE_VOCABULARY_DEFAULT = `sustainable : bền vững, thân thiện môi trường - We need sustainable energy solutions.
biodiversity : đa dạng sinh học - Protect global biodiversity.
carbon footprint - lượng khí thải carbon : Reduce your personal carbon footprint.
artificial intelligence - trí tuệ nhân tạo : AI helps optimize learning workflows.
interactive : mang tính tương tác cao - Interactive educational apps keep students engaged.
autonomous - tự hành, tự chủ : Autonomous vehicles navigate roads safely.
pedagogical : thuộc về sư phạm, giảng dạy - Modern pedagogical methods inspire curiosity.
digital literacy - năng lực số hóa : Digital literacy is essential for 21st-century learners.
collaboration : sự hợp tác, làm việc nhóm - Collaborative projects encourage teamwork.
cognitive - liên quan đến nhận thức : Active recall exercises improve cognitive retention.`;

export const THEORY_PRESETS = [
  {
    title: '⚡ Câu điều kiện hỗn hợp (Mixed Conditionals)',
    content: `1. Cấu trúc Mixed Conditional Type 3 + 2 (Giả định quá khứ để lại kết quả hiện tại):
- Cấu trúc: If + S + had + V3/ed, S + would/could + V(infinitive) (now/today).
- Ví dụ: If I had studied harder in high school, I would have a better job now.
- Bẫy thi kinh điển: Thí sinh hay nhầm vế chính thành 'would have + V3' do nhìn thấy 'If had V3'. Hãy chú ý trạng từ thời gian 'now', 'at present'.

2. Cấu trúc Inversion (Đảo ngữ điều kiện):
- Loại 1: Should + S + V(inf), S + will/can + V...
- Loại 2: Were + S + to V / Were + S + ..., S + would + V...
- Loại 3: Had + S + V3/ed, S + would have + V3/ed...`
  },
  {
    title: '🔗 Mệnh đề quan hệ & Rút gọn (Relative Clauses)',
    content: `1. Rút gọn bằng V-ing (Chủ động):
- The girl who sits next to me -> The girl sitting next to me.
2. Rút gọn bằng V3/ed (Bị động):
- The bridge which was built in 1990 -> The bridge built in 1990.
3. Rút gọn bằng To-V (Khi có the first, the only, the last, so sánh nhất):
- Neil Armstrong was the first person who walked on the moon -> the first person to walk on the moon.
- Chú ý: Cụm giới từ đảo lên trước 'whom/which' (e.g. the person to whom I spoke).`
  },
  {
    title: '🔀 Đảo ngữ nâng cao (Advanced Inversions)',
    content: `1. Đảo ngữ với phó từ phủ định đứng đầu câu:
- Never / Seldom / Rarely / Hardly + Trợ động từ + S + V...
- Hardly + had + S + V3 when S + V-ed (Vừa mới... thì...)
- No sooner + had + S + V3 than S + V-ed (Vừa mới... thì...)
2. Đảo ngữ với Only:
- Only when / Only after + S + V + Trợ động từ + S + V...
- Only by + V-ing + Trợ động từ + S + V...`
  },
  {
    title: '🌿 Phân từ hoàn thành & Cụm Collocations',
    content: `1. Having + V3/ed (Hành động đã hoàn tất trước hành động khác trong quá khứ):
- Having finished the report, she submitted it to the supervisor.
- Having been warned about the environmental risks, they halted the project.
2. Collocations học thuật:
- Make a breakthrough, Pose a threat to, Exert an impact on, Play a pivotal role in.`
  }
];

export const PRESET_TEMPLATES = [
  {
    id: 'thpt_standard',
    name: '🏆 Ôn thi THPT Quốc Gia Chuẩn',
    description: 'Tập trung Lớp 12, phân tích bẫy sai ngữ pháp, 3D Flashcard, Exam Mode và 4 Mini-games trọng điểm.',
    config: {
      gradeLevel: 'lop12' as GradeLevel,
      examTargets: ['thptqg'] as ExamTarget[],
      lessonTopic: 'High-Frequency Exam Traps & Idiomatic Phrasal Verbs',
      theoryContent: THEORY_PRESETS[0].content,
      sampleContent: SAMPLE_VOCABULARY_DEFAULT,
      studyModes: ['flashcard3d', 'active_recall', 'exam_mode', 'export_pdf'] as StudyMode[],
      selectedGames: ['tetris', 'penalty', 'truefalse', 'scramble'] as MiniGameId[],
      colorTheme: 'indigo' as const,
      primaryColor: '#18181b',
      accentColor: '#27272a',
      uiStyle: 'minimalist' as const,
      fontChoice: 'vietnam' as const,
      systemUtilities: ['streak_heatmap', 'web_audio', 'dark_mode'] as const,
      outputFormat: 'single_file_html' as const,
      strictCompleteCode: true,
      vocabCount: 10,
    },
  },
  {
    id: 'ielts_master',
    name: '🎓 IELTS Academic Master C1',
    description: 'Chuyên sâu từ vựng AWL, phân tầng Paraphrasing, trích xuất 4 tầng và đầy đủ 7 mini-game luyện phản xạ từ.',
    config: {
      gradeLevel: 'lop12' as GradeLevel,
      examTargets: ['ielts', 'vact'] as ExamTarget[],
      lessonTopic: 'Academic Word List (AWL) & Formal Collocations C1',
      theoryContent: THEORY_PRESETS[3].content,
      sampleContent: SAMPLE_VOCABULARY_DEFAULT,
      studyModes: ['flashcard3d', 'active_recall', 'exam_mode', 'doc_extractor', 'export_pdf'] as StudyMode[],
      selectedGames: ['tetris', 'dino', 'penalty', 'dragdrop', 'truefalse', 'scramble', 'hangman'] as MiniGameId[],
      colorTheme: 'emerald' as const,
      primaryColor: '#059669',
      accentColor: '#0d9488',
      uiStyle: 'glassmorphism' as const,
      fontChoice: 'vietnam' as const,
      systemUtilities: ['streak_heatmap', 'web_audio', 'dark_mode'] as const,
      outputFormat: 'single_file_html' as const,
      strictCompleteCode: true,
      vocabCount: 12,
    },
  },
  {
    id: 'arcade_game',
    name: '🕹️ Gamification Arcade Toàn Diện (NCKH 2026)',
    description: 'Kích hoạt toàn bộ 7 Game Canvas/DOM Engine, Web Audio, Streak Heatmap và 4 chế độ học thuật.',
    config: {
      gradeLevel: 'lop11' as GradeLevel,
      examTargets: ['thptqg', 'ielts', 'vact', 'giaotiep'] as ExamTarget[],
      lessonTopic: 'Environment, Tech & Education 4.0 Interactive Gamification',
      theoryContent: THEORY_PRESETS[1].content,
      sampleContent: SAMPLE_VOCABULARY_DEFAULT,
      studyModes: ['flashcard3d', 'active_recall', 'exam_mode', 'doc_extractor', 'export_pdf'] as StudyMode[],
      selectedGames: ['tetris', 'dino', 'penalty', 'dragdrop', 'truefalse', 'scramble', 'hangman'] as MiniGameId[],
      colorTheme: 'cyberpunk' as const,
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      uiStyle: 'playful' as const,
      fontChoice: 'vietnam' as const,
      systemUtilities: ['streak_heatmap', 'web_audio', 'dark_mode'] as const,
      outputFormat: 'single_file_html' as const,
      strictCompleteCode: true,
      vocabCount: 10,
    },
  },
  {
    id: 'grade10_foundation',
    name: '🌱 Lớp 10 Nền Tảng & Giao Tiếp',
    description: 'Từ vựng SGK GDPT 2018, nhận diện từ loại IPA, câu ví dụ đời sống, phản xạ Đúng/Sai 3s và Thẻ 3D trực quan.',
    config: {
      gradeLevel: 'lop10' as GradeLevel,
      examTargets: ['giaotiep'] as ExamTarget[],
      lessonTopic: 'Everyday Communication & Core Vocabulary Grade 10',
      theoryContent: '',
      sampleContent: SAMPLE_VOCABULARY_DEFAULT,
      studyModes: ['flashcard3d', 'active_recall', 'export_pdf'] as StudyMode[],
      selectedGames: ['dragdrop', 'truefalse', 'hangman'] as MiniGameId[],
      colorTheme: 'amber' as const,
      primaryColor: '#d97706',
      accentColor: '#f97316',
      uiStyle: 'minimalist' as const,
      fontChoice: 'vietnam' as const,
      systemUtilities: ['streak_heatmap', 'web_audio', 'dark_mode'] as const,
      outputFormat: 'single_file_html' as const,
      strictCompleteCode: true,
      vocabCount: 10,
    },
  },
];

/**
 * Detects whether the current prompt configuration targets English language learning (IELTS, ESL, THPTQG English)
 * or Pure Vietnamese subject knowledge (History, Geography, Civic Education, General Vietnamese studies, etc.)
 */
export function isEnglishTarget(config: PromptConfig): boolean {
  // 1. Explicit IELTS Academic selection is ALWAYS English
  if (config.examTargets.includes('ielts')) {
    return true;
  }

  const combinedText = `${config.lessonTopic || ''} ${config.sampleContent || ''} ${config.theoryContent || ''}`.trim();
  const lowerText = combinedText.toLowerCase();

  // 2. Clear Vietnamese subject indicators (History, Geography, Literature, GDCD, Law, Philosophy...)
  const vietnameseSubjectKeywords = [
    'lịch sử', 'địa lý', 'địa lí', 'gdcd', 'giáo dục công dân', 'triết học', 'văn học', 'ngữ văn',
    'tiếng việt', 'lịch sử việt nam', 'lịch sử thế giới', 'sinh học', 'hóa học', 'toán học',
    'pháp luật', 'kinh tế chính trị', 'tư tưởng hồ chí minh', 'chính trị', 'nhân vật lịch sử',
    'sự kiện lịch sử', 'kiến thức việt nam', 'thuần việt'
  ];

  if (vietnameseSubjectKeywords.some((kw) => lowerText.includes(kw))) {
    return false;
  }

  // 3. Analyze sample content language (if provided)
  if (config.sampleContent && config.sampleContent.trim().length > 15) {
    const englishWordMatches = config.sampleContent.match(/\b[a-zA-Z]{3,}\b/g) || [];
    const totalWords = config.sampleContent.split(/\s+/).filter(Boolean).length;
    const hasVietnameseAccents = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(config.sampleContent);

    // If text has Vietnamese accents and almost no English words (< 18% English tokens), it's Pure Vietnamese knowledge
    if (hasVietnameseAccents && totalWords > 5 && englishWordMatches.length / totalWords < 0.18) {
      return false;
    }
  }

  // 4. If topic has Vietnamese accents and no English words
  if (config.lessonTopic && config.lessonTopic.trim().length > 3) {
    const topicEnglishTokens = config.lessonTopic.match(/\b[a-zA-Z]{3,}\b/g) || [];
    const topicTotalWords = config.lessonTopic.split(/\s+/).filter(Boolean).length;
    const topicHasVnAccents = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(config.lessonTopic);
    if (topicHasVnAccents && topicTotalWords >= 3 && topicEnglishTokens.length / topicTotalWords < 0.25) {
      return false;
    }
  }

  // 5. If English targets are present, default to English
  if (config.examTargets.some((t) => t === 'ielts' || t === 'thptqg' || t === 'giaotiep' || t === 'vact')) {
    return true;
  }

  return true;
}

export function compileMasterPrompt(config: PromptConfig): string | string[] {
  const isEnglish = isEnglishTarget(config);
  const gradePrompt = getGradePedagogyPrompt(config.gradeLevel, isEnglish);
  const examPrompts = config.examTargets.map(target => getExamPedagogyPrompt(target, isEnglish)).join('\n\n');
  const studyModePrompts = config.studyModes.map(mode => getStudyModePrompt(mode, isEnglish)).join('\n\n');
  const miniGamePrompts = config.selectedGames.map(gameId => getMiniGamePrompt(gameId, isEnglish)).join('\n\n');
  const designPrompt = getDesignSystemPrompt(config);
  const technicalPrompt = getTechnicalRulesPrompt(config);

  const appHeadline = 'ỨNG DỤNG WEB HỌC TẬP & ÔN LUYỆN KIẾN THỨC TƯƠNG TÁC (Học Thuộc Thông Minh - Lịch Sử 11 & Gamification Arcade) tích hợp BỘ MÁY ĐỌC LINK ĐA TẦNG DỰ PHÒNG CHỐNG NGHẼN (Robust Multi-Tier URL Fallback Engine)';

  const datasetExtractionRules = isEnglish
    ? `[QUY TẮC BẮT BUỘC DÀNH CHO AI (GEMINI TRONG AI STUDIO)]:
Khi tiếp nhận prompt này, nếu phần dữ liệu bài học chứa liên kết, bài đọc hiểu, hoặc danh sách thô, Gemini PHẢI TỰ ĐỘNG THỰC HIỆN 4 BƯỚC TINH LỌC NỘI DUNG:
1. TRÌNH BÀY MỤC LỤC & DÀN Ý BÀI HỌC (Table of Contents / Navigation Outline): Tạo một mục lục trực quan ở đầu trang với các phần đánh số rõ ràng để người học nắm trọn cấu trúc kiến thức.
2. BÓC TÁCH VÀ KHỞI TẠO TẬP TỪ VỰNG CHUẨN HÓA TIẾNG ANH: Trích xuất ít nhất ${config.vocabCount} từ vựng/thuật ngữ cốt lõi gắn liền với chủ đề và bối cảnh bài viết, khởi tạo thành mảng JSON đầy đủ:
   {
     id: number,
     word: string,
     type: string (ví dụ: 'noun', 'verb', 'adj', 'adv'),
     ipa: string (phiên âm quốc tế chuẩn),
     def_en: string (định nghĩa tiếng Anh súc tích),
     def_vi: string (nghĩa tiếng Việt chuẩn xác),
     collocations: string[] (ít nhất 2-3 cụm từ kết hợp nâng cao),
     example_en: string (câu ví dụ chuẩn văn phong học thuật/đời sống),
     example_vi: string (dịch nghĩa tiếng Việt câu ví dụ)
   }
3. TỔNG HỢP BẢNG TÓM TẮT LÝ THUYẾT & QUY TẮC NGỮ PHÁP (Theory Cheat Sheet): Đúc kết các điểm lý thuyết, bẫy ngữ pháp và mẹo làm bài thành thẻ ghi nhớ đẹp mắt.
4. ĐỒNG BỘ TOÀN DIỆN VÀO TẤT CẢ MINI-GAMES & CHẾ ĐỘ THI: Đưa bộ từ vựng và câu hỏi ngữ pháp vào Flashcard 3D, Active Recall, Exam Mode, Xếp gạch, Khủng long, Penalty...`
    : `[QUY TẮC BẮT BUỘC DÀNH CHO AI (GEMINI TRONG AI STUDIO)]:
Khi tiếp nhận prompt này, bài học này là KIẾN THỨC TIẾNG VIỆT THUẦN TÚY. Gemini PHẢI BÓC TÁCH KIẾN THỨC VÀ KHỞI TẠO TẬP DỮ LIỆU THEO 4 BƯỚC:
1. TRÌNH BÀY MỤC LỤC & DÀN Ý BÀI HỌC (Table of Contents / Navigation Outline): Tạo một mục lục trực quan ở đầu trang với các phần đánh số rõ ràng (1. Tổng quan, 2. Khái niệm cốt lõi, 3. Diễn biến / Bản chất, 4. Ý nghĩa / Bài học thực tiễn) để người học nắm trọn cấu trúc kiến thức bài học.
2. BÓC TÁCH VÀ KHỞI TẠO TẬP KIẾN THỨC TIẾNG VIỆT THUẦN TÚY (TUYỆT ĐỐI KHÔNG DỊCH SANG TIẾNG ANH): Trích xuất ít nhất ${config.vocabCount} thuật ngữ / khái niệm / sự kiện lịch sử / tên nhân vật / công thức cốt lõi từ bài học, khởi tạo thành mảng JSON Tiếng Việt chuẩn xác:
   {
     id: number,
     term: string, // Thuật ngữ / Sự kiện / Tên nhân vật / Khái niệm cốt lõi bằng Tiếng Việt
     definition: string, // Định nghĩa / Ý nghĩa lịch sử / Bản chất kiến thức bằng Tiếng Việt súc tích
     context: string // Bối cảnh ra đời / Mốc thời gian / Chi tiết thực tế / Ứng dụng bằng Tiếng Việt
   }
   * QUY TẮC BẮT BUỘC DÀNH CHO GEMINI:
     - Giữ nguyên 100% TIẾNG VIỆT THUẦN TÚY.
     - TUYỆT ĐỐI KHÔNG TỰ Ý DỊCH SANG TIẾNG ANH.
     - KHÔNG YÊU CẦU trường 'ipa' (phiên âm) hay 'collocations'.
     - KHÔNG phân loại từ loại tiếng Anh (noun/verb/adj).
3. TỔNG HỢP BẢNG TÓM TẮT LÝ THUYẾT & NỘI DUNG TRỌNG TÂM (Theory Cheat Sheet): Đúc kết các ý chính, mốc sự kiện quan trọng, công thức hoặc quy tắc cốt lõi thành thẻ ghi nhớ đẹp mắt.
4. ĐỒNG BỘ TOÀN DIỆN VÀO TẤT CẢ MINI-GAMES & CHẾ ĐỘ THI: Đưa bộ thuật ngữ, định nghĩa và bối cảnh Tiếng Việt vào Flashcard 3D, Active Recall Quiz, Exam Mode, Xếp gạch, Khủng long, Penalty... hoàn toàn bằng Tiếng Việt.`;

  const basePrompt = `Bạn là một Chuyên gia Lập trình Game Sư phạm và Kỹ sư Web Frontend Cao cấp (Senior EdTech & Game Web Developer).
Hãy viết mã nguồn hoàn chỉnh 100% cho một ${appHeadline} theo chuẩn đề tài Nghiên cứu Khoa học THPT năm 2026.

===================================================================
1. QUY CHUẨN KỸ THUẬT & KIẾN TRÚC MÃ NGUỒN BẮT BUỘC:
===================================================================
${technicalPrompt}

===================================================================
2. BỘ MÁY ĐỌC LINK ĐA TẦNG DỰ PHÒNG (ROBUST MULTI-TIER URL ENGINE):
===================================================================
Khi người dùng dán đường link bài viết/tài liệu (Wikipedia, báo chí, tài liệu học tập):
- Tự động chạy thuật toán thử nghiệm lần lượt qua 4 cổng kết nối dự phòng (Multi-Tier Proxy Pipeline) để vượt rào cản CORS và tường lửa, đảm bảo 100% không bị nghẽn:
  + Cổng 1: Jina Reader (https://r.jina.ai/[URL]) -> Trích xuất Markdown sạch đã lọc quảng cáo.
  + Cổng 2 (Nếu cổng 1 lỗi): AllOrigins Proxy (https://api.allorigins.win/raw?url=...) -> Lấy HTML và dùng DOMParser loại bỏ script/ads.
  + Cổng 3 (Nếu cổng 2 lỗi): CorsProxy IO (https://corsproxy.io/?...) -> Dự phòng serverless.
  + Cổng 4 (Nếu cổng 3 lỗi): CodeTabs Gateway (https://api.codetabs.com/v1/proxy?quest=...).
- Thuật toán bóc tách 4 tầng tri thức (Zero-Key): Dựa vào Tiêu đề (H1) và Mục tiêu bài học để quét các câu định nghĩa ('là khái niệm...', 'được hiểu là...'), từ in đậm (**từ khóa**) và câu chủ đề đầu đoạn để rút ra 10 - 15 thẻ học cốt lõi, tự động nạp thẳng vào Flashcard 3D và 7 Mini-game!

BẮT BUỘC SỬ DỤNG MÃ NGUỒN SAU ĐỂ BÓC TÁCH BÀI VIẾT TỪ RAW HTML (Nếu cổng 1 Jina lỗi và phải dùng HTML từ Cổng 2, 3, 4):
\`\`\`javascript
function extractCleanFullArticleFromHTML(rawHTML) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHTML, 'text/html');

  // BƯỚC 1: XÓA SẠCH CÁC THẺ KỸ THUẬT VÀ KHUNG GIAO DIỆN
  const tagBlacklist = [
    'script', 'style', 'noscript', 'iframe', 'canvas', 'svg', 
    'form', 'button', 'input', 'select', 'textarea', 'dialog',
    'nav', 'header', 'footer', 'aside'
  ];
  doc.querySelectorAll(tagBlacklist.join(',')).forEach(el => el.remove());

  // BƯỚC 2: XÓA CÁC CLASS/ID QUẢNG CÁO, MẠNG XÃ HỘI, BÌNH LUẬN
  const junkPattern = /(comment|disqus|sidebar|breadcrumb|footer|header|banner|advert|ad-|ads-|social|share|sponsor|taboola|outbrain|popup|modal|cookie|widget|related-posts|nav-|menu-)/i;
  doc.querySelectorAll('div, section, article, aside, ul, ol, p, span').forEach(el => {
    const classAndId = \`\${el.className || ''} \${el.id || ''} \${el.getAttribute('role') || ''}\`;
    if (junkPattern.test(classAndId)) {
      const isMainContainer = /(article-body|post-content|main-content|entry-content|story-body)/i.test(classAndId);
      if (!isMainContainer) el.remove();
    }
  });

  // BƯỚC 3: TÌM KHỐI BÀI VIẾT CHÍNH QUA MẬT ĐỘ CHỮ & MẬT ĐỘ LINK
  let contentRoot = doc.querySelector('article, main, [role="main"], .post-content, .article-body, .entry-content, #content, .content, .story-body');
  
  if (!contentRoot) {
    let bestCandidate = doc.body;
    let maxTextLength = 0;
    doc.querySelectorAll('div, section').forEach(el => {
      const totalText = el.innerText || '';
      let linkText = '';
      el.querySelectorAll('a').forEach(a => linkText += a.innerText || '');
      const linkDensity = totalText.length > 0 ? (linkText.length / totalText.length) : 1;
      
      if (linkDensity < 0.35 && totalText.length > maxTextLength) {
        maxTextLength = totalText.length;
        bestCandidate = el;
      }
    });
    contentRoot = bestCandidate || doc.body;
  }

  // BƯỚC 4: TRÍCH XUẤT 100% NỘI DUNG CÓ CẤU TRÚC
  let title = doc.querySelector('h1')?.innerText?.trim() || doc.querySelector('title')?.innerText?.trim() || 'Tài liệu';
  title = title.replace(/\\s*[-|–•].*$/, '').trim();

  const extractedNodes = [];
  const walker = doc.createTreeWalker(contentRoot, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const tag = node.tagName.toLowerCase();
      if (['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote'].includes(tag)) return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_SKIP;
    }
  });

  let currentNode;
  while ((currentNode = walker.nextNode())) {
    const tag = currentNode.tagName.toLowerCase();
    const text = (currentNode.innerText || currentNode.textContent || '').trim().replace(/\\s+/g, ' ');
    if (text.length < 5) continue;

    if (tag.startsWith('h')) extractedNodes.push(\`\\n### \${text}\\n\`);
    else if (tag === 'li') extractedNodes.push(\`* \${text}\`);
    else if (tag === 'blockquote') extractedNodes.push(\`> "\${text}"\`);
    else extractedNodes.push(text);
  }

  return { title, fullMarkdownText: \`# \${title}\\n\\n\` + extractedNodes.join('\\n\\n') };
}
\`\`\`

BẮT BUỘC THÊM Ô NHẬP TẢI FILE (TẢI LÊN PDF VÀ WORD .DOCX) VÀ SỬ DỤNG MÃ NGUỒN XỬ LÝ DƯỚI ĐÂY:
- Hiển thị một khung tải file kéo thả đẹp mắt, hỗ trợ chọn file .pdf và .docx.
- Xử lý đọc file bằng mã nguồn sau:
\`\`\`html
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // Hàm đọc nội dung từ tệp PDF bằng PDF.js
  async function readTextFromPdf(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    const maxPages = Math.min(pdf.numPages, 20);
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += \`\\n--- Trang \${i} ---\\n\` + pageText;
    }
    return { text: fullText, numPages: pdf.numPages };
  }

  // Hàm đọc nội dung từ tệp Word (.docx) bằng Mammoth.js
  async function readTextFromDocx(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return { text: result.value };
  }

  // Hàm điều phối xử lý tự động khi người dùng chọn tệp
  async function handleExtractUploadedDocument(file) {
    const fileName = file.name.toLowerCase();
    let textContent = '';
    let titleHint = file.name.replace(/\\.(pdf|docx|doc)$/i, '');

    if (fileName.endsWith('.pdf')) {
      const res = await readTextFromPdf(file);
      textContent = res.text;
    } else if (fileName.endsWith('.docx')) {
      const res = await readTextFromDocx(file);
      textContent = res.text;
    }

    // Đưa văn bản qua bộ bóc tách 4 tầng tri thức
    return { title: titleHint, fullMarkdownText: textContent };
  }
</script>
\`\`\`

===================================================================
3. MỤC TIÊU SƯ PHẠM & ĐẶC TẢ ĐỐI TƯỢNG HỌC TẬP:
===================================================================
${gradePrompt}

${examPrompts ? `[ĐẶC TẢ ĐỊNH HƯỚNG THI CỬ & BỔ TRỢ ĐÃ CHỌN]:\n${examPrompts}` : ''}

===================================================================
4. DỮ LIỆU BÀI HỌC: CHỦ ĐỀ, MỤC LỤC, LÝ THUYẾT & TẬP DỮ LIỆU (DATASET):
===================================================================
- Tên bài học / Chủ đề chính: "${config.lessonTopic}"

${datasetExtractionRules}

${config.theoryContent && config.theoryContent.trim() ? `[LÝ THUYẾT & QUY TẮC TRỌNG TÂM DO GIÁO VIÊN/NGƯỜI DÙNG CUNG CẤP]:
${config.theoryContent.trim()}

* YÊU CẦU TÍCH HỢP LÝ THUYẾT VÀO WEB:
1. Xây dựng một Tab/Khu vực "Ghi nhớ Lý thuyết & Cấu trúc" (Theory Cheat Sheet) trực quan, có thẻ tóm tắt công thức, mốc sự kiện và bối cảnh thực tế.
2. Tự động lồng ghép các quy tắc và nội dung trên vào câu hỏi của chế độ "Học & Nhớ (Active Recall)", "Bài kiểm tra (Exam Mode)" và các Mini-Games.
` : `- Lý thuyết bổ sung: AI tự động phân tích và đúc kết các điểm lý thuyết trọng tâm từ nội dung chủ đề bài học.`}

${config.sampleContent && config.sampleContent.trim() ? `[DỮ LIỆU NGUỒN / MỤC LỤC & VĂN BẢN TRÍCH XUẤT CỦA BÀI HỌC]:\n${config.sampleContent.trim()}\n` : ''}

===================================================================
5. ĐẶC TẢ CHI TIẾT CÁC CHẾ ĐỘ HỌC THUẬT (ACADEMIC MODES):
===================================================================
${studyModePrompts || '- Không chọn chế độ học thuật nào.'}

===================================================================
6. ĐẶC TẢ THUẬT TOÁN & LOGIC GAME GAMIFICATION (${config.selectedGames.length} TRÒ CHƠI ĐÃ CHỌN):
===================================================================
${miniGamePrompts || '- Không có mini-game nào được chọn.'}

===================================================================
7. THIẾT KẾ UI/UX, BẢNG MÀU & TIỆN ÍCH HỆ THỐNG:
===================================================================
${designPrompt}

===================================================================
8. YÊU CẦU ĐẦU RA MÃ NGUỒN & QUY TẮC BỘ NHỚ (OUTPUT DELIVERABLES):
===================================================================
`;

  if (config.promptStrategy === 'modular_3_parts') {
    const prompt1 = basePrompt + `- Đóng vai Frontend Developer. Bạn hãy TRÌNH BÀY bộ khung HTML chuẩn, nhúng thư viện (Tailwind, Lucide, PDF.js, Mammoth.js), thiết kế giao diện UI đầy đủ và khởi tạo bộ dữ liệu JSON (từ vựng/ngữ pháp) đã bóc tách.
- LỆNH CHỐT: Chỉ viết mã nguồn UI và Data. ĐỂ TRỐNG phần logic JavaScript của các chế độ học và mini-game (bạn có thể viết các thẻ HTML/CSS và các hàm rỗng). Tôi sẽ yêu cầu viết logic ở prompt tiếp theo.`;

    const prompt2 = `Chào bạn, đây là phần tiếp theo của ứng dụng học tập. Dựa vào bộ UI và JSON bạn đã viết ở phần trước, hãy VIẾT TIẾP logic JavaScript:
1. Lập trình "Bộ máy đọc Link/PDF đa tầng" (URL Engine + File Parser) như đặc tả ban đầu.
2. Viết code hoàn chỉnh cho 3 Mini-game / Chế độ học đầu tiên (ví dụ: Flashcard 3D, Active Recall, Tetris...).
- LỆNH CHỐT: Viết nối tiếp vào file HTML/JS trước đó. Bạn chỉ cần viết mã xử lý sự kiện JavaScript cho phần này.`;

    const prompt3 = `Chào bạn, đây là phần cuối cùng của ứng dụng học tập. Hãy VIẾT TIẾP logic JavaScript cho các Mini-game và tiện ích còn lại:
1. Viết code cho các trò chơi còn lại (${config.selectedGames.slice(3).join(', ')}).
2. Tích hợp âm thanh (Web Audio API), chế độ Dark Mode, biểu đồ Heatmap.
3. Hoàn thiện hệ thống tính điểm, lưu LocalStorage và hoàn thiện file HTML cuối cùng.
- LỆNH CHỐT: Đảm bảo toàn bộ 100% ứng dụng chạy mượt mà ngay trên trình duyệt mà không cần chạy server NodeJS.`;

    return [prompt1, prompt2, prompt3];
  }

  return basePrompt + `- Hãy xuất mã nguồn hoàn chỉnh 100% trong một khối mã duy nhất, không dùng placeholder (không dùng // TODO, // tự viết tiếp), không cắt ngắn logic.
- "PHAO CỨU SINH" XỬ LÝ GIỚI HẠN BỘ NHỚ (Token Limit Lifesaver): Nếu mã nguồn quá dài và vượt giới hạn bộ nhớ của một lần trả lời, hãy DỪNG LẠI ở một hàm/thẻ hoàn chỉnh. Tuyệt đối không được cắt xén logic để ép cho vừa. Tôi sẽ gõ 'Tiếp tục' để bạn viết phần code còn lại.
- Kiểm tra cẩn thận các sự kiện click, touch, keyboard, Web Audio API và LocalStorage để toàn bộ các game và chế độ học đều có thể chơi mượt mà ngay trên trình duyệt.`;
}

function getGradePedagogyPrompt(grade: GradeLevel, isEnglish = true): string {
  if (!isEnglish) {
    switch (grade) {
      case 'lop10':
        return `[ĐẶC TẢ SƯ PHẠM: LỚP 10 - CHƯƠNG TRÌNH GDPT 2018 (KIẾN THỨC TIẾNG VIỆT)]
- Giọng văn & Độ khó: Ngôn từ trong sáng, chuẩn mực, bám sát chương trình SGK lớp 10 mới.
- Mục tiêu kiến thức: Giúp người học nắm vững các khái niệm nền tảng, định nghĩa cốt lõi, mốc thời gian/sự kiện căn bản và ứng dụng thực tiễn.
- Thiết kế bài tập: Mức độ Nhận biết & Thông hiểu; câu hỏi trắc nghiệm tường minh, có gợi ý rõ ràng.`;
      case 'lop11':
        return `[ĐẶC TẢ SƯ PHẠM: LỚP 11 - CHƯƠNG TRÌNH GDPT 2018 (KIẾN THỨC TIẾNG VIỆT)]
- Giọng văn & Độ khó: Mở rộng phân tích bản chất quy luật, quan hệ nhân quả và bối cảnh chuyên sâu.
- Mục tiêu kiến thức: Khắc sâu bản chất thuật ngữ, ý nghĩa các sự kiện, liên hệ thực tiễn và phân tích dữ liệu.
- Thiết kế bài tập: Mức độ Thông hiểu & Vận dụng; yêu cầu giải thích bối cảnh và rút ra kết luận logic.`;
      case 'lop12':
        return `[ĐẶC TẢ SƯ PHẠM: LỚP 12 - CHƯƠNG TRÌNH GDPT 2018 (KIẾN THỨC TIẾNG VIỆT)]
- Giọng văn & Độ khó: Chuyên sâu, tính tổng hợp và khái quát hóa cao, định hướng thi cử và nghiên cứu.
- Mục tiêu kiến thức: Hệ thống hóa toàn diện các phạm trù, quy luật, tư tưởng và bài học kinh nghiệm.
- Thiết kế bài tập: Mức độ Vận dụng cao; tích hợp các câu hỏi phân hóa, phân tích nhận định và bẫy sai tư duy.`;
    }
  }

  switch (grade) {
    case 'lop10':
      return `[ĐẶC TẢ SƯ PHẠM: LỚP 10 - CHƯƠNG TRÌNH GDPT 2018]
- Giọng văn & Độ khó: Ngôn từ rõ ràng, gần gũi, bám sát các chủ đề SGK Tiếng Anh 10 Global Success / Friends Global.
- Mục tiêu kiến thức: Giúp học sinh nắm chắc từ vựng nền tảng, nhận diện đúng từ loại (Noun, Verb, Adj, Adv), phiên âm IPA chuẩn xác và câu ví dụ quen thuộc trong đời sống.
- Thiết kế bài tập: Tập trung mức độ Nhận biết & Thông hiểu; các câu hỏi trắc nghiệm ngắn, có gợi ý rõ ràng và không đánh đố quá mức.`;
    case 'lop11':
      return `[ĐẶC TẢ SƯ PHẠM: LỚP 11 - CHƯƠNG TRÌNH GDPT 2018]
- Giọng văn & Độ khó: Mở rộng sang các vấn đề xã hội, môi trường, di sản văn hóa và sức khỏe.
- Mục tiêu kiến thức: Chú trọng các cụm từ kết hợp (Collocations), phân từ hoàn thành (Having + V3), danh động từ và động từ khuyết thiếu.
- Thiết kế bài tập: Mức độ Thông hiểu & Vận dụng; yêu cầu học sinh giải thích ngữ cảnh sử dụng từ và thực hành ghép cấu trúc câu phức.`;
    case 'lop12':
      return `[ĐẶC TẢ SƯ PHẠM: LỚP 12 - CHƯƠNG TRÌNH GDPT 2018]
- Giọng văn & Độ khó: Học thuật chuyên sâu, định hướng nghề nghiệp, công nghệ và hội nhập.
- Mục tiêu kiến thức: Cung cấp từ vựng trừu tượng mức độ nâng cao (B2 - C1), các cấu trúc ngữ pháp khó như Đảo ngữ, Câu điều kiện hỗn hợp, Rút gọn mệnh đề quan hệ.
- Thiết kế bài tập: Mức độ Vận dụng cao; tích hợp các câu hỏi phân loại học sinh khá - giỏi và bài tập phân tích lỗi sai ngữ pháp tinh vi.`;
  }
}

function getExamPedagogyPrompt(target: ExamTarget, isEnglish = true): string {
  if (!isEnglish) {
    switch (target) {
      case 'thptqg':
        return `[ĐẶC TẢ SƯ PHẠM: MỤC TIÊU THPT QUỐC GIA - GDPT 2018]
- Định vị mục tiêu: Tối ưu hóa điểm số tuyệt đối (mục tiêu 9+, 10). Các câu hỏi cần có độ phân hóa cao, xoáy sâu vào bản chất hiện tượng hoặc so sánh các sự kiện.
- Cơ chế bóc tách: KHÔNG tạo câu hỏi học vẹt. Hãy thiết kế câu hỏi dạng Vận dụng và nhận diện bẫy sai khái niệm.
- Cấu trúc JSON Bắt Buộc: Trích xuất và chuyển đổi văn bản đầu vào thành mảng JSON gồm 15-20 câu hỏi trắc nghiệm theo chuẩn ma trận đề thi. Phải giữ nguyên 100% Tiếng Việt.

Yêu cầu định dạng JSON nghiêm ngặt:
[
  {
    "id": 1,
    "question": "Nội dung câu hỏi (Ví dụ: Bản chất sự khác biệt giữa hai cuộc cải cách, hoặc điều kiện để một chất tham gia phản ứng đặc thù).",
    "options": {
      "A": "Lựa chọn nhiễu 1",
      "B": "Lựa chọn đúng",
      "C": "Lựa chọn nhiễu 2",
      "D": "Lựa chọn nhiễu 3"
    },
    "correctAnswer": "B",
    "explanation": "Giải thích cặn kẽ bản chất kiến thức chứng minh B đúng.",
    "trapAnalysis": "Chỉ rõ bẫy sai của A, C, D (Ví dụ: 'Phương án A sai vì nhầm lẫn giới hạn thể chế phong kiến với sai lầm cá nhân', hoặc 'Phương án C sai vì thiếu điều kiện xúc tác')."
  }
]

[QUY TẮC ĐỒNG BỘ GAME]: 
- Dữ liệu này sẽ được nạp trực tiếp vào [Exam Mode] và [Speed True/False]. Khi người chơi chọn sai, hệ thống phải lập tức hiển thị nội dung từ trường 'trapAnalysis' để cảnh báo.`;
      case 'ielts':
        return `[ĐẶC TẢ SƯ PHẠM: MỤC TIÊU IELTS ACADEMIC / SAT (BAND 7.0+ / 1400+)]
- Định vị mục tiêu: Xây dựng kho từ vựng học thuật (Lexical Resource) và rèn luyện kỹ năng Paraphrase. 
- Cơ chế bóc tách: TUYỆT ĐỐI KHÔNG trích xuất từ vựng đơn lẻ (word-by-word). Phải ưu tiên bóc tách các từ vựng band 7.0+, các cụm Collocations, và cấu trúc câu phức. Đặc biệt chú ý trích xuất các luận điểm có thể ứng dụng cho dạng bài Causes and Solutions trong Writing Task 2.
- Cấu trúc JSON Bắt Buộc: Chuyển đổi văn bản tiếng Anh đầu vào thành mảng JSON chuẩn ngôn ngữ học:

[
  {
    "id": 1,
    "word": "Cụm từ / Từ vựng học thuật (Ví dụ: mitigate environmental degradation)",
    "ipa": "/Phiên âm chuẩn Quốc tế IPA/",
    "type": "Từ loại (n, v, adj, adv)",
    "definition_en": "Giải nghĩa bằng tiếng Anh (ngắn gọn, dùng từ đồng nghĩa dễ hiểu)",
    "definition_vi": "Nghĩa tiếng Việt theo đúng ngữ cảnh bài đọc",
    "synonyms": "Liệt kê 2-3 từ đồng nghĩa cao cấp để rèn Paraphrase",
    "collocations": "1-2 cách kết hợp từ thông dụng (Ví dụ: severely mitigate)",
    "example": "Câu ví dụ thực tế trích từ văn bản gốc, thể hiện rõ nguyên nhân - kết quả."
  }
]

[QUY TẮC ĐỒNG BỘ GAME & CHẾ ĐỘ HỌC]:
- [Flashcard 3D]: Bắt buộc kích hoạt Web Speech API (giọng en-US) để đọc trường 'word' và 'example'. Mặt trước hiện từ vựng + IPA, mặt sau hiện nghĩa, Synonyms và Collocations.
- [Word Match & Cloze]: Tạo các câu hỏi điền khuyết bám sát vào trường 'synonyms' để luyện kỹ năng quét keywords, giúp người học tối ưu tốc độ chốt ít nhất 9 câu đúng trong Passage 1 Reading.
- [Sentence Builder]: Sử dụng trường 'example' để tạo game sắp xếp câu, ép người học nhớ vị trí của mạo từ, giới từ và từ nối cấu trúc phức.`;
      case 'vact':
        return `[ĐẶC TẢ SƯ PHẠM: MỤC TIÊU ĐÁNH GIÁ NĂNG LỰC (ĐGNL)]
- Định vị mục tiêu: Rèn luyện tư duy logic, đọc hiểu văn bản phức tạp, phân tích biểu đồ và xử lý số liệu (không kiểm tra học vẹt).
- Cơ chế bóc tách: Nhóm văn bản đầu vào thành các "Cụm Dữ Liệu" (Data Clusters). Ứng với mỗi cụm, tạo 3-5 câu hỏi liên hoàn đòi hỏi suy luận, tính toán xác suất hoặc phân tích nguyên nhân - kết quả.
- Lệnh đặc biệt cho Khoa học/Logic: Khi gặp dữ liệu định lượng, hãy tạo câu hỏi vận dụng thực tế. Ví dụ, thiết lập bài toán tính xác suất điểm số với barem thực tế: đúng 1 câu được 0.1 điểm, 2 câu được 0.25 điểm, 3 câu được 0.5 điểm, và đúng cả 4 câu được 1 điểm.
- Cấu trúc JSON Bắt Buộc (Nested Array):

[
  {
    "clusterId": 1,
    "contextData": "Đoạn văn bản/Dữ liệu/Quy luật gốc dùng làm căn cứ suy luận. Giữ nguyên các số liệu quan trọng.",
    "questions": [
      {
        "id": 101,
        "question": "Nội dung câu hỏi logic/suy luận dựa chặt chẽ vào contextData.",
        "options": {
          "A": "Lựa chọn 1",
          "B": "Lựa chọn 2",
          "C": "Lựa chọn 3",
          "D": "Lựa chọn 4"
        },
        "correctAnswer": "A",
        "logicalSteps": "Trình bày chi tiết TỪNG BƯỚC suy luận logic, công thức tính toán hoặc lập luận loại trừ để ra được đáp án."
      }
    ]
  }
]

[QUY TẮC ĐỒNG BỘ GAME & GIAO DIỆN HỌC]:
- [Exam Mode]: Thiết lập giao diện chia đôi màn hình (Split-screen). Nửa trái ghim cố định 'contextData', nửa phải cuộn các 'questions' thuộc cluster đó để người dùng rèn kỹ năng dò tìm và đối chiếu dữ liệu nhanh.
- [Hệ thống Feedback]: Khi người dùng trả lời sai, không chỉ hiện đáp án mà phải bung mở trường 'logicalSteps' để hướng dẫn luồng tư duy.`;
      case 'giaotiep':
        return `[ĐẶC TẢ SƯ PHẠM: THUYẾT TRÌNH & VẬN DỤNG THỰC TẾ]
- Mục tiêu kiến thức: Sử dụng thuật ngữ chuẩn xác, giải thích ngắn gọn dễ hiểu cho người nghe trong đời sống.
- Giao tiếp & Phản xạ: Rèn luyện tốc độ phản xạ với game Đúng/Sai và Ghép nối.`;
    }
  }

  switch (target) {
    case 'thptqg':
      return `[ĐẶC TẢ SƯ PHẠM: KỲ THI TỐT NGHIỆP THPT QUỐC GIA]
- Định dạng trọng tâm: 100% trắc nghiệm khách quan chuẩn cấu trúc Bộ GD&ĐT.
- Cơ chế giải thích: Mỗi câu hỏi trắc nghiệm BẮT BUỘC phải có mục "Phân tích bẫy sai kinh điển" (chỉ rõ vì sao phương án nhiễu lại dễ gây nhầm lẫn về thì, giới từ hoặc ngữ âm).
- Dạng bài bắt buộc: Kiểm tra cặp từ đồng nghĩa/trái nghĩa, câu hỏi giao tiếp tình huống, tìm lỗi sai ngữ pháp và nhận diện quy tắc trọng âm/phát âm đuôi -s/ed.`;
    case 'ielts':
      return `[ĐẶC TẢ SƯ PHẠM: MỤC TIÊU IELTS ACADEMIC / SAT (BAND 7.0+ / 1400+)]
- Định vị mục tiêu: Xây dựng kho từ vựng học thuật (Lexical Resource) và rèn luyện kỹ năng Paraphrase. 
- Cơ chế bóc tách: TUYỆT ĐỐI KHÔNG trích xuất từ vựng đơn lẻ (word-by-word). Phải ưu tiên bóc tách các từ vựng band 7.0+, các cụm Collocations, và cấu trúc câu phức. Đặc biệt chú ý trích xuất các luận điểm có thể ứng dụng cho dạng bài Causes and Solutions trong Writing Task 2.
- Cấu trúc JSON Bắt Buộc: Chuyển đổi văn bản tiếng Anh đầu vào thành mảng JSON chuẩn ngôn ngữ học:

[
  {
    "id": 1,
    "word": "Cụm từ / Từ vựng học thuật (Ví dụ: mitigate environmental degradation)",
    "ipa": "/Phiên âm chuẩn Quốc tế IPA/",
    "type": "Từ loại (n, v, adj, adv)",
    "definition_en": "Giải nghĩa bằng tiếng Anh (ngắn gọn, dùng từ đồng nghĩa dễ hiểu)",
    "definition_vi": "Nghĩa tiếng Việt theo đúng ngữ cảnh bài đọc",
    "synonyms": "Liệt kê 2-3 từ đồng nghĩa cao cấp để rèn Paraphrase",
    "collocations": "1-2 cách kết hợp từ thông dụng (Ví dụ: severely mitigate)",
    "example": "Câu ví dụ thực tế trích từ văn bản gốc, thể hiện rõ nguyên nhân - kết quả."
  }
]

[QUY TẮC ĐỒNG BỘ GAME & CHẾ ĐỘ HỌC]:
- [Flashcard 3D]: Bắt buộc kích hoạt Web Speech API (giọng en-US) để đọc trường 'word' và 'example'. Mặt trước hiện từ vựng + IPA, mặt sau hiện nghĩa, Synonyms và Collocations.
- [Word Match & Cloze]: Tạo các câu hỏi điền khuyết bám sát vào trường 'synonyms' để luyện kỹ năng quét keywords, giúp người học tối ưu tốc độ chốt ít nhất 9 câu đúng trong Passage 1 Reading.
- [Sentence Builder]: Sử dụng trường 'example' để tạo game sắp xếp câu, ép người học nhớ vị trí của mạo từ, giới từ và từ nối cấu trúc phức.`;
    case 'vact':
      return `[ĐẶC TẢ SƯ PHẠM: MỤC TIÊU ĐÁNH GIÁ NĂNG LỰC (ĐGNL)]
- Định vị mục tiêu: Rèn luyện tư duy logic, đọc hiểu văn bản phức tạp, phân tích biểu đồ và xử lý số liệu (không kiểm tra học vẹt).
- Cơ chế bóc tách: Nhóm văn bản đầu vào thành các "Cụm Dữ Liệu" (Data Clusters). Ứng với mỗi cụm, tạo 3-5 câu hỏi liên hoàn đòi hỏi suy luận, tính toán xác suất hoặc phân tích nguyên nhân - kết quả.
- Lệnh đặc biệt cho Khoa học/Logic: Khi gặp dữ liệu định lượng, hãy tạo câu hỏi vận dụng thực tế. Ví dụ, thiết lập bài toán tính xác suất điểm số với barem thực tế: đúng 1 câu được 0.1 điểm, 2 câu được 0.25 điểm, 3 câu được 0.5 điểm, và đúng cả 4 câu được 1 điểm.
- Cấu trúc JSON Bắt Buộc (Nested Array):

[
  {
    "clusterId": 1,
    "contextData": "Đoạn văn bản/Dữ liệu/Quy luật gốc dùng làm căn cứ suy luận. Giữ nguyên các số liệu quan trọng.",
    "questions": [
      {
        "id": 101,
        "question": "Nội dung câu hỏi logic/suy luận dựa chặt chẽ vào contextData.",
        "options": {
          "A": "Lựa chọn 1",
          "B": "Lựa chọn 2",
          "C": "Lựa chọn 3",
          "D": "Lựa chọn 4"
        },
        "correctAnswer": "A",
        "logicalSteps": "Trình bày chi tiết TỪNG BƯỚC suy luận logic, công thức tính toán hoặc lập luận loại trừ để ra được đáp án."
      }
    ]
  }
]

[QUY TẮC ĐỒNG BỘ GAME & GIAO DIỆN HỌC]:
- [Exam Mode]: Thiết lập giao diện chia đôi màn hình (Split-screen). Nửa trái ghim cố định 'contextData', nửa phải cuộn các 'questions' thuộc cluster đó để người dùng rèn kỹ năng dò tìm và đối chiếu dữ liệu nhanh.
- [Hệ thống Feedback]: Khi người dùng trả lời sai, không chỉ hiện đáp án mà phải bung mở trường 'logicalSteps' để hướng dẫn luồng tư duy.`;
    case 'giaotiep':
      return `[ĐẶC TẢ SƯ PHẠM: GIAO TIẾP & PHẢN XẠ THỰC TẾ]
- Mục tiêu kiến thức: Chú trọng các thành ngữ (Idioms), cụm động từ (Phrasal Verbs) và mẫu câu giao tiếp tự nhiên của người bản xứ.
- Ngữ cảnh & Ứng dụng: Chú trọng ngữ cảnh sử dụng tự nhiên, hướng dẫn các cụm diễn đạt thực tế trong đời sống.
- Mini-game phản xạ: Bắt buộc kích hoạt game Đúng/Sai 3 giây và Kéo thả nối câu để rèn luyện tốc độ xử lý thông tin.`;
  }
}

function getStudyModePrompt(mode: StudyMode, isEnglish = true): string {
  switch (mode) {
    case 'flashcard3d':
      return isEnglish
        ? `4.1. Thẻ ghi nhớ 3D (3D Flashcard):
- Hiệu ứng lật thẻ 3D hai mặt (perspective: 1000px, transform-style: preserve-3d, backface-visibility: hidden). Click hoặc bấm phím Space để lật.
- Mặt trước: Từ vựng to đậm, Loại từ (badge), Phiên âm IPA.
- Mặt sau: Định nghĩa tiếng Anh, Bản dịch tiếng Việt, Cụm Collocations in đậm và Câu ví dụ thực tế có bôi đậm từ khóa.
- Thanh công cụ thẻ: Nút Xáo thẻ (Shuffle), thanh tiến trình (Thẻ X/Y), nút đánh dấu "Đã thuộc (Mastered) / Cần ôn lại (Review)".`
        : `4.1. Thẻ ghi nhớ 3D (3D Flashcard - Thuần Tiếng Việt):
- Hiệu ứng lật thẻ 3D hai mặt (perspective: 1000px, transform-style: preserve-3d, backface-visibility: hidden). Click hoặc bấm phím Space để lật.
- Mặt trước: Thuật ngữ / Sự kiện / Tên nhân vật / Khái niệm (term) to đậm rõ ràng, dễ nhìn.
- Mặt sau: Định nghĩa / Ý nghĩa lịch sử (definition), Bối cảnh / Mốc thời gian / Chi tiết thực tế (context) có bôi đậm từ khóa.
- Thanh công cụ thẻ: Nút Xáo thẻ (Shuffle), thanh tiến trình (Thẻ X/Y), nút đánh dấu "Đã thuộc / Cần ôn lại".`;

    case 'active_recall':
      return isEnglish
        ? `4.2. Học & Nhớ (Active Recall Quiz):
- Cơ chế kiểm tra phản xạ: Hiển thị từ vựng/định nghĩa cùng 4 phương án lựa chọn.
- Phản hồi tức thì (Instant Feedback): Click chọn phương án lập tức đổi màu Xanh lá (Đúng) hoặc Đỏ (Sai), đồng thời làm nổi bật đáp án chính xác.
- Hộp phân tích chuyên sâu: Tự động hiển thị giải thích chi tiết lý do, phân tích bẫy sai ngữ nghĩa, cách dùng đúng ngữ cảnh.`
        : `4.2. Học & Nhớ (Active Recall Quiz - Thuần Tiếng Việt):
- Cơ chế kiểm tra phản xạ: Hiển thị Thuật ngữ/Định nghĩa/Sự kiện cùng 4 phương án lựa chọn bằng Tiếng Việt.
- Phản hồi tức thì (Instant Feedback): Click chọn phương án lập tức đổi màu Xanh lá (Đúng) hoặc Đỏ (Sai), đồng thời làm nổi bật đáp án chính xác.
- Hộp phân tích chuyên sâu: Tự động hiển thị giải thích chi tiết lý do, phân tích bản chất kiến thức và bẫy sai kinh điển.`;

    case 'exam_mode':
      return isEnglish
        ? `4.3. Bài kiểm tra tổng hợp (Comprehensive Exam):
- Kết hợp đa dạng câu hỏi: Trắc nghiệm 4 lựa chọn, câu hỏi giao tiếp tình huống và câu hỏi gõ từ điền khuyết.
- Bộ đếm thời gian (Countdown Timer): Hiển thị đồng hồ đếm ngược (ví dụ 10-15 phút) có cảnh báo khi còn dưới 1 phút.
- Nộp bài & Báo cáo: Nút nộp bài xuất ra Modal bảng điểm chi tiết, tỷ lệ % chính xác, thời gian hoàn thành và danh sách các câu làm sai kèm lời giải.`
        : `4.3. Bài kiểm tra tổng hợp (Comprehensive Exam - Thuần Tiếng Việt):
- Kết hợp đa dạng câu hỏi: Trắc nghiệm 4 lựa chọn kiến thức, câu hỏi điền thuật ngữ/mốc thời gian và nhận định Đúng/Sai.
- Bộ đếm thời gian (Countdown Timer): Hiển thị đồng hồ đếm ngược (ví dụ 10-15 phút) có cảnh báo khi còn dưới 1 phút.
- Nộp bài & Báo cáo: Nút nộp bài xuất ra Modal bảng điểm chi tiết, tỷ lệ % chính xác, thời gian hoàn thành và danh sách các câu làm sai kèm lời giải chi tiết bằng Tiếng Việt.`;

    case 'doc_extractor':
      return isEnglish
        ? `4.0. [BẮT BUỘC MỨC ĐỘ CAO NHẤT]: FORM NẠP DỮ LIỆU TỰ CO GIÃN ĐỘ CAO (AUTO-EXPANDING) & THUẬT TOÁN BÓC TÁCH BẰNG DẤU HAI CHẤM ":" VÀ DẤU GẠCH NGANG "-":
- BỐ TRÍ NGAY TRÊN GIAO DIỆN CHÍNH: Cung cấp một Tab/Khung "📥 Nạp Bài Học Mới" nổi bật, cho phép người dùng (giáo viên/học sinh) copy & dán trực tiếp bất kỳ danh sách từ vựng hoặc đoạn văn bản tiếng Anh nào.
- KHUNG NHẬP LIỆU TỰ ĐỘNG CO GIÃN ĐỘ CAO THEO KHỐI LƯỢNG INPUT (Dynamic Auto-Resize Textarea):
  + Chiều cao tối thiểu (min-height: 140px / ~5-6 dòng) khi chưa có chữ hoặc nội dung ngắn, giữ giao diện cân đối, thanh lịch.
  + Khi người dùng gõ nhiều dòng hoặc dán một danh sách bài học dài, ô textarea PHẢI tự động mở rộng chiều cao mượt mà theo đúng khối lượng nội dung (sử dụng sự kiện input: \`this.style.height = 'auto'; this.style.height = Math.max(140, this.scrollHeight) + 'px';\` cùng \`overflow-hidden\`), hiển thị toàn bộ nội dung mà không bị che khuất chữ hay gò bó trong thanh cuộn nhỏ.
  + Khi xóa bớt nội dung, khung tự động thu nhỏ lại về mức tối thiểu ban đầu một cách mượt mà.
- QUY TẮC BÓC TÁCH & NGẮT KÝ TỰ BẰNG JAVASCRIPT (Delimited Parser by ":" and "-"):
  + Ứng dụng PHẢI có thuật toán JavaScript duyệt từng dòng (line by line) và tự động nhận diện ngắt chuỗi bằng dấu hai chấm (:) và dấu gạch ngang (- hoặc –):
    • Cú pháp 1 (Dấu hai chấm): "Từ vựng : Nghĩa tiếng Việt" (VD: "sustainable : bền vững, thân thiện với môi trường")
    • Cú pháp 2 (Dấu gạch ngang): "Từ vựng - Nghĩa tiếng Việt" (VD: "biodiversity - sự đa dạng sinh học")
    • Cú pháp 3 (Kết hợp cả hai): "Từ vựng : Nghĩa tiếng Việt - Câu ví dụ" (VD: "renewable : có thể tái tạo - Wind energy is renewable")
    • Cú pháp 4 (Kết hợp đảo): "Từ vựng - Nghĩa tiếng Việt : Câu ví dụ" (VD: "artificial intelligence - trí tuệ nhân tạo : AI helps automate tasks")
    • Cú pháp 5 (Đầy đủ học thuật có số thứ tự, từ loại, phiên âm): "1. word (pos) /ipa/: nghĩa - ví dụ"
  + Logic bóc tách JavaScript mẫu bắt buộc tích hợp:
    const lines = text.split('\\n').map(l => l.trim()).filter(Boolean);
    lines.forEach(line => {
      // Tách chuỗi theo dấu hai chấm (:) hoặc dấu gạch ngang (- hoặc –)
      const parts = line.replace(/^\\d+[.\\s]+/, '').split(/[:\\-–]/).map(s => s.trim()).filter(Boolean);
      if (parts.length >= 2) {
        const rawWord = parts[0];
        const posMatch = rawWord.match(/\\(([^)]+)\\)/);
        const ipaMatch = rawWord.match(/\\/([^/]+)\\//);
        const word = rawWord.replace(/\\([^)]+\\)/g, '').replace(/\\/[^/]+\\//g, '').trim();
        const defVi = parts[1];
        const example = parts[2] || ('Example context for ' + word);
        const pos = posMatch ? posMatch[1].trim() : 'noun';
        const ipa = ipaMatch ? '/' + ipaMatch[1].trim() + '/' : '/.../';
        // Đẩy vào mảng state từ vựng dùng chung toàn app
        extractedWords.push({ word, pos, ipa, defVi, defEn: defVi, example });
      }
    });
- ĐỒNG BỘ DỮ LIỆU ĐỘNG TỨC THÌ (REAL-TIME REACTIVE PROPAGATION):
  + Khi người dùng bấm nút "⚡ Bóc tách & Cập nhật bài học" (hoặc dán text vào textarea):
    (1) Dữ liệu Flashcard 3D lập tức nạp danh sách từ mới (từ tiếng Anh ở mặt trước, nghĩa tiếng Việt và ví dụ ở mặt sau).
    (2) Toàn bộ câu hỏi trắc nghiệm Active Recall và Exam Mode tự động tạo ngân hàng câu hỏi mới theo các từ vừa nạp.
    (3) Toàn bộ Mini-games (Xếp gạch 5x5, Khủng long Dino, Sút Penalty, Kéo thả nối từ 5x5, Đúng/Sai chớp nhoáng, Sắp xếp câu, Hangman) lập tức cập nhật nội dung, mục tiêu câu hỏi và chướng ngại vật theo đúng tập từ vựng mới bóc tách được!`
        : `4.0. [BẮT BUỘC MỨC ĐỘ CAO NHẤT]: FORM NẠP DỮ LIỆU TỰ CO GIÃN ĐỘ CAO (AUTO-EXPANDING) & THUẬT TOÁN BÓC TÁCH KIẾN THỨC TIẾNG VIỆT BẰNG DẤU HAI CHẤM ":" VÀ DẤU GẠCH NGANG "-":
- BỐ TRÍ NGAY TRÊN GIAO DIỆN CHÍNH: Cung cấp một Tab/Khung "📥 Nạp Bài Học Mới" nổi bật, cho phép người dùng (giáo viên/học sinh) copy & dán trực tiếp bất kỳ danh sách thuật ngữ hoặc bài học Tiếng Việt nào.
- KHUNG NHẬP LIỆU TỰ ĐỘNG CO GIÃN ĐỘ CAO THEO KHỐI LƯỢNG INPUT (Dynamic Auto-Resize Textarea):
  + Chiều cao tối thiểu (min-height: 140px / ~5-6 dòng), tự động mở rộng khi nội dung dài (\`this.style.height = Math.max(140, this.scrollHeight) + 'px'\`).
- QUY TẮC BÓC TÁCH & NGẮT KÝ TỰ BẰNG JAVASCRIPT (Delimited Parser by ":" and "-"):
  + Thuật toán JavaScript bóc tách kiến thức Tiếng Việt theo từng dòng:
    • Cú pháp 1: "Thuật ngữ / Khái niệm : Định nghĩa / Ý nghĩa" (VD: "Chiến dịch Điện Biên Phủ : 1954 - Thắng lợi lừng lẫy năm châu chấn động địa cầu")
    • Cú pháp 2: "Thuật ngữ / Khái niệm - Định nghĩa / Ý nghĩa" (VD: "Quang hợp - Quá trình thực vật tổng hợp chất hữu cơ từ CO2 và nước nhờ ánh sáng")
    • Cú pháp 3: "Thuật ngữ : Định nghĩa - Bối cảnh / Chi tiết thực tế"
    • Cú pháp 4: "Thuật ngữ - Định nghĩa : Bối cảnh / Chi tiết thực tế"
  + Logic bóc tách JavaScript chuẩn hóa vào state mảng JSON Tiếng Việt:
    const lines = text.split('\\n').map(l => l.trim()).filter(Boolean);
    lines.forEach((line, idx) => {
      const parts = line.replace(/^\\d+[.\\s]+/, '').split(/[:\\-–]/).map(s => s.trim()).filter(Boolean);
      if (parts.length >= 2) {
        const term = parts[0];
        const definition = parts[1];
        const context = parts[2] || ('Bối cảnh & Ứng dụng thực tế của ' + term);
        extractedItems.push({ id: idx + 1, term, definition, context });
      }
    });
- ĐỒNG BỘ DỮ LIỆU ĐỘNG TỨC THÌ: Tự động cập nhật vào toàn bộ Flashcard 3D, Active Recall Quiz, Exam Mode và tất cả Mini-Games bằng Tiếng Việt 100%.`;

    case 'export_pdf':
      return `4.5. Xuất PDF / Bản in Flashcard A4:
- Tích hợp nút Xuất PDF / In ấn chuẩn CSS @media print.
- Tối ưu bố cục in: Tự động dàn trang dạng lưới 2x4 hoặc 3x3 trên khổ giấy A4, có đường nét đứt viền ngoài để người học in ra cắt làm thẻ giấy học ngoại tuyến hoặc lưu hồ sơ học tập.`;
  }
}

function getMiniGamePrompt(gameId: MiniGameId, isEnglish = true): string {
  switch (gameId) {
    case 'tetris':
      return `[GAME 1: 🧱 XẾP GẠCH TRÍ TUỆ V2 (Block Puzzle 5x5 - Chuẩn Mã Nguồn BlockGame.tsx)]
- Giao diện & Bảng lưới: Lưới Grid 5x5. Phía dưới hiển thị 3 khối gạch gợi ý (thuộc 9 mẫu: Đơn, Dòng Đôi H/V, Dòng Ba H/V, Khối Vuông, Khối L, Khối L Ngược, Góc).
${isEnglish ? `- Phân loại màu theo Từ loại (Part of Speech):
  + Danh từ (Noun - đuôi tion, ness, ment, ity, er, or...): Xanh dương (#3b82f6)
  + Động từ (Verb - hash chẵn): Đỏ (#ef4444)
  + Tính từ (Adj - đuôi ive, ful, ous, al, able, ent...): Vàng (#eab308)
  + Trạng từ (Adverb - đuôi ly): Xanh lá (#22c55e)` : `- Phân loại màu sắc khối gạch: Xanh dương (#3b82f6), Đỏ (#ef4444), Vàng (#eab308), Xanh lá (#22c55e) phân định theo độ khó hoặc nhóm kiến thức.`}
- Tính năng Chiến thuật:
  + Nút Xoay Khối: Xoay khối 90 độ theo chiều kim đồng hồ trước khi đặt.
  + Hộp Lưu Trữ (HOLD): Cất 1 khối khó vào hộp dự trữ hoặc đổi lấy khối đang giữ.
  + Thử Thách Thời Gian (Blitz Mode 12s): Đếm ngược 12 giây mỗi lượt. Hết giờ gạch tự động dâng lên 1 hàng từ dưới đáy!
  + Tích Lũy Kiến Thức: Xóa hàng/cột sẽ thu thập kiến thức và hiện banner '⚡ ĐÃ GIẢI PHÓNG HÀNG & THU THẬP BÀI HỌC'.
  + Shop Trợ Giúp: Búa Hủy Diệt (150 điểm - đập vỡ 1 ô gạch bất kỳ trên lưới); Đổi Khối (80 điểm - đổi 3 khối mới).
- 2 Tầng AI Quiz Sư Phạm:
  + Tầng 1 (AI Quiz mỗi 4 khối): Đặt đủ 4 khối gạch -> Hiện popup hỏi nghĩa/định nghĩa bài học (+200 điểm thưởng).
  + Tầng 2 (Gemini AI Cứu Mạng khi hết nước đi): Khi bảng đầy -> Kích hoạt câu hỏi cứu mạng học thuật siêu khó (có nút 'Gợi ý từ Gemini'). Trả lời ĐÚNG -> Dọn sạch vùng 3x3 trung tâm bảng (từ [1,1] đến [3,3]) và cộng +300 điểm chơi tiếp!`;

    case 'dino':
      return `[GAME 2: 🦖 KHỦNG LONG VƯỢT ẢI (Dino Runner - Chuẩn Mã Nguồn DinoGame.tsx)]
- Đồ họa Canvas 2D (800x250px): Chú khủng long xanh (#22c55e) nhảy né chướng ngại vật (Xương rồng đơn vàng #eab308, Xương rồng đôi #ca8a04, Chim bay cam #f97316) bằng phím Space/Mũi tên Lên/Touch.
- Thanh tiến trình: Hiển thị số chướng ngại vật tương ứng với tổng số kiến thức bài học (VD: 0 / 44 chướng ngại vật).
- Luồng chơi: Khủng long chạy và nhảy tự do như game Dino trên Chrome.
- Cơ chế Va Chạm & Cứu Nạn (CHỈ HIỆN CÂU HỎI KHI ĐỤNG VẬT CẢN):
  + Khi đâm phải chướng ngại vật: Game tạm dừng ngay và mở Modal Cứu nạn 2 Bước (Bước 1: Choice 'Quay lại' hoặc 'Tiếp tục chạy 🔥' -> Bước 2: Quiz hiển thị ${isEnglish ? 'Định nghĩa & Câu ví dụ của từ vựng' : 'Định nghĩa & Bối cảnh của thuật ngữ'}, chọn 1 trong 3 đáp án).
  + Trả lời ĐÚNG -> Hồi sinh khủng long (+2.000 điểm) và tiếp tục chạy bình thường.
  + Trả lời SAI -> Game Over ngay lập tức.
- Phân cảnh Happy Ending (Phá đảo & Hun Khủng Long Hồng):
  + Khi người chơi trả lời đúng 100% số nội dung trong bài học -> Khủng long xanh tự chạy về đích không còn chướng ngại vật.
  + Phía trước xuất hiện chú Khủng Long Hồng (#ec4899) có thắt Nơ Đỏ (#dc2626) trên đầu đứng đợi.
  + Khủng long xanh chạy đến đứng sát cạnh Khủng long hồng -> Kích hoạt màn kết 'Happy Ending: Ghép Đôi Thành Công! (+1000 Pts)' với hiệu ứng mưa trái tim vector màu hồng (#f43f5e) bay lãng mạn lên cao!`;

    case 'penalty':
      return `[GAME 3: ⚽ SÚT PENALTY TRÍ TUỆ (Soccer Shootout - Chuẩn Mã Nguồn SoccerPenalty.tsx)]
- Giao diện: Cho phép chọn 1 trong 19 CLB Premier League (Man City, Arsenal, Liverpool, Man United, Chelsea...) hoặc CLB Champions League (Real Madrid, Barca, Bayern...).
- Cơ chế: Loạt 5 quả sút luân lưu. Câu hỏi trắc nghiệm kiến thức xuất hiện trước mỗi lượt sút/bắt bóng.
- Xử lý sút & bắt:
  + Trả lời ĐÚNG -> Cầu thủ sút bóng hiểm hóc găm thẳng vào góc lưới (GOAL! + tiếng còi và khán giả reo hò) hoặc thủ môn bay người bắt gọn bóng.
  + Trả lời SAI -> Bóng sút vọt xà, ra ngoài hoặc đập cột dọc bật ra.
- Hiệu ứng Chuỗi Streak Fireball (Streak >= 3): Quả bóng bốc lửa màu cam-đỏ và bảng thống kê sơ đồ chiến thuật Goal Chart hiển thị các góc sút.`;

    case 'dragdrop':
      return `[GAME 4: 🎯 KÉO THẢ TRÍ TUỆ (Drag & Drop Master - Chuẩn Mã Nguồn InteractiveGameSuite.tsx)]
- Chế độ 1 (Nối 2 cột 5x5): Nối 5 ${isEnglish ? 'từ tiếng Anh ở cột trái với 5 định nghĩa tiếng Việt' : 'thuật ngữ/sự kiện ở cột trái với 5 định nghĩa/ý nghĩa'} ở cột phải. Hỗ trợ kéo thả HTML5 trên PC và Touch Tap-to-select trên điện thoại. Nối đúng đổi màu xanh lá và biến mất (+10 điểm); nối sai rung lắc đỏ.
- Chế độ 2 (Điền từ đoạn văn đục lỗ - Cloze Test): Đoạn văn ngữ cảnh có các ô trống [___]. Kéo thả từ/thuật ngữ từ Ngân hàng từ điền vào ô trống. Bấm 'Kiểm tra đáp án' để chấm điểm.`;

    case 'truefalse':
      return `[GAME 5: ⚡ ĐÚNG HAY SAI CHỚP NHOÁNG (Speed True/False - Chuẩn Mã Nguồn QuickBrainGamesModal.tsx)]
- Thẻ trung tâm hiện 1 cặp '${isEnglish ? 'Từ vựng = Định nghĩa' : 'Thuật ngữ = Định nghĩa / Sự kiện'}' với thanh thời gian Progress Bar đếm ngược 4 giây giảm dần liên tục.
- 2 nút bấm lớn [✓ ĐÚNG] và [✗ SAI].
- Trả lời đúng trong 4 giây -> Cộng điểm và tích lũy chuỗi Combo Multiplier (x2 XP khi đạt Combo >= 5). Trả lời sai/hết giờ -> Trừ 1 trong 3 trái tim mạng sống và reset combo.`;

    case 'scramble':
      return `[GAME 6: 🧩 SẮP XẾP CẤU TRÚC CÂU (Sentence Builder - Chuẩn Mã Nguồn SentenceUnscrambleGame.tsx)]
- Giao diện: Phía trên là ${isEnglish ? 'câu dịch tiếng Việt gợi ý và từ vựng mục tiêu' : 'gợi ý ngữ cảnh / nhận định bài học'}; Phía dưới là các mảnh từ (Word Chips) bị xáo trộn vị trí.
- Cơ chế: Click hoặc kéo thả mảnh từ vào Khay câu hoàn chỉnh. Có nút 'Gợi ý AI' hiển thị cấu trúc và từ đầu tiên.
- Khi xếp đúng 100% cú pháp -> Khay câu đổi màu xanh lá, hiển thị thông báo chúc mừng và cộng +15 XP.`;

    case 'hangman':
      return `[GAME 7: 🪢 ĐOÁN CHỮ CỨU MẠNG (Hangman Survival - Chuẩn Mã Nguồn QuickBrainGamesModal.tsx)]
- Giao diện: Hàng ô gạch dưới đại diện cho các chữ cái, bảng chữ cái A-Z, gợi ý định nghĩa và 6 mạng sống hình trái tim.
- Xử lý cụm từ: Thuật toán tự động mở sẵn các ký tự khoảng trắng (dấu cách) cho các cụm từ dài (như '${isEnglish ? 'carbon footprint' : 'dien bien phu'}').
- Đoán đúng chữ cái -> Điền vào ô tương ứng; Đoán sai -> Trừ 1 tim. Có nút 'Cứu trợ AI' tự động mở khóa 1 chữ cái khi còn dưới 3 tim.`;
  }
}

function getDesignSystemPrompt(config: PromptConfig): string {
  const theme = COLOR_THEME_OPTIONS.find(t => t.id === config.colorTheme);
  const themeName = theme ? theme.name : 'Tùy chỉnh (Custom Theme)';
  const themeDesc = theme ? theme.desc : 'Phối màu cá nhân hóa người dùng';
  const primaryColor = config.primaryColor || (theme ? theme.primary : '#18181b');
  const accentColor = config.accentColor || (theme ? theme.secondary : '#27272a');

  const style = UI_STYLE_OPTIONS.find(s => s.id === config.uiStyle) || UI_STYLE_OPTIONS[0];
  const font = FONT_OPTIONS.find(f => f.id === config.fontChoice) || FONT_OPTIONS[0];

  const activeUtilities = config.systemUtilities
    .filter(u => u !== 'web_speech')
    .map(u => {
      const opt = SYSTEM_UTILITY_OPTIONS.find(o => o.id === u);
      return opt ? `  + ${opt.label}: ${opt.desc}` : '';
    })
    .filter(Boolean);

  return `- Bảng màu giao diện (Color Palette & Custom HEX):
  + Chủ đề màu: ${themeName} (${themeDesc})
  + Màu chính (Primary Color): ${primaryColor} (Sử dụng cho Header, Nút hành động chính CTA, Viền nổi bật, Điểm số, Thanh tiến trình)
  + Màu điểm nhấn (Accent Color): ${accentColor} (Sử dụng cho Badge thưởng, Hiệu ứng tương tác, Trạng thái thành công, Thẻ bài nổi bật)
  + Yêu cầu thiết lập CSS/Tailwind: Cấu hình bảng màu trên vào tailwind.config hoặc biến CSS (:root { --primary: ${primaryColor}; --accent: ${accentColor}; }) để toàn bộ giao diện, hiệu ứng nút bấm và các Canvas game đồng bộ hài hòa.
- Phong cách giao diện: ${style.name} (${style.desc}).
- Font chữ: ${font.name} ('${font.id === 'vietnam' ? 'Be Vietnam Pro' : font.id === 'jetbrains' ? 'JetBrains Mono' : font.id === 'montserrat' ? 'Montserrat' : 'Inter'}', sans-serif/monospace).
- Tiện ích hệ thống tích hợp:
${activeUtilities.length > 0 ? activeUtilities.join('\n') : '  + Giao diện tinh gọn, phản hồi nhanh'}`;
}

function getTechnicalRulesPrompt(config: PromptConfig): string {
  if (config.outputFormat === 'single_file_html') {
    return `- Đóng gói toàn bộ trong DUY NHẤT 1 FILE HTML hoàn chỉnh (<!DOCTYPE html> ... </html>), nhúng Tailwind CSS CDN (<script src="https://cdn.tailwindcss.com"></script>), Lucide Icons CDN (<script src="https://unpkg.com/lucide@latest"></script>), Canvas Confetti CDN, PDF.js CDN (<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>) và Mammoth.js CDN (<script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>).
- BẢO VỆ & DỰ PHÒNG AN TOÀN (Fallback CDN & Icons): Trong trường hợp CDN Lucide Icons không tải được, mã nguồn PHẢI tự động hiển thị biểu tượng Unicode/Emoji (🔊, 🔄, ✔️, ❌, 🎮, 💡, ⏱️, 🏆, v.v.) để giao diện luôn hiển thị trọn vẹn, không bị lỗi nút trống.
- KHÔNG ĐƯỢC viết tắt, KHÔNG dùng placeholder (như // TODO, // tự viết tiếp). Toàn bộ 7 game và các chế độ học thuật phải được viết code JavaScript xử lý sự kiện thật 100%, chạy mượt mà ngay trên trình duyệt.
- Sử dụng Web Speech API (window.speechSynthesis với lang='vi-VN') phát âm tiếng Việt chuẩn và Web Audio API (AudioContext) để tạo hiệu ứng âm thanh tiếng bíp/ding/jump/goal khi chơi game.
- Giao diện đáp ứng 100% (Responsive) trên cả điện thoại và máy tính, hỗ trợ chế độ Sáng / Tối (Light & Dark Mode).`;
  } else if (config.outputFormat === 'react_applet') {
    return `- Cấu trúc React + TypeScript + Tailwind CSS + Lucide Icons.
- Tách biệt rõ ràng các component: Header, NavigationTabs, AcademicModes, GamificationArcade (với từng Canvas engine component riêng biệt), và ProgressDashboard.
- BẢO VỆ & DỰ PHÒNG AN TOÀN: Có fallback hiển thị khi tải font/icon hoặc tài nguyên media.
- Sử dụng React hooks (useState, useEffect, useRef, useCallback) xử lý trạng thái mượt mà, lưu trữ LocalStorage và Web Audio API tổng hợp âm thanh hiệu ứng game.`;
  } else {
    return `- Kiến trúc Module ES6 chuẩn hóa, tách riêng tầng Data Model, Controller xử lý Game Engine, và View Renderer.
- Viết mã nguồn hoàn chỉnh 100% không rút gọn bất kỳ hàm nào.`;
  }
}
