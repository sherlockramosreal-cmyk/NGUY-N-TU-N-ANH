import React from 'react';
import { X, ExternalLink, Play, Sparkles, CheckCircle2, Compass, Film } from 'lucide-react';
import { trackVideoAction } from '../utils/analytics';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour?: () => void;
}

export const YOUTUBE_TUTORIAL_URL = 'https://youtu.be/cfU-Ez0-Nec?si=UXpFTHvfWw70dpWD';
export const YOUTUBE_EMBED_URL = 'https://www.youtube-nocookie.com/embed/cfU-Ez0-Nec?rel=0&modestbranding=1&autoplay=1';

export default function VideoTutorialModal({ isOpen, onClose, onStartTour }: VideoTutorialModalProps) {
  if (!isOpen) return null;

  const handleOpenYoutubeLink = () => {
    trackVideoAction('click_youtube_link');
    window.open(YOUTUBE_TUTORIAL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-500/20">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                  Video Hướng Dẫn Sử Dụng
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
                  YouTube
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
                Hướng dẫn chi tiết quy trình biến tài liệu thành Web Tự Học Tương Tác
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenYoutubeLink}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title="Mở video trong tab YouTube mới"
            >
              <span>Xem trên YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player & Guidance Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* 16:9 Responsive Video Iframe */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-zinc-200 dark:border-zinc-800">
            <iframe
              src={YOUTUBE_EMBED_URL}
              title="Video hướng dẫn EngiPrompt Studio"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Quick link on mobile */}
          <div className="sm:hidden flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Nếu video không tải được:</span>
            <button
              type="button"
              onClick={handleOpenYoutubeLink}
              className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
            >
              Mở YouTube <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Core Workflow Steps Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white mb-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[11px] font-extrabold">
                  1
                </div>
                <span>Nạp & Cấu hình</span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Tải file bài học PDF/Word hoặc dán văn bản. Chọn khối lớp (10-12) và định hướng mục tiêu thi cử.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white mb-1.5">
                <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[11px] font-extrabold">
                  2
                </div>
                <span>Chọn Game & Giao diện</span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Kích hoạt các chế độ học tập tích cực, chọn mini-game Arcade yêu thích và tinh chỉnh màu sắc, phông chữ.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white mb-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[11px] font-extrabold">
                  3
                </div>
                <span>Xuất & Chạy Web</span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Sao chép Master Prompt để dán vào Google AI Studio hoặc bấm "Mô phỏng App" để trải nghiệm ngay trong Sandbox.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="hidden sm:inline">Nghiên cứu khoa học GDPT 2018 - Đổi mới phương pháp tự học</span>
            <span className="sm:hidden">NCKH 2026</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {onStartTour && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartTour();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                <span>Bắt đầu Tour hướng dẫn</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-bold transition shadow-sm"
            >
              Đã hiểu, Bắt đầu ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
