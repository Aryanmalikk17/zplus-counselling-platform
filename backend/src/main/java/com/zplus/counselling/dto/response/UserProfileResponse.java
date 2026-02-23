package com.zplus.counselling.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Safe public-facing user profile DTO.
 *
 * This is the ONLY object that should ever be returned in an API response
 * representing a user. It explicitly excludes:
 *   - passwordHash
 *   - passwordResetToken / passwordResetTokenExpiresAt
 *   - firebaseUid
 *   - lastLogoutAt / passwordChangedAt
 *   - role (not needed by the client; capabilities are determined by auth state)
 */
@Data
@Builder
public class UserProfileResponse {

    private String id;                 // UUID serialized as String — consistent with all other IDs
    private String email;
    private String fullName;
    private String phone;
    private String location;
    private String profilePictureUrl;
    private String subscriptionType;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;
}