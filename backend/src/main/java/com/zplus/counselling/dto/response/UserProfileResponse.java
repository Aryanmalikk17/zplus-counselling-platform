package com.zplus.counselling.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserProfileResponse {
    
    private UUID id;
    private String email;
    private String fullName;
    private String phone;
    private String location;
    private String subscriptionType;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private LocalDateTime createdAt;
}