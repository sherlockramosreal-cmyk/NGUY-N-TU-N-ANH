import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  Video,
  ExternalLink,
  Target,
  FileText,
  Gamepad2,
  Palette,
  Terminal,
  Play,
  RotateCcw
} from 'lucide-react';
import { trackTourAction } from '../utils/analytics';
import { YOUTUBE_TUTORIAL_URL } from './VideoTutorialModal';

export interface TourStep {
  id: string;
  targetSelector: string | null;
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    targetSelector: null,
    title: 'Chào mừng bạn đến với EngiPrompt Studio',
    description: 'Hệ thống hỗ trợ tạo Master Prompt chuẩn kỹ thuật để lập trình web tự học tiếng Anh cá nhân hóa (Đề tài NCKH 2026). Dễ dàng biến tài liệu bài học thô thành một ứng dụng web tự học tương tác hoàn chỉnh.',
    badge: 'Khởi đầu NCKH',
    icon: Sparkles,
    position: 'center'
  },
  {
    id: 'grade-target',
    targetSelector: '#tour-grade-target',
    title: '1. Cấp độ học & Mục tiêu thi cử',
    description: 'Chọn khối lớp (Lớp 10, 11, 12) và các định hướng mục tiêu thi (THPT Quốc Gia, IELTS Academic, VSTEP, Olympic, SAT...). AI sẽ tự động điều chỉnh độ khó từ vựng và khung năng lực tương ứng.',
    badge: 'Mục tiêu sư phạm',
    icon: Target,
    position: 'right'
  },
  {
    id: 'content-extractor',
    targetSelector: '#tour-extractor-btn',
    title: '2. Bóc tách tài liệu & Nạp lý thuyết',
    description: 'Bấm nút "Bóc Tách Tài Liệu" để nạp file SGK/đề thi (.pdf, .docx, .txt). Phân hệ 4 tầng sẽ tự động trích xuất từ vựng, ngữ cảnh, collocation và bài tập trắc nghiệm nạp thẳng vào prompt.',
    badge: 'Tự động hóa dữ liệu',
    icon: FileText,
    position: 'bottom'
  },
  {
    id: 'gamification',
    targetSelector: '#tour-gamification-section',
    title: '3. Chế độ học thuật & Mini-games EdTech',
    description: 'Tích hợp 6 chế độ học tập tích cực (Flashcard 3D, Active Recall, Thi thử) cùng 7 trò chơi Arcade (Block Puzzle, Dino Runner, Sút luân lưu...). Biến bài học khô khan thành trải nghiệm tương tác cao.',
    badge: 'Gamification',
    icon: Gamepad2,
    position: 'right'
  },
  {
    id: 'ui-styling',
    targetSelector: '#tour-ui-section',
    title: '4. Thẩm mỹ & Giao diện Design System',
    description: 'Cá nhân hóa giao diện học tập theo phong cách yêu thích: Chọn bảng màu chủ đạo (Minimalist, Cyberpunk, Sunset...), đổi mã màu HEX và lựa chọn trong 10 phông chữ chuẩn typography.',
    badge: 'Cá nhân hóa UI',
    icon: Palette,
    position: 'right'
  },
  {
    id: 'prompt-output',
    targetSelector: '#tour-prompt-output',
    title: '5. Master Prompt & Xuất bản AI Studio',
    description: 'Master Prompt được biên dịch tự động theo thời gian thực! Bạn có thể "Sao chép Prompt" để dán vào Google AI Studio tạo web ngay lập tức.',
    badge: 'Xuất bản & Thực thi',
    icon: Terminal,
    position: 'left'
  }
];

const ONBOARDING_STORAGE_KEY = 'engiprompt_onboarding_completed_v1';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVideoModal: () => void;
}

export default function OnboardingTour({ isOpen, onClose, onOpenVideoModal }: OnboardingTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Update target rect with scrolling & resize handling
  const updateTargetRect = useCallback(() => {
    if (!isOpen) return;
    if (!currentStep.targetSelector) {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector(currentStep.targetSelector);
    if (el) {
      // Scroll into view smoothly
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      // Get bounding box
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (!isOpen) return;
    updateTargetRect();
    const handleResize = () => updateTargetRect();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    // Track step view
    trackTourAction('step_view', `Step ${currentStepIndex + 1}: ${currentStep.id}`);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen, currentStepIndex, updateTargetRect, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      trackTourAction('step_next', `To Step ${currentStepIndex + 2}`);
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      } catch {}
    }
    trackTourAction('complete_tour');
    onClose();
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      } catch {}
    }
    trackTourAction('skip_tour', `Skipped at Step ${currentStepIndex + 1}`);
    onClose();
  };

  const StepIcon = currentStep.icon;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;

  // Calculate Tooltip card position relative to viewport
  const getCardPositionStyle = (): React.CSSProperties => {
    // If center or mobile screen
    if (!targetRect || window.innerWidth < 768 || currentStep.position === 'center') {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 60,
        width: 'min(92vw, 480px)'
      };
    }

    const cardWidth = 420;
    const padding = 16;
    const cardHeight = 280; // Estimated max height

    let top = targetRect.top;
    let left = targetRect.right + padding;

    if (currentStep.position === 'right') {
      left = targetRect.right + padding;
      top = Math.max(padding, Math.min(window.innerHeight - cardHeight - padding, targetRect.top));
      // If overflow right, flip to left
      if (left + cardWidth > window.innerWidth - padding) {
        left = Math.max(padding, targetRect.left - cardWidth - padding);
      }
    } else if (currentStep.position === 'left') {
      left = targetRect.left - cardWidth - padding;
      top = Math.max(padding, Math.min(window.innerHeight - cardHeight - padding, targetRect.top));
      if (left < padding) {
        left = Math.min(window.innerWidth - cardWidth - padding, targetRect.right + padding);
      }
    } else if (currentStep.position === 'bottom') {
      top = targetRect.bottom + padding;
      left = Math.max(padding, Math.min(window.innerWidth - cardWidth - padding, targetRect.left));
      if (top + cardHeight > window.innerHeight - padding) {
        top = Math.max(padding, targetRect.top - cardHeight - padding);
      }
    } else if (currentStep.position === 'top') {
      top = targetRect.top - cardHeight - padding;
      left = Math.max(padding, Math.min(window.innerWidth - cardWidth - padding, targetRect.left));
      if (top < padding) {
        top = targetRect.bottom + padding;
      }
    }

    return {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 60,
      width: `${cardWidth}px`
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dimmed Overlay with Spotlight Box */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-auto" />

      {/* Spotlight highlight over targeted element */}
      {targetRect && (
        <div
          className="fixed pointer-events-none transition-all duration-300 ease-out rounded-2xl border-2 border-white dark:border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] ring-4 ring-blue-500/50 z-50 animate-pulse"
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`
          }}
        />
      )}

      {/* Tooltip Card */}
      <div
        ref={cardRef}
        style={getCardPositionStyle()}
        className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Progress Bar Header */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1">
          <div
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-1 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Card Header */}
        <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
              <StepIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                  {currentStep.badge}
                </span>
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  {currentStepIndex + 1} / {TOUR_STEPS.length}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mt-1 leading-snug">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition cursor-pointer"
            title="Đóng / Bỏ qua tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="px-4 sm:px-5 py-2 space-y-3">
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {currentStep.description}
          </p>

          {/* YouTube Video Banner Embedded in Welcome & Tour */}
          <div className="p-3 rounded-xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">
                  Video Hướng Dẫn YouTube (NCKH)
                </div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  Xem video trực quan nếu bạn thích học qua hình ảnh
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                trackTourAction('open_youtube');
                onOpenVideoModal();
              }}
              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shrink-0 transition flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Xem ngay</span>
            </button>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-4 sm:p-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-2">
          {/* Don't show again toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
              Không tự mở lại
            </span>
          </label>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Trước</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-3.5 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-bold transition flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span>{isLastStep ? 'Hoàn thành' : 'Tiếp theo'}</span>
              {!isLastStep && <ChevronRight className="w-3.5 h-3.5" />}
              {isLastStep && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-600" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Kiểm tra xem người dùng đã hoàn thành onboarding tour chưa
 */
export function checkHasCompletedTour(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}
