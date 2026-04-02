package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * OptionDto — Refactored to use Lombok.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptionDto {
    private String id;
    private String text;
}