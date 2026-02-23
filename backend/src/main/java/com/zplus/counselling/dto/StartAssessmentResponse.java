package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class StartAssessmentResponse {
    private String sessionId;
    private String testType;
    private Integer totalQuestions;
    private Integer currentQuestion;
    private Integer timeLimit;
    private List<String> instructions;
    private QuestionDto firstQuestion;

    public StartAssessmentResponse() {}

    public StartAssessmentResponse(String sessionId, String testType, Integer totalQuestions, Integer currentQuestion, Integer timeLimit, List<String> instructions, QuestionDto firstQuestion) {
        this.sessionId = sessionId;
        this.testType = testType;
        this.totalQuestions = totalQuestions;
        this.currentQuestion = currentQuestion;
        this.timeLimit = timeLimit;
        this.instructions = instructions;
        this.firstQuestion = firstQuestion;
    }

    public static StartAssessmentResponseBuilder builder() {
        return new StartAssessmentResponseBuilder();
    }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getTestType() { return testType; }
    public void setTestType(String testType) { this.testType = testType; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public Integer getCurrentQuestion() { return currentQuestion; }
    public void setCurrentQuestion(Integer currentQuestion) { this.currentQuestion = currentQuestion; }

    public Integer getTimeLimit() { return timeLimit; }
    public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }

    public List<String> getInstructions() { return instructions; }
    public void setInstructions(List<String> instructions) { this.instructions = instructions; }

    public QuestionDto getFirstQuestion() { return firstQuestion; }
    public void setFirstQuestion(QuestionDto firstQuestion) { this.firstQuestion = firstQuestion; }

    public static class StartAssessmentResponseBuilder {
        private String sessionId;
        private String testType;
        private Integer totalQuestions;
        private Integer currentQuestion;
        private Integer timeLimit;
        private List<String> instructions;
        private QuestionDto firstQuestion;

        StartAssessmentResponseBuilder() {}

        public StartAssessmentResponseBuilder sessionId(String sessionId) {
            this.sessionId = sessionId;
            return this;
        }

        public StartAssessmentResponseBuilder testType(String testType) {
            this.testType = testType;
            return this;
        }

        public StartAssessmentResponseBuilder totalQuestions(Integer totalQuestions) {
            this.totalQuestions = totalQuestions;
            return this;
        }

        public StartAssessmentResponseBuilder currentQuestion(Integer currentQuestion) {
            this.currentQuestion = currentQuestion;
            return this;
        }

        public StartAssessmentResponseBuilder timeLimit(Integer timeLimit) {
            this.timeLimit = timeLimit;
            return this;
        }

        public StartAssessmentResponseBuilder instructions(List<String> instructions) {
            this.instructions = instructions;
            return this;
        }

        public StartAssessmentResponseBuilder firstQuestion(QuestionDto firstQuestion) {
            this.firstQuestion = firstQuestion;
            return this;
        }

        public StartAssessmentResponse build() {
            return new StartAssessmentResponse(sessionId, testType, totalQuestions, currentQuestion, timeLimit, instructions, firstQuestion);
        }
    }
}