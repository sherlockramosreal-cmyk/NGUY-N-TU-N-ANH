import React, { useState } from 'react';
import {
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
  CheckCircle2
} from 'lucide-react';
import { PromptConfig } from '../types';

interface PromptOutputProps {
  promptContent: string | string[];
  config: PromptConfig;
  onOpenSimulator: () => void;
}

export default function PromptOutput({ promptContent, config, onOpenSimulator }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const [copyWarning, setCopyWarning] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'prompt' | 'preview' | 'json'>('prompt');
  const [activeTab, setActiveTab] = useState(0);

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
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (format: 'txt' | 'md') => {
    if (isEmpty) {
      setCopyWarning('Vui lòng chọn ít nhất 1 chế độ học hoặc 1 mini-game trước khi tải prompt!');
      setTimeout(() => setCopyWarning(null), 4000);
      return;
    }

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
      id="rightColumn"
      className="lg:col-span-5 flex flex-col h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xl overflow-hidden relative"
    >
      {/* Top Bar with Live Indicator & Action Buttons */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-wrap items-center justify-between gap-2">
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
          <div className="flex items-center bg-white dark:bg-zinc-950 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] ml-auto mr-3">
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
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg text-[11px] ml-auto md:ml-0">
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
      <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
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
        <div className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-xs flex items-center gap-2 animate-pulse">
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
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
        {viewMode === 'prompt' && (
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-zinc-600 dark:text-zinc-400 select-text">
            {currentPromptContent}
          </pre>
        )}

        {viewMode === 'preview' && (
          <div className="font-sans text-xs space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-none">
            {currentPromptContent.split('===================================================================').map((section, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800">
                <pre className="font-sans whitespace-pre-wrap text-xs text-zinc-800 dark:text-zinc-100">
                  {section.trim()}
                </pre>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'json' && (
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            {jsonPreview}
          </pre>
        )}
      </div>

      {/* Model AI Context Advisory */}
      <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-zinc-600 dark:text-zinc-400">Mẹo chọn AI Model:</strong> Master Prompt chứa đặc tả kỹ thuật chi tiết (~{estTokens.toLocaleString()} tokens). Khuyến nghị dán vào các mô hình có Context Window lớn (<strong>Gemini 1.5 Pro, Claude 3.5 Sonnet, GPT-4o</strong>) để xuất 100% mã nguồn không bị ngắt quãng.
        </span>
      </div>

      {/* Bottom Actions Bar */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onOpenSimulator}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold transition hover:scale-102 active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          <span>Chạy mô phỏng Sandbox</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDownload('txt')}
            title="Tải file Text (.txt)"
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.TXT</span>
          </button>
          <button
            type="button"
            onClick={() => handleDownload('md')}
            title="Tải file Markdown (.md)"
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.MD</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
              copied
                ? 'bg-black text-white shadow-sm'
                : isEmpty
                ? 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 cursor-pointer'
                : 'bg-black hover:bg-zinc-800 text-white hover:scale-102 active:scale-98'
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
        </div>
      </div>
    </div>
  );
}
