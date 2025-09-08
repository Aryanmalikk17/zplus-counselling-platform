package com.zplus.counselling.util.constants;

public final class ErrorConstants {
    
    private ErrorConstants() {
        // Utility class
    }
    
    // Authentication Errors
    public static final String INVALID_CREDENTIALS = "Invalid email or password";
    public static final String USER_NOT_FOUND = "User not found";
    public static final String EMAIL_ALREADY_EXISTS = "Email already exists";
    public static final String UNAUTHORIZED_ACCESS = "Unauthorized access";
    public static final String TOKEN_EXPIRED = "Token has expired";
    public static final String INVALID_TOKEN = "Invalid token";
    
    // Assessment Errors
    public static final String ASSESSMENT_NOT_FOUND = "Assessment not found";
    public static final String TEST_ALREADY_COMPLETED = "Test has already been completed";
    public static final String TEST_NOT_STARTED = "Test has not been started";
    public static final String INVALID_ANSWER = "Invalid answer provided";
    public static final String QUESTION_NOT_FOUND = "Question not found";
    
    // Validation Errors
    public static final String INVALID_EMAIL = "Invalid email format";
    public static final String WEAK_PASSWORD = "Password does not meet security requirements";
    public static final String REQUIRED_FIELD_MISSING = "Required field is missing";
    public static final String INVALID_DATA_FORMAT = "Invalid data format";
    
    // System Errors
    public static final String INTERNAL_SERVER_ERROR = "Internal server error occurred";
    public static final String DATABASE_CONNECTION_ERROR = "Database connection failed";
    public static final String SERVICE_UNAVAILABLE = "Service temporarily unavailable";
    public static final String RATE_LIMIT_EXCEEDED = "Rate limit exceeded";
}