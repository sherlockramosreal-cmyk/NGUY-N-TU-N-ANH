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

interface ConfigurationAreaProps {
  config: PromptConfig;
  onChange: (updated: PromptConfig) => void;
  onOpenExtractor?: () => void;
}

export default function ConfigurationArea({ config, onChange, onOpenExtractor }: ConfigurationAreaProps) {
  const [showTheoryInput, setShowTheoryInput] = useState(true);
  const [showAdvancedSample, setShowAdvancedSample] = useState(false);
  const [webLinkInput, setWebLinkInput] = useState('');
  const [isExtractingLink, setIsExtractingLink] = useState(false);
  const [extractSuccessMsg, setExtractSuccessMsg] = useState<string | null>(null);
  const [extractErrorMsg, setExtractErrorMsg] = useState<string | null>(null);

  const sampleContentRef = useRef<HTMLTextAreaElement | null>(null);
  const theoryContentRef = useRef<HTMLTextAreaElement | null>(null);

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

  const handleExtractFromUrl = async () => {
    const rawUrl = webLinkInput.trim();
    if (!rawUrl) return;

    setIsExtractingLink(true);
    setExtractErrorMsg(null);
    setExtractSuccessMsg(null);

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
        setTimeout(() => setExtractSuccessMsg(null), 8000);
      } else {
        throw new Error('Không trích xuất được nội dung bài học.');
      }
    } catch (err: any) {
      console.error('Web link extraction error:', err);
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
      className="lg:col-span-7 flex flex-col h-full overflow-y-auto space-y-5 pr-1.5 pb-10 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
    >
      {/* PHẦN 1: NỘI DUNG & MỤC TIÊU (Phong cách SaaS Tối Giản, Đồng Bộ) */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0E1116] border border-slate-200 dark:border-slate-800/60 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <h3 className="font-semibold text-[13px] text-slate-900 dark:text-slate-100">1. Nội dung & Mục tiêu</h3>
          <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
            GDPT 2018
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cấp độ học */}
          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Cấp độ học
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
              {[
                { id: 'lop10', label: 'Lớp 10', tag: 'Nền tảng' },
                { id: 'lop11', label: 'Lớp 11', tag: 'Mở rộng' },
                { id: 'lop12', label: 'Lớp 12', tag: 'Chuyên sâu' },
              ].map((item) => {
                const isSelected = config.gradeLevel === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateConfig('gradeLevel', item.id as GradeLevel)}
                    className={`py-2 px-2 text-xs font-semibold rounded-md transition-all text-center flex flex-col items-center justify-center cursor-pointer select-none ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[9px] font-normal mt-0.5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Định hướng mục tiêu */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Định hướng mục tiêu
              </label>
              <span className="text-[10px] text-slate-400 font-normal">Được chọn nhiều</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
              {[
                { id: 'thptqg', label: 'THPT Quốc Gia', icon: '🏛️' },
                { id: 'ielts', label: 'IELTS Academic', icon: '🎓' },
                { id: 'vact', label: 'ĐGNL (VACT)', icon: '📊' },
                { id: 'giaotiep', label: 'Giao tiếp thực tế', icon: '🗣️' },
              ].map((target) => {
                const isSelected = config.examTargets.includes(target.id as ExamTarget);
                return (
                  <button
                    key={target.id}
                    type="button"
                    onClick={() => toggleExamTarget(target.id as ExamTarget)}
                    className={`py-2 px-2 text-xs font-semibold rounded-md transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <span className="text-xs">{target.icon}</span>
                    <span className="truncate">{target.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Nguồn dữ liệu & Nhập liệu */}
        <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Chủ đề bài học
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> Gợi ý:
                </span>
                {TOPIC_PRESETS.slice(0, 3).map((topic, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => updateConfig('lessonTopic', topic)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition border border-slate-200/80 dark:border-slate-800 shrink-0 cursor-pointer"
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
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-3.5 py-2.5 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Dữ liệu nguồn (Copy & Paste)
                </label>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60">
                  Tự bóc tách
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadSampleVocab}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Nạp mẫu 10 từ
                </button>
                {config.sampleContent && (
                  <button
                    type="button"
                    onClick={clearSampleVocab}
                    className="text-[11px] text-rose-500 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Xóa
                  </button>
                )}
                {onOpenExtractor && (
                  <button
                    type="button"
                    onClick={onOpenExtractor}
                    className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md border border-purple-200/80 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/40 flex items-center gap-1 transition cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> Bóc tách 4 tầng
                  </button>
                )}
              </div>
            </div>

            {/* Ô nhập Text */}
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
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none transition font-mono text-[11px] leading-relaxed resize-y"
              style={{ minHeight: '120px' }}
            />

            {/* Ô dán Link kèm nút bấm */}
            <div className="space-y-2 pt-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
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
                    placeholder="Dán Link bài học (Web, Wikipedia, Google Docs công khai)..."
                    className="w-full text-[11px] rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-8 pr-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-slate-400 transition"
                  />
                </div>
                <button
                  type="button"
                  disabled={isExtractingLink}
                  onClick={async () => {
                    if (webLinkInput.trim()) {
                      await handleExtractFromUrl();
                    } else {
                      onOpenExtractor?.();
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-[11px] font-semibold rounded-lg transition whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
                >
                  {isExtractingLink ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang trích xuất...
                    </>
                  ) : (
                    'Trích xuất link'
                  )}
                </button>
              </div>

              {extractSuccessMsg && (
                <div className="flex items-start gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200/80 dark:border-emerald-800/80 animate-fadeIn">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="font-medium">{extractSuccessMsg}</span>
                </div>
              )}

              {extractErrorMsg && (
                <div className="flex items-start gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200/80 dark:border-rose-800/80 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{extractErrorMsg}</p>
                    <p className="text-[10px] opacity-80 mt-0.5">Mẹo: Bạn có thể copy (Ctrl+C) trực tiếp văn bản từ trang web rồi dán (Ctrl+V) vào ô phía trên.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lý thuyết & Quy tắc Ngữ pháp Trọng tâm */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <button
                type="button"
                onClick={() => setShowTheoryInput(!showTheoryInput)}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Lý thuyết & Quy tắc Ngữ pháp trọng tâm (Tùy chọn)</span>
                {config.theoryContent && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Đã có nội dung lý thuyết" />
                )}
                {showTheoryInput ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
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
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Nạp mẫu lý thuyết:
                  </span>
                  {THEORY_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => updateConfig('theoryContent', preset.content)}
                      className="text-[10px] px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 transition border border-slate-200/80 dark:border-slate-800 font-medium cursor-pointer"
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
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono text-[11px] leading-relaxed focus:bg-white dark:focus:bg-slate-900 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-none transition resize-y"
                  style={{ minHeight: '90px' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PHẦN 2: THIẾT KẾ GIAO DIỆN & TÙY CHỈNH MÀU SẮC (SaaS Tối Giản) */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0E1116] border border-slate-200 dark:border-slate-800/60 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <h3 className="font-semibold text-[13px] text-slate-900 dark:text-slate-100">
            2. Giao diện & Trải nghiệm
          </h3>
          <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
            Design System
          </span>
        </div>

        {/* 1. Bảng màu phối sẵn (Presets) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Bảng màu chủ đạo
            </label>
            <span className="text-[10px] text-slate-400">
              {COLOR_THEME_OPTIONS.find(t => t.id === config.colorTheme)?.name || 'Tùy chỉnh'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {COLOR_THEME_OPTIONS.map((theme) => {
              const isSelected = config.colorTheme === theme.id;
              return (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => {
                    onChange({
                      ...config,
                      colorTheme: theme.id as ColorTheme,
                      primaryColor: theme.primary,
                      accentColor: theme.secondary,
                    });
                  }}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-slate-900 dark:border-slate-200 bg-slate-100/90 dark:bg-slate-800/90 shadow-sm ring-1 ring-slate-900/10 dark:ring-white/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center -space-x-1.5">
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-xs"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-xs"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-semibold block truncate w-full ${isSelected ? 'text-slate-950 dark:text-white font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                    {theme.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate w-full mt-0.5">
                    {theme.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Tùy biến mã màu HEX (Color Picker) */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Mã màu HEX tùy chỉnh
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span
                  className="w-3.5 h-3.5 rounded-md border border-slate-300 dark:border-slate-600 shadow-2xs"
                  style={{ backgroundColor: config.primaryColor }}
                />
                <span>{config.primaryColor}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span
                  className="w-3.5 h-3.5 rounded-md border border-slate-300 dark:border-slate-600 shadow-2xs"
                  style={{ backgroundColor: config.accentColor }}
                />
                <span>{config.accentColor}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Primary Color */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 focus-within:border-slate-400 dark:focus-within:border-slate-600 transition">
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
                <span className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
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
                  className="w-full text-xs font-mono font-bold bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                  placeholder="#4f46e5"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 focus-within:border-slate-400 dark:focus-within:border-slate-600 transition">
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
                <span className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
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
                  className="w-full text-xs font-mono font-bold bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                  placeholder="#7c3aed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Phong cách giao diện (UI Style Cards) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Phong cách giao diện
            </label>
            <span className="text-[10px] text-slate-400">
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
                  className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-slate-900 dark:border-slate-200 bg-slate-100/90 dark:bg-slate-800/90 shadow-sm ring-1 ring-slate-900/10 dark:ring-white/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className={`text-xs font-semibold ${isSelected ? 'text-slate-950 dark:text-white font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                      {style.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {style.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Font chữ hiển thị (Typography Cards) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Font chữ hiển thị
            </label>
            <span className="text-[10px] text-slate-400">
              {FONT_OPTIONS.find(f => f.id === config.fontChoice)?.name}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {FONT_OPTIONS.map((font) => {
              const isSelected = config.fontChoice === font.id;
              return (
                <button
                  type="button"
                  key={font.id}
                  onClick={() => updateConfig('fontChoice', font.id as FontChoice)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-slate-900 dark:border-slate-200 bg-slate-100/90 dark:bg-slate-800/90 shadow-sm ring-1 ring-slate-900/10 dark:ring-white/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Aa
                    </span>
                    {isSelected && (
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-[9px]">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-semibold block truncate w-full ${isSelected ? 'text-slate-950 dark:text-white font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                    {font.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                    {font.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Tiện ích hệ thống tích hợp */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Tiện ích hệ thống tích hợp
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SYSTEM_UTILITY_OPTIONS.map((util) => {
              const isChecked = config.systemUtilities.includes(util.id as SystemUtility);
              return (
                <label
                  key={util.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'border-slate-900/40 dark:border-slate-500 bg-slate-50 dark:bg-slate-800/70'
                      : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/20 dark:bg-slate-900/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSystemUtility(util.id as SystemUtility)}
                    className="mt-0.5 w-3.5 h-3.5 text-slate-900 bg-white border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-xs block text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                      {util.label}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
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
      <div className="p-6 rounded-xl bg-white dark:bg-[#0E1116] border border-slate-200 dark:border-slate-800/60 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <h3 className="font-semibold text-[13px] text-slate-900 dark:text-slate-100">
            3. Chế độ học thuật
          </h3>
          <div className="flex gap-3 text-[11px] text-slate-500">
            <button
              type="button"
              onClick={selectAllStudyModes}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={clearAllStudyModes}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Chế độ 0 (Bắt buộc): Form Nạp dữ liệu */}
          <label className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('doc_extractor')}
              onChange={() => toggleStudyMode('doc_extractor')}
              className="mt-0.5 w-3.5 h-3.5 text-indigo-600 bg-white border-indigo-300 rounded focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 group-hover:text-indigo-900 dark:group-hover:text-indigo-200">
                  Form Nạp Dữ Liệu
                </p>
                <span className="text-[9px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.5 rounded">
                  Bắt buộc
                </span>
              </div>
              <p className="text-[10px] text-indigo-600/80 dark:text-indigo-400/80 mt-0.5">
                Khung nhập liệu & Bóc tách từ vựng
              </p>
            </div>
          </label>

          {/* Chế độ 1: Flashcard 3D */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('flashcard3d')}
              onChange={() => toggleStudyMode('flashcard3d')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 cursor-pointer"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Flashcard 3D
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Lật thẻ từ vựng thông minh
              </p>
            </div>
          </label>

          {/* Chế độ 2: Active Recall */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('active_recall')}
              onChange={() => toggleStudyMode('active_recall')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 cursor-pointer"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Active Recall
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Trắc nghiệm phản xạ nhanh
              </p>
            </div>
          </label>

          {/* Chế độ 3: Exam Mode */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.studyModes.includes('exam_mode')}
              onChange={() => toggleStudyMode('exam_mode')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2 cursor-pointer"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Exam Mode
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Thi thử có tính giờ
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* PHẦN 4: GAMIFICATION (Bỏ Emoji, Giao diện Clean) */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0E1116] border border-slate-200 dark:border-slate-800/60 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <h3 className="font-semibold text-[13px] text-slate-900 dark:text-slate-100">4. Gamification</h3>
          <div className="flex gap-3 text-[11px] text-slate-500">
            <button
              type="button"
              onClick={selectAllGames}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              onClick={clearAllGames}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Game 1: Block Puzzle */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('tetris')}
              onChange={() => toggleGame('tetris')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Block Puzzle
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Xếp gạch theo từ loại</p>
            </div>
          </label>

          {/* Game 2: Dino Runner */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('dino')}
              onChange={() => toggleGame('dino')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Dino Runner
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Khủng long vượt ải</p>
            </div>
          </label>

          {/* Game 3: Penalty Shootout */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('penalty')}
              onChange={() => toggleGame('penalty')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Penalty Shootout
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Sút phạt trắc nghiệm</p>
            </div>
          </label>

          {/* Game 4: Speed True/False */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('truefalse')}
              onChange={() => toggleGame('truefalse')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Speed True/False
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Phản xạ thời gian thực</p>
            </div>
          </label>

          {/* Game 5: Sentence Builder */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('scramble')}
              onChange={() => toggleGame('scramble')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Sentence Builder
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Sắp xếp cấu trúc ngữ pháp</p>
            </div>
          </label>

          {/* Game 6: Word Match & Cloze */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('dragdrop')}
              onChange={() => toggleGame('dragdrop')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Word Match & Cloze
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Nối từ & Điền khuyết ngữ cảnh</p>
            </div>
          </label>

          {/* Game 7: Hangman */}
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group md:col-span-2">
            <input
              type="checkbox"
              checked={config.selectedGames.includes('hangman')}
              onChange={() => toggleGame('hangman')}
              className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
            />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                Hangman Vocabulary
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Đoán ký tự & Khám phá định nghĩa</p>
            </div>
          </label>
        </div>
      </div>

      {/* PHẦN 5: CẤU HÌNH KỸ THUẬT & OUTPUT FORMAT (SaaS Tối Giản) */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0E1116] border border-slate-200 dark:border-slate-800/60 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <h3 className="font-semibold text-[13px] text-slate-900 dark:text-slate-100">
            5. Cấu hình kỹ thuật
          </h3>
          <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
            Export Engine
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Định dạng output */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
              Định dạng ứng dụng tạo ra
            </label>
            <select
              value={config.outputFormat}
              onChange={(e) => updateConfig('outputFormat', e.target.value as OutputFormat)}
              className="w-full text-xs bg-transparent border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-800 dark:text-slate-200 focus:border-slate-900 dark:focus:border-slate-400 focus:outline-hidden transition-colors cursor-pointer"
            >
              <option value="single_file_html">Single-file HTML (Chạy độc lập)</option>
              <option value="react_applet">React + TypeScript Applet (Hiện đại)</option>
              <option value="modular_system">Modular ES6 + Web Components</option>
            </select>
          </div>

          {/* Số lượng từ vựng */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                Số lượng từ khởi tạo
              </label>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">
                {config.vocabCount} từ
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={config.vocabCount}
              onChange={(e) => updateConfig('vocabCount', parseInt(e.target.value, 10))}
              className="w-full accent-slate-800 dark:accent-slate-200 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5 từ (Nhanh)</span>
              <span>10 từ (Chuẩn)</span>
              <span>25 từ (Sâu)</span>
            </div>
          </div>
        </div>

        {/* Strict Code Quality Notice */}
        <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition group">
          <input
            type="checkbox"
            checked={config.strictCompleteCode}
            onChange={(e) => updateConfig('strictCompleteCode', e.target.checked)}
            className="mt-0.5 w-3.5 h-3.5 text-slate-800 bg-slate-100 border-slate-300 rounded focus:ring-slate-500 dark:bg-slate-700 dark:border-slate-600 focus:ring-2"
          />
          <div className="text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white block">
              Bắt buộc xuất mã nguồn hoàn chỉnh 100% (No TODOs / Placeholders)
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
              Yêu cầu AI sinh toàn bộ mã thực thi, các hàm xử lý mini-games và dữ liệu học tập đầy đủ không cắt ngắn.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
