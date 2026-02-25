// User types
export interface EducationalQualification {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
  isCompleted: boolean;
  grade?: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  passwordHash?: string; // Optional, usually not sent to frontend
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;
  profilePictureUrl?: string;
  subscriptionType?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isActive?: boolean;
  lastLoginAt?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // Legacy fields for compatibility
  avatar?: string;
  bio?: string;
  birthday?: string;
  profession?: string;
  experience?: string;
  educationalQualifications?: EducationalQualification[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Test types
export interface Question {
  id: string;
  question: string;
  options: string[];
  category?: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  category: TestCategory;
  questions: Question[];
  estimatedTime: number; // in minutes
  isActive: boolean;
}

export const enum TestCategory {
  PERSONALITY = 'personality',
  CAREER = 'career',
  EQ = 'emotional-intelligence',
  RNO = 'reasoning-observation',
  PSYCHOLOGY = 'psychology',
  GTO = 'group-testing'
}

// Test results
export interface TestAnswer {
  questionId: string;
  selectedOption: number;
}

export interface TestSession {
  id: string;
  testId: string;
  userId: string;
  answers: TestAnswer[];
  startedAt: Date;
  completedAt?: Date;
  currentQuestionIndex: number;
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  testName: string;
  resultType: string;
  score: number;
  percentile?: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  detailedAnalysis: string;
  chartData?: unknown;
  completedAt: Date;
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  publishedAt: Date;
  readTime: number; // in minutes
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}