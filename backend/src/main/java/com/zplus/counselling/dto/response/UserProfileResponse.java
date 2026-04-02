package com.zplus.counselling.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Safe public-facing user profile DTO.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private String id;
    private String email;
    private String fullName;
    private String phone;
    private String location;
    private String profilePictureUrl;
    private String subscriptionType;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private Boolean isActive;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;

    // Manual Builder to bypass Lombok runtime issues in this environment
    public static UserProfileResponseBuilder builder() {
        return new UserProfileResponseBuilder();
    }

    public static class UserProfileResponseBuilder {
        private String id;
        private String email;
        private String fullName;
        private String phone;
        private String location;
        private String profilePictureUrl;
        private String subscriptionType;
        private Boolean isEmailVerified;
        private Boolean isPhoneVerified;
        private Boolean isActive;
        private String role;
        private LocalDateTime createdAt;
        private LocalDateTime lastLoginAt;

        public UserProfileResponseBuilder id(String id) { this.id = id; return this; }
        public UserProfileResponseBuilder email(String email) { this.email = email; return this; }
        public UserProfileResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserProfileResponseBuilder phone(String phone) { this.phone = phone; return this; }
        public UserProfileResponseBuilder location(String location) { this.location = location; return this; }
        public UserProfileResponseBuilder profilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; return this; }
        public UserProfileResponseBuilder subscriptionType(String subscriptionType) { this.subscriptionType = subscriptionType; return this; }
        public UserProfileResponseBuilder isEmailVerified(Boolean isEmailVerified) { this.isEmailVerified = isEmailVerified; return this; }
        public UserProfileResponseBuilder isPhoneVerified(Boolean isPhoneVerified) { this.isPhoneVerified = isPhoneVerified; return this; }
        public UserProfileResponseBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public UserProfileResponseBuilder role(String role) { this.role = role; return this; }
        public UserProfileResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public UserProfileResponseBuilder lastLoginAt(LocalDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; return this; }

        public UserProfileResponse build() {
            return new UserProfileResponse(id, email, fullName, phone, location, profilePictureUrl, 
                subscriptionType, isEmailVerified, isPhoneVerified, isActive, role, createdAt, lastLoginAt);
        }
    }
}