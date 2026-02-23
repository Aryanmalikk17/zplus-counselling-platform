package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class OptionDto {
    private String id;
    private String text;

    public OptionDto() {}

    public OptionDto(String id, String text) {
        this.id = id;
        this.text = text;
    }

    public static OptionDtoBuilder builder() {
        return new OptionDtoBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public static class OptionDtoBuilder {
        private String id;
        private String text;

        OptionDtoBuilder() {}

        public OptionDtoBuilder id(String id) {
            this.id = id;
            return this;
        }

        public OptionDtoBuilder text(String text) {
            this.text = text;
            return this;
        }

        public OptionDto build() {
            return new OptionDto(id, text);
        }
    }
}