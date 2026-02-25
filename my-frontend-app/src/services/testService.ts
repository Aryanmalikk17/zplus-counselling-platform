import apiClient from './apiClient';
import { ApiResponse } from '../types';
import { TestResult } from '../types/testTypes';
import { AssessmentTemplate } from './';

const testService = {
  async getAssessment(testType: string): Promise<AssessmentTemplate> {
    const data = await apiClient.get<ApiResponse<AssessmentTemplate>>(`/assessments/${testType}`);
    return data.data;
  },

  async saveTestResult(result: TestResult): Promise<string> {
    const dto = {
      testId: result.testId,
      testName: result.testName,
      testType: result.testType ?? result.testId,
      score: result.score,
      percentage: result.percentage,
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      incorrectAnswers: result.incorrectAnswers,
      unanswered: result.unanswered,
      totalPoints: result.totalPoints,
      pointsEarned: result.pointsEarned,
      categoryResults: result.categoryResults,
      timeSpent: result.timeSpent,
      recommendations: result.recommendations,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      grade: result.grade,
      isPassed: result.isPassed,
      detailedAnswers: result.detailedAnswers,
    };

    const data = await apiClient.post<ApiResponse<string>>('/test-results', dto);
    return data.data;
  },
};

export default testService;
