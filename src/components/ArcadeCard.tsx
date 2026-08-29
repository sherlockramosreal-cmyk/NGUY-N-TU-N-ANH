import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface ArcadeCardProps {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon: LucideIcon;
  iconColor?: string;
  badgeColor?: string;
  isSelected: boolean;
  onToggle: () => void;
  thumbnail: React.ReactNode;
  className?: string;
}

export default function ArcadeCard({
  id,
  title,
  description,
  badge,
  icon: Icon,
  iconColor = 'text-blue-500 dark:text-cyan-400',
  badgeColor = 'text-blue-600 dark:text-cyan-400 bg-blue-100/80 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/80',
  isSelected,
  onToggle,
  thumbnail,
  className = '',
}: ArcadeCardProps) {
  return (
    <div
      id={`card-${id}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group select-none hover:-translate-y-1 hover:shadow-md ${
        isSelected
          ? 'border-2 border-blue-500 dark:border-cyan-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs'
          : 'border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50/50 dark:hover:bg-zinc-850/60'
      } ${className}`}
    >
      {/* Left Column: Content (~60%) */}
      <div className="flex-1 min-w-0 pr-2 sm:pr-3">
        {/* Header line: Checkbox + Icon + Title + Badge */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          {/* Custom Checkbox */}
          <div
            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 ${
              isSelected
                ? 'bg-blue-500 dark:bg-cyan-500 border-blue-500 dark:border-cyan-500 text-white shadow-xs'
                : 'border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 group-hover:border-gray-400'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
          </div>

          {/* Lucide Icon */}
          <Icon className={`w-4 h-4 ${iconColor} shrink-0 transition-transform group-hover:scale-110`} />

          {/* Title */}
          <span className="text-sm font-bold text-gray-800 dark:text-zinc-100 truncate">
            {title}
          </span>

          {/* Badge */}
          {badge && (
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${badgeColor} shrink-0`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed pl-6">
          {description}
        </p>
      </div>

      {/* Right Column: Thumbnail / Artwork (~40%) */}
      <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-xl bg-gray-50 dark:bg-zinc-800/80 border border-gray-100 dark:border-zinc-700/60 flex items-center justify-center relative overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
        {thumbnail}
      </div>
    </div>
  );
}
