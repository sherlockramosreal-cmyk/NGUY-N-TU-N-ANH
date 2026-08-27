import React, { useState, useRef } from 'react';
import {
  Target,
  Layers,
  Gamepad2,
  Palette,
  Settings,
  Sparkles,
  CheckCheck,
  RotateCcw,
  BookOpen,
  Volume2,
  FileText,
  Trash2,
  Flame,
  HelpCircle,
  CheckSquare,
  Printer,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';
import { PromptConfig, GradeLevel, ExamTarget, StudyMode, MiniGameId, ColorTheme, UIStyle, FontChoice, SystemUtility, OutputFormat } from '../types';
import {
  GRADE_CONFIGS,
  EXAM_CONFIGS,
  STUDY_MODE_CONFIGS,
  MINI_GAME_CONFIGS,
  COLOR_THEME_OPTIONS,
  UI_STYLE_OPTIONS,
  FONT_OPTIONS,
  SYSTEM_UTILITY_OPTIONS,
  TOPIC_PRESETS,
  THEORY_PRESETS,
  SAMPLE_VOCABULARY_DEFAULT,
} from '../data/promptTemplates';
import { extractContentFromWebLink } from '../utils/linkExtractor';
import { extractTextFromFile } from '../utils/fileParser';
import { toast } from './Toast';

interface ConfigurationAreaProps {
  config: PromptConfig;
  onChange: (updated: PromptConfig) => void;
  onOpenExtractor?: () => void;
  onReset?: () => void;
}

export default function ConfigurationArea({ config, onChange, onOpenExtractor, onReset }: ConfigurationAreaProps) {
  const [showTheoryInput, setShowTheoryInput] = useState(true);
  const [showAdvancedSample, setShowAdvancedSample] = useState(false);
  const [webLinkInput, setWebLinkInput] = useState('');
  const [isExtractingLink, setIsExtractingLink] = useState(false);
  const [extractSuccessMsg, setExtractSuccessMsg] = useState<string | null>(null);
  const [extractErrorMsg, setExtractErrorMsg] = useState<string | null>(null);
  const [isFileParsing, setIsFileParsing] = useState(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);

  const sampleContentRef = useRef<HTMLTextAreaElement | null>(null);
  const theoryContentRef = useRef<HTMLTextAreaElement | null>(null);
  const configFileInputRef = useRef<HTMLInputElement>(null);
  const fontDropdownRef = useRef<HTMLDivElement>(null);
  const gradeDropdownRef = useRef<HTMLDivElement>(null);
  const examDropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target as Node)) {
        setIsFontDropdownOpen(false);
      }
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(event.target as Node)) {
        setIsGradeDropdownOpen(false);
      }
      if (examDropdownRef.current && !examDropdownRef.current.contains(event.target as Node)) {
        setIsExamDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (sampleContentRef.current) {
      sampleContentRef.current.style.height = 'auto';
      sampleContentRef.current.style.height = `${Math.max(130, sampleContentRef.current.scrollHeight)}px`;
    }
  }, [config.sampleContent]);

  React.useEffect(() => {
    if (theoryContentRef.current && showTheoryInput) {
      theoryContentRef.current.style.height = 'auto';
      theoryContentRef.current.style.height = `${Math.max(90, theoryContentRef.current.scrollHeight)}px`;
    }
  }, [config.theoryContent, showTheoryInput]);

  const handleProcessUploadedDoc = async (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File quá lớn! Vui lòng chọn tài liệu dưới 5MB để đảm bảo hiệu năng trình duyệt.');
      if (configFileInputRef.current) configFileInputRef.current.value = '';
      return;
    }
    setIsFileParsing(true);
    setExtractErrorMsg(null);
    setExtractSuccessMsg(null);
    const toastId = toast.loading('Đang phân tích PDF/DOCX...');

    try {
      const { text, fileName } = await extractTextFromFile(file);
      if (text) {
        const baseTopic = fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        const updatedConfig: Partial<PromptConfig> = {
          sampleContent: text,
          lessonTopic: baseTopic,
        };
        onChange({ ...config, ...updatedConfig });
        setExtractSuccessMsg(`Đã tải thành công nội dung từ tệp: ${fileName}`);
        toast.dismiss(toastId);
        toast.success('Bóc tách thành công!');
        setTimeout(() => setExtractSuccessMsg(null), 8000);
      } else {
        toast.dismiss(toastId);
        toast.error('Không thể đọc nội dung (File rỗng hoặc không hỗ trợ).');
        throw new Error('Tệp không có nội dung văn bản.');
      }
    } catch (err: any) {
      console.error('File parsing error:', err);
      toast.dismiss(toastId);
      toast.error('Không thể đọc nội dung file này (có thể là file ảnh chụp)');
      setExtractErrorMsg(err?.message || 'Không thể đọc tệp PDF/DOCX.');
      setTimeout(() => setExtractErrorMsg(null), 8000);
    } finally {
      setIsFileParsing(false);
      if (configFileInputRef.current) {
        configFileInputRef.current.value = '';
      }
    }
  };

  const handleExtractFromUrl = async () => {
    const rawUrl = webLinkInput.trim();
    if (!rawUrl) return;

    setIsExtractingLink(true);
    setExtractErrorMsg(null);
    setExtractSuccessMsg(null);
    const toastId = toast.loading('Đang vượt tường lửa đọc link...');

    try {
      const result = await extractContentFromWebLink(rawUrl);
      if (result && result.content) {
        // Tự động phân loại và điền vào các trường cấu hình
        const updatedConfig: Partial<PromptConfig> = {
          sampleContent: result.content,
        };

        if (result.title) {
          updatedConfig.lessonTopic = result.title;
        }

        if (result.theorySummaryText && (!config.theoryContent || config.theoryContent.trim().length < 20)) {
          updatedConfig.theoryContent = result.theorySummaryText;
          setShowTheoryInput(true);
        }

        onChange({ ...config, ...updatedConfig });

        const partsSummary = [
          result.title ? `Chủ đề: "${result.title}"` : '',
          result.outline.length > 0 ? `Mục lục (${result.outline.length} mục)` : 'Mục lục tổng quan',
          result.vocabCount > 0 ? `${result.vocabCount} từ vựng` : '',
          'Lý thuyết trọng tâm'
        ].filter(Boolean).join(' • ');

        setExtractSuccessMsg(`Đã bóc tách & cấu trúc thành công: ${partsSummary}`);
        toast.dismiss(toastId);
        toast.success('Bóc tách thành công!');
        setTimeout(() => setExtractSuccessMsg(null), 8000);
      } else {
        toast.dismiss(toastId);
        toast.error('Không thể đọc nội dung (Website rỗng hoặc bị chặn).');
        throw new Error('Không trích xuất được nội dung bài học.');
      }
    } catch (err: any) {
      console.error('Web link extraction error:', err);
      toast.dismiss(toastId);
      toast.error(err?.message || 'Không thể cào dữ liệu từ liên kết này.');
      setExtractErrorMsg(err?.message || 'Không thể trích xuất nội dung từ liên kết này.');
      setTimeout(() => setExtractErrorMsg(null), 8000);
    } finally {
      setIsExtractingLink(false);
    }
  };

  const updateConfig = <K extends keyof PromptConfig>(key: K, value: PromptConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const toggleExamTarget = (target: ExamTarget) => {
    const next = config.examTargets.includes(target)
      ? config.examTargets.filter((t) => t !== target)
      : [...config.examTargets, target];
    updateConfig('examTargets', next);
  };

  const toggleStudyMode = (mode: StudyMode) => {
    const next = config.studyModes.includes(mode)
      ? config.studyModes.filter((m) => m !== mode)
      : [...config.studyModes, mode];
    updateConfig('studyModes', next);
  };

  const selectAllStudyModes = () => {
    updateConfig('studyModes', Object.keys(STUDY_MODE_CONFIGS) as StudyMode[]);
  };

  const clearAllStudyModes = () => {
    updateConfig('studyModes', []);
  };

  const toggleGame = (gameId: MiniGameId) => {
    const next = config.selectedGames.includes(gameId)
      ? config.selectedGames.filter((g) => g !== gameId)
      : [...config.selectedGames, gameId];
    updateConfig('selectedGames', next);
  };

  const selectAllGames = () => {
    updateConfig('selectedGames', Object.keys(MINI_GAME_CONFIGS) as MiniGameId[]);
  };

  const clearAllGames = () => {
    updateConfig('selectedGames', []);
  };

  const toggleSystemUtility = (util: SystemUtility) => {
    const next = config.systemUtilities.includes(util)
      ? config.systemUtilities.filter((u) => u !== util)
      : [...config.systemUtilities, util];
    updateConfig('systemUtilities', next);
  };

  const loadSampleVocab = () => {
    updateConfig('sampleContent', SAMPLE_VOCABULARY_DEFAULT);
    setShowAdvancedSample(true);
  };

  const clearSampleVocab = () => {
    updateConfig('sampleContent', '');
  };

  return (
    <div
      id="leftColumn"
      className="lg:col-span-7 flex flex-col h-full overflow-y-auto space-y-5 pr-1.5 pb-10 scrollbar-thin scrollbar-thumb"
    >
      {/* PHẦN 1: NỘI DUNG & MỤC TIÊU (Phong cách SaaS Tối Giản, Đồng Bộ) */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 #0E1116] border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-[13px] text-zinc-900 dark:text-white">1. Nội dung & Mục tiêu</h3>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-black">
            GDPT 2018
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cấp độ học (Custom Dropdown) */}
          <div className="space-y-2.5 relative" ref={gradeDropdownRef}>
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
              Cấp độ học
            </label>
            <button
              type="button"
              onClick={() => setIsGradeDropdownOpen(!isGradeDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white shadow-sm"
            >
              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                {[
                  { id: 'lop10', label: 'Lớp 10', tag: 'Nền tảng' },
                  { id: 'lop11', label: 'Lớp 11', tag: 'Mở rộng' },
                  { id: 'lop12', label: 'Lớp 12', tag: 'Chuyên sâu' },
                ].find(item => item.id === config.gradeLevel)?.label || 'Chọn cấp độ'}
              </span>
              <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isGradeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isGradeDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 backdrop-blur-md shadow-xl py-1">
                {[
                  { id: 'lop10', label: 'Lớp 10', tag: 'Nền tảng' },
                  { id: 'lop11', label: 'Lớp 11', tag: 'Mở rộng' },
                  { id: 'lop12', label: 'Lớp 12', tag: 'Chuyên sâu' },
                ].map((item) => {
                  const isSelected = config.gradeLevel === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        updateConfig('gradeLevel', item.id as GradeLevel);
                        setIsGradeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer flex items-center justify-between group ${isSelected ? 'text' : 'text  hover:bg'}`}
                      style={isSelected && config.primaryColor ? { backgroundColor: config.primaryColor } : (isSelected ? { backgroundColor: '#18181b' } : {})}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className={`font-semibold ${!isSelected ? 'group-hover:text' : ''}`}>
                          {item.label}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'text' : 'text-zinc-500 '}`}>
                          {item.tag}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Định hướng mục tiêu (Custom Dropdown Multi-Select) */}
          <div className="space-y-2.5 relative" ref={examDropdownRef}>
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                Định hướng mục tiêu
              </label>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">Nhiều lựa chọn</span>
            </div>
            <button
              type="button"
              onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white shadow-sm"
            >
              <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate pr-4">
                {config.examTargets.length > 0 
                  ? config.examTargets.map(t => [
                      { id: 'thptqg', label: 'THPT Quốc Gia' },
                      { id: 'ielts', label: 'IELTS Academic' },
                      { id: 'vact', label: 'ĐGNL (VACT)' },
                      { id: 'giaotiep', label: 'Giao tiếp thực tế' },
                    ].find(item => item.id === t)?.label).filter(Boolean).join(', ')
                  : 'Chọn mục tiêu'}
              </span>
              <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isExamDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isExamDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 backdrop-blur-md shadow-xl py-1">
                {[
                  { id: 'thptqg', label: 'THPT Quốc Gia', icon: '🏛️' },
                  { id: 'ielts', label: 'IELTS Academic', icon: '🎓' },
                  { id: 'vact', label: 'ĐGNL (VACT)', icon: '📊' },
                  { id: 'giaotiep', label: 'Giao tiếp thực tế', icon: '🗣️' },
                ].map((target) => {
                  const isSelected = config.examTargets.includes(target.id as ExamTarget);
                  return (
                    <button
                      type="button"
                      key={target.id}
                      onClick={() => toggleExamTarget(target.id as ExamTarget)}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer flex items-center justify-between group ${isSelected ? 'text' : 'text  hover:bg'}`}
                      style={isSelected && config.primaryColor ? { backgroundColor: config.primaryColor } : (isSelected ? { backgroundColor: '#18181b' } : {})}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{target.icon}</span>
                        <span className={`font-semibold ${!isSelected ? 'group-hover:text' : ''}`}>
                          {target.label}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Nguồn dữ liệu & Nhập liệu */}
        <div className="space-y-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Chủ đề bài học
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3 h-3 text-zinc-600 dark:text-zinc-400" /> Gợi ý:
                </span>
                {TOPIC_PRESETS.slice(0, 3).map((topic, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => updateConfig('lessonTopic', topic)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition border-zinc-200 dark:border-zinc-800 shrink-0 cursor-pointer"
                  >
                    {topic.split(' ')[0]} {topic.split(' ')[1]}...
                  </button>
                ))}
              </div>
            </div>
            <input
              id="lessonTopic"
              type="text"
              value={config.lessonTopic}
              onChange={(e) => updateConfig('lessonTopic', e.target.value)}
              placeholder="VD: Environment & Climate Change, Global Warming, AI & Technology..."
              className="w-full text-xs rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:bg focus:border-black dark:focus:border-white focus:outline-none transition"
            />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                  Dữ liệu nguồn (Copy & Paste)
                </label>
                <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border-zinc-200 dark:border-zinc-800 border-emerald-200/60">
                  Tự bóc tách
                </span>
              </div>
            </div>

            {/* Container kiểu ChatGPT */}
            <div className="flex flex-col border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/50 transition-shadow overflow-hidden">
              {/* Vùng văn bản không có ranh giới */}
              <textarea
                id="customContentData"
                ref={sampleContentRef}
                value={config.sampleContent}
                onChange={(e) => updateConfig('sampleContent', e.target.value)}
                onInput={(e) => {
                  const target = e.currentTarget;
                  target.style.height = 'auto';
                  target.style.height = `${Math.max(120, target.scrollHeight)}px`;
                }}
                placeholder="Dán danh sách từ vựng ngắt bằng dấu ':' hoặc '-' (VD: sustainable : bền vững - We need sustainable energy hoặc artificial intelligence - trí tuệ nhân tạo : AI helps study)..."
                className="w-full text-xs border-0 bg-transparent p-3.5 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-0 transition font-mono text-[11px] leading-relaxed resize-y"
                style={{ minHeight: '120px' }}
              />

              {/* Input file ẩn */}
              <input
                type="file"
                ref={configFileInputRef}
                accept=".txt,.pdf,.docx,.doc,.md,.csv,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleProcessUploadedDoc(file);
                }}
              />

              {/* Thanh công cụ nằm gọn ở đáy */}
              <div className="flex flex-wrap items-center justify-between p-2 bg-white dark:bg-zinc-950 border-t border-zinc-200/80 gap-2">
                
                {/* Các nút công cụ */}
                <div className="flex items-center gap-1">
                  {onOpenExtractor && (
                    <button
                      type="button"
                      onClick={onOpenExtractor}
                      title="Bóc tách 4 tầng"
                      className="p-1.5 rounded-lg text-black dark:text-white hover:bg-zinc-200-purple-900/40 transition cursor-pointer flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={loadSampleVocab}
                    title="Nạp mẫu 10 từ"
                    className="p-1.5 rounded-lg text-black dark:text-white hover:bg-zinc-200-indigo-900/40 transition cursor-pointer flex items-center justify-center"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isFileParsing || isExtractingLink}
                    onClick={() => configFileInputRef.current?.click()}
                    title="Tải File (.txt, .pdf, .docx, ...)"
                    className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg transition cursor-pointer disabled:opacity-50 flex items-center justify-center"
                  >
                    {isFileParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
                  </button>
                  {config.sampleContent && (
                    <button
                      type="button"
                      onClick={clearSampleVocab}
                      title="Xóa nội dung"
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100-rose-900/40 transition cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Ô nhập Link & nút Lấy Link */}
                <div className="flex items-center gap-1.5 flex-1 max-w-[280px]">
                  <div className="relative w-full">
                    <LinkIcon className="w-3.5 h-3.5 absolute left-2 top-2 text-zinc-500 dark:text-zinc-400" />
                    <input
                      type="text"
                      value={webLinkInput}
                      onChange={(e) => {
                        setWebLinkInput(e.target.value);
                        if (extractErrorMsg) setExtractErrorMsg(null);
                      }}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter' && webLinkInput.trim()) {
                          await handleExtractFromUrl();
                        }
                      }}
                      placeholder="Dán Link bài học..."
                      className="w-full text-[11px] rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pl-7 pr-2 py-1.5 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isExtractingLink || isFileParsing || !webLinkInput.trim()}
                    onClick={async () => {
                      if (webLinkInput.trim()) {
                        await handleExtractFromUrl();
                      } else {
                        onOpenExtractor?.();
                      }
                    }}
                    title="Lấy dữ liệu từ Link"
                    className="p-1.5 rounded-lg bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black transition shadow-xs cursor-pointer disabled:opacity-50 disabled:bg-zinc-200 flex items-center justify-center"
                  >
                    {isExtractingLink ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Thông báo kết quả trích xuất */}
            {extractSuccessMsg && (
              <div className="flex items-start gap-1.5 text-[11px] text-emerald-600 bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 border-emerald-200/80 animate-fadeIn">
                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="font-medium">{extractSuccessMsg}</span>
              </div>
            )}
            {extractErrorMsg && (
              <div className="flex items-start gap-1.5 text-[11px] text-rose-600 bg-rose-50 p-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 border-rose-200/80 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{extractErrorMsg}</p>
                  <p className="text-[10px] opacity-80 mt-0.5">Mẹo: Bạn có thể copy (Ctrl+C) trực tiếp văn bản từ trang web rồi dán (Ctrl+V) vào ô phía trên.</p>
                </div>
              </div>
            )}
          </div>

          {/* Lý thuyết & Quy tắc Ngữ pháp Trọng tâm */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <button
                type="button"
                onClick={() => setShowTheoryInput(!showTheoryInput)}
                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 hover:text-white transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>Lý thuyết & Quy tắc Ngữ pháp trọng tâm (Tùy chọn)</span>
                {config.theoryContent && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Đã có nội dung lý thuyết" />
                )}
                {showTheoryInput ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
              </button>
              {config.theoryContent && (
                <button
                  type="button"
                  onClick={() => updateConfig('theoryContent', '')}
                  className="text-[11px] text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Xóa lý thuyết
                </button>
              )}
            </div>

            {showTheoryInput && (
              <div className="space-y-2 mt-2">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Nạp mẫu lý thuyết:
                  </span>
                  {THEORY_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => updateConfig('theoryContent', preset.content)}
                      className="text-[10px] px-2 py-1 rounded-md bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition border-zinc-200 dark:border-zinc-800 font-medium cursor-pointer"
                    >
                      {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
                    </button>
                  ))}
                </div>

                <textarea
                  ref={theoryContentRef}
                  value={config.theoryContent}
                  onChange={(e) => updateConfig('theoryContent', e.target.value)}
                  onInput={(e) => {
                    const target = e.currentTarget;
                    target.style.height = 'auto';
                    target.style.height = `${Math.max(90, target.scrollHeight)}px`;
                  }}
                  placeholder="Nhập hoặc dán quy tắc ngữ pháp, công thức, bẫy sai bài học vào đây (Đảo ngữ, Mệnh đề quan hệ rút gọn...)"
                  className="w-full p-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder:text-zinc-500 font-mono text-[11px] leading-relaxed focus:bg focus:border-black dark:focus:border-white focus:outline-none transition resize-y"
                  style={{ minHeight: '90px' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PHẦN 2: THIẾT KẾ GIAO DIỆN & TÙY CHỈNH MÀU SẮC (SaaS Tối Giản) */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 #0E1116] border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-[13px] text-zinc-900 dark:text-white">
            2. Giao diện & Trải nghiệm
          </h3>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-black">
            Design System
          </span>
        </div>

        {/* 1. Bảng màu phối sẵn (Presets) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Bảng màu chủ đạo
            </label>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
              {COLOR_THEME_OPTIONS.find(t => t.id === config.colorTheme)?.name || 'Tùy chỉnh'}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {COLOR_THEME_OPTIONS.map((theme) => {
              const isSelected = config.colorTheme === theme.id;
              return (
                <button
                  type="button"
                  key={theme.id}
                  title={theme.name}
                  onClick={() => {
                    onChange({
                      ...config,
                      colorTheme: theme.id as ColorTheme,
                      primaryColor: theme.primary,
                      accentColor: theme.secondary,
                    });
                  }}
                  className={`w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-sm focus:outline-none ${
                    isSelected ? 'ring-2 ring-offset-2 ring  ' : 'ring-1 ring '
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* 2. Tùy biến mã màu HEX (Color Picker) */}
        <div className="p-4 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Mã màu HEX tùy chỉnh
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                <span
                  className="w-3.5 h-3.5 rounded-md border-zinc-200 dark:border-zinc-800 border shadow-2xs"
                  style={{ backgroundColor: config.primaryColor }}
                />
                <span>{config.primaryColor}</span>
              </div>
              <span className="text-zinc-600 dark:text-zinc-400">•</span>
              <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                <span
                  className="w-3.5 h-3.5 rounded-md border-zinc-200 dark:border-zinc-800 border shadow-2xs"
                  style={{ backgroundColor: config.accentColor }}
                />
                <span>{config.accentColor}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Primary Color */}
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-950 p-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 focus-within:border transition">
              <div className="relative shrink-0">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => {
                    onChange({
                      ...config,
                      primaryColor: e.target.value,
                      colorTheme: 'custom',
                    });
                  }}
                  className="w-7 h-7 rounded-md cursor-pointer border-0 p-0 bg-transparent block"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  Màu chủ đạo (Primary)
                </span>
                <input
                  type="text"
                  value={config.primaryColor}
                  onChange={(e) => {
                    onChange({
                      ...config,
                      primaryColor: e.target.value,
                      colorTheme: 'custom',
                    });
                  }}
                  className="w-full text-xs font-mono font-bold bg-transparent text-zinc-900 dark:text-white focus:outline-none"
                  placeholder="#18181b"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-950 p-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 focus-within:border transition">
              <div className="relative shrink-0">
                <input
                  type="color"
                  value={config.accentColor}
                  onChange={(e) => {
                    onChange({
                      ...config,
                      accentColor: e.target.value,
                      colorTheme: 'custom',
                    });
                  }}
                  className="w-7 h-7 rounded-md cursor-pointer border-0 p-0 bg-transparent block"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  Màu phụ trợ (Accent)
                </span>
                <input
                  type="text"
                  value={config.accentColor}
                  onChange={(e) => {
                    onChange({
                      ...config,
                      accentColor: e.target.value,
                      colorTheme: 'custom',
                    });
                  }}
                  className="w-full text-xs font-mono font-bold bg-transparent text-zinc-900 dark:text-white focus:outline-none"
                  placeholder="#27272a"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Phong cách giao diện (UI Style Cards) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Phong cách giao diện
            </label>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
              {UI_STYLE_OPTIONS.find(s => s.id === config.uiStyle)?.name}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {UI_STYLE_OPTIONS.map((style) => {
              const isSelected = config.uiStyle === style.id;
              return (
                <button
                  type="button"
                  key={style.id}
                  onClick={() => updateConfig('uiStyle', style.id as UIStyle)}
                  className={`flex flex-col items-start p-3.5 rounded-xl border-zinc-200 text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border  bg-white  shadow-sm ring-1 ring '
                      : 'border  hover:border-zinc-300 bg-white  hover:bg'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className={`text-xs font-semibold ${isSelected ? 'text  font-bold' : 'text '}`}>
                      {style.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-white dark:bg-zinc-950 text flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {style.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Font chữ hiển thị (Custom Dropdown Menu) */}
        <div className="space-y-2.5 relative" ref={fontDropdownRef}>
          <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
            Font chữ hiển thị
          </label>
          <button
            type="button"
            onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white shadow-sm"
          >
            <span className="text-xs font-semibold text-zinc-900 dark:text-white" style={{ fontFamily: `"${FONT_OPTIONS.find(f => f.id === config.fontChoice)?.name}", sans-serif` }}>
              {FONT_OPTIONS.find(f => f.id === config.fontChoice)?.name}
            </span>
            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isFontDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isFontDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 backdrop-blur-md shadow-xl max-h-64 overflow-y-auto py-1 custom-scrollbar">
              {FONT_OPTIONS.map((font) => {
                const isSelected = config.fontChoice === font.id;
                return (
                  <button
                    type="button"
                    key={font.id}
                    onClick={() => {
                      updateConfig('fontChoice', font.id as FontChoice);
                      setIsFontDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer flex items-center justify-between group ${isSelected ? 'text' : 'text  hover:bg'}`}
                    style={isSelected && config.primaryColor ? { backgroundColor: config.primaryColor } : (isSelected ? { backgroundColor: '#18181b' } : {})}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className={`font-semibold ${!isSelected ? 'group-hover:text' : ''}`} style={{ fontFamily: `"${font.name}", sans-serif` }}>
                        {font.name}
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'text' : 'text-zinc-500 '} line-clamp-1`}>
                        {font.desc}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Tiện ích hệ thống tích hợp */}
        <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Tiện ích hệ thống tích hợp
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SYSTEM_UTILITY_OPTIONS.map((util) => {
              const isChecked = config.systemUtilities.includes(util.id as SystemUtility);
              return (
                <label
                  key={util.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border-zinc-200 cursor-pointer transition-all ${
                    isChecked
                      ? 'border  bg-white '
                      : 'border  hover:border-zinc-300 bg-white '
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSystemUtility(util.id as SystemUtility)}
                    className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-xs block text-zinc-900 dark:text-white group-hover:text">
                      {util.label}
                    </span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {util.desc}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* PHẦN 3: CHẾ ĐỘ HỌC THUẬT */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 #0E1116] border-zinc-200 dark:border-zinc-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-[13px] text-zinc-900 dark:text-white">
            3. Chế độ học thuật
          </h3>
          <div className="flex gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
            <button
              type="button"
              onClick={selectAllStudyModes}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={clearAllStudyModes}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Chế độ 0 (Bắt buộc): Form Nạp dữ liệu */}
          <label className="flex items-start gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('doc_extractor')}
              onChange={() => toggleStudyMode('doc_extractor')}
              className="mt-0.5 w-3.5 h-3.5 text-black dark:text-white bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-900-indigo-200">
                  Form Nạp Dữ Liệu
                </p>
                <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded">
                  Bắt buộc
                </span>
              </div>
              <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                Khung nhập liệu & Bóc tách từ vựng
              </p>
            </div>
          </label>

          {/* Chế độ 1: Flashcard 3D */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('flashcard3d')}
              onChange={() => toggleStudyMode('flashcard3d')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2 cursor-pointer"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Flashcard 3D
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Lật thẻ từ vựng thông minh
              </p>
            </div>
          </label>

          {/* Chế độ 2: Active Recall */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('active_recall')}
              onChange={() => toggleStudyMode('active_recall')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2 cursor-pointer"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Active Recall
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Trắc nghiệm phản xạ nhanh
              </p>
            </div>
          </label>

          {/* Chế độ 3: Exam Mode */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('exam_mode')}
              onChange={() => toggleStudyMode('exam_mode')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2 cursor-pointer"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Exam Mode
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Thi thử có tính giờ
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* PHẦN 4: GAMIFICATION (Bỏ Emoji, Giao diện Clean) */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 #0E1116] border-zinc-200 dark:border-zinc-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-[13px] text-zinc-900 dark:text-white">4. Gamification</h3>
          <div className="flex gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
            <button
              type="button"
              onClick={selectAllGames}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={clearAllGames}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Game 1: Block Puzzle */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('tetris')}
              onChange={() => toggleGame('tetris')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Block Puzzle
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Xếp gạch theo từ loại</p>
            </div>
          </label>

          {/* Game 2: Dino Runner */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('dino')}
              onChange={() => toggleGame('dino')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Dino Runner
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Khủng long vượt ải</p>
            </div>
          </label>

          {/* Game 3: Penalty Shootout */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('penalty')}
              onChange={() => toggleGame('penalty')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Penalty Shootout
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Sút phạt trắc nghiệm</p>
            </div>
          </label>

          {/* Game 4: Speed True/False */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('truefalse')}
              onChange={() => toggleGame('truefalse')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Speed True/False
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Phản xạ thời gian thực</p>
            </div>
          </label>

          {/* Game 5: Sentence Builder */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('scramble')}
              onChange={() => toggleGame('scramble')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Sentence Builder
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Sắp xếp cấu trúc ngữ pháp</p>
            </div>
          </label>

          {/* Game 6: Word Match & Cloze */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('dragdrop')}
              onChange={() => toggleGame('dragdrop')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Word Match & Cloze
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Nối từ & Điền khuyết ngữ cảnh</p>
            </div>
          </label>

          {/* Game 7: Hangman */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer transition-all group md:col-span-2">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('hangman')}
              onChange={() => toggleGame('hangman')}
              className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text">
                Hangman Vocabulary
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Đoán ký tự & Khám phá định nghĩa</p>
            </div>
          </label>
        </div>
      </div>

      {/* PHẦN 5: CẤU HÌNH KỸ THUẬT & OUTPUT FORMAT (SaaS Tối Giản) */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 #0E1116] border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-[13px] text-zinc-900 dark:text-white">
            5. Cấu hình kỹ thuật
          </h3>
          <div className="flex items-center gap-3">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-rose-500 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Khôi phục mặc định
              </button>
            )}
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-black">
              Export Engine
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Định dạng output */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Định dạng ứng dụng tạo ra
            </label>
            <select
              value={config.outputFormat}
              onChange={(e) => updateConfig('outputFormat', e.target.value as OutputFormat)}
              className="w-full text-xs bg-transparent border-b border-zinc-200 dark:border-zinc-800 pb-2 text-zinc-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-hidden transition-colors cursor-pointer"
            >
              <option value="single_file_html">Single-file HTML (Chạy độc lập)</option>
              <option value="react_applet">React + TypeScript Applet (Hiện đại)</option>
              <option value="modular_system">Modular ES6 + Web Components</option>
            </select>
          </div>
          
          {/* Chiến lược xuất Prompt */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Chiến lược xuất Prompt
            </label>
            <select
              value={config.promptStrategy || 'single'}
              onChange={(e) => updateConfig('promptStrategy', e.target.value as any)}
              className="w-full text-xs bg-transparent border-b border-zinc-200 dark:border-zinc-800 pb-2 text-zinc-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-hidden transition-colors cursor-pointer"
            >
              <option value="single">Toàn bộ (1 File)</option>
              <option value="modular_3_parts">Chia nhỏ 3 phần (Chống lỗi đứt đoạn code)</option>
            </select>
          </div>


        </div>

        {/* Strict Code Quality Notice */}
        <label className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 transition group">
          <input
            type="checkbox"
            checked={config.strictCompleteCode}
            onChange={(e) => updateConfig('strictCompleteCode', e.target.checked)}
            className="mt-0.5 w-3.5 h-3.5 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 rounded focus:ring-black dark:focus:ring-white focus:ring-2"
          />
          <div className="text-xs">
            <span className="font-semibold text-zinc-900 dark:text-white group-hover:text block">
              Bắt buộc xuất mã nguồn hoàn chỉnh 100% (No TODOs / Placeholders)
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 block leading-relaxed">
              Yêu cầu AI sinh toàn bộ mã thực thi, các hàm xử lý mini-games và dữ liệu học tập đầy đủ không cắt ngắn.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
