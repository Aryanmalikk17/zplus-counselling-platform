package com.zplus.counselling.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
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
}