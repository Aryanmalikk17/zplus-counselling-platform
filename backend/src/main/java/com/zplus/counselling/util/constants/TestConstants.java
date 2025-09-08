package com.zplus.counselling.util.constants;

public final class TestConstants {
    
    private TestConstants() {
        // Utility class
    }
    
    // Test Types
    public static final String MBTI = "MBTI";
    public static final String BIG_FIVE = "BIG_FIVE";
    public static final String CAREER = "CAREER";
    public static final String IQ = "IQ";
    public static final String APTITUDE = "APTITUDE";
    public static final String EMOTIONAL_INTELLIGENCE = "EMOTIONAL_INTELLIGENCE";
    
    // Test Categories
    public static final String PERSONALITY = "PERSONALITY";
    public static final String COGNITIVE = "COGNITIVE";
    public static final String CAREER_GUIDANCE = "CAREER_GUIDANCE";
    public static final String SKILLS_ASSESSMENT = "SKILLS_ASSESSMENT";
    
    // Test Statuses
    public static final String NOT_STARTED = "NOT_STARTED";
    public static final String IN_PROGRESS = "IN_PROGRESS";
    public static final String COMPLETED = "COMPLETED";
    public static final String ABANDONED = "ABANDONED";
    
    // Scoring Methods
    public static final String DIMENSIONAL_SCORING = "DIMENSIONAL_SCORING";
    public static final String WEIGHTED_SUM = "WEIGHTED_SUM";
    public static final String PERCENTILE_RANKING = "PERCENTILE_RANKING";
    
    // Time Limits (in minutes)
    public static final int DEFAULT_TIME_LIMIT = 60;
    public static final int MBTI_TIME_LIMIT = 15;
    public static final int IQ_TIME_LIMIT = 45;
    public static final int CAREER_TIME_LIMIT = 20;
}