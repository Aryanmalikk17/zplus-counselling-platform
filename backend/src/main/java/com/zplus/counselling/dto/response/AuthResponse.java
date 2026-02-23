package com.zplus.counselling.dto.response;

/**
 * AuthResponse — returned by POST /auth/login and POST /auth/register.
 *
 * IMPORTANT: This DTO contains UserProfileResponse (safe DTO), NOT the raw User entity.
 * The raw User entity must NEVER be embedded in any API response.
 */
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private UserProfileResponse user;

    public AuthResponse() {}

    public AuthResponse(String accessToken, String refreshToken, String tokenType, UserProfileResponse user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType;
        this.user = user;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getRefreshToken() { return refreshToken; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public UserProfileResponse getUser() { return user; }
    public void setUser(UserProfileResponse user) { this.user = user; }

    public static class AuthResponseBuilder {
        private String accessToken;
        private String refreshToken;
        private String tokenType;
        private UserProfileResponse user;

        AuthResponseBuilder() {}

        public AuthResponseBuilder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public AuthResponseBuilder refreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
            return this;
        }

        public AuthResponseBuilder tokenType(String tokenType) {
            this.tokenType = tokenType;
            return this;
        }

        public AuthResponseBuilder user(UserProfileResponse user) {
            this.user = user;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(accessToken, refreshToken, tokenType, user);
        }
    }
}