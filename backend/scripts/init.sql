-- Z Plus Counselling Database Initialization Script
-- Run this script to set up the database schema

-- Create additional databases if needed
CREATE DATABASE zplus_counselling_test;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE zplus_counselling TO zplus_user;
GRANT ALL PRIVILEGES ON DATABASE zplus_counselling_test TO zplus_user;

-- Create extensions
\c zplus_counselling;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\c zplus_counselling_test;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    location VARCHAR(255),
    profile_picture_url TEXT,
    subscription_type VARCHAR(50) DEFAULT 'FREE',
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    education_level VARCHAR(100),
    occupation VARCHAR(255),
    experience_years INTEGER,
    interests TEXT[],
    goals TEXT[],
    preferred_language VARCHAR(50) DEFAULT 'English',
    timezone VARCHAR(50),
    bio TEXT,
    linkedin_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assessment sessions table (updated to match your entity)
CREATE TABLE IF NOT EXISTS assessment_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    template_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'IN_PROGRESS',
    current_question_index INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user answers table (updated to match your entity)
CREATE TABLE IF NOT EXISTS user_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    question_id VARCHAR(255) NOT NULL,
    selected_option_id VARCHAR(255),
    question_number INTEGER,
    time_spent_seconds BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create test results table
CREATE TABLE IF NOT EXISTS test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES assessment_sessions(id),
    test_type VARCHAR(100) NOT NULL,
    test_version VARCHAR(20) DEFAULT '1.0',
    raw_answers JSONB NOT NULL,
    raw_scores JSONB NOT NULL,
    calculated_results JSONB NOT NULL,
    personality_type VARCHAR(50),
    primary_traits TEXT[],
    strengths TEXT[],
    improvement_areas TEXT[],
    career_recommendations TEXT[],
    completion_time_seconds INTEGER,
    accuracy_score DECIMAL(5,2),
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create counseling sessions table (updated to match your entity)
CREATE TABLE IF NOT EXISTS counseling_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    counselor_id UUID REFERENCES users(id),
    session_type VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'SCHEDULED',
    scheduled_at TIMESTAMP NOT NULL,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    duration_minutes INTEGER DEFAULT 60,
    meeting_link VARCHAR(500),
    session_notes TEXT,
    client_feedback TEXT,
    counselor_feedback TEXT,
    session_rating INTEGER CHECK (session_rating >= 1 AND session_rating <= 5),
    fee_amount DECIMAL(10,2),
    payment_status VARCHAR(30) DEFAULT 'PENDING',
    cancelled_reason TEXT,
    rescheduled_from_session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_type ON users(subscription_type);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_user_id ON assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_template_id ON assessment_sessions(template_id);
CREATE INDEX IF NOT EXISTS idx_user_answers_session_id ON user_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_test_type ON test_results(test_type);
CREATE INDEX IF NOT EXISTS idx_counseling_sessions_user_id ON counseling_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_counseling_sessions_counselor_id ON counseling_sessions(counselor_id);
CREATE INDEX IF NOT EXISTS idx_counseling_sessions_scheduled_at ON counseling_sessions(scheduled_at);

-- Insert sample data for testing
INSERT INTO users (email, password_hash, full_name, phone, subscription_type, is_email_verified, is_active)
VALUES 
    ('admin@zplus.com', '$2a$10$dummy.hash.for.admin', 'Admin User', '+91-9999999999', 'PREMIUM', true, true),
    ('user@test.com', '$2a$10$dummy.hash.for.user', 'Test User', '+91-8888888888', 'FREE', true, true)
ON CONFLICT (email) DO NOTHING;

-- Create update trigger for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_assessment_sessions_updated_at ON assessment_sessions;
CREATE TRIGGER update_assessment_sessions_updated_at BEFORE UPDATE ON assessment_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_counseling_sessions_updated_at ON counseling_sessions;
CREATE TRIGGER update_counseling_sessions_updated_at BEFORE UPDATE ON counseling_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();