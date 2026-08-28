/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ConfigurationArea from './components/ConfigurationArea';
import PromptOutput from './components/PromptOutput';
import LiveSimulatorModal from './components/LiveSimulatorModal';
import DocumentExtractorModal from './components/DocumentExtractorModal';
import ToastContainer, { toast } from './components/Toast';
import { PromptConfig, GradeLevel, ExamTarget, StudyMode, MiniGameId, ExtractedCard } from './types';
import { compileMasterPrompt, PRESET_TEMPLATES, THEORY_PRESETS, SAMPLE_VOCABULARY_DEFAULT } from './data/promptTemplates';

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
  fontChoice: 'vietnam',
  systemUtilities: ['web_speech', 'streak_heatmap', 'web_audio', 'dark_mode'],
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
      
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load saved config from localStorage', e);
  }
  return DEFAULT_CONFIG;
}

export default function App() {
  const [config, setConfig] = useState<PromptConfig>(loadSavedConfig);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isExtractorOpen, setIsExtractorOpen] = useState(false);

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

  const handleSelectPreset = (presetConfig: PromptConfig) => {
    setConfig(presetConfig);
  };

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
    <div className="h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white flex flex-col font-sans antialiased select-none">
      {/* Header */}
      <Header
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenExtractor={() => setIsExtractorOpen(true)}
      />

      {/* Main Split-Screen Workspace (58% Left - 42% Right) */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
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
          onOpenSimulator={() => setIsSimulatorOpen(true)}
        />
      </main>

      {/* Interactive Sandbox Simulator Modal */}
      <LiveSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        config={config}
      />

      {/* Document Extractor Modal (Phân hệ Bóc tách tài liệu & Nạp lý thuyết mới) */}
      <DocumentExtractorModal
        isOpen={isExtractorOpen}
        onClose={() => setIsExtractorOpen(false)}
        config={config}
        onSaveToLessonBank={handleSaveToLessonBank}
        onOpenSimulator={() => {
          setIsExtractorOpen(false);
          setIsSimulatorOpen(true);
        }}
      />
      
      <ToastContainer />
    </div>
  );
}
