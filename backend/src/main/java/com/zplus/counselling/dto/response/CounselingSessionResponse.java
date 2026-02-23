package com.zplus.counselling.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public class CounselingSessionResponse {
    
    private UUID id;
    private UUID userId;
    private UUID counselorId;
    private String counselorName;
    private String userFullName;
    private LocalDateTime scheduledAt;
    private String sessionType;
    private String status;
    private String sessionNotes;
    private String specialRequirements;
    private Integer durationMinutes;
    private String platform;
    private String meetingLink;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Feedback related fields
    private Integer userRating;
    private String userFeedback;
    private String counselorNotes;

    public CounselingSessionResponse() {}

    public CounselingSessionResponse(UUID id, UUID userId, UUID counselorId, String counselorName, String userFullName, LocalDateTime scheduledAt, String sessionType, String status, String sessionNotes, String specialRequirements, Integer durationMinutes, String platform, String meetingLink, LocalDateTime createdAt, LocalDateTime updatedAt, Integer userRating, String userFeedback, String counselorNotes) {
        this.id = id;
        this.userId = userId;
        this.counselorId = counselorId;
        this.counselorName = counselorName;
        this.userFullName = userFullName;
        this.scheduledAt = scheduledAt;
        this.sessionType = sessionType;
        this.status = status;
        this.sessionNotes = sessionNotes;
        this.specialRequirements = specialRequirements;
        this.durationMinutes = durationMinutes;
        this.platform = platform;
        this.meetingLink = meetingLink;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userRating = userRating;
        this.userFeedback = userFeedback;
        this.counselorNotes = counselorNotes;
    }

    public static CounselingSessionResponseBuilder builder() {
        return new CounselingSessionResponseBuilder();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public UUID getCounselorId() { return counselorId; }
    public void setCounselorId(UUID counselorId) { this.counselorId = counselorId; }

    public String getCounselorName() { return counselorName; }
    public void setCounselorName(String counselorName) { this.counselorName = counselorName; }

    public String getUserFullName() { return userFullName; }
    public void setUserFullName(String userFullName) { this.userFullName = userFullName; }

    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public String getSessionType() { return sessionType; }
    public void setSessionType(String sessionType) { this.sessionType = sessionType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSessionNotes() { return sessionNotes; }
    public void setSessionNotes(String sessionNotes) { this.sessionNotes = sessionNotes; }

    public String getSpecialRequirements() { return specialRequirements; }
    public void setSpecialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Integer getUserRating() { return userRating; }
    public void setUserRating(Integer userRating) { this.userRating = userRating; }

    public String getUserFeedback() { return userFeedback; }
    public void setUserFeedback(String userFeedback) { this.userFeedback = userFeedback; }

    public String getCounselorNotes() { return counselorNotes; }
    public void setCounselorNotes(String counselorNotes) { this.counselorNotes = counselorNotes; }

    public static class CounselingSessionResponseBuilder {
        private UUID id;
        private UUID userId;
        private UUID counselorId;
        private String counselorName;
        private String userFullName;
        private LocalDateTime scheduledAt;
        private String sessionType;
        private String status;
        private String sessionNotes;
        private String specialRequirements;
        private Integer durationMinutes;
        private String platform;
        private String meetingLink;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private Integer userRating;
        private String userFeedback;
        private String counselorNotes;

        CounselingSessionResponseBuilder() {}

        public CounselingSessionResponseBuilder id(UUID id) { this.id = id; return this; }
        public CounselingSessionResponseBuilder userId(UUID userId) { this.userId = userId; return this; }
        public CounselingSessionResponseBuilder counselorId(UUID counselorId) { this.counselorId = counselorId; return this; }
        public CounselingSessionResponseBuilder counselorName(String counselorName) { this.counselorName = counselorName; return this; }
        public CounselingSessionResponseBuilder userFullName(String userFullName) { this.userFullName = userFullName; return this; }
        public CounselingSessionResponseBuilder scheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; return this; }
        public CounselingSessionResponseBuilder sessionType(String sessionType) { this.sessionType = sessionType; return this; }
        public CounselingSessionResponseBuilder status(String status) { this.status = status; return this; }
        public CounselingSessionResponseBuilder sessionNotes(String sessionNotes) { this.sessionNotes = sessionNotes; return this; }
        public CounselingSessionResponseBuilder specialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; return this; }
        public CounselingSessionResponseBuilder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public CounselingSessionResponseBuilder platform(String platform) { this.platform = platform; return this; }
        public CounselingSessionResponseBuilder meetingLink(String meetingLink) { this.meetingLink = meetingLink; return this; }
        public CounselingSessionResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public CounselingSessionResponseBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public CounselingSessionResponseBuilder userRating(Integer userRating) { this.userRating = userRating; return this; }
        public CounselingSessionResponseBuilder userFeedback(String userFeedback) { this.userFeedback = userFeedback; return this; }
        public CounselingSessionResponseBuilder counselorNotes(String counselorNotes) { this.counselorNotes = counselorNotes; return this; }

        public CounselingSessionResponse build() {
            return new CounselingSessionResponse(id, userId, counselorId, counselorName, userFullName, scheduledAt, sessionType, status, sessionNotes, specialRequirements, durationMinutes, platform, meetingLink, createdAt, updatedAt, userRating, userFeedback, counselorNotes);
        }
    }
}