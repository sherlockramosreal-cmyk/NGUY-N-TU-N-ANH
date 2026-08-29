import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, BookOpen, RotateCcw, Bookmark, Play, FileText } from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/promptTemplates';
import { PromptConfig } from '../types';

interface HeaderProps {
  onSelectPreset: (presetConfig: PromptConfig) => void;
  onReset: () => void;
  onOpenSimulator: () => void;
  onOpenExtractor: () => void;
}

type ThemeMode = 'light' | 'dark';

export default function Header({ onSelectPreset, onReset, onOpenSimulator, onOpenExtractor }: HeaderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('app_theme') as ThemeMode;
      if (saved && ['light', 'dark'].includes(saved)) {
        return saved;
      }
    } catch {}
    return 'light';
  });
  const [isRotating, setIsRotating] = useState(false);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove('dark');
    if (theme === 'dark') htmlEl.classList.add('dark');
    try {
      localStorage.setItem('app_theme', theme);
    } catch {}
  }, [theme]);

  const handleCycleTheme = () => {
    setIsRotating(true);
    setTimeout(() => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      setIsRotating(false);
    }, 150);
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <Sun id="themeIcon" className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isRotating ? 'rotate-180' : ''}`} />;
    return <Moon id="themeIcon" className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isRotating ? 'rotate-180' : ''}`} />;
  };

  const getThemeTitle = () => {
    if (theme === 'light') return 'Giao diện Sáng (Click chuyển sang Tối)';
    return 'Giao diện Tối (Click chuyển sang Sáng)';
  };

  return (
    <header className="h-16 shrink-0 flex-none border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur px-4 sm:px-6 flex items-center justify-between z-20">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white dark:text-black shadow-md shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-base text-zinc-900 dark:text-white tracking-tight">
              Hỗ Trợ Prompt Tạo Web Tự Học
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
              NCKH 2026
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
            Hỗ trợ prompt để tạo web nhằm hỗ trợ tự học tương tác cá nhân hóa
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Document Extractor Button (Phân hệ Bóc tách tài liệu & Nạp lý thuyết mới) */}
        <button
          type="button"
          onClick={onOpenExtractor}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold shadow-sm transition hover:scale-102 active:scale-98 animate-pulse hover:animate-none"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Bóc Tách Tài Liệu (4 Tầng)</span>
          <span className="md:hidden">Nạp Bài Học</span>
        </button>

        {/* Preset Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPresetsMenu(!showPresetsMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
          >
            <Bookmark className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span className="hidden sm:inline">Mẫu Prompt NCKH</span>
            <span className="sm:hidden">Mẫu</span>
          </button>

          {showPresetsMenu && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Chọn mẫu cấu hình sư phạm:
                </span>
              </div>
              <div className="space-y-1 mt-1">
                {PRESET_TEMPLATES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset.config as unknown as PromptConfig);
                      setShowPresetsMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition group"
                  >
                    <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-black">
                      {preset.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                      {preset.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sandbox Simulator */}
        <button
          type="button"
          onClick={onOpenSimulator}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold shadow-sm transition hover:scale-102 active:scale-98"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Mô phỏng App</span>
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          title="Khôi phục cấu hình mặc định"
          className="p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* 3-State Theme Toggle (Light -> Dark -> Sepia) */}
        <button
          id="themeToggleBtn"
          type="button"
          onClick={handleCycleTheme}
          title={getThemeTitle()}
          className="p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition flex items-center justify-center cursor-pointer"
        >
          {getThemeIcon()}
        </button>
      </div>
    </header>
  );
}
