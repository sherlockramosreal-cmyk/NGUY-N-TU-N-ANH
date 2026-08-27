import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Volume2,
  RotateCw,
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
  Trophy,
  Zap,
  Code2,
  Layout,
  RefreshCw,
  FileCode,
  Check,
  Maximize2
} from 'lucide-react';
import { PromptConfig } from '../types';

interface LiveSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PromptConfig;
}

const SAMPLE_WORDS = [
  {
    word: 'sustainable',
    type: 'adj',
    ipa: '/səˈsteɪ.nə.bəl/',
    def_en: 'able to continue over a period of time without causing damage to the environment',
    def_vi: 'bền vững, thân thiện với môi trường',
    collocations: ['sustainable development', 'sustainable energy', 'sustainable practices'],
    example_en: 'We need to find more sustainable ways of producing energy.',
    example_vi: 'Chúng ta cần tìm ra những phương thức sản xuất năng lượng bền vững hơn.'
  },
  {
    word: 'biodiversity',
    type: 'noun',
    ipa: '/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/',
    def_en: 'the number and types of plants and animals that exist in a particular area',
    def_vi: 'đa dạng sinh học',
    collocations: ['preserve biodiversity', 'loss of biodiversity', 'marine biodiversity'],
    example_en: 'Deforestation is destroying the rich biodiversity of the Amazon basin.',
    example_vi: 'Phá rừng đang hủy hoại sự đa dạng sinh học phong phú của lưu vực sông Amazon.'
  },
  {
    word: 'carbon footprint',
    type: 'noun',
    ipa: '/ˈkɑːr.bən ˌfʊt.prɪnt/',
    def_en: 'a measure of the amount of carbon dioxide produced by a person or organization',
    def_vi: 'lượng khí thải carbon, dấu chân carbon',
    collocations: ['reduce carbon footprint', 'calculate carbon footprint'],
    example_en: 'Switching to solar power helps lower your household carbon footprint.',
    example_vi: 'Chuyển sang năng lượng mặt trời giúp giảm lượng khí thải carbon của hộ gia đình.'
  }
];

function generateDemoHtml(config: PromptConfig): string {
  const primary = config.primaryColor || '#18181b';
  const accent = config.accentColor || '#27272a';
  const topic = config.lessonTopic || 'English Learning & Gamification';
  const theory = config.theoryContent ? config.theoryContent.replace(/"/g, '&quot;').replace(/\n/g, '<br/>') : 'Chưa có lý thuyết đặc thù. Học sinh chủ động luyện tập các từ vựng và cấu trúc tương tác.';

  return `<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${topic} - EngiPrompt Generated Web App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brandPrimary: '${primary}',
            brandAccent: '${accent}'
          }
        }
      }
    };
  </script>
  <style>
    .card-flip { perspective: 1000px; }
    .card-inner { transition: transform 0.6s; transform-style: preserve-3d; }
    .flipped { transform: rotateY(180deg); }
    .card-front, .card-back { backface-visibility: hidden; }
    .card-back { transform: rotateY(180deg); }
  </style>
</head>
<body class="bg-white text-zinc-900 min-h-screen font-sans antialiased p-4 sm:p-6">
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <header class="p-5 rounded-2xl bg-white border border-zinc-200 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
            ${config.gradeLevel.toUpperCase()}
          </span>
          <span class="text-xs text-zinc-500">Sandbox Preview (Isolated IFrame)</span>
        </div>
        <h1 class="text-xl font-bold text-white mt-1">${topic}</h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-mono">
          🏆 <span id="scoreDisplay">100</span> Điểm
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <div class="flex flex-wrap gap-2 border-b border-zinc-200 pb-2">
      <button onclick="switchTab('import')" id="tabImportBtn" class="px-4 py-2 rounded-xl text-xs font-bold bg-black text-white flex items-center gap-1.5">
        📥 Form Nạp Bài Học Mới
      </button>
      <button onclick="switchTab('flashcard')" id="tabFlashcardBtn" class="px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-500 hover:text-white flex items-center gap-1.5">
        🎴 3D Flashcard (<span id="fcCountBadge">4</span>)
      </button>
      <button onclick="switchTab('quiz')" id="tabQuizBtn" class="px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-500 hover:text-white flex items-center gap-1.5">
        ⚡ Trắc nghiệm phản xạ
      </button>
      <button onclick="switchTab('theory')" id="tabTheoryBtn" class="px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-500 hover:text-white flex items-center gap-1.5">
        📖 Lý thuyết trọng tâm
      </button>
    </div>

    <!-- Section 0: Form Nạp Bài Học Mới & Bóc tách JavaScript -->
    <section id="sectionImport" class="p-6 rounded-2xl bg-white border border-zinc-200 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200">
        <div>
          <h2 class="text-sm font-bold text-zinc-500 flex items-center gap-2">
            <span>📥 Khu vực Nạp Bài Học Mới (Textarea Form)</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">BÓC TÁCH BẰNG DẤU ":" VÀ "-"</span>
          </h2>
          <p class="text-xs text-zinc-500 mt-0.5">Dán danh sách từ vựng theo dạng <code>từ : nghĩa</code> hoặc <code>từ - nghĩa</code>. Ứng dụng tự động bóc tách và nạp vào Flashcard & Quiz ngay!</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="loadColonSample()" class="px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium border border-zinc-200 transition">
            📋 Mẫu dấu ":"
          </button>
          <button onclick="loadDashSample()" class="px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium border border-zinc-200 transition">
            📋 Mẫu dấu "-"
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <textarea id="rawInputArea" oninput="autoResizeTextarea(this)" style="min-height: 140px; overflow: hidden; resize: none;" placeholder="Dán danh sách từ vựng tại đây, hỗ trợ ngắt bằng dấu ':' hoặc dấu '-':
Ví dụ dạng 1 (dấu ':'):
sustainable : bền vững, thân thiện với môi trường - We need sustainable energy
biodiversity : sự đa dạng sinh học

Ví dụ dạng 2 (dấu '-'):
deforestation - nạn phá rừng : Deforestation harms animals
renewable energy - năng lượng tái tạo" class="w-full p-4 rounded-xl bg-white border border-zinc-200 text-xs font-mono text-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed transition-all"></textarea>

        <div class="flex flex-wrap items-center justify-between gap-3">
          <button onclick="handleParseAndApply()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition">
            ⚡ Bóc tách & Cập nhật vào Flashcard / Quiz ngay
          </button>
          <div id="parseStatus" class="hidden text-xs px-3 py-1.5 rounded-lg"></div>
        </div>
      </div>
    </section>

    <!-- Section 1: Theory -->
    <section id="sectionTheory" class="hidden p-6 rounded-2xl bg-white border border-zinc-200 space-y-4">
      <h2 class="text-base font-bold text-zinc-500 flex items-center gap-2">
        <span>💡 Tóm tắt Lý thuyết & Quy tắc Ngữ pháp</span>
      </h2>
      <div class="p-4 rounded-xl bg-white/80 border border-zinc-200 text-xs leading-relaxed text-zinc-600">
        ${theory}
      </div>
    </section>

    <!-- Section 2: Flashcard -->
    <section id="sectionFlashcard" class="hidden p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col items-center space-y-5">
      <div class="flex items-center justify-between w-full max-w-md text-xs text-zinc-500">
        <span>Thẻ: <strong id="fcIdxDisplay" class="text-white">1</strong> / <span id="fcTotalDisplay">4</span></span>
        <button onclick="shuffleCards()" class="hover:text-zinc-500 transition font-medium">🔀 Xáo bài</button>
      </div>

      <div class="w-full max-w-md card-flip h-64 cursor-pointer" onclick="toggleCard()">
        <div id="flashcardInner" class="card-inner relative w-full h-full rounded-2xl bg-white border border-zinc-200 p-6 flex flex-col items-center justify-center text-center shadow-xl">
          <div class="card-front absolute inset-0 p-6 flex flex-col items-center justify-center">
            <span id="fcPos" class="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-950 text-zinc-500 mb-2 uppercase border border-indigo-800/60">ADJECTIVE</span>
            <h3 id="fcWord" class="text-2xl font-black text-white">sustainable</h3>
            <p id="fcIpa" class="text-xs text-zinc-500 font-mono mt-1">/səˈsteɪ.nə.bəl/</p>
            <p class="text-[11px] text-zinc-500 mt-4">👉 Click hoặc chạm để lật mặt sau</p>
          </div>
          <div class="card-back absolute inset-0 p-6 flex flex-col justify-between bg-white rounded-2xl border border-indigo-900/50">
            <div>
              <p id="fcDefVi" class="text-sm font-bold text-zinc-500">bền vững, thân thiện với môi trường</p>
              <p id="fcDefEn" class="text-xs text-zinc-600 italic mt-1">"able to continue without causing damage to the environment"</p>
            </div>
            <div id="fcExample" class="p-2.5 rounded-lg bg-white text-[11px] text-zinc-600 border border-zinc-200 text-left">
              Ví dụ: We need to find more sustainable ways of producing energy.
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="prevCard()" class="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition">
          ◀ Trước
        </button>
        <button onclick="speakCurrentWord()" class="px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold flex items-center gap-2 transition shadow-md shadow-indigo-600/20">
          🔊 Phát âm (US)
        </button>
        <button onclick="nextCard()" class="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition">
          Tiếp ▶
        </button>
      </div>
    </section>

    <!-- Section 3: Quiz -->
    <section id="sectionQuiz" class="hidden p-6 rounded-2xl bg-white border border-zinc-200 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-bold text-zinc-500">Câu hỏi ôn tập phản xạ:</h2>
        <button onclick="generateNextQuiz()" class="text-xs text-zinc-500 hover:text-white underline">Đổi câu hỏi khác</button>
      </div>
      <p id="quizQuestionPrompt" class="text-sm text-white font-medium">Từ nào sau đây mang ý nghĩa <span id="quizTargetDef" class="text-zinc-500 font-bold">"bền vững, thân thiện với môi trường"</span>?</p>
      <div id="quizOptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <!-- Dynamic options rendered here -->
      </div>
      <div id="quizFeedback" class="hidden p-3 rounded-xl text-xs"></div>
    </section>
  </div>

  <script>
    let words = [
      { word: 'sustainable', pos: 'adj', ipa: '/səˈsteɪ.nə.bəl/', defVi: 'bền vững, thân thiện với môi trường', defEn: 'able to continue without causing damage', example: 'We need to find more sustainable ways of producing energy.' },
      { word: 'biodiversity', pos: 'noun', ipa: '/ˌbaɪ.oʊ.daɪˈvɜːr.sə.ti/', defVi: 'sự đa dạng sinh học', defEn: 'the number and types of plants and animals', example: 'Pollution can have disastrous effects on the biodiversity.' },
      { word: 'deforestation', pos: 'noun', ipa: '/diːˌfɔːr.əˈsteɪ.ʃən/', defVi: 'nạn phá rừng', defEn: 'the cutting down of trees in a large area', example: 'Deforestation is destroying the rain forests.' },
      { word: 'renewable', pos: 'adj', ipa: '/rɪˈnuː.ə.bəl/', defVi: 'có thể tái tạo', defEn: 'energy that is produced using the sun, wind, etc.', example: 'Renewable energy sources such as wind and solar power are vital.' }
    ];

    let currentCardIdx = 0;
    let isFlipped = false;
    let score = 100;

    function switchTab(tab) {
      document.getElementById('sectionImport').classList.add('hidden');
      document.getElementById('sectionTheory').classList.add('hidden');
      document.getElementById('sectionFlashcard').classList.add('hidden');
      document.getElementById('sectionQuiz').classList.add('hidden');

      document.getElementById('tabImportBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-500 hover:text-white flex items-center gap-1.5';
      document.getElementById('tabTheoryBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-500 hover:text-white flex items-center gap-1.5';
      document.getElementById('tabFlashcardBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-500 hover:text-white flex items-center gap-1.5';
      document.getElementById('tabQuizBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-500 hover:text-white flex items-center gap-1.5';

      if (tab === 'import') {
        document.getElementById('sectionImport').classList.remove('hidden');
        document.getElementById('tabImportBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-black text-white flex items-center gap-1.5';
      } else if (tab === 'theory') {
        document.getElementById('sectionTheory').classList.remove('hidden');
        document.getElementById('tabTheoryBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-black text-white flex items-center gap-1.5';
      } else if (tab === 'flashcard') {
        document.getElementById('sectionFlashcard').classList.remove('hidden');
        document.getElementById('tabFlashcardBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-black text-white flex items-center gap-1.5';
        renderCurrentCard();
      } else if (tab === 'quiz') {
        document.getElementById('sectionQuiz').classList.remove('hidden');
        document.getElementById('tabQuizBtn').className = 'px-4 py-2 rounded-xl text-xs font-bold bg-black text-white flex items-center gap-1.5';
        generateNextQuiz();
      }
    }

    function parseTextIntoWords(raw) {
      if (!raw || !raw.trim()) return [];
      const lines = raw.split('\\n').map(l => l.trim()).filter(Boolean);
      const parsed = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('//') || line.startsWith('#')) continue;

        // Tách chuỗi theo dấu hai chấm (:) hoặc dấu gạch ngang (- hoặc –)
        const cleanLine = line.replace(/^\\d+[.\\s]+/, '');
        const parts = cleanLine.split(/[:\\-–]/).map(s => s.trim()).filter(Boolean);

        if (parts.length >= 2) {
          const rawWord = parts[0];
          const posMatch = rawWord.match(/\\(([^)]+)\\)/);
          const ipaMatch = rawWord.match(/\\/([^/]+)\\//);
          const word = rawWord.replace(/\\([^)]+\\)/g, '').replace(/\\/[^/]+\\//g, '').trim();
          const defVi = parts[1];
          const example = parts[2] || ('Example context for ' + word + '.');
          const pos = posMatch ? posMatch[1].trim() : 'noun';
          const ipa = ipaMatch ? '/' + ipaMatch[1].trim() + '/' : '/.../';

          if (word && word.length >= 1) {
            parsed.push({
              word,
              pos,
              ipa,
              defVi,
              defEn: 'Academic term: ' + word,
              example
            });
          }
        }
      }
      return parsed;
    }

    function handleParseAndApply() {
      const raw = document.getElementById('rawInputArea').value;
      const extracted = parseTextIntoWords(raw);
      const status = document.getElementById('parseStatus');
      status.classList.remove('hidden');

      if (extracted.length > 0) {
        words = extracted;
        currentCardIdx = 0;
        document.getElementById('fcCountBadge').innerText = words.length;
        document.getElementById('fcTotalDisplay').innerText = words.length;
        status.className = 'text-xs px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300';
        status.innerHTML = '🎉 <strong>Thành công!</strong> Đã bóc tách ' + words.length + ' từ vựng bằng dấu ":" và "-" & cập nhật ngay vào Flashcard và Quiz.';
        renderCurrentCard();
      } else {
        status.className = 'text-xs px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300';
        status.innerHTML = '⚠️ Chưa nhận diện được từ vựng. Hãy phân cách từ và nghĩa bằng dấu hai chấm (:) hoặc dấu gạch ngang (-).';
      }
    }

    function autoResizeTextarea(el) {
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = Math.max(140, el.scrollHeight) + 'px';
    }

    function loadColonSample() {
      const area = document.getElementById('rawInputArea');
      area.value = 
\`sustainable : bền vững, thân thiện với môi trường - We need sustainable energy solutions.
biodiversity : sự đa dạng sinh học - Rainforests boast immense biodiversity.
deforestation : nạn phá rừng - Deforestation destroys natural habitats.
renewable : có thể tái tạo - Solar is a renewable resource.
carbon footprint : lượng phát thải carbon - Walk to reduce your carbon footprint.\`;
      autoResizeTextarea(area);
      handleParseAndApply();
    }

    function loadDashSample() {
      const area = document.getElementById('rawInputArea');
      area.value = 
\`artificial intelligence - trí tuệ nhân tạo : AI helps optimize study workflows.
machine learning - học máy : Machine learning identifies speech patterns.
innovative - đổi mới sáng tạo : They adopted an innovative curriculum.
accelerate - gia tăng tốc độ : Spaced repetition accelerates recall.
collaboration - sự cộng tác : Group work fosters effective collaboration.\`;
      autoResizeTextarea(area);
      handleParseAndApply();
    }

    function loadSampleDataset() {
      loadColonSample();
    }

    function renderCurrentCard() {
      if (words.length === 0) return;
      const w = words[currentCardIdx % words.length];
      document.getElementById('fcIdxDisplay').innerText = (currentCardIdx + 1);
      document.getElementById('fcTotalDisplay').innerText = words.length;
      document.getElementById('fcPos').innerText = w.pos || 'VOCABULARY';
      document.getElementById('fcWord').innerText = w.word;
      document.getElementById('fcIpa').innerText = w.ipa || '/.../';
      document.getElementById('fcDefVi').innerText = w.defVi;
      document.getElementById('fcDefEn').innerText = '"' + w.defEn + '"';
      document.getElementById('fcExample').innerText = 'Ví dụ: ' + w.example;
      
      // Reset flip
      isFlipped = false;
      document.getElementById('flashcardInner').classList.remove('flipped');
    }

    function toggleCard() {
      isFlipped = !isFlipped;
      const el = document.getElementById('flashcardInner');
      if (isFlipped) el.classList.add('flipped');
      else el.classList.remove('flipped');
    }

    function nextCard() {
      currentCardIdx = (currentCardIdx + 1) % words.length;
      renderCurrentCard();
    }

    function prevCard() {
      currentCardIdx = (currentCardIdx - 1 + words.length) % words.length;
      renderCurrentCard();
    }

    function shuffleCards() {
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      currentCardIdx = 0;
      renderCurrentCard();
    }

    function speakCurrentWord() {
      if (words.length === 0) return;
      const w = words[currentCardIdx % words.length];
      speakWord(w.word);
    }

    function speakWord(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
      }
    }

    function generateNextQuiz() {
      if (words.length === 0) return;
      const targetIdx = Math.floor(Math.random() * words.length);
      const target = words[targetIdx];
      document.getElementById('quizTargetDef').innerText = '"' + target.defVi + '"';
      document.getElementById('quizFeedback').classList.add('hidden');

      // Pick 4 options
      const options = [target];
      const pool = words.filter(w => w.word !== target.word);
      while (options.length < 4 && pool.length > 0) {
        const r = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
        options.push(r);
      }
      // Shuffle options
      options.sort(() => Math.random() - 0.5);

      const grid = document.getElementById('quizOptionsGrid');
      grid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      options.forEach((opt, idx) => {
        const isCorrect = opt.word === target.word;
        const btn = document.createElement('button');
        btn.className = 'p-3 rounded-xl bg-white border border-zinc-200 text-xs text-left hover:border-zinc-200 transition cursor-pointer';
        btn.innerHTML = '<strong>' + letters[idx] + '.</strong> ' + opt.word + ' <span class="text-slate-500 text-[10px]">(' + opt.pos + ')</span>';
        btn.onclick = function() { checkQuizAnswer(btn, isCorrect, target); };
        grid.appendChild(btn);
      });
    }

    function checkQuizAnswer(btn, isCorrect, target) {
      const fb = document.getElementById('quizFeedback');
      fb.classList.remove('hidden');
      if (isCorrect) {
        btn.classList.add('border-emerald-500', 'bg-emerald-950/60', 'text-emerald-300', 'font-bold');
        fb.className = 'p-3 rounded-xl text-xs bg-emerald-950/60 border border-emerald-800 text-emerald-300';
        fb.innerHTML = '🎉 <strong>Chính xác!</strong> "' + target.word + '" có nghĩa là: ' + target.defVi;
        score += 50;
        document.getElementById('scoreDisplay').innerText = score;
      } else {
        btn.classList.add('border-rose-500', 'bg-rose-950/60', 'text-rose-300');
        fb.className = 'p-3 rounded-xl text-xs bg-rose-950/60 border border-rose-800 text-rose-300';
        fb.innerHTML = '❌ <strong>Chưa chính xác!</strong> Đáp án đúng là "' + target.word + '". Thử lại nhé!';
      }
    }

    // Init
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('fcCountBadge').innerText = words.length;
      document.getElementById('fcTotalDisplay').innerText = words.length;
      autoResizeTextarea(document.getElementById('rawInputArea'));
    });
  </script>
</body>
</html>`;
}

export default function LiveSimulatorModal({ isOpen, onClose, config }: LiveSimulatorModalProps) {
  const [modalMode, setModalMode] = useState<'react_demo' | 'sandbox_runner'>('react_demo');
  const [activeTab, setActiveTab] = useState<'flashcard' | 'quiz' | 'speedGame'>('flashcard');
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);

  // Dynamic Word List from Extracted Cards or Fallback
  const activeWordList = useMemo(() => {
    if (config.extractedCards && config.extractedCards.length > 0) {
      return config.extractedCards.map((c) => ({
        word: c.term,
        type: c.pos.toLowerCase(),
        ipa: c.phonetic || '/.../',
        def_en: c.definition,
        def_vi: c.definition,
        collocations: [`${c.term} in context`, `apply ${c.term}`],
        example_en: c.example,
        example_vi: `Ví dụ ứng dụng của "${c.term}".`
      }));
    }
    return SAMPLE_WORDS;
  }, [config.extractedCards]);

  // Sandbox Runner State
  const [customHtmlCode, setCustomHtmlCode] = useState(() => generateDemoHtml(config));
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Speed game state
  const [speedRunning, setSpeedRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [speedQuestion, setSpeedQuestion] = useState<{ word: string; def: string; isCorrect: boolean }>({
    word: activeWordList[0]?.word || 'sustainable',
    def: activeWordList[0]?.def_vi || 'bền vững, thân thiện với môi trường',
    isCorrect: true
  });
  const [combo, setCombo] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSpeedRunning(false);
    } else {
      setCustomHtmlCode(generateDemoHtml(config));
      setCurrentWordIdx(0);
      if (activeWordList.length > 0) {
        setSpeedQuestion({
          word: activeWordList[0].word,
          def: activeWordList[0].def_vi,
          isCorrect: true,
        });
      }
    }
  }, [isOpen, config, activeWordList]);

  const playBeep = (freq: number = 600, duration: number = 0.15) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const nextWord = () => {
    setIsFlipped(false);
    setCurrentWordIdx((prev) => (prev + 1) % activeWordList.length);
  };

  const currentWord = activeWordList[currentWordIdx % activeWordList.length] || activeWordList[0];

  const handleSpeedAnswer = (answerTrue: boolean) => {
    if (!speedRunning) return;
    const isWin = answerTrue === speedQuestion.isCorrect;
    if (isWin) {
      playBeep(880, 0.12);
      setScore((s) => s + 100 * (combo + 1));
      setCombo((c) => c + 1);
    } else {
      playBeep(220, 0.25);
      setCombo(0);
    }
    // Generate next speed question
    const wordObj = activeWordList[Math.floor(Math.random() * activeWordList.length)];
    const shouldBeCorrect = Math.random() > 0.5;
    let def = wordObj.def_vi;
    if (!shouldBeCorrect && activeWordList.length > 1) {
      const otherWords = activeWordList.filter((w) => w.word !== wordObj.word);
      def = otherWords[Math.floor(Math.random() * otherWords.length)].def_vi;
    }
    setSpeedQuestion({
      word: wordObj.word,
      def,
      isCorrect: shouldBeCorrect,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (speedRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && speedRunning) {
      setSpeedRunning(false);
    }
    return () => clearInterval(timer);
  }, [speedRunning, timeLeft]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-white/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white dark:text-black shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  Mô Phỏng Ứng Dụng Học Tập (Sandbox Environment)
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                  Thực thi An Toàn
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Chủ đề: <span className="font-medium text-zinc-700 dark:text-zinc-300">{config.lessonTopic}</span> • Khối: {config.gradeLevel.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle between Native React Demo and HTML Sandbox Runner */}
            <div className="flex items-center bg-slate-200 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setModalMode('react_demo')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  modalMode === 'react_demo'
                    ? 'bg-white  text-black  shadow-xs font-bold'
                    : 'text-slate-600  hover:text-slate-900 :text-zinc-800'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                Mô phỏng Giao diện
              </button>
              <button
                onClick={() => setModalMode('sandbox_runner')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  modalMode === 'sandbox_runner'
                    ? 'bg-white  text-black  shadow-xs font-bold'
                    : 'text-slate-600  hover:text-slate-900 :text-zinc-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                Trình chạy Sandbox HTML
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-slate-600 :text-zinc-800 hover:bg-slate-100 :bg-zinc-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {modalMode === 'react_demo' ? (
          <>
            {/* Tab Navigation */}
            <div className="px-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-950">
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveTab('flashcard'); setIsFlipped(false); }}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
                    activeTab === 'flashcard'
                      ? 'border-indigo-600 text-black '
                      : 'border-transparent text-slate-500 hover:text-slate-800 :text-zinc-600'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  3D Flashcard & Audio
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
                    activeTab === 'quiz'
                      ? 'border-indigo-600 text-black '
                      : 'border-transparent text-slate-500 hover:text-slate-800 :text-zinc-600'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Học & Nhớ (Active Recall)
                </button>
                <button
                  onClick={() => { setActiveTab('speedGame'); setSpeedRunning(true); setTimeLeft(30); }}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
                    activeTab === 'speedGame'
                      ? 'border-indigo-600 text-black '
                      : 'border-transparent text-slate-500 hover:text-slate-800 :text-zinc-600'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  Game Phản Xạ 3 Giây
                </button>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} Điểm</span>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-zinc-950 flex flex-col items-center justify-center min-h-[400px]">
              {activeTab === 'flashcard' && (
                <div className="w-full max-w-lg flex flex-col items-center space-y-4">
                  <div className="w-full flex justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium px-2">
                    <span>Thẻ {currentWordIdx + 1} / {SAMPLE_WORDS.length}</span>
                    <span>Bấm vào thẻ để lật mặt sau</span>
                  </div>

                  {/* 3D Card */}
                  <div
                    onClick={() => {
                      setIsFlipped(!isFlipped);
                      playBeep(440, 0.08);
                    }}
                    className="w-full h-72 cursor-pointer select-none perspective-[1000px]"
                  >
                    <div
                      className={`relative w-full h-full duration-500 rounded-3xl transition-transform [transform-style:preserve-3d] shadow-xl border border-slate-200/80  ${
                        isFlipped ? '[transform:rotateY(180deg)]' : ''
                      }`}
                    >
                      {/* FRONT */}
                      <div className="absolute inset-0 w-full h-full rounded-3xl bg-white dark:bg-zinc-950 p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white mb-3 border border-zinc-200 dark:border-zinc-800">
                          {currentWord.type}
                        </span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-1">
                          {currentWord.word}
                        </h2>
                        <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                          {currentWord.ipa}
                        </p>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(currentWord.word);
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black dark:bg-white hover:bg-indigo-700 text-white dark:text-black text-xs font-semibold shadow-md transition hover:scale-105 active:scale-95"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Nghe phát âm US</span>
                        </button>
                      </div>

                      {/* BACK */}
                      <div className="absolute inset-0 w-full h-full rounded-3xl bg-white dark:bg-zinc-950 text-white dark:text-black p-7 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] border border-zinc-200 dark:border-zinc-800">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider">{currentWord.word}</span>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Nghĩa & Ngữ cảnh</span>
                          </div>
                          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
                            👉 {currentWord.def_vi}
                          </p>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 italic mb-3">
                            "{currentWord.def_en}"
                          </p>

                          <div className="bg-zinc-100/80 rounded-xl p-2.5 border border-zinc-200/60 mb-2">
                            <span className="text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Collocations:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {currentWord.collocations.map((c, i) => (
                                <span key={i} className="text-[11px] bg-white dark:bg-zinc-950 px-2 py-0.5 rounded-lg text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-xs bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          <p className="text-zinc-800 dark:text-zinc-100 font-medium">{currentWord.example_en}</p>
                          <p className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">{currentWord.example_vi}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between w-full pt-2">
                    <button
                      onClick={() => {
                        setIsFlipped(!isFlipped);
                        playBeep(440, 0.08);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 transition"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      Lật thẻ (Flip)
                    </button>

                    <button
                      onClick={() => {
                        nextWord();
                        playBeep(520, 0.08);
                      }}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-black dark:bg-white hover:bg-indigo-700 text-white dark:text-black text-xs font-semibold shadow transition"
                    >
                      Thẻ tiếp theo ➔
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="w-full max-w-lg space-y-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md">
                    <span className="text-[11px] font-bold uppercase text-black dark:text-white tracking-wider">
                      Active Recall • Trắc nghiệm phản xạ
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-1 mb-4">
                      Từ vựng nào mang ý nghĩa: <span className="text-black dark:text-white">"bền vững, thân thiện với môi trường"</span>?
                    </h3>

                    <div className="space-y-2.5">
                      {[
                        { text: 'A. autonomous', correct: false },
                        { text: 'B. sustainable', correct: true },
                        { text: 'C. cognitive', correct: false },
                        { text: 'D. biodiversity', correct: false }
                      ].map((opt, idx) => {
                        const isSelected = quizAnswer === idx;
                        let btnStyle = 'border-slate-200  bg-slate-50  text-slate-800 ';
                        if (quizSubmitted) {
                          if (opt.correct) {
                            btnStyle = 'border-emerald-500 bg-emerald-50  text-emerald-700  font-bold';
                          } else if (isSelected && !opt.correct) {
                            btnStyle = 'border-rose-500 bg-rose-50  text-rose-700 ';
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-indigo-600 bg-zinc-100  text-indigo-700  font-semibold';
                        }

                        return (
                          <button
                            key={idx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswer(idx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt.text}</span>
                            {quizSubmitted && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            {quizSubmitted && isSelected && !opt.correct && <XCircle className="w-4 h-4 text-rose-500" />}
                          </button>
                        );
                      })}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        disabled={quizAnswer === null}
                        onClick={() => {
                          setQuizSubmitted(true);
                          if (quizAnswer === 1) {
                            playBeep(880, 0.15);
                            setScore((s) => s + 100);
                          } else {
                            playBeep(220, 0.25);
                          }
                        }}
                        className="w-full mt-4 py-2.5 rounded-xl bg-black dark:bg-white hover:bg-indigo-700 disabled:opacity-50 text-white dark:text-black font-bold text-xs shadow transition"
                      >
                        Kiểm tra đáp án
                      </button>
                    ) : (
                      <div className="mt-4 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                        <p className="font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                          💡 Phân tích sư phạm & bẫy sai:
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          <strong>Sustainable (adj)</strong> bắt nguồn từ động từ <em>sustain</em> (duy trì). Phương án A (autonomous: tự hành) và C (cognitive: nhận thức) thường bị nhầm lẫn trong các đề thi học thuật.
                        </p>
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswer(null);
                          }}
                          className="mt-3 text-black dark:text-white font-bold hover:underline"
                        >
                          Làm lại câu khác ➔
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'speedGame' && (
                <div className="w-full max-w-md space-y-4 text-center">
                  <div className="flex justify-between items-center bg-white dark:bg-zinc-950 text-white dark:text-black p-3 rounded-2xl">
                    <div className="text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">Thời gian:</span> <span className="font-mono font-bold text-zinc-600 dark:text-zinc-400">{timeLeft}s</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">Combo:</span> <span className="font-bold text-zinc-600 dark:text-zinc-400">x{combo}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">Điểm:</span> <span className="font-bold text-zinc-600 dark:text-zinc-400">{score}</span>
                    </div>
                  </div>

                  {speedRunning ? (
                    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-5">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">Cặp từ ngữ này ĐÚNG hay SAI?</span>
                      
                      <div className="py-2">
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                          {speedQuestion.word}
                        </h2>
                        <div className="text-sm font-semibold text-black dark:text-white p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          = {speedQuestion.def}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleSpeedAnswer(true)}
                          className="p-4 rounded-2xl bg-black dark:bg-white hover:bg-emerald-700 text-white dark:text-black font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          ĐÚNG (True)
                        </button>
                        <button
                          onClick={() => handleSpeedAnswer(false)}
                          className="p-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white dark:text-black font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-5 h-5" />
                          SAI (False)
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
                      <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Trò chơi kết thúc!</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Điểm số phản xạ của bạn: <span className="font-bold text-black dark:text-white">{score} điểm</span></p>
                      <button
                        onClick={() => {
                          setScore(0);
                          setCombo(0);
                          setTimeLeft(30);
                          setSpeedRunning(true);
                        }}
                        className="px-6 py-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs shadow-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 mx-auto"
                      >
                        <Play className="w-4 h-4" />
                        Chơi lại (30s)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Sandbox Runner Mode */
          <div className="flex-1 flex flex-col md:flex-row h-full min-h-[480px] overflow-hidden bg-white dark:bg-zinc-950">
            {/* Left/Top Editor & Controls */}
            <div className="w-full md:w-5/12 p-4 border-r border-zinc-200 dark:border-zinc-800 flex flex-col bg-white/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  Mã nguồn HTML cần chạy
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCustomHtmlCode(generateDemoHtml(config));
                    setIframeKey((k) => k + 1);
                  }}
                  className="text-[11px] text-zinc-600 dark:text-zinc-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Nạp lại mã mẫu
                </button>
              </div>

              <textarea
                value={customHtmlCode}
                onChange={(e) => setCustomHtmlCode(e.target.value)}
                placeholder="Dán toàn bộ mã nguồn Single-file HTML do AI sinh ra vào đây để chạy thử nghiệm..."
                className="flex-1 w-full p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 font-mono text-[11px] leading-relaxed resize-none focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />

              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {customHtmlCode.length.toLocaleString()} bytes • Sandbox Isolated
                </span>
                <button
                  type="button"
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white hover:bg-emerald-500 text-white dark:text-black font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  Chạy trong Sandbox
                </button>
              </div>
            </div>

            {/* Right/Bottom Isolated Safe IFrame */}
            <div className="w-full md:w-7/12 p-4 flex flex-col bg-white dark:bg-zinc-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <Layout className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  Khung hiển thị Sandbox Trực tiếp
                </span>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  sandbox="allow-scripts allow-same-origin"
                </span>
              </div>

              {/* SECURE ISOLATED IFRAME */}
              <div className="flex-1 w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-inner flex flex-col">
                <iframe
                  key={iframeKey}
                  title="HTML Sandbox Runner"
                  sandbox="allow-scripts allow-same-origin"
                  srcDoc={customHtmlCode}
                  className="w-full h-full min-h-[420px] bg-white dark:bg-zinc-950 border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
          <span>✨ Ứng dụng mô phỏng các cơ chế sinh mã từ Master Prompt Tự Học</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 :bg-slate-700 text-zinc-900 dark:text-white font-semibold transition"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
}
