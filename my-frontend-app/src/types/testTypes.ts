// Test component types
export interface TestOption {
  id: string;
  text: string;
  image?: string;
  isCorrect?: boolean; // Add correct answer marking
}

export interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'image-based' | 'scenario';
  question: string;
  description?: string;
  options?: TestOption[];
  timeLimit?: number; // in seconds
  image?: string;
  category: string;
  correctAnswer?: string; // For objective questions
  points?: number; // Points for this question
}

export interface TestConfig {
  id: string;
  name: string;
  description: string;
  duration: string;
  instructions: string[];
  questions: TestQuestion[];
  categories: string[];
  totalPoints?: number;
  passingScore?: number;
  type?: string; // Added missing type property
  timeLimit?: string; // Added missing timeLimit property
  difficulty?: 'Easy' | 'Medium' | 'Hard'; // Added missing difficulty property
}

export interface TestAnswer {
  questionId: string;
  answer: string | string[];
  timeSpent: number;
  isCorrect?: boolean;
  pointsEarned?: number;
}

export interface TestSession {
  testId: string;
  userId?: string;
  answers: TestAnswer[];
  startTime: Date;
  currentQuestionIndex: number;
  isCompleted: boolean;
}

export interface CategoryResult {
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  percentage: number;
  timeSpent: number;
}

export interface TestResult {
  testId: string;
  testName: string;
  testType?: string;
  score: number;
  percentage: number;
  percentile?: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  totalPoints: number;
  pointsEarned: number;
  categoryResults: CategoryResult[];
  timeSpent: number;
  completedAt: Date;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  isPassed: boolean;
  detailedAnswers: {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer?: string;
    isCorrect: boolean;
    pointsEarned: number;
    timeSpent: number;
    category: string;
    explanation?: string; // Added missing explanation property
  }[];
}

// Reasoning Test Types
export type ReasoningTestType = 'verbal' | 'non-verbal';

// Psychological Test Types
export type PsychologicalTestType = 'TAT' | 'WAT' | 'SRT' | 'SDT' | 'GPE';