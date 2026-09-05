/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ConfigurationArea from './components/ConfigurationArea';
import PromptOutput from './components/PromptOutput';
import DocumentExtractorModal from './components/DocumentExtractorModal';
import VideoTutorialModal from './components/VideoTutorialModal';
import OnboardingTour, { checkHasCompletedTour } from './components/OnboardingTour';
import ToastContainer, { toast } from './components/Toast';
import { PromptConfig, ExtractedCard } from './types';
import { compileMasterPrompt, THEORY_PRESETS, SAMPLE_VOCABULARY_DEFAULT } from './data/promptTemplates';
import { initGA } from './utils/analytics';

const STORAGE_KEY = 'engiprompt_studio_config_v2';

const DEFAULT_CONFIG: PromptConfig = {
  gradeLevel: 'lop12',
  examTargets: ['thptqg', 'ielts'],
  lessonTopic: 'Environment & Climate Change Collocations',
  theoryContent: THEORY_PRESETS[0].content,
  sampleContent: SAMPLE_VOCABULARY_DEFAULT,
  studyModes: ['flashcard3d', 'active_recall', 'exam_mode', 'doc_extractor', 'export_pdf'],
  selectedGames: ['tetris', 'dino', 'penalty', 'dragdrop', 'truefalse', 'scramble', 'hangman'],
  colorTheme: 'indigo',
  primaryColor: '#18181b',
  accentColor: '#27272a',
  uiStyle: 'minimalist',
  fontChoice: 'arial',
  systemUtilities: ['web_speech', 'web_audio', 'dark_mode'],
  outputFormat: 'single_file_html',
  strictCompleteCode: true,
  vocabCount: 10,
};

function loadSavedConfig(): PromptConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Tự động dọn dẹp bộ nhớ đệm (localStorage) nếu chứa rác từ Cloudflare
      const junkPattern = /Just a moment|thuvienphapluat\.vn|Performing security verification/i;
      
      if (parsed.lessonTopic && junkPattern.test(parsed.lessonTopic)) {
        parsed.lessonTopic = DEFAULT_CONFIG.lessonTopic;
      }
      if (parsed.theoryContent && junkPattern.test(parsed.theoryContent)) {
        parsed.theoryContent = DEFAULT_CONFIG.theoryContent;
      }
      if (parsed.sampleContent && junkPattern.test(parsed.sampleContent)) {
        parsed.sampleContent = DEFAULT_CONFIG.sampleContent;
      }
      
      const validFonts = [
        'arial', 'times', 'tahoma', 'courier', 'calibri',
        'nunito', 'lora', 'fira_code', 'comic_neue', 'bricolage'
      ];
      if (!parsed.fontChoice || !validFonts.includes(parsed.fontChoice)) {
        parsed.fontChoice = 'arial';
      }

      if (Array.isArray(parsed.systemUtilities)) {
        parsed.systemUtilities = parsed.systemUtilities.filter((u: string) => u !== 'streak_heatmap');
      }

      // 1. Trạng thái mặc định (khi chưa bấm nút): Master Prompt giữ nguyên gốc, không tự chèn dữ liệu bóc tách
      delete parsed.rawExtractedDocText;

      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load saved config from localStorage', e);
  }
  return DEFAULT_CONFIG;
}

export default function App() {
  const [config, setConfig] = useState<PromptConfig>(loadSavedConfig);
  const [isExtractorOpen, setIsExtractorOpen] = useState(false);
  const [isVideoTutorialOpen, setIsVideoTutorialOpen] = useState(false);
  const [isOnboardingTourOpen, setIsOnboardingTourOpen] = useState(false);

  // Initialize Google Analytics 4
  useEffect(() => {
    initGA();
  }, []);

  // Check and automatically trigger Onboarding Tour for first-time visitors
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!checkHasCompletedTour()) {
        setIsOnboardingTourOpen(true);
      }
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Sync configuration to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [config]);

  const compiledPrompt = useMemo(() => {
    return compileMasterPrompt(config);
  }, [config]);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    } catch {}
    toast.success('Đã khôi phục cài đặt gốc');
  };

  const handleSaveToLessonBank = (updatedConfig: PromptConfig, cards: ExtractedCard[]) => {
    setConfig(updatedConfig);
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white font-sans antialiased select-none">
      {/* Header */}
      <Header
        onReset={handleReset}
        onOpenExtractor={() => setIsExtractorOpen(true)}
        onOpenVideo={() => setIsVideoTutorialOpen(true)}
        onOpenTour={() => setIsOnboardingTourOpen(true)}
      />

      {/* Main Split-Screen Workspace (58% Left - 42% Right) */}
      <main className="flex-1 min-h-0 w-full max-w-[1720px] mx-auto p-2.5 sm:p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 overflow-y-auto lg:overflow-hidden">
        {/* Left Column: Configuration & Pedagogy Controls (7 cols = 58.3%) */}
        <ConfigurationArea
          config={config}
          onChange={setConfig}
          onOpenExtractor={() => setIsExtractorOpen(true)}
          onReset={handleReset}
        />

        {/* Right Column: Real-Time Master Prompt Output Terminal (5 cols = 41.7%) */}
        <PromptOutput
          promptContent={compiledPrompt}
          config={config}
          onOpenVideo={() => setIsVideoTutorialOpen(true)}
        />
      </main>

      {/* Document Extractor Modal (Phân hệ Bóc tách tài liệu & Nạp lý thuyết mới) */}
      <DocumentExtractorModal
        isOpen={isExtractorOpen}
        onClose={() => setIsExtractorOpen(false)}
        config={config}
        onSaveToLessonBank={handleSaveToLessonBank}
        onUpdateConfig={(updatedConfig) => setConfig(updatedConfig)}
      />

      {/* Video Tutorial Modal (YouTube Link: https://youtu.be/cfU-Ez0-Nec?si=UXpFTHvfWw70dpWD) */}
      <VideoTutorialModal
        isOpen={isVideoTutorialOpen}
        onClose={() => setIsVideoTutorialOpen(false)}
        onStartTour={() => setIsOnboardingTourOpen(true)}
      />

      {/* Interactive Onboarding Tour (6-Step Pedagogy Guide) */}
      <OnboardingTour
        isOpen={isOnboardingTourOpen}
        onClose={() => setIsOnboardingTourOpen(false)}
        onOpenVideoModal={() => setIsVideoTutorialOpen(true)}
      />
      
      <ToastContainer />
    </div>
  );
}
