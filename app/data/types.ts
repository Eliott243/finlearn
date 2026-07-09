export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: LessonSection[];
  summary: string;
  illustration: string;
}

export interface LessonSection {
  type: 'intro' | 'example' | 'key' | 'transition';
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  level: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export interface ETFSheet {
  id: string;
  name: string;
  index: string;
  replicationType: string;
  ter: string;
  region: string;
  description: string;
  termDefinitions: Record<string, string>;
}

export interface CompoundInterestInput {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  annualRate: number;
}

export interface CompoundInterestYearPoint {
  year: number;
  total: number;
  contributions: number;
  interest: number;
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyData: CompoundInterestYearPoint[];
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  badges: string[];
  riskProfile?: 'prudent' | 'equilibre' | 'dynamique';
  riskProfileCompleted?: boolean;
  viewedETFSheets: string[];
  etfToolQuizPassed?: boolean;
  seenTipIds: string[];
  streak: number;
  lastActivityDate?: string;
  totalActiveDays?: number;
}

export type RootStackParamList = {
  MainTabs: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  TipsLibrary: undefined;
  News: undefined;
};

export type ModulesStackParamList = {
  Modules: undefined;
  ModuleDetail: { moduleId: string };
  LessonDetail: { moduleId: string; lessonId: string };
  Quiz: { moduleId: string };
};

export type ToolsStackParamList = {
  Tools: undefined;
  CompoundInterest: undefined;
  TontineSimulator: undefined;
  InflationCalculator: undefined;
  ExchangeRates: undefined;
  RiskProfile: undefined;
  ETFSheets: undefined;
  ETFSheetDetail: { etfId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  CurrencySettings: undefined;
  CertificateCelebration: { level: number };
  CertificateGallery: undefined;
  Referral: undefined;
  Avatars: undefined;
};

export type TabParamList = {
  Accueil: undefined;
  Parcours: undefined;
  Outils: undefined;
  Profil: undefined;
};
