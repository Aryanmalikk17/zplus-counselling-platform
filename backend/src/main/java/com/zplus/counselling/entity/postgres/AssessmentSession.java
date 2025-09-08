package com.zplus.counselling.entity.postgres;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "assessment_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AssessmentSession extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "template_id", nullable = false)
    private String templateId; // References MongoDB AssessmentTemplate

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SessionStatus status = SessionStatus.IN_PROGRESS;

    @Column(name = "current_question_index")
    private Integer currentQuestionIndex = 0;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "time_spent_seconds")
    private Long timeSpentSeconds = 0L;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserAnswer> answers = new ArrayList<>();

    public enum SessionStatus {
        IN_PROGRESS,
        COMPLETED,
        ABANDONED,
        EXPIRED
    }

    // Helper methods
    public void completeSession() {
        this.status = SessionStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
        if (this.startedAt != null) {
            this.timeSpentSeconds = java.time.Duration.between(this.startedAt, this.completedAt).getSeconds();
        }
    }

    public void abandonSession() {
        this.status = SessionStatus.ABANDONED;
        this.completedAt = LocalDateTime.now();
        if (this.startedAt != null) {
            this.timeSpentSeconds = java.time.Duration.between(this.startedAt, this.completedAt).getSeconds();
        }
    }

    public boolean isCompleted() {
        return status == SessionStatus.COMPLETED;
    }

    public void addAnswer(UserAnswer answer) {
        answers.add(answer);
        answer.setSession(this);
    }
}