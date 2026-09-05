import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, RotateCcw, Play, FileText, Compass, ExternalLink } from 'lucide-react';
import { PromptConfig } from '../types';

interface HeaderProps {
  onReset: () => void;
  onOpenExtractor: () => void;
  onOpenVideo: () => void;
  onOpenTour: () => void;
}

type ThemeMode = 'light' | 'dark';

export default function Header({
  onReset,
  onOpenExtractor,
  onOpenVideo,
  onOpenTour
}: HeaderProps) {
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
        {/* Sample Web Demo Link */}
        <a
          id="web-mau-btn"
          href="https://web-tu-hoc-english.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition shadow-xs hover:scale-102 active:scale-98 cursor-pointer"
          title="Mở Web Mẫu tham khảo (https://web-tu-hoc-english.vercel.app)"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>WEB MẪU</span>
        </a>

        {/* Video Tutorial Button (YouTube NCKH 2026) */}
        <button
          id="tour-youtube-btn"
          type="button"
          onClick={onOpenVideo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/70 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/60 transition shadow-xs hover:scale-102 active:scale-98 cursor-pointer"
          title="Xem video hướng dẫn trên YouTube (https://youtu.be/cfU-Ez0-Nec?si=UXpFTHvfWw70dpWD)"
        >
          <div className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </div>
          <span className="hidden lg:inline">Video Hướng Dẫn</span>
          <span className="lg:hidden">Video</span>
        </button>

        {/* Onboarding Tour Button */}
        <button
          id="tour-help-btn"
          type="button"
          onClick={onOpenTour}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900/70 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition shadow-xs hover:scale-102 active:scale-98 cursor-pointer"
          title="Mở tour hướng dẫn giao diện"
        >
          <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="hidden md:inline">Hướng Dẫn</span>
          <span className="md:hidden">Tour</span>
        </button>

        {/* Document Extractor Button (Phân hệ Bóc tách tài liệu & Nạp lý thuyết mới) */}
        <button
          id="tour-extractor-btn"
          type="button"
          onClick={onOpenExtractor}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold shadow-sm transition hover:scale-102 active:scale-98 animate-pulse hover:animate-none cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Bóc Tách Tài Liệu (4 Tầng)</span>
          <span className="md:hidden">Nạp Bài Học</span>
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
