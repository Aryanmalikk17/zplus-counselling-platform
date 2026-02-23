package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class QuestionDto {
    private String id;
    private String text;
    private String type;
    private List<OptionDto> options;
    private Boolean required;

    public QuestionDto() {}

    public QuestionDto(String id, String text, String type, List<OptionDto> options, Boolean required) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.options = options;
        this.required = required;
    }

    public static QuestionDtoBuilder builder() {
        return new QuestionDtoBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public List<OptionDto> getOptions() { return options; }
    public void setOptions(List<OptionDto> options) { this.options = options; }

    public Boolean getRequired() { return required; }
    public void setRequired(Boolean required) { this.required = required; }

    public static class QuestionDtoBuilder {
        private String id;
        private String text;
        private String type;
        private List<OptionDto> options;
        private Boolean required;

        QuestionDtoBuilder() {}

        public QuestionDtoBuilder id(String id) {
            this.id = id;
            return this;
        }

        public QuestionDtoBuilder text(String text) {
            this.text = text;
            return this;
        }

        public QuestionDtoBuilder type(String type) {
            this.type = type;
            return this;
        }

        public QuestionDtoBuilder options(List<OptionDto> options) {
            this.options = options;
            return this;
        }

        public QuestionDtoBuilder required(Boolean required) {
            this.required = required;
            return this;
        }

        public QuestionDto build() {
            return new QuestionDto(id, text, type, options, required);
        }
    }
}