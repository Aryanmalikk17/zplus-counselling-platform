/**
 * assessmentTypes.ts — TypeScript contracts that exactly mirror the Java backend DTOs.
 *
 * AUTO-GENERATED during QA contract audit. Do NOT manually drift from these —
 * run verify-deployment.js to catch any future mismatches.
 *
 * Mirrors:
 *  - AssessmentSessionDto.java      (id: String UUID)
 *  - AssessmentResultDto.java
 *  - StartAssessmentResponse.java
 *  - SubmitAnswerResponse.java
 *  - AvailableAssessmentDto.java
 */

// --- Mirrors QuestionDto.java ---
export interface BackendOption {
    id: string;
    text: string;
}

export interface BackendQuestion {
    id: string;
    text: string;
    type: string;
    options: BackendOption[];
    required: boolean;
}

// --- Mirrors ResultSummaryDto.java ---
export interface ResultSummary {
    title: string;
    description: string;
    strengths: string[];
    careerSuggestions: string[];
}

// --- Mirrors AssessmentResultDto.java ---
export interface AssessmentResult {
    resultId: string;            // UUID as string — matches String resultId in Java
    personalityType: string;
    scores: Record<string, number>;
    summary: ResultSummary;
    reportUrl: string;
    completedAt: string;         // ISO-8601 from LocalDateTime serialisation
}

// --- Mirrors AssessmentSessionDto.java ---
export interface AssessmentSession {
    id: string;                  // UUID as string — FIXED from Long (was broken before refactor)
    templateId: string;
    templateTitle: string;
    templateType: string;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED' | 'EXPIRED';
    currentQuestionIndex: number;
    totalQuestions: number;
    startedAt: string;           // ISO-8601
    completedAt: string | null;
    timeSpentSeconds: number;
    progressPercentage: number;
}

// --- Mirrors StartAssessmentResponse.java ---
export interface StartAssessmentResponse {
    sessionId: string;           // UUID as string
    testType: string;
    totalQuestions: number;
    currentQuestion: number;
    timeLimit: number | null;
    instructions: string[];
    firstQuestion: BackendQuestion | null;
}

// --- Mirrors SubmitAnswerResponse.java ---
export interface SubmitAnswerResponse {
    currentQuestion: number;
    totalQuestions: number;
    completionPercentage: number;
    nextQuestion: BackendQuestion | null;
}

// --- Mirrors AvailableAssessmentDto.java ---
export interface AvailableAssessment {
    testType: string;
    title: string;
    description: string;
    category: string;
    estimatedTimeMinutes: number;
    totalQuestions: number;
    isCompleted: boolean;
    lastAttemptDate: string | null;
    price: number;
    difficulty: string;
}

// --- Mirrors AuthResponse.java ---
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    user: BackendUser;
}

// --- Mirrors UserProfileResponse.java ---
export interface BackendUser {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    location?: string;
    subscriptionType?: string;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    createdAt: string;
    updatedAt?: string;
}
