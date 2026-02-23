package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class ResultSummaryDto {
    private String title;
    private String description;
    private List<String> strengths;
    private List<String> careerSuggestions;

    public ResultSummaryDto() {}

    public ResultSummaryDto(String title, String description, List<String> strengths, List<String> careerSuggestions) {
        this.title = title;
        this.description = description;
        this.strengths = strengths;
        this.careerSuggestions = careerSuggestions;
    }

    public static ResultSummaryDtoBuilder builder() {
        return new ResultSummaryDtoBuilder();
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getCareerSuggestions() { return careerSuggestions; }
    public void setCareerSuggestions(List<String> careerSuggestions) { this.careerSuggestions = careerSuggestions; }

    public static class ResultSummaryDtoBuilder {
        private String title;
        private String description;
        private List<String> strengths;
        private List<String> careerSuggestions;

        ResultSummaryDtoBuilder() {}

        public ResultSummaryDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ResultSummaryDtoBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ResultSummaryDtoBuilder strengths(List<String> strengths) {
            this.strengths = strengths;
            return this;
        }

        public ResultSummaryDtoBuilder careerSuggestions(List<String> careerSuggestions) {
            this.careerSuggestions = careerSuggestions;
            return this;
        }

        public ResultSummaryDto build() {
            return new ResultSummaryDto(title, description, strengths, careerSuggestions);
        }
    }
}