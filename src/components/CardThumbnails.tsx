import React from 'react';

// 1. Form Nạp Dữ Liệu Thumbnail
export function DocExtractorThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clipboardBg" x1="0" y1="0" x2="100" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eff6ff" />
          <stop offset="1" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="clipGrad" x1="30" y1="4" x2="70" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#94a3b8" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <filter id="shadowDoc" x="14" y="8" width="72" height="68" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12" />
        </filter>
      </defs>
      
      {/* Background soft glow */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#f8fafc" className="dark:fill-zinc-900" />
      
      {/* Clipboard Backboard */}
      <rect x="18" y="10" width="64" height="62" rx="7" fill="#cbd5e1" className="dark:fill-zinc-700" />
      
      {/* Paper Sheet with Shadow */}
      <g filter="url(#shadowDoc)">
        <rect x="22" y="14" width="56" height="54" rx="5" fill="url(#clipboardBg)" stroke="#bfdbfe" strokeWidth="1.2" />
      </g>

      {/* Text lines */}
      <rect x="28" y="26" width="30" height="3" rx="1.5" fill="#3b82f6" opacity="0.8" />
      <rect x="28" y="33" width="44" height="2.5" rx="1.2" fill="#93c5fd" />
      <rect x="28" y="39" width="38" height="2.5" rx="1.2" fill="#93c5fd" />
      <rect x="28" y="45" width="32" height="2.5" rx="1.2" fill="#93c5fd" />
      <rect x="28" y="51" width="22" height="2.5" rx="1.2" fill="#93c5fd" />

      {/* Green Checkmark Circle Badge */}
      <circle cx="64" cy="53" r="10" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
      <path d="M59.5 53L62.5 56L68.5 50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Top Metallic Clip */}
      <rect x="36" y="8" width="28" height="9" rx="3" fill="url(#clipGrad)" stroke="#475569" strokeWidth="0.8" />
      <circle cx="50" cy="12.5" r="2" fill="#e2e8f0" />
    </svg>
  );
}

// 2. Flashcard 3D Thumbnail
export function Flashcard3DThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardFrontGrad" x1="20" y1="15" x2="80" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cardBackGrad" x1="10" y1="20" x2="70" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <filter id="shadow3D" x="10" y="8" width="80" height="68" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1e3a8a" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#f8fafc" className="dark:fill-zinc-900" />

      {/* Back Card (Isometric Tilt) */}
      <g transform="translate(14, 18) rotate(-10 30 25)">
        <rect x="0" y="0" width="50" height="36" rx="6" fill="url(#cardBackGrad)" stroke="#64748b" strokeWidth="1" opacity="0.85" />
        <rect x="6" y="8" width="26" height="3" rx="1.5" fill="#cbd5e1" />
        <rect x="6" y="15" width="38" height="2.5" rx="1.2" fill="#cbd5e1" />
        <rect x="6" y="21" width="32" height="2.5" rx="1.2" fill="#cbd5e1" />
      </g>

      {/* Front 3D Card (Elevated & Pop out) */}
      <g filter="url(#shadow3D)" transform="translate(30, 16) rotate(6 30 25)">
        <rect x="0" y="0" width="54" height="40" rx="7" fill="url(#cardFrontGrad)" stroke="#60a5fa" strokeWidth="1.5" />
        
        {/* Shine line */}
        <path d="M4 6L50 6" stroke="#93c5fd" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        
        {/* 3D Bold Typography */}
        <text x="27" y="27" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="16" fontFamily="sans-serif" letterSpacing="0.5">
          3D
        </text>
        
        {/* Flip arrow indicator */}
        <path d="M40 32C45 31 46 25 43 22" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M45 22L43 22L43 25" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// 3. Active Recall Thumbnail
export function ActiveRecallThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="zapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#f8fafc" className="dark:fill-zinc-900" />
      
      {/* Quiz Card Box */}
      <rect x="12" y="12" width="76" height="56" rx="8" fill="#ffffff" stroke="#e2e8f0" className="dark:fill-zinc-800 dark:stroke-zinc-700" strokeWidth="1.2" />
      
      {/* Question Bar */}
      <rect x="20" y="20" width="46" height="6" rx="3" fill="#6366f1" />
      
      {/* Choice A */}
      <rect x="20" y="32" width="28" height="12" rx="4" fill="#f1f5f9" className="dark:fill-zinc-700" stroke="#cbd5e1" strokeWidth="0.8" />
      <circle cx="26" cy="38" r="3" fill="#94a3b8" />
      <rect x="32" y="36.5" width="12" height="3" rx="1.5" fill="#94a3b8" />
      
      {/* Choice B (Correct Active Green) */}
      <rect x="52" y="32" width="28" height="12" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.2" />
      <circle cx="58" cy="38" r="3.5" fill="#22c55e" />
      <path d="M56.5 38L57.5 39.5L60 36.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <rect x="64" y="36.5" width="12" height="3" rx="1.5" fill="#16a34a" />

      {/* Choice C & D */}
      <rect x="20" y="48" width="28" height="12" rx="4" fill="#f1f5f9" className="dark:fill-zinc-700" stroke="#cbd5e1" strokeWidth="0.8" />
      <rect x="52" y="48" width="28" height="12" rx="4" fill="#f1f5f9" className="dark:fill-zinc-700" stroke="#cbd5e1" strokeWidth="0.8" />

      {/* Lightning Recall Flash */}
      <g transform="translate(68, 8) scale(0.9)">
        <polygon points="12,0 3,14 10,14 6,24 19,8 12,8" fill="url(#zapGrad)" stroke="#ffffff" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

// 4. Exam Mode Thumbnail
export function ExamModeThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ef4444" />
          <stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#f8fafc" className="dark:fill-zinc-900" />

      {/* Exam Sheet */}
      <rect x="16" y="12" width="52" height="58" rx="6" fill="#ffffff" stroke="#cbd5e1" className="dark:fill-zinc-800 dark:stroke-zinc-700" strokeWidth="1.2" />
      
      {/* Header bar & lines */}
      <rect x="22" y="18" width="24" height="4" rx="2" fill="#0284c7" />
      <rect x="22" y="27" width="40" height="2.5" rx="1.2" fill="#94a3b8" />
      
      {/* Bubble answers */}
      <circle cx="26" cy="38" r="3" fill="#cbd5e1" />
      <circle cx="35" cy="38" r="3" fill="#0284c7" />
      <circle cx="44" cy="38" r="3" fill="#cbd5e1" />
      <circle cx="53" cy="38" r="3" fill="#cbd5e1" />

      <circle cx="26" cy="48" r="3" fill="#0284c7" />
      <circle cx="35" cy="48" r="3" fill="#cbd5e1" />
      <circle cx="44" cy="48" r="3" fill="#cbd5e1" />
      <circle cx="53" cy="48" r="3" fill="#cbd5e1" />

      <circle cx="26" cy="58" r="3" fill="#cbd5e1" />
      <circle cx="35" cy="58" r="3" fill="#cbd5e1" />
      <circle cx="44" cy="58" r="3" fill="#0284c7" />
      <circle cx="53" cy="58" r="3" fill="#cbd5e1" />

      {/* Stopwatch / A+ Grade Stamp */}
      <g transform="translate(56, 24)">
        <circle cx="18" cy="18" r="16" fill="url(#badgeGrad)" stroke="#ffffff" strokeWidth="2" />
        <text x="18" y="23" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="14" fontFamily="sans-serif">
          A+
        </text>
        {/* Small Ribbon */}
        <polygon points="12,32 18,28 24,32 20,40 18,36 14,40" fill="#b91c1c" />
      </g>
    </svg>
  );
}

// 5. Block Puzzle (Tetris) Thumbnail
export function TetrisBlockThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Block Gradients */}
        <linearGradient id="orangeL" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fb923c" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="blueSquare" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="purpleT" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#9333ea" />
        </linearGradient>
        <linearGradient id="greenZ" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      {/* Background with subtle grid */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#0f172a" />
      
      {/* 5x5 Grid dots/lines */}
      <g stroke="#334155" strokeWidth="0.8" strokeDasharray="1 3" opacity="0.6">
        <line x1="20" y1="10" x2="20" y2="70" />
        <line x1="35" y1="10" x2="35" y2="70" />
        <line x1="50" y1="10" x2="50" y2="70" />
        <line x1="65" y1="10" x2="65" y2="70" />
        <line x1="80" y1="10" x2="80" y2="70" />
        
        <line x1="10" y1="22" x2="90" y2="22" />
        <line x1="10" y1="36" x2="90" y2="36" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <line x1="10" y1="64" x2="90" y2="64" />
      </g>

      {/* Orange L Piece */}
      <g stroke="#ffffff" strokeWidth="0.8">
        <rect x="18" y="24" width="13" height="13" rx="2.5" fill="url(#orangeL)" />
        <rect x="18" y="38" width="13" height="13" rx="2.5" fill="url(#orangeL)" />
        <rect x="32" y="38" width="13" height="13" rx="2.5" fill="url(#orangeL)" />
      </g>

      {/* Blue Square Piece (2x2) */}
      <g stroke="#ffffff" strokeWidth="0.8">
        <rect x="48" y="38" width="13" height="13" rx="2.5" fill="url(#blueSquare)" />
        <rect x="62" y="38" width="13" height="13" rx="2.5" fill="url(#blueSquare)" />
        <rect x="48" y="52" width="13" height="13" rx="2.5" fill="url(#blueSquare)" />
        <rect x="62" y="52" width="13" height="13" rx="2.5" fill="url(#blueSquare)" />
      </g>

      {/* Purple T Piece falling from top */}
      <g stroke="#ffffff" strokeWidth="0.8" transform="translate(36, 8)">
        <rect x="0" y="0" width="13" height="13" rx="2.5" fill="url(#purpleT)" />
        <rect x="14" y="0" width="13" height="13" rx="2.5" fill="url(#purpleT)" />
        <rect x="28" y="0" width="13" height="13" rx="2.5" fill="url(#purpleT)" />
        <rect x="14" y="14" width="13" height="13" rx="2.5" fill="url(#purpleT)" />
      </g>

      {/* Green single block */}
      <g stroke="#ffffff" strokeWidth="0.8">
        <rect x="18" y="52" width="13" height="13" rx="2.5" fill="url(#greenZ)" />
        <rect x="32" y="52" width="13" height="13" rx="2.5" fill="url(#greenZ)" />
      </g>
    </svg>
  );
}

// 6. Dino Runner Thumbnail
export function DinoRunnerThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f0fdf4" />
          <stop offset="1" stopColor="#dcfce7" />
        </linearGradient>
      </defs>

      {/* Sky Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="url(#skyGrad)" className="dark:fill-zinc-900" />

      {/* Sun / Clouds */}
      <circle cx="82" cy="18" r="8" fill="#fef08a" opacity="0.8" />
      <ellipse cx="28" cy="18" rx="8" ry="4" fill="#ffffff" opacity="0.9" />
      <ellipse cx="36" cy="16" rx="6" ry="5" fill="#ffffff" opacity="0.9" />

      {/* Ground Line */}
      <line x1="8" y1="62" x2="92" y2="62" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      {/* Ground dots */}
      <circle cx="20" cy="67" r="1" fill="#86efac" />
      <circle cx="38" cy="68" r="1.5" fill="#86efac" />
      <circle cx="58" cy="67" r="1" fill="#86efac" />
      <circle cx="80" cy="68" r="1" fill="#86efac" />

      {/* Green Cute Dino (T-Rex) Running */}
      <g transform="translate(18, 22)">
        {/* Tail */}
        <path d="M4 26C8 28 12 28 14 26" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
        {/* Body */}
        <rect x="10" y="16" width="18" height="18" rx="6" fill="#22c55e" />
        {/* Head */}
        <rect x="18" y="4" width="16" height="14" rx="4" fill="#22c55e" />
        {/* Snout */}
        <rect x="26" y="8" width="9" height="7" rx="3" fill="#22c55e" />
        {/* Eye */}
        <circle cx="25" cy="8" r="2" fill="#ffffff" />
        <circle cx="26" cy="8" r="1" fill="#0f172a" />
        {/* Tooth */}
        <polygon points="30,15 32,15 31,17" fill="#ffffff" />
        {/* Little Arm */}
        <path d="M26 22L30 22" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
        {/* Belly highlight */}
        <rect x="14" y="22" width="8" height="10" rx="3" fill="#86efac" />
        {/* Running Legs */}
        <path d="M14 34L12 40L8 40" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 34L26 38L30 38" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Cactus Obstacle */}
      <g transform="translate(68, 38)">
        {/* Main stem */}
        <rect x="6" y="4" width="5" height="20" rx="2.5" fill="#15803d" />
        {/* Left branch */}
        <path d="M6 14H2V8" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right branch */}
        <path d="M11 12H15V6" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// 7. Penalty Shootout Thumbnail
export function PenaltyShootoutThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Field Grass Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="url(#grassGrad)" />

      {/* Penalty Area White Lines */}
      <ellipse cx="50" cy="74" rx="34" ry="14" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
      <line x1="12" y1="44" x2="88" y2="44" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
      
      {/* Goal Post & White Net */}
      <g transform="translate(24, 12)">
        {/* Net Mesh Grid */}
        <rect x="2" y="2" width="48" height="30" fill="#ffffff" fillOpacity="0.15" />
        <g stroke="#ffffff" strokeWidth="0.7" opacity="0.5">
          <line x1="12" y1="2" x2="12" y2="32" />
          <line x1="22" y1="2" x2="22" y2="32" />
          <line x1="32" y1="2" x2="32" y2="32" />
          <line x1="42" y1="2" x2="42" y2="32" />
          <line x1="2" y1="10" x2="50" y2="10" />
          <line x1="2" y1="18" x2="50" y2="18" />
          <line x1="2" y1="26" x2="50" y2="26" />
        </g>
        {/* Goal Frame Posts */}
        <rect x="0" y="0" width="52" height="32" rx="1" stroke="#ffffff" strokeWidth="3" fill="none" />
      </g>

      {/* Top Corner Goal Target Bullseye */}
      <circle cx="68" cy="20" r="6" stroke="#facc15" strokeWidth="1.5" fill="#facc15" fillOpacity="0.3" />
      <circle cx="68" cy="20" r="2" fill="#facc15" />

      {/* Soccer Ball on Penalty Spot with trajectory line */}
      <path d="M42 58 Q 54 36 65 23" stroke="#facc15" strokeWidth="1.5" strokeDasharray="2 3" strokeLinecap="round" />
      
      <g transform="translate(32, 48)">
        {/* Ball shadow */}
        <ellipse cx="8" cy="16" rx="7" ry="2.5" fill="#022c22" opacity="0.5" />
        {/* Ball core */}
        <circle cx="8" cy="8" r="8" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
        {/* Ball Pentagons */}
        <polygon points="8,4 11,6 10,9 6,9 5,6" fill="#0f172a" />
        <polygon points="8,12 11,10 10,13 6,13 5,10" fill="#0f172a" />
        <polygon points="14,8 12,6 15,4 16,8" fill="#0f172a" />
        <polygon points="2,8 4,6 1,4 0,8" fill="#0f172a" />
      </g>
    </svg>
  );
}

// 8. Speed True/False Thumbnail
export function SpeedTrueFalseThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stopwatchBg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#f1f5f9" />
        </linearGradient>
        <filter id="glowBtn" x="0" y="0" width="100" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#090d16" />

      {/* Center Stopwatch */}
      <g transform="translate(34, 14)">
        {/* Top Button */}
        <rect x="13" y="0" width="6" height="4" rx="1" fill="#94a3b8" />
        <rect x="11" y="3" width="10" height="2" rx="1" fill="#64748b" />
        {/* Outer Ring */}
        <circle cx="16" cy="22" r="19" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        {/* Clock Face */}
        <circle cx="16" cy="22" r="16" fill="url(#stopwatchBg)" />
        {/* Ticks */}
        <line x1="16" y1="8" x2="16" y2="11" stroke="#64748b" strokeWidth="1.5" />
        <line x1="16" y1="33" x2="16" y2="36" stroke="#64748b" strokeWidth="1.5" />
        <line x1="2" y1="22" x2="5" y2="22" stroke="#64748b" strokeWidth="1.5" />
        <line x1="27" y1="22" x2="30" y2="22" stroke="#64748b" strokeWidth="1.5" />
        {/* Red Speed Hand Pointer */}
        <line x1="16" y1="22" x2="23" y2="14" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="22" r="2.5" fill="#ef4444" />
        {/* Speed Lightning Trail */}
        <path d="M22 10L26 6" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Left: Green TRUE Button */}
      <g transform="translate(10, 26)">
        <circle cx="12" cy="14" r="11" fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M8 14L11 17L17 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Right: Red FALSE Button */}
      <g transform="translate(66, 26)">
        <circle cx="12" cy="14" r="11" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M8.5 10.5L15.5 17.5M15.5 10.5L8.5 17.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 9. Sentence Builder (Lego Syntax) Thumbnail
export function SentenceBuilderThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Block Gradients */}
        <linearGradient id="legoBlue" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="legoYellow" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#facc15" />
          <stop offset="1" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="legoPink" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f43f5e" />
          <stop offset="1" stopColor="#be123c" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#f8fafc" className="dark:fill-zinc-900" />

      {/* Connecting Chain / Track */}
      <rect x="8" y="46" width="84" height="4" rx="2" fill="#e2e8f0" className="dark:fill-zinc-800" />

      {/* Block 1: Subject (Blue) */}
      <g transform="translate(10, 24)">
        {/* Lego Studs */}
        <circle cx="8" cy="2" r="3" fill="#0284c7" />
        <circle cx="18" cy="2" r="3" fill="#0284c7" />
        {/* Main Body with interlocking notch */}
        <rect x="0" y="4" width="26" height="22" rx="4" fill="url(#legoBlue)" stroke="#ffffff" strokeWidth="1" />
        <text x="13" y="19" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="10" fontFamily="sans-serif">
          S
        </text>
      </g>

      {/* Connector Arrow */}
      <path d="M38 38L42 38" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

      {/* Block 2: Verb (Yellow) */}
      <g transform="translate(42, 24)">
        <circle cx="8" cy="2" r="3" fill="#ca8a04" />
        <circle cx="18" cy="2" r="3" fill="#ca8a04" />
        <rect x="0" y="4" width="26" height="22" rx="4" fill="url(#legoYellow)" stroke="#ffffff" strokeWidth="1" />
        <text x="13" y="19" textAnchor="middle" fill="#713f12" fontWeight="800" fontSize="10" fontFamily="sans-serif">
          V
        </text>
      </g>

      {/* Connector Arrow */}
      <path d="M70 38L74 38" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

      {/* Block 3: Object (Pink/Red) */}
      <g transform="translate(72, 24)">
        <circle cx="7" cy="2" r="3" fill="#be123c" />
        <circle cx="15" cy="2" r="3" fill="#be123c" />
        <rect x="0" y="4" width="22" height="22" rx="4" fill="url(#legoPink)" stroke="#ffffff" strokeWidth="1" />
        <text x="11" y="19" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="10" fontFamily="sans-serif">
          O
        </text>
      </g>

      {/* Checkmark syntax verified */}
      <g transform="translate(74, 52)">
        <rect x="0" y="0" width="18" height="14" rx="4" fill="#22c55e" />
        <path d="M5 7L8 10L13 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// 10. Drag & Drop Master / Word Match & Cloze Thumbnail
export function DragDropClozeThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dragCardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#818cf8" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#f8fafc" className="dark:fill-zinc-900" />

      {/* Matching Target Slot (Dashed Border) */}
      <rect x="14" y="44" width="40" height="20" rx="5" fill="#e0e7ff" className="dark:fill-zinc-800" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="34" y="57" textAnchor="middle" fill="#6366f1" fontSize="9" fontWeight="700" fontFamily="sans-serif">
        [ ___ ]
      </text>

      {/* Context sentence text lines */}
      <rect x="14" y="18" width="50" height="3" rx="1.5" fill="#94a3b8" />
      <rect x="14" y="26" width="36" height="3" rx="1.5" fill="#94a3b8" />

      {/* Moving Word Chip being dragged */}
      <g transform="translate(38, 20) rotate(-6 20 10)">
        <rect x="0" y="0" width="38" height="18" rx="5" fill="url(#dragCardGrad)" stroke="#ffffff" strokeWidth="1.2" />
        <text x="19" y="12" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" fontFamily="sans-serif">
          Word
        </text>
      </g>

      {/* Dragging Mouse Cursor Hand */}
      <g transform="translate(64, 28)">
        <path d="M0 0L4 14L8 10L14 16L17 13L11 7L16 6L0 0Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// 11. Hangman Vocabulary Thumbnail
export function HangmanVocabularyThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lampGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#0f172a" />

      {/* Gallows Structure */}
      <g stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Base */}
        <line x1="12" y1="68" x2="36" y2="68" />
        {/* Pole */}
        <line x1="24" y1="68" x2="24" y2="16" />
        {/* Top beam */}
        <line x1="24" y1="16" x2="52" y2="16" />
        {/* Support beam */}
        <line x1="24" y1="26" x2="34" y2="16" strokeWidth="1.8" />
        {/* Rope */}
        <line x1="52" y1="16" x2="52" y2="24" stroke="#e2e8f0" strokeWidth="1.5" />
      </g>

      {/* Mystery Glowing Question Bulb / Mascot */}
      <g transform="translate(42, 24)">
        {/* Head glow circle */}
        <circle cx="10" cy="10" r="9" fill="url(#lampGrad)" stroke="#ffffff" strokeWidth="1.5" />
        <text x="10" y="14" textAnchor="middle" fill="#78350f" fontWeight="900" fontSize="12" fontFamily="sans-serif">
          ?
        </text>
        {/* Little Body */}
        <line x1="10" y1="19" x2="10" y2="30" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="23" x2="4" y2="28" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="23" x2="16" y2="28" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Letter Blank Slots: _  _  _  _ */}
      <g transform="translate(32, 64)">
        <line x1="0" y1="0" x2="10" y2="0" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15" y1="0" x2="25" y2="0" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="0" x2="40" y2="0" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="45" y1="0" x2="55" y2="0" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Revealed letters */}
        <text x="5" y="-4" textAnchor="middle" fill="#38bdf8" fontWeight="800" fontSize="10" fontFamily="sans-serif">
          W
        </text>
        <text x="35" y="-4" textAnchor="middle" fill="#38bdf8" fontWeight="800" fontSize="10" fontFamily="sans-serif">
          R
        </text>
        <text x="50" y="-4" textAnchor="middle" fill="#38bdf8" fontWeight="800" fontSize="10" fontFamily="sans-serif">
          D
        </text>
      </g>
    </svg>
  );
}

// 12. Export PDF Thumbnail (Bonus if needed)
export function ExportPdfThumbnail() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="80" rx="10" fill="#f8fafc" className="dark:fill-zinc-900" />
      <rect x="22" y="12" width="46" height="56" rx="4" fill="#ffffff" className="dark:fill-zinc-800" stroke="#cbd5e1" strokeWidth="1.2" />
      <rect x="22" y="12" width="46" height="14" rx="4" fill="#ef4444" />
      <text x="45" y="23" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="9" fontFamily="sans-serif">
        PDF
      </text>
      <rect x="28" y="34" width="34" height="2.5" rx="1.2" fill="#94a3b8" />
      <rect x="28" y="42" width="34" height="2.5" rx="1.2" fill="#94a3b8" />
      <rect x="28" y="50" width="24" height="2.5" rx="1.2" fill="#94a3b8" />
      <circle cx="58" cy="56" r="8" fill="#ef4444" />
      <path d="M58 52V60M55 57L58 60L61 57" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
