package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

public class AssessmentResultDto {
    private String resultId;
    private String personalityType;
    private Map<String, Integer> scores;
    private ResultSummaryDto summary;
    private String reportUrl;
    private LocalDateTime completedAt;

    public AssessmentResultDto() {}

    public AssessmentResultDto(String resultId, String personalityType, Map<String, Integer> scores, ResultSummaryDto summary, String reportUrl, LocalDateTime completedAt) {
        this.resultId = resultId;
        this.personalityType = personalityType;
        this.scores = scores;
        this.summary = summary;
        this.reportUrl = reportUrl;
        this.completedAt = completedAt;
    }

    public static AssessmentResultDtoBuilder builder() {
        return new AssessmentResultDtoBuilder();
    }

    public String getResultId() { return resultId; }
    public void setResultId(String resultId) { this.resultId = resultId; }

    public String getPersonalityType() { return personalityType; }
    public void setPersonalityType(String personalityType) { this.personalityType = personalityType; }

    public Map<String, Integer> getScores() { return scores; }
    public void setScores(Map<String, Integer> scores) { this.scores = scores; }

    public ResultSummaryDto getSummary() { return summary; }
    public void setSummary(ResultSummaryDto summary) { this.summary = summary; }

    public String getReportUrl() { return reportUrl; }
    public void setReportUrl(String reportUrl) { this.reportUrl = reportUrl; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public static class AssessmentResultDtoBuilder {
        private String resultId;
        private String personalityType;
        private Map<String, Integer> scores;
        private ResultSummaryDto summary;
        private String reportUrl;
        private LocalDateTime completedAt;

        AssessmentResultDtoBuilder() {}

        public AssessmentResultDtoBuilder resultId(String resultId) {
            this.resultId = resultId;
            return this;
        }

        public AssessmentResultDtoBuilder personalityType(String personalityType) {
            this.personalityType = personalityType;
            return this;
        }

        public AssessmentResultDtoBuilder scores(Map<String, Integer> scores) {
            this.scores = scores;
            return this;
        }

        public AssessmentResultDtoBuilder summary(ResultSummaryDto summary) {
            this.summary = summary;
            return this;
        }

        public AssessmentResultDtoBuilder reportUrl(String reportUrl) {
            this.reportUrl = reportUrl;
            return this;
        }

        public AssessmentResultDtoBuilder completedAt(LocalDateTime completedAt) {
            this.completedAt = completedAt;
            return this;
        }

        public AssessmentResultDto build() {
            return new AssessmentResultDto(resultId, personalityType, scores, summary, reportUrl, completedAt);
        }
    }
}