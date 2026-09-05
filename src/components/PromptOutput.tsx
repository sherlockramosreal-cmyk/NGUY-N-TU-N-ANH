import React, { useState } from 'react';
import {
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Download,
  Terminal,
  FileCode,
  Eye,
  FileText,
  Sparkles,
  Zap,
  Layers,
  Code2,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PromptConfig } from '../types';
import { trackExportAction } from '../utils/analytics';

interface PromptOutputProps {
  promptContent: string | string[];
  config: PromptConfig;
  onOpenVideo?: () => void;
}

export default function PromptOutput({ promptContent, config, onOpenVideo }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const [copyWarning, setCopyWarning] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'prompt' | 'preview' | 'json'>('prompt');
  const [activeTab, setActiveTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const isModular = Array.isArray(promptContent);
  const currentPromptContent = isModular ? (promptContent as string[])[activeTab] : (promptContent as string);
  const allPrompts = isModular ? (promptContent as string[]) : [promptContent as string];

  const charCount = currentPromptContent.length;
  const wordCount = currentPromptContent.trim().split(/\s+/).filter(Boolean).length;
  const estTokens = Math.round(charCount / 3.8); // Rough estimation for mixed Vietnamese/English prompt

  const isEmpty = config.studyModes.length === 0 && config.selectedGames.length === 0;

  const handleCopy = async () => {
    if (isEmpty) {
      setCopyWarning('Vui lòng chọn ít nhất 1 chế độ học hoặc 1 mini-game trước khi sao chép!');
      setTimeout(() => setCopyWarning(null), 4000);
      return;
    }

    try {
      await navigator.clipboard.writeText(currentPromptContent);
      setCopied(true);
      setCopyWarning(null);
      trackExportAction('copy_prompt');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentPromptContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setCopyWarning(null);
      trackExportAction('copy_prompt');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (format: 'txt' | 'md') => {
    if (isEmpty) {
      setCopyWarning('Vui lòng chọn ít nhất 1 chế độ học hoặc 1 mini-game trước khi tải prompt!');
      setTimeout(() => setCopyWarning(null), 4000);
      return;
    }

    trackExportAction(format === 'txt' ? 'download_txt' : 'download_md');

    const filename = isModular 
      ? `Prompt_TaoWeb_TuHoc_${config.gradeLevel}_Part${activeTab + 1}_${Date.now()}.${format}`
      : `Prompt_TaoWeb_TuHoc_${config.gradeLevel}_${Date.now()}.${format}`;
    const blob = new Blob([currentPromptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate JSON preview
  const jsonPreview = JSON.stringify(
    {
      version: 'Prompt-TaoWeb-TuHoc-NCKH-2026',
      target: {
        grade: config.gradeLevel,
        examOrientations: config.examTargets,
        topic: config.lessonTopic,
        vocabCount: config.vocabCount,
      },
      theoryRules: config.theoryContent ? 'Custom theory provided' : 'Auto-generated',
      academicModes: config.studyModes,
      gamificationArcade: {
        totalSelected: config.selectedGames.length,
        games: config.selectedGames,
      },
      system: {
        theme: config.colorTheme,
        primaryColor: config.primaryColor,
        accentColor: config.accentColor,
        style: config.uiStyle,
        font: config.fontChoice,
        utilities: config.systemUtilities,
        outputFormat: config.outputFormat,
        strict100PercentCode: config.strictCompleteCode,
      },
    },
    null,
    2
  );

  return (
    <div
      id="tour-prompt-output"
      className={`lg:col-span-5 flex flex-col rounded-2xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xl overflow-hidden transition-all duration-300 ${
        isExpanded
          ? "fixed inset-0 z-[100] border-0 rounded-none h-[100dvh] w-full flex flex-col"
          : "border border-zinc-200 dark:border-zinc-800 h-full min-h-0 relative flex flex-col"
      }`}
    >
      {/* Top Bar with Live Indicator & Action Buttons */}
      <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black dark:bg-white"></span>
          </span>
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            Master Prompt Real-time
          </span>
        </div>

        {isModular && (
          <div className="flex items-center bg-white dark:bg-zinc-950 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] ml-auto mr-3 shrink-0">
            {allPrompts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1 rounded-lg font-medium transition flex items-center gap-1.5 ${
                  activeTab === idx ? 'bg-black text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Layers className="w-3 h-3" />
                Prompt {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* View mode toggle tabs */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg text-[11px] ml-auto md:ml-0 shrink-0">
          <button
            onClick={() => setViewMode('prompt')}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              viewMode === 'prompt' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 bg-transparent hover:text-zinc-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Prompt
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              viewMode === 'preview' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 bg-transparent hover:text-zinc-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Văn bản
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden px-3 py-1.5 rounded-md font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-1.5 ml-2"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            {isExpanded ? 'Thu gọn' : 'Phóng to Prompt'}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:flex px-2 py-1.5 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 items-center justify-center transition ml-1"
            title={isExpanded ? 'Thu gọn' : 'Phóng to toàn màn hình'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
              viewMode === 'json' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 bg-transparent hover:text-zinc-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            JSON
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-1.5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono shrink-0">
        <div className="flex items-center gap-3">
          <span>
            Ký tự: <strong className="text-zinc-800 dark:text-zinc-100">{charCount.toLocaleString()}</strong>
          </span>
          <span>•</span>
          <span>
            Từ: <strong className="text-zinc-800 dark:text-zinc-100">{wordCount.toLocaleString()}</strong>
          </span>
          <span>•</span>
          <span className="text-zinc-600 dark:text-zinc-400">
            Tokens: <strong>~{estTokens.toLocaleString()}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-sans font-medium text-[10px] px-2 py-0.5 rounded-md border ${
            isEmpty
              ? 'bg-rose-950 text-rose-300 border-rose-800'
              : 'bg-indigo-950 text-zinc-500 border-indigo-800/50'
          }`}>
            {config.selectedGames.length} Game • {config.studyModes.length} Chế độ
          </span>
        </div>
      </div>

      {/* Empty State Warning Alert */}
      {isEmpty && (
        <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-xs flex items-center gap-2 animate-pulse shrink-0">
          <AlertTriangle className="w-4 h-4 text-zinc-600 dark:text-zinc-400 shrink-0" />
          <span>
            <strong>Cảnh báo:</strong> Bạn chưa chọn Chế độ học thuật hoặc Mini-game nào. Vui lòng tick chọn ít nhất 1 mục bên trái để sinh ứng dụng hoàn chỉnh.
          </span>
        </div>
      )}

      {/* Temporary Toast for Validation Warning */}
      {copyWarning && (
        <div className="absolute top-14 left-4 right-4 z-20 px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 text-xs rounded-xl shadow-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-zinc-600 dark:text-zinc-400 shrink-0" />
            <span>{copyWarning}</span>
          </div>
          <button
            onClick={() => setCopyWarning(null)}
            className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Main Content Terminal */}
      <div className="flex-1 min-h-0 p-3 sm:p-4 font-mono text-xs overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
        {viewMode === 'prompt' && (
          <pre className="w-full break-words whitespace-pre-wrap font-mono text-xs md:text-[11px] text-zinc-700 dark:text-zinc-300 select-text">
            {currentPromptContent}
          </pre>
        )}

        {viewMode === 'preview' && (
          <div className="font-sans text-xs space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-none">
            {currentPromptContent.split('===================================================================').map((section, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800">
                <pre className="font-sans w-full break-words whitespace-pre-wrap text-xs text-zinc-800 dark:text-zinc-100">
                  {section.trim()}
                </pre>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'json' && (
          <pre className="w-full break-words whitespace-pre-wrap font-mono text-xs md:text-[11px] text-zinc-700 dark:text-zinc-300 select-text">
            {jsonPreview}
          </pre>
        )}
      </div>

      {/* Model AI Context Advisory & YouTube Tutorial */}
      <div className="px-3.5 py-1.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-[11px] text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-start gap-1.5 min-w-0">
          <Info className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5" />
          <span className="leading-tight">
            <strong className="text-zinc-700 dark:text-zinc-300">Mẹo tạo Web:</strong> Master Prompt (~{estTokens.toLocaleString()} tokens). Dán vào <strong>Google AI Studio</strong> hoặc Gemini Pro.
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (onOpenVideo) onOpenVideo();
            else window.open('https://youtu.be/cfU-Ez0-Nec?si=UXpFTHvfWw70dpWD', '_blank', 'noopener,noreferrer');
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline shrink-0 cursor-pointer"
          title="Xem video YouTube hướng dẫn"
        >
          <span>Xem Video Hướng Dẫn</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Bottom Actions Bar */}
      <div id="tour-prompt-actions" className="shrink-0 sticky bottom-0 bg-white dark:bg-zinc-950 z-20 border-t border-zinc-200 dark:border-zinc-800 p-2.5 sm:p-3 flex flex-wrap items-center justify-end gap-2 shadow-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={() => handleDownload('txt')}
            title="Tải file Text (.txt)"
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition shrink-0 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.TXT</span>
          </button>
          <button
            type="button"
            onClick={() => handleDownload('md')}
            title="Tải file Markdown (.md)"
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition shrink-0 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.MD</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shrink-0 whitespace-nowrap ${
              copied
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                : isEmpty
                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer'
                : 'bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black hover:scale-102 active:scale-98'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-zinc-400 animate-bounce" />
                <span>Đã sao chép ✔️</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép Prompt</span>
              </>
            )}
          </button>
          
          <a 
            href="https://web-tu-hoc-english.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition hover:scale-102 active:scale-98 shrink-0 whitespace-nowrap"
            title="Mở Web Mẫu tham khảo (https://web-tu-hoc-english.vercel.app)"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>WEB MẪU</span>
          </a>

          <a 
            href="https://aistudio.google.com/apps" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackExportAction('open_aistudio')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition shadow-md bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-102 active:scale-98 shrink-0 whitespace-nowrap"
          >
            <span>🚀 Mở AI Studio</span>
          </a>
        </div>
      </div>
    </div>
  );
}
