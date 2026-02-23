package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class SubmitAnswerResponse {
    private Integer currentQuestion;
    private Integer totalQuestions;
    private Double completionPercentage;
    private QuestionDto nextQuestion;

    public SubmitAnswerResponse() {}

    public SubmitAnswerResponse(Integer currentQuestion, Integer totalQuestions, Double completionPercentage, QuestionDto nextQuestion) {
        this.currentQuestion = currentQuestion;
        this.totalQuestions = totalQuestions;
        this.completionPercentage = completionPercentage;
        this.nextQuestion = nextQuestion;
    }

    public static SubmitAnswerResponseBuilder builder() {
        return new SubmitAnswerResponseBuilder();
    }

    public Integer getCurrentQuestion() { return currentQuestion; }
    public void setCurrentQuestion(Integer currentQuestion) { this.currentQuestion = currentQuestion; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public Double getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(Double completionPercentage) { this.completionPercentage = completionPercentage; }

    public QuestionDto getNextQuestion() { return nextQuestion; }
    public void setNextQuestion(QuestionDto nextQuestion) { this.nextQuestion = nextQuestion; }

    public static class SubmitAnswerResponseBuilder {
        private Integer currentQuestion;
        private Integer totalQuestions;
        private Double completionPercentage;
        private QuestionDto nextQuestion;

        SubmitAnswerResponseBuilder() {}

        public SubmitAnswerResponseBuilder currentQuestion(Integer currentQuestion) {
            this.currentQuestion = currentQuestion;
            return this;
        }

        public SubmitAnswerResponseBuilder totalQuestions(Integer totalQuestions) {
            this.totalQuestions = totalQuestions;
            return this;
        }

        public SubmitAnswerResponseBuilder completionPercentage(Double completionPercentage) {
            this.completionPercentage = completionPercentage;
            return this;
        }

        public SubmitAnswerResponseBuilder nextQuestion(QuestionDto nextQuestion) {
            this.nextQuestion = nextQuestion;
            return this;
        }

        public SubmitAnswerResponse build() {
            return new SubmitAnswerResponse(currentQuestion, totalQuestions, completionPercentage, nextQuestion);
        }
    }
}