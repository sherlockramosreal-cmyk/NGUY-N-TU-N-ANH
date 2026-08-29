import React from 'react';

export function MinimalistMockup() {
  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-lg p-2 flex flex-col justify-center items-center border border-gray-100 dark:border-zinc-800">
      <div className="w-full max-w-[70px] bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-700 rounded-md p-1.5 shadow-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="w-6 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-xs"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-full"></div>
        </div>
        <div className="space-y-1">
          <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-xs"></div>
          <div className="w-4/5 h-1 bg-gray-100 dark:bg-zinc-800 rounded-xs"></div>
        </div>
        <div className="w-full h-2.5 bg-black dark:bg-white rounded-xs flex items-center justify-center">
          <div className="w-3 h-0.5 bg-white dark:bg-black rounded-xs"></div>
        </div>
      </div>
    </div>
  );
}

export function GlassmorphismMockup() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-2 flex items-center justify-center relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-0 left-1 w-7 h-7 rounded-full bg-pink-300/40 blur-[1px]"></div>
      <div className="absolute bottom-0 right-1 w-8 h-8 rounded-full bg-cyan-300/40 blur-[1px]"></div>
      
      {/* Frosted Glass Floating Card */}
      <div className="w-full max-w-[72px] bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/30 rounded-xl p-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.15)] relative z-10 space-y-1">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-white/80 shadow-xs"></div>
          <div className="w-8 h-1 bg-white/80 rounded-xs"></div>
        </div>
        <div className="w-full h-1 bg-white/40 rounded-xs"></div>
        <div className="w-3/4 h-1 bg-white/40 rounded-xs"></div>
        <div className="w-full h-2 rounded-md bg-white/30 border border-white/40 flex items-center justify-center">
          <div className="w-4 h-0.5 bg-white rounded-xs"></div>
        </div>
      </div>
    </div>
  );
}

export function PlayfulArcadeMockup() {
  return (
    <div className="w-full h-full bg-sky-100 dark:bg-sky-950/60 rounded-lg p-2 flex flex-col items-center justify-center relative overflow-hidden border border-sky-200 dark:border-sky-800/60">
      {/* Subtle Dot Pattern */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0284c7 1px, transparent 1px)',
          backgroundSize: '6px 6px',
        }}
      />
      
      {/* 3D Game Button Mockup */}
      <div className="relative z-10 flex flex-col items-center gap-1">
        <div className="px-2.5 py-1 bg-yellow-400 hover:bg-yellow-300 active:translate-y-0.5 rounded-xl border-b-4 border-yellow-600 shadow-md flex items-center gap-1 transform -rotate-2">
          <span className="text-[10px] leading-none select-none">⭐</span>
          <span className="text-[8px] font-black tracking-wider text-yellow-950 uppercase leading-none">
            PLAY
          </span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 border border-emerald-600"></div>
          <div className="w-2 h-2 rounded-full bg-rose-400 border border-rose-600"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-400 border border-indigo-600"></div>
        </div>
      </div>
    </div>
  );
}

export function NeumorphismMockup() {
  return (
    <div className="w-full h-full bg-[#e0e0e0] dark:bg-[#202024] rounded-lg p-2 flex items-center justify-center">
      {/* Dual Soft Shadow Inset/Outset Card */}
      <div
        className="w-full max-w-[70px] h-[48px] bg-[#e0e0e0] dark:bg-[#202024] rounded-xl p-1.5 flex flex-col justify-between"
        style={{
          boxShadow: '4px 4px 8px #bebebe, -4px -4px 8px #ffffff',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="w-2 h-2 rounded-full bg-blue-500/80 shadow-inner"></div>
          <div className="w-6 h-1 bg-gray-400 dark:bg-zinc-600 rounded-full"></div>
        </div>
        {/* Pressed Neumorphic Button inside */}
        <div
          className="w-full h-3 rounded-lg bg-[#e0e0e0] dark:bg-[#202024] flex items-center justify-center"
          style={{
            boxShadow: 'inset 2px 2px 4px #bebebe, inset -2px -2px 4px #ffffff',
          }}
        >
          <div className="w-4 h-0.5 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function getUIStyleMockup(styleId: string) {
  switch (styleId) {
    case 'minimalist':
      return <MinimalistMockup />;
    case 'glassmorphism':
      return <GlassmorphismMockup />;
    case 'playful':
      return <PlayfulArcadeMockup />;
    case 'neumorphism':
      return <NeumorphismMockup />;
    default:
      return <MinimalistMockup />;
  }
}
