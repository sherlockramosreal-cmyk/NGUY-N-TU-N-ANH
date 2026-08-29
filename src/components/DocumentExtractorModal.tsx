import React, { useState, useMemo, useRef } from 'react';
import {
  X,
  FileText,
  Sparkles,
  Clipboard,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
  Layers,
  HelpCircle,
  Play,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Filter,
  Check,
  GraduationCap,
  UploadCloud,
  Loader2,
  AlertCircle,
  Link as LinkIcon,
  Code2
} from 'lucide-react';
import { PromptConfig, ExtractedCard, KnowledgeLayer } from '../types';
import { SAMPLE_DOCUMENTS, extractKnowledgeLayers } from '../data/sampleExtractorDocs';
import { extractTextFromFile } from '../utils/fileParser';
import { toast } from './Toast';

interface DocumentExtractorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PromptConfig;
  onSaveToLessonBank: (updatedConfig: PromptConfig, cards: ExtractedCard[]) => void;
  onOpenSimulator: () => void;
}

const LAYER_INFO: Record<KnowledgeLayer, { name: string; tag: string; color: string; desc: string; icon: string }> = {
  1: {
    name: 'Tầng 1: Định nghĩa & Khái niệm cốt lõi',
    tag: 'Definitions & Core Concepts',
    color: 'bg-blue-500/10 text-blue-700  border-blue-200 ',
    desc: 'Thuật ngữ chính, từ vựng trọng tâm kèm phiên âm IPA và nghĩa cốt lõi.',
    icon: '📘',
  },
  2: {
    name: 'Tầng 2: Cụm từ, Collocations & Công thức',
    tag: 'Phrases, Collocations & Formulas',
    color: 'bg-emerald-500/10 text-emerald-700  border-emerald-200 ',
    desc: 'Các cụm từ cố định, liên từ kết hợp, thành ngữ idiomatic và cụm giới từ.',
    icon: '🔗',
  },
  3: {
    name: 'Tầng 3: Quy trình & Cấu trúc ngữ pháp',
    tag: 'Grammar Syntax & Processes',
    color: 'bg-amber-500/10 text-amber-700  border-amber-200 ',
    desc: 'Cấu trúc câu, quy tắc biến đổi đảo ngữ, rút gọn phân từ, thể bị động và câu điều kiện.',
    icon: '⚙️',
  },
  4: {
    name: 'Tầng 4: Ngữ cảnh & Ví dụ ứng dụng thực tế',
    tag: 'Contextual Usage & Real Examples',
    color: 'bg-purple-500/10 text-purple-700  border-purple-200 ',
    desc: 'Câu ví dụ hoàn chỉnh, bẫy thi thực chiến, ngữ cảnh học thuật và đời sống.',
    icon: '🌿',
  },
};

export default function DocumentExtractorModal({
  isOpen,
  onClose,
  config,
  onSaveToLessonBank,
  onOpenSimulator,
}: DocumentExtractorModalProps) {
  const [inputText, setInputText] = useState(SAMPLE_DOCUMENTS[0].text);
  const [selectedDocId, setSelectedDocId] = useState<string>(SAMPLE_DOCUMENTS[0].id);
  const [rightPaneMode, setRightPaneMode] = useState<'cards' | 'json'>('cards');
  const [cards, setCards] = useState<ExtractedCard[]>(() => {
    return config.extractedCards && config.extractedCards.length > 0
      ? config.extractedCards
      : extractKnowledgeLayers(SAMPLE_DOCUMENTS[0].text);
  });
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<'all' | KnowledgeLayer>('all');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [fileErrorMsg, setFileErrorMsg] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [customTopicTitle, setCustomTopicTitle] = useState(config.lessonTopic || SAMPLE_DOCUMENTS[0].topic);
  const [isHighlightMode, setIsHighlightMode] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyAIPrompt = async () => {
    const prompt = `Bạn là một chuyên gia AI xử lý dữ liệu tài liệu giáo dục và khoa học. Nhiệm vụ của bạn là nhận văn bản gốc từ PDF/Word (thường bị lỗi OCR, sai cột, rớt dòng, vỡ công thức) và tái tạo lại thành văn bản Markdown kết hợp LaTeX hoàn hảo nhất.

BẠN BẮT BUỘC PHẢI TUÂN THỦ 5 QUY TẮC SẮT ĐÁ SAU:

1. QUY TẮC BỐ CỤC & BẢO TOÀN DỮ LIỆU (CHỐNG LỘN XỘN, CHỐNG LƯỜI):
- Đọc cột: Nếu trang chia 2 hoặc nhiều cột, BẮT BUỘC đọc hết toàn bộ cột trái từ trên xuống dưới, rồi mới đọc tiếp cột phải. TUYỆT ĐỐI KHÔNG đọc vắt ngang dòng.
- Bảo toàn 100%: Trích xuất ĐẦY ĐỦ 100% nội dung. KHÔNG tóm tắt, KHÔNG cắt xén, KHÔNG tự giải bài tập.
- Dọn rác: Tự động xóa số trang, header, footer, dấu chìm (watermark), chữ "Mã đề", "Trang X/Y".

2. QUY TẮC NỐI DÒNG (CHỐNG ĐỨT ĐOẠN):
- Tự động ghép các dòng bị OCR ngắt vô cớ lại thành một câu hoặc một phương trình liền mạch.
- Chỉ xuống dòng khi: kết thúc câu hỏi, chuyển sang đáp án (A, B, C, D), hoặc chuyển sang phương trình độc lập.
- TUYỆT ĐỐI KHÔNG để một phương trình bị cắt làm 2 dòng.

3. QUY TẮC HÓA HỌC CHUYÊN SÂU (CHỐNG LỖI HIỂN THỊ LATEX):
- Ký hiệu nguyên tố/phân tử: KHÔNG ĐƯỢC in nghiêng. Bắt buộc dùng \\mathrm{}. (VD: \\mathrm{C_3H_8O}, \\mathrm{H_2SO_4}).
- Chuỗi Hữu cơ: Bọc toàn bộ chuỗi trong \\mathrm{} để dấu gạch ngang (-) không bị biến thành dấu trừ toán học. (VD: \\mathrm{CH_3-CH_2-OH} hoặc \\mathrm{CH_2=CH-COOH}).
- Ion & Điện tích: Dấu điện tích phải nằm ở chỉ số trên (superscript) và ĐỨNG SAU con số. (VD: \\mathrm{Fe^{3+}}, \\mathrm{SO_4^{2-}}, \\mathrm{NH_4^+}).
- Mũi tên & Điều kiện: Chữ ghi điều kiện phản ứng BẮT BUỘC phải bọc trong \\text{} để không bị lỗi font LaTeX. (VD: \\xrightarrow{\\text{t}^\\circ, \\text{xt}}, \\xrightleftharpoons[\\text{men}]{\\text{t}^\\circ}). Mũi tên kết tủa \\downarrow, bay hơi \\uparrow.
- Khôi phục OCR Hóa: Các chữ bị tách rời phải nối lại ("N a" -> "Na", "C u O" -> "CuO"). Các ký hiệu sai như "t 0", "t o", "*C" BẮT BUỘC sửa thành ^\\circ\\mathrm{C}.

4. QUY TẮC TOÁN & VẬT LÝ (TỪ ĐIỂN LATEX):
- Công thức trong dòng bọc bằng cặp dấu $...$, công thức độc lập bọc bằng cặp dấu $$...$$.
- Bảng chữ cái Hy Lạp: \\alpha, \\beta, \\gamma, \\Delta, \\pi, \\omega (không dùng w), \\rho (không dùng p), \\lambda, \\mu.
- Đơn vị đo: ^\\circ\\mathrm{C} (độ C), ^\\circ (độ góc), \\Omega (Ohm), \\mathring{A} (Angstrom), \\mu\\mathrm{F}.
- Đại số & Hình học: Phân số \\frac{a}{b}, Căn \\sqrt{x}, Tích phân \\int, Giới hạn \\lim, Vô cực \\infty, Góc \\widehat{ABC}, Tam giác \\triangle, Vuông góc \\perp, Song song \\parallel, Vector \\vec{v}.
- Hệ phương trình/Ma trận: Bắt buộc dùng \\begin{cases} ... \\end{cases} hoặc \\begin{pmatrix} ... \\end{pmatrix}.

5. QUY TẮC ĐỊNH DẠNG ĐỀ TRẮC NGHIỆM:
- Trình bày đáp án trắc nghiệm thật ngăn nắp theo định dạng chuẩn sau (Mỗi đáp án A, B, C, D đều phải xuống dòng):
  **Câu [X]:** [Nội dung câu hỏi]
  A. [Đáp án]
  B. [Đáp án]
  C. [Đáp án]
  D. [Đáp án]

KẾT QUẢ ĐẦU RA: Chỉ trả về mã Markdown hoàn chỉnh. Không giải thích, không xin chào, không có bất kỳ văn bản giao tiếp nào khác ngoài nội dung tài liệu đã xử lý.`;
    await navigator.clipboard.writeText(prompt);
    toast.success('Đã sao chép AI Prompt! Hãy mang dán vào ChatGPT/Gemini.');
  };


  const handleProcessUploadedDoc = async (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File quá lớn! Vui lòng chọn tài liệu dưới 5MB để đảm bảo hiệu năng trình duyệt.');
      if (modalFileInputRef.current) modalFileInputRef.current.value = '';
      return;
    }
    setIsParsingFile(true);
    setFileErrorMsg(null);
    const toastId = toast.loading('Đang phân tích PDF/DOCX...');
    
    try {
      const { text, fileName } = await extractTextFromFile(file);
      if (text) {
        setInputText(text);
        const baseTopic = fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        setCustomTopicTitle(baseTopic);
        // Auto trigger extraction
        const result = extractKnowledgeLayers(text);
        setCards(result);
        toast.dismiss(toastId);
        toast.success('Bóc tách thành công!');
      } else {
        toast.dismiss(toastId);
        toast.error('Không thể đọc nội dung (File rỗng hoặc không hỗ trợ).');
      }
    } catch (err: any) {
      console.error('Modal file parsing error:', err);
      toast.dismiss(toastId);
      toast.error('Không thể đọc nội dung file này (có thể là file ảnh chụp)');
      setFileErrorMsg(err?.message || 'Không thể đọc tệp PDF/DOCX.');
      setTimeout(() => setFileErrorMsg(null), 5000);
    } finally {
      setIsParsingFile(false);
      if (modalFileInputRef.current) {
        modalFileInputRef.current.value = '';
      }
    }
  };

  // Real-time Text Statistics
  const textStats = useMemo(() => {
    const chars = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const lines = inputText.split('\n').filter(l => l.trim().length > 0).length;
    return { chars, words, lines };
  }, [inputText]);

  // Paste from Clipboard
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
      }
    } catch (e) {
      console.warn('Cannot read clipboard automatically', e);
    }
  };

  // Load sample document
  const handleSelectSampleDoc = (docId: string) => {
    const found = SAMPLE_DOCUMENTS.find(d => d.id === docId);
    if (found) {
      setSelectedDocId(docId);
      setInputText(found.text);
      setCustomTopicTitle(found.topic);
    }
  };

  // Execute Extraction
  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      const result = extractKnowledgeLayers(inputText);
      setCards(result);
      setIsExtracting(false);
    }, 400);
  };

  // Card Modifications
  const handleCardChange = (id: string, field: keyof ExtractedCard, value: any) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const handleAddCard = (layer: KnowledgeLayer = 1) => {
    const newCard: ExtractedCard = {
      id: `card_custom_${Date.now()}`,
      term: 'new vocabulary',
      phonetic: '/.../',
      pos: 'Noun',
      definition: 'Nhập định nghĩa tiếng Việt...',
      example: 'Enter an English example sentence here.',
      layer,
    };
    setCards(prev => [newCard, ...prev]);
  };

  // Save to Lesson Bank & Sync with entire app
  const handleSave = () => {
    // Generate formatted sample vocabulary JSON for prompt & games
    const formattedVocab = cards.map((c, i) => {
      return `  {
    "id": ${i + 1},
    "word": "${c.term}",
    "pos": "${c.pos.toLowerCase()}",
    "ipa": "${c.phonetic || ''}",
    "def_vi": "${c.definition.replace(/"/g, "'")}",
    "example_en": "${c.example.replace(/"/g, "'")}",
    "layer": ${c.layer}
  }`;
    }).join(',\n');

    const formattedSampleContent = `[\n${formattedVocab}\n]`;

    // Extract core theory from text or cards
    const theorySummary = `=== TỔNG HỢP KIẾN THỨC TỪ TÀI LIỆU BÓC TÁCH (${customTopicTitle}) ===
1. Khái niệm & Thuật ngữ cốt lõi: ${cards.filter(c => c.layer === 1).map(c => c.term).slice(0, 5).join(', ')}
2. Cụm từ & Collocations: ${cards.filter(c => c.layer === 2).map(c => c.term).slice(0, 5).join(', ')}
3. Cấu trúc & Quy trình: ${cards.filter(c => c.layer === 3).map(c => c.term).slice(0, 4).join(' | ')}
4. Ứng dụng thực tế: ${cards.filter(c => c.layer === 4).map(c => c.term).slice(0, 4).join(', ')}`;

    const updatedConfig: PromptConfig = {
      ...config,
      lessonTopic: customTopicTitle,
      theoryContent: theorySummary,
      sampleContent: formattedSampleContent,
      vocabCount: cards.length,
      extractedCards: cards,
    };

    onSaveToLessonBank(updatedConfig, cards);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  const filteredCards = useMemo(() => {
    if (selectedLayerFilter === 'all') return cards;
    return cards.filter(c => c.layer === selectedLayerFilter);
  }, [cards, selectedLayerFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-white dark:bg-black md:bg-white/80 md:dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full h-[100dvh] md:h-[92vh] max-w-6xl flex flex-col md:rounded-3xl bg-white dark:bg-zinc-950 border-0 md:border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex-none p-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl text-white dark:text-black shadow-md shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  Phân Hệ Bóc Tách Tài Liệu & Nạp Lý Thuyết Mới
                </h2>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-purple-200">
                  4 Tầng Sư Phạm NCKH
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Tự động trích xuất SGK / Bài đọc thành Flashcard 3D, Active Recall Quiz và 7 Mini-game Gamification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-slate-600 :text-zinc-800 hover:bg-slate-100 :bg-zinc-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split-Screen Layout (Left: Input & Tools, Right: 4-Layer Preview & Editor) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT PANE: Document Input & Fast Controls (5 cols) */}
          <div className="lg:col-span-5 border-r border-zinc-200 dark:border-zinc-800 flex flex-col min-h-0 bg-white dark:bg-zinc-950 p-4 sm:p-5 space-y-4 overflow-y-auto custom-scrollbar">
            
            {/* Topic Name */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                <span>Chủ đề bài học (Topic Name):</span>
                <span className="text-[10px] font-normal text-zinc-600 dark:text-zinc-400">Đồng bộ sang toàn web</span>
              </label>
              <input
                type="text"
                value={customTopicTitle}
                onChange={(e) => setCustomTopicTitle(e.target.value)}
                placeholder="VD: Protecting Environment & Ecosystems"
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Quick Sample Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>Nạp tài liệu mẫu nghiên cứu:</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {SAMPLE_DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelectSampleDoc(doc.id)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                      selectedDocId === doc.id
                        ? 'border-indigo-600 bg-zinc-100/80   font-bold text-indigo-900 '
                        : 'border-slate-200  bg-white  text-slate-700  hover:border-indigo-300'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="block truncate">{doc.title}</span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">{doc.category}</span>
                    </div>
                    {selectedDocId === doc.id && <Check className="w-4 h-4 text-black dark:text-white flex-none" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Raw Text Input Area */}
            <div
              className="flex-1 flex flex-col min-h-[220px] relative"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  handleProcessUploadedDoc(file);
                }
              }}
            >
              <input
                type="file"
                ref={modalFileInputRef}
                accept=".txt,.pdf,.docx,.doc,.md,.csv,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleProcessUploadedDoc(file);
                  }
                }}
              />
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <span>Dán văn bản / Kéo thả file:</span>
                  </label>
                  <button
                    onClick={() => {
                      setIsHighlightMode(!isHighlightMode);
                      setSelectedText('');
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 ${isHighlightMode ? 'bg-indigo-100 text-indigo-700  ' : 'bg-slate-100 text-slate-600  '}`}
                    title="Chế độ bôi đen để bóc tách một đoạn văn bản"
                  >
                    <Sparkles className="w-3 h-3" />
                    Bôi đen & Bóc tách
                  </button>
                  <button
                    onClick={() => setShowAIPrompt(!showAIPrompt)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 border ${showAIPrompt ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'}`}
                    title="Mẹo dùng AI dọn dẹp dữ liệu"
                  >
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    Mẹo: Dọn dẹp dữ liệu PDF bằng AI
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => modalFileInputRef.current?.click()}
                    disabled={isParsingFile}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-emerald-200 text-[11px] font-bold text-emerald-600 hover:bg-emerald-100 transition cursor-pointer"
                  >
                    {isParsingFile ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <UploadCloud className="w-3 h-3" />
                    )}
                    <span>{isParsingFile ? 'Đang phân tích PDF...' : 'Tải File PDF/DOCX'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-[11px] font-bold text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>Dán Clipboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    title="Xóa văn bản"
                    className="p-1 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-rose-500 hover:bg-rose-50 :bg-rose-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {showAIPrompt && (
                <div className="mb-3 p-3 rounded-xl bg-purple-50/50 border border-purple-100/50 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900">
                      Prompt Khôi phục dữ liệu siêu sạch dành cho ChatGPT / Gemini
                    </span>
                    <button
                      onClick={handleCopyAIPrompt}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <Clipboard className="w-3 h-3" />
                      Copy Prompt
                    </button>
                  </div>
                  <p className="text-[11px] text-purple-700/80 leading-relaxed">
                    Sử dụng Prompt này cùng với file PDF / ảnh chụp màn hình giáo trình của bạn để AI tự động dọn dẹp các lỗi ngắt dòng, lỗi font Toán/Lý/Hóa, và trả về định dạng hoàn hảo nhất trước khi dán vào đây.
                  </p>
                </div>
              )}

              {fileErrorMsg && (
                <div className="mb-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-600 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fileErrorMsg}</span>
                </div>
              )}


              <div className="relative flex-1 flex flex-col">
                {isHighlightMode ? (
                  <div
                    className="flex-1 w-full p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono leading-relaxed text-zinc-900 dark:text-white overflow-y-auto custom-scrollbar whitespace-pre-wrap cursor-text selection:bg-indigo-200 selection:text-indigo-900 :bg-indigo-900/50 :text-indigo-200 relative min-h-[200px]"
                    onMouseUp={() => {
                      const selection = window.getSelection();
                      setSelectedText(selection?.toString().trim() || '');
                    }}
                  >
                    {inputText || (
                      <span className="text-zinc-500 dark:text-zinc-400 italic">
                        Chưa có dữ liệu. Hãy tắt chế độ "Bôi đen & Bóc tách" để dán văn bản.
                      </span>
                    )}
                  </div>
                ) : (
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Dán đoạn văn bản bài học, danh sách từ vựng, hoặc kéo thả / tải lên file PDF/DOCX giáo trình vào đây..."
                    className="flex-1 w-full p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono leading-relaxed text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none custom-scrollbar min-h-[200px]"
                  />
                )}

                {isHighlightMode && selectedText && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <button
                      onClick={() => {
                        const extracted = extractKnowledgeLayers(selectedText);
                        setCards(prev => [...prev, ...extracted]);
                        toast.success(`Đã bóc tách thêm ${extracted.length} thẻ từ vùng chọn!`);
                        window.getSelection()?.removeAllRanges();
                        setSelectedText('');
                      }}
                      className="px-4 py-2 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold animate-in zoom-in duration-200 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      Bóc tách {selectedText.length} ký tự
                    </button>
                  </div>
                )}

                {isParsingFile && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center gap-2 z-10">
                    <Loader2 className="w-7 h-7 animate-spin text-black dark:text-white" />
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      Đang phân tích và trích xuất nội dung PDF...
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Thư viện pdfjs-dist đang xử lý văn bản theo từng trang</p>
                  </div>
                )}
              </div>

              {/* Text Counters */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 px-1">
                <div className="flex items-center gap-3">
                  <span>📝 <strong>{textStats.words}</strong> từ</span>
                  <span>🔤 <strong>{textStats.chars}</strong> ký tự</span>
                  <span>📑 <strong>{textStats.lines}</strong> dòng</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  ✓ Sẵn sàng bóc tách
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleExtract}
              disabled={isExtracting || !inputText.trim()}
              className="w-full py-3 px-4 rounded-2xl hover:from-indigo-500 hover:to-purple-500 text-white dark:text-black font-bold text-xs shadow-lg shadow-sm flex items-center justify-center gap-2 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isExtracting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Đang bóc tách 4 tầng kiến thức...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>⚡ Bắt đầu bóc tách 4 tầng kiến thức</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT PANE: 4-Layer Preview, Live Card Editor & Save (7 cols) */}
          <div className="lg:col-span-7 flex flex-col min-h-0 bg-white dark:bg-zinc-950 p-4 sm:p-5 overflow-hidden">
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                Kết quả Bóc tách (4 Tầng Tri thức)
              </h3>
              <div className="flex items-center bg-zinc-50 dark:bg-black p-1 rounded-xl">
                <button
                  onClick={() => setRightPaneMode('cards')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    rightPaneMode === 'cards'
                      ? 'bg-white  text-black shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 :text-zinc-600'
                  }`}
                >
                  Giao diện Thẻ
                </button>
                <button
                  onClick={() => setRightPaneMode('json')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    rightPaneMode === 'json'
                      ? 'bg-white  text-emerald-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 :text-zinc-600'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  JSON
                </button>
              </div>
            </div>

            {rightPaneMode === 'cards' ? (
              <>
                {/* Layer Filter Toolbar */}
            <div className="flex-none flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
                <button
                  type="button"
                  onClick={() => setSelectedLayerFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedLayerFilter === 'all'
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-slate-100  text-slate-600  hover:bg-slate-200'
                  }`}
                >
                  <span>Tất cả ({cards.length})</span>
                </button>
                {([1, 2, 3, 4] as KnowledgeLayer[]).map((layer) => {
                  const count = cards.filter(c => c.layer === layer).length;
                  const info = LAYER_INFO[layer];
                  return (
                    <button
                      key={layer}
                      type="button"
                      onClick={() => setSelectedLayerFilter(layer)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        selectedLayerFilter === layer
                          ? 'bg-black text-white shadow-sm'
                          : 'bg-slate-100  text-slate-600  hover:bg-slate-200'
                      }`}
                    >
                      <span>{info.icon} Tầng {layer}</span>
                      <span className="text-[10px] opacity-80 font-mono">({count})</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddCard(selectedLayerFilter === 'all' ? 1 : selectedLayerFilter)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-800 :bg-indigo-950 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition"
                >
                  <Plus className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                  <span>Thêm thẻ</span>
                </button>
              </div>
            </div>

            {/* Current Layer Description Header */}
            {selectedLayerFilter !== 'all' && (
              <div className={`mt-3 p-3 rounded-xl border text-xs ${LAYER_INFO[selectedLayerFilter].color}`}>
                <div className="font-bold flex items-center gap-1.5">
                  <span>{LAYER_INFO[selectedLayerFilter].icon}</span>
                  <span>{LAYER_INFO[selectedLayerFilter].name}</span>
                </div>
                <p className="text-[11px] mt-0.5 opacity-90">{LAYER_INFO[selectedLayerFilter].desc}</p>
              </div>
            )}

            {/* Editable Cards List */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-3 mt-3 pr-1 custom-scrollbar">
              {filteredCards.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                  <Layers className="w-8 h-8 mb-2 opacity-50 text-zinc-600 dark:text-zinc-400" />
                  <p className="text-xs font-semibold">Chưa có thẻ nào trong tầng kiến thức này.</p>
                  <button
                    type="button"
                    onClick={() => handleAddCard(selectedLayerFilter === 'all' ? 1 : selectedLayerFilter)}
                    className="mt-3 px-4 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold"
                  >
                    + Tạo thẻ mới ngay
                  </button>
                </div>
              ) : (
                filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-slate-50/60 space-y-2.5 transition hover:border-indigo-300 :border-indigo-800"
                  >
                    {/* Top Row: Term, Phonetic, POS & Layer Selector */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                        <input
                          type="text"
                          value={card.term}
                          onChange={(e) => handleCardChange(card.id, 'term', e.target.value)}
                          placeholder="Thuật ngữ tiếng Anh..."
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-black dark:text-white flex-1 min-w-[120px]"
                        />
                        <input
                          type="text"
                          value={card.phonetic || ''}
                          onChange={(e) => handleCardChange(card.id, 'phonetic', e.target.value)}
                          placeholder="/ipa/"
                          className="px-2 py-1 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 w-28"
                        />
                        <select
                          value={card.pos}
                          onChange={(e) => handleCardChange(card.id, 'pos', e.target.value)}
                          className="px-2 py-1 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                          <option value="Noun">Noun (Danh từ)</option>
                          <option value="Verb">Verb (Động từ)</option>
                          <option value="Adjective">Adj (Tính từ)</option>
                          <option value="Adverb">Adv (Trạng từ)</option>
                          <option value="Phrase">Phrase (Cụm từ)</option>
                          <option value="Grammar">Grammar (Cú pháp)</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Layer Switcher */}
                        <select
                          value={card.layer}
                          onChange={(e) => handleCardChange(card.id, 'layer', Number(e.target.value) as KnowledgeLayer)}
                          className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold text-zinc-600 dark:text-zinc-400"
                        >
                          <option value={1}>Tầng 1 (Định nghĩa)</option>
                          <option value={2}>Tầng 2 (Cụm từ)</option>
                          <option value={3}>Tầng 3 (Quy trình)</option>
                          <option value={4}>Tầng 4 (Ngữ cảnh)</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteCard(card.id)}
                          title="Xóa thẻ"
                          className="p-1 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-rose-500 hover:bg-rose-50 :bg-rose-950/40 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Middle Row: Definition (Vietnamese) */}
                    <div>
                      <input
                        type="text"
                        value={card.definition}
                        onChange={(e) => handleCardChange(card.id, 'definition', e.target.value)}
                        placeholder="Định nghĩa / Giải thích tiếng Việt..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                      />
                    </div>

                    {/* Bottom Row: Context Example */}
                    <div>
                      <input
                        type="text"
                        value={card.example}
                        onChange={(e) => handleCardChange(card.id, 'example', e.target.value)}
                        placeholder="Câu ví dụ thực tế tiếng Anh (Example sentence)..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] italic text-zinc-600 dark:text-zinc-400"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
              </>
            ) : (
              <div className="flex-1 min-h-0 mt-2 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 overflow-y-auto custom-scrollbar">
                <pre className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {JSON.stringify(cards, null, 2)}
                </pre>
              </div>
            )}

            {/* Bottom Controls: Save & Sync Button */}
            <div className="flex-none pt-3 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Tổng cộng: <strong className="text-black dark:text-white font-mono text-sm">{cards.length}</strong> thẻ kiến thức
                </span>
                {showSuccessToast && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-xl border border-emerald-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã nạp vào kho bài học thành công!</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleSave();
                    onOpenSimulator();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-black hover:bg-slate-200 :bg-slate-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                  <span>Mô phỏng Game với bài học này</span>
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl hover:from-emerald-500 hover:to-teal-500 text-white dark:text-black text-xs font-extrabold shadow-lg shadow-sm transition hover:scale-102 active:scale-98"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu vào kho bài học</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
