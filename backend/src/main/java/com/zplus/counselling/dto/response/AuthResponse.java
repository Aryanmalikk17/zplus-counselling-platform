package com.zplus.counselling.dto.response;

import com.zplus.counselling.entity.postgres.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private User user;
}