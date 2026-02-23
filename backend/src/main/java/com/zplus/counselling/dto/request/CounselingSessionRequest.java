package com.zplus.counselling.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

public class CounselingSessionRequest {
    
    @NotNull(message = "Counselor ID is required")
    private UUID counselorId;
    
    @NotNull(message = "Scheduled time is required")
    private LocalDateTime scheduledAt;
    
    @NotNull(message = "Session type is required")
    private String sessionType; // INDIVIDUAL, GROUP, COUPLE
    
    @Size(max = 1000, message = "Session notes cannot exceed 1000 characters")
    private String sessionNotes;
    
    @Size(max = 500, message = "Special requirements cannot exceed 500 characters")
    private String specialRequirements;
    
    private Integer durationMinutes = 60; // Default 60 minutes
    
    private String platform; // ZOOM, TEAMS, IN_PERSON
    
    private String meetingLink;

    public UUID getCounselorId() { return counselorId; }
    public void setCounselorId(UUID counselorId) { this.counselorId = counselorId; }

    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public String getSessionType() { return sessionType; }
    public void setSessionType(String sessionType) { this.sessionType = sessionType; }

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
}