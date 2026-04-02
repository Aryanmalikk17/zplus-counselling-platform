package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * ResultSummaryDto — Refactored to use Lombok.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultSummaryDto {
    private String title;
    private String description;
    private List<String> strengths;
    private List<String> careerSuggestions;
}