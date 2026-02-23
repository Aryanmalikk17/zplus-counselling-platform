/**
 * assessmentService.ts — All assessment API routes, strongly typed.
 *
 * Every function maps 1:1 to a backend @RestController endpoint.
 * All types are imported from assessmentTypes.ts (mirroring the Java DTOs).
 * Error handling is centralized in apiClient — no try/catch needed here.
 *
 * Route mapping:
 *   GET  /assessments/available           → getAvailable()
 *   POST /assessments/{type}/start        → startAssessment(type)
 *   PUT  /assessments/{type}/answer       → submitAnswer(type, payload)
 *   POST /assessments/{type}/submit       → submitAssessment(type, sessionId)
 *   GET  /assessments/{type}/result/{id}  → getResult(type, resultId)
 *   GET  /assessments/history             → getHistory()
 */

import apiClient from './apiClient';
import type {
    AvailableAssessment,
    StartAssessmentResponse,
    SubmitAnswerResponse,
    AssessmentResult,
    AssessmentSession,
} from '../types/assessmentTypes';
import type { ApiResponse } from '../types';

// ── Payload types (mirrors backend DTOs for request bodies) ──────────────────

export interface SubmitAnswerPayload {
    sessionId: string;    // UUID string — matches String sessionId in SubmitAnswerRequest.java
    questionId: string;
    answer: string;
    responseTime?: number;
}

export interface StartAssessmentPayload {
    // Currently empty — backend StartAssessmentRequest accepts optional metadata
    metadata?: Record<string, string>;
}

// ── Service ──────────────────────────────────────────────────────────────────

const assessmentService = {
    /**
     * GET /assessments/available
     * Returns all active assessment templates and whether the user has completed each.
     */
    async getAvailable(): Promise<AvailableAssessment[]> {
        const response = await apiClient.get<ApiResponse<AvailableAssessment[]>>('/assessments/available');
        return response.data;
    },

    /**
     * POST /assessments/{type}/start
     * Creates a new session for the given assessment type and returns the first question.
     *
     * @example
     * const session = await assessmentService.startAssessment('MBTI');
     * // session.sessionId is a UUID string
     * // session.firstQuestion has the first question to render
     */
    async startAssessment(
        type: string,
        payload: StartAssessmentPayload = {}
    ): Promise<StartAssessmentResponse> {
        const response = await apiClient.post<ApiResponse<StartAssessmentResponse>>(
            `/assessments/${type}/start`,
            payload
        );
        return response.data;
    },

    /**
     * PUT /assessments/{type}/answer
     * Submits a single answer and returns the next question (or completion signal).
     */
    async submitAnswer(
        type: string,
        payload: SubmitAnswerPayload
    ): Promise<SubmitAnswerResponse> {
        const response = await apiClient.put<ApiResponse<SubmitAnswerResponse>>(
            `/assessments/${type}/answer`,
            payload
        );
        return response.data;
    },

    /**
     * POST /assessments/{type}/submit
     * Marks the session as complete and triggers scoring.
     * Returns the full result including personality type, scores, and career suggestions.
     */
    async submitAssessment(
        type: string,
        sessionId: string  // UUID string
    ): Promise<AssessmentResult> {
        const response = await apiClient.post<ApiResponse<AssessmentResult>>(
            `/assessments/${type}/submit`,
            { sessionId }
        );
        return response.data;
    },

    /**
     * GET /assessments/{type}/result/{id}
     * Fetches a previously completed assessment result by its result ID (UUID string).
     */
    async getResult(type: string, resultId: string): Promise<AssessmentResult> {
        const response = await apiClient.get<ApiResponse<AssessmentResult>>(
            `/assessments/${type}/result/${resultId}`
        );
        return response.data;
    },

    /**
     * GET /assessments/history
     * Returns all past assessment sessions for the authenticated user, newest first.
     */
    async getHistory(): Promise<AssessmentSession[]> {
        const response = await apiClient.get<ApiResponse<AssessmentSession[]>>('/assessments/history');
        return response.data;
    },
};

export default assessmentService;
