package com.zplus.counselling.entity.postgres;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "counseling_sessions")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class CounselingSession extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counselor_id")
    private User counselor;

    @Column(name = "session_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private SessionType sessionType;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private SessionStatus status = SessionStatus.SCHEDULED;

    @Column(name = "scheduled_at", nullable = false)
    private LocalDateTime scheduledAt;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "meeting_link")
    private String meetingLink;

    @Column(name = "session_notes", columnDefinition = "TEXT")
    private String sessionNotes;

    @Column(name = "client_feedback", columnDefinition = "TEXT")
    private String clientFeedback;

    @Column(name = "counselor_feedback", columnDefinition = "TEXT")
    private String counselorFeedback;

    @Column(name = "session_rating")
    private Integer sessionRating;

    @Column(name = "fee_amount", precision = 10, scale = 2)
    private BigDecimal feeAmount;

    @Column(name = "payment_status")
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "cancelled_reason")
    private String cancelledReason;

    @Column(name = "rescheduled_from_session_id")
    private String rescheduledFromSessionId;

    public enum SessionType {
        INDIVIDUAL_COUNSELING,
        GROUP_COUNSELING,
        CAREER_GUIDANCE,
        EDUCATIONAL_CONSULTATION,
        PSYCHOLOGY_ASSESSMENT_FOLLOWUP
    }

    public enum SessionStatus {
        SCHEDULED,
        CONFIRMED,
        IN_PROGRESS,
        COMPLETED,
        CANCELLED,
        NO_SHOW,
        RESCHEDULED
    }

    public enum PaymentStatus {
        PENDING,
        PAID,
        FAILED,
        REFUNDED,
        WAIVED
    }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public User getCounselor() { return counselor; }
    public void setCounselor(User counselor) { this.counselor = counselor; }

    public SessionType getSessionType() { return sessionType; }
    public void setSessionType(SessionType sessionType) { this.sessionType = sessionType; }

    public SessionStatus getStatus() { return status; }
    public void setStatus(SessionStatus status) { this.status = status; }

    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getEndedAt() { return endedAt; }
    public void setEndedAt(LocalDateTime endedAt) { this.endedAt = endedAt; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }

    public String getSessionNotes() { return sessionNotes; }
    public void setSessionNotes(String sessionNotes) { this.sessionNotes = sessionNotes; }

    public String getClientFeedback() { return clientFeedback; }
    public void setClientFeedback(String clientFeedback) { this.clientFeedback = clientFeedback; }

    public String getCounselorFeedback() { return counselorFeedback; }
    public void setCounselorFeedback(String counselorFeedback) { this.counselorFeedback = counselorFeedback; }

    public Integer getSessionRating() { return sessionRating; }
    public void setSessionRating(Integer sessionRating) { this.sessionRating = sessionRating; }

    public BigDecimal getFeeAmount() { return feeAmount; }
    public void setFeeAmount(BigDecimal feeAmount) { this.feeAmount = feeAmount; }

    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getCancelledReason() { return cancelledReason; }
    public void setCancelledReason(String cancelledReason) { this.cancelledReason = cancelledReason; }

    public String getRescheduledFromSessionId() { return rescheduledFromSessionId; }
    public void setRescheduledFromSessionId(String rescheduledFromSessionId) { this.rescheduledFromSessionId = rescheduledFromSessionId; }
}