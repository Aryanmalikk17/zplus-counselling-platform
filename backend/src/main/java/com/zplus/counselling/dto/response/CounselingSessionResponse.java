package com.zplus.counselling.dto.response;

import lombok.Data;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
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
}