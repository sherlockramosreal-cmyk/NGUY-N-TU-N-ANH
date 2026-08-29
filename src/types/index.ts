export type GradeLevel = 'lop10' | 'lop11' | 'lop12';

export type ExamTarget = 
  | 'thptqg'
  | 'ielts'
  | 'sat'
  | 'vact'
  | 'giaotiep';

export type StudyMode = 
  | 'flashcard3d'
  | 'active_recall'
  | 'exam_mode'
  | 'doc_extractor'
  | 'export_pdf';

export type MiniGameId = 
  | 'tetris'
  | 'dino'
  | 'penalty'
  | 'dragdrop'
  | 'truefalse'
  | 'scramble'
  | 'hangman';

export type ColorTheme = 
  | 'indigo'
  | 'emerald'
  | 'amber'
  | 'ocean'
  | 'ruby'
  | 'rose'
  | 'cyberpunk'
  | 'slate'
  | 'custom';

export type UIStyle = 
  | 'glassmorphism'
  | 'minimalist'
  | 'playful'
  | 'neumorphism';

export type FontChoice = 
  | 'arial'
  | 'times'
  | 'tahoma'
  | 'courier'
  | 'calibri'
  | 'nunito'
  | 'lora'
  | 'fira_code'
  | 'comic_neue'
  | 'bricolage';

export type SystemUtility = 
  | 'web_speech'
  | 'streak_heatmap'
  | 'web_audio'
  | 'dark_mode';

export type OutputFormat = 'single_file_html' | 'react_applet' | 'modular_system';

export type KnowledgeLayer = 1 | 2 | 3 | 4;

export interface ExtractedCard {
  id: string;
  term: string;
  phonetic?: string;
  pos: 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Phrase' | 'Grammar';
  definition: string;
  example: string;
  exampleVi?: string;
  layer: KnowledgeLayer;
  collocations?: string[];
  notes?: string;
}

export interface PromptConfig {
  gradeLevel: GradeLevel;
  examTargets: ExamTarget[];
  lessonTopic: string;
  theoryContent: string;
  sampleContent: string;
  studyModes: StudyMode[];
  selectedGames: MiniGameId[];
  colorTheme: ColorTheme;
  primaryColor: string;
  accentColor: string;
  uiStyle: UIStyle;
  fontChoice: FontChoice;
  systemUtilities: SystemUtility[];
  outputFormat: OutputFormat;
  promptStrategy?: 'single' | 'modular_3_parts';
  strictCompleteCode: boolean;
  vocabCount: number;
  extractedCards?: ExtractedCard[];
}

