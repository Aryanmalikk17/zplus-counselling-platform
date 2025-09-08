package com.zplus.counselling.entity.postgres;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "test_results")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class TestResult extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "test_type", nullable = false, length = 50)
    private String testType;

    @Column(name = "test_version", nullable = false, length = 10)
    private String testVersion = "1.0";

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "raw_answers", columnDefinition = "TEXT")
    private Map<String, Object> rawAnswers;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "raw_scores", columnDefinition = "TEXT")
    private Map<String, Object> rawScores;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "calculated_results", columnDefinition = "TEXT")
    private Map<String, Object> calculatedResults;

    @Column(name = "personality_type", length = 10)
    private String personalityType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "primary_traits", columnDefinition = "TEXT")
    private List<String> primaryTraits;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "strengths", columnDefinition = "TEXT")
    private List<String> strengths;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "weaknesses", columnDefinition = "TEXT")
    private List<String> weaknesses;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "career_suggestions", columnDefinition = "TEXT")
    private List<String> careerSuggestions;

    @Column(name = "completion_percentage")
    private Integer completionPercentage;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = false;

    @Column(name = "pdf_report_url", length = 500)
    private String pdfReportUrl;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}