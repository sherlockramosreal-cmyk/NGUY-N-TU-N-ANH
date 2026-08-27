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
  promptContent: string;
  config: PromptConfig;
  onOpenSimulator: () => void;
}

export default function PromptOutput({ promptContent, config, onOpenSimulator }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const [copyWarning, setCopyWarning] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'prompt' | 'preview' | 'json'>('prompt');

  const charCount = promptContent.length;
  const wordCount = promptContent.trim().split(/\s+/).filter(Boolean).length;
  const estTokens = Math.round(charCount / 3.8); // Rough estimation for mixed Vietnamese/English prompt

  const isEmpty = config.studyModes.length === 0 && config.selectedGames.length === 0;

  const handleCopy = async () => {
    if (isEmpty) {
      setCopyWarning('Vui lòng chọn ít nhất 1 chế độ học hoặc 1 mini-game trước khi sao chép!');
      setTimeout(() => setCopyWarning(null), 4000);
      return;
    }

    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      setCopyWarning(null);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = promptContent;
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

    const filename = `Prompt_TaoWeb_TuHoc_${config.gradeLevel}_${Date.now()}.${format}`;
    const blob = new Blob([promptContent], { type: 'text/plain;charset=utf-8' });
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
      className="lg:col-span-5 flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-xl overflow-hidden relative"
    >
      {/* Top Bar with Live Indicator & Action Buttons */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            Master Prompt Real-time
          </span>
        </div>

        {/* View mode toggle tabs */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setViewMode('prompt')}
            className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
              viewMode === 'prompt' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3 h-3" />
            Prompt
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
              viewMode === 'preview' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3 h-3" />
            Văn bản
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
              viewMode === 'json' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3 h-3" />
            JSON
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span>
            Ký tự: <strong className="text-slate-200">{charCount.toLocaleString()}</strong>
          </span>
          <span>•</span>
          <span>
            Từ: <strong className="text-slate-200">{wordCount.toLocaleString()}</strong>
          </span>
          <span>•</span>
          <span className="text-emerald-400">
            Tokens: <strong>~{estTokens.toLocaleString()}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-sans font-medium text-[10px] px-2 py-0.5 rounded-md border ${
            isEmpty
              ? 'bg-rose-950 text-rose-300 border-rose-800'
              : 'bg-indigo-950 text-indigo-400 border-indigo-800/50'
          }`}>
            {config.selectedGames.length} Game • {config.studyModes.length} Chế độ
          </span>
        </div>
      </div>

      {/* Empty State Warning Alert */}
      {isEmpty && (
        <div className="px-4 py-2.5 bg-amber-950/70 border-b border-amber-800/60 text-amber-200 text-xs flex items-center gap-2 animate-pulse">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Cảnh báo:</strong> Bạn chưa chọn Chế độ học thuật hoặc Mini-game nào. Vui lòng tick chọn ít nhất 1 mục bên trái để sinh ứng dụng hoàn chỉnh.
          </span>
        </div>
      )}

      {/* Temporary Toast for Validation Warning */}
      {copyWarning && (
        <div className="absolute top-14 left-4 right-4 z-20 px-4 py-3 bg-rose-950/95 border border-rose-700 text-rose-200 text-xs rounded-xl shadow-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{copyWarning}</span>
          </div>
          <button
            onClick={() => setCopyWarning(null)}
            className="text-xs font-bold text-rose-400 hover:text-white"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Main Content Terminal */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 bg-slate-950 text-slate-300">
        {viewMode === 'prompt' && (
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-slate-300 select-text">
            {promptContent}
          </pre>
        )}

        {viewMode === 'preview' && (
          <div className="font-sans text-xs space-y-4 text-slate-300 leading-relaxed max-w-none">
            {promptContent.split('===================================================================').map((section, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <pre className="font-sans whitespace-pre-wrap text-xs text-slate-200">
                  {section.trim()}
                </pre>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'json' && (
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-emerald-400">
            {jsonPreview}
          </pre>
        )}
      </div>

      {/* Model AI Context Advisory */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/50 text-[11px] text-slate-400 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-300">Mẹo chọn AI Model:</strong> Master Prompt chứa đặc tả kỹ thuật chi tiết (~{estTokens.toLocaleString()} tokens). Khuyến nghị dán vào các mô hình có Context Window lớn (<strong>Gemini 1.5 Pro, Claude 3.5 Sonnet, GPT-4o</strong>) để xuất 100% mã nguồn không bị ngắt quãng.
        </span>
      </div>

      {/* Bottom Actions Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onOpenSimulator}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition hover:scale-102 active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chạy mô phỏng Sandbox</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDownload('txt')}
            title="Tải file Text (.txt)"
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.TXT</span>
          </button>
          <button
            type="button"
            onClick={() => handleDownload('md')}
            title="Tải file Markdown (.md)"
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.MD</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : isEmpty
                ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 cursor-pointer'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-102 active:scale-98'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200 animate-bounce" />
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
