package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class AvailableAssessmentDto {
    private String testType;
    private String title;
    private String description;
    private String category;
    private Integer estimatedTimeMinutes;
    private Integer totalQuestions;
    private Boolean isCompleted;
    private LocalDateTime lastAttemptDate;
    private Double price;
    private String difficulty;

    public AvailableAssessmentDto() {}

    public AvailableAssessmentDto(String testType, String title, String description, String category, Integer estimatedTimeMinutes, Integer totalQuestions, Boolean isCompleted, LocalDateTime lastAttemptDate, Double price, String difficulty) {
        this.testType = testType;
        this.title = title;
        this.description = description;
        this.category = category;
        this.estimatedTimeMinutes = estimatedTimeMinutes;
        this.totalQuestions = totalQuestions;
        this.isCompleted = isCompleted;
        this.lastAttemptDate = lastAttemptDate;
        this.price = price;
        this.difficulty = difficulty;
    }

    public static AvailableAssessmentDtoBuilder builder() {
        return new AvailableAssessmentDtoBuilder();
    }

    public String getTestType() { return testType; }
    public void setTestType(String testType) { this.testType = testType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getEstimatedTimeMinutes() { return estimatedTimeMinutes; }
    public void setEstimatedTimeMinutes(Integer estimatedTimeMinutes) { this.estimatedTimeMinutes = estimatedTimeMinutes; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public LocalDateTime getLastAttemptDate() { return lastAttemptDate; }
    public void setLastAttemptDate(LocalDateTime lastAttemptDate) { this.lastAttemptDate = lastAttemptDate; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public static class AvailableAssessmentDtoBuilder {
        private String testType;
        private String title;
        private String description;
        private String category;
        private Integer estimatedTimeMinutes;
        private Integer totalQuestions;
        private Boolean isCompleted;
        private LocalDateTime lastAttemptDate;
        private Double price;
        private String difficulty;

        AvailableAssessmentDtoBuilder() {}

        public AvailableAssessmentDtoBuilder testType(String testType) {
            this.testType = testType;
            return this;
        }

        public AvailableAssessmentDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AvailableAssessmentDtoBuilder description(String description) {
            this.description = description;
            return this;
        }

        public AvailableAssessmentDtoBuilder category(String category) {
            this.category = category;
            return this;
        }

        public AvailableAssessmentDtoBuilder estimatedTimeMinutes(Integer estimatedTimeMinutes) {
            this.estimatedTimeMinutes = estimatedTimeMinutes;
            return this;
        }

        public AvailableAssessmentDtoBuilder totalQuestions(Integer totalQuestions) {
            this.totalQuestions = totalQuestions;
            return this;
        }

        public AvailableAssessmentDtoBuilder isCompleted(Boolean isCompleted) {
            this.isCompleted = isCompleted;
            return this;
        }

        public AvailableAssessmentDtoBuilder lastAttemptDate(LocalDateTime lastAttemptDate) {
            this.lastAttemptDate = lastAttemptDate;
            return this;
        }

        public AvailableAssessmentDtoBuilder price(Double price) {
            this.price = price;
            return this;
        }

        public AvailableAssessmentDtoBuilder difficulty(String difficulty) {
            this.difficulty = difficulty;
            return this;
        }

        public AvailableAssessmentDto build() {
            return new AvailableAssessmentDto(testType, title, description, category, estimatedTimeMinutes, totalQuestions, isCompleted, lastAttemptDate, price, difficulty);
        }
    }
}