# Z Plus Counselling Platform - Spring Boot Backend Architecture

## 🎯 Overview

This document outlines the complete Spring Boot backend architecture for the Z Plus Counselling Platform, designed to support 30+ psychological assessments, career guidance, expert counseling, and comprehensive user management.

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)                │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS/REST API
┌─────────────────────────▼───────────────────────────────────────┐
│                     API Gateway (Spring Cloud Gateway)          │
│                    Load Balancer + Rate Limiting               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐ ┌────────▼────────┐ ┌─────▼─────┐
│ Auth Service │ │ Assessment      │ │ Counseling│
│              │ │ Service         │ │ Service   │
└──────────────┘ └─────────────────┘ └───────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                     Data Layer                                  │
│  PostgreSQL (Users, Sessions) + MongoDB (Tests, Content)       │
│  Redis (Cache, Sessions) + RabbitMQ (Async Tasks)             │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

### Core Technologies
- **Framework**: Spring Boot 3.2+
- **Language**: Java 17+ with Lombok
- **Build Tool**: Maven
- **Documentation**: OpenAPI 3.0 (Swagger)

### Databases
- **Primary**: PostgreSQL 15+ (Relational data)
- **Secondary**: MongoDB 6.0+ (Document data)
- **Cache**: Redis 7.0+
- **Search**: Elasticsearch 8.0+ (Optional for advanced search)

### Additional Technologies
- **Message Queue**: RabbitMQ
- **File Storage**: AWS S3 / MinIO
- **Monitoring**: Micrometer + Prometheus
- **Logging**: Logback + ELK Stack
- **Security**: Spring Security 6 + JWT
- **Testing**: JUnit 5 + TestContainers

## 📦 Project Structure

```
zplus-counselling-backend/
├── pom.xml
├── docker-compose.yml
├── README.md
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/
    │   │       └── zplus/
    │   │           └── counselling/
    │   │               ├── ZPlusCounsellingApplication.java
    │   │               ├── config/
    │   │               │   ├── DatabaseConfig.java
    │   │               │   ├── SecurityConfig.java
    │   │               │   ├── RedisConfig.java
    │   │               │   ├── MongoConfig.java
    │   │               │   ├── RabbitMQConfig.java
    │   │               │   └── SwaggerConfig.java
    │   │               ├── controller/
    │   │               │   ├── AuthController.java
    │   │               │   ├── UserController.java
    │   │               │   ├── AssessmentController.java
    │   │               │   ├── TestResultController.java
    │   │               │   ├── CounselingController.java
    │   │               │   ├── BlogController.java
    │   │               │   ├── CareerController.java
    │   │               │   └── AnalyticsController.java
    │   │               ├── service/
    │   │               │   ├── auth/
    │   │               │   │   ├── AuthService.java
    │   │               │   │   ├── JwtService.java
    │   │               │   │   └── UserService.java
    │   │               │   ├── assessment/
    │   │               │   │   ├── AssessmentService.java
    │   │               │   │   ├── TestResultService.java
    │   │               │   │   ├── ScoringService.java
    │   │               │   │   └── RecommendationService.java
    │   │               │   ├── counseling/
    │   │               │   │   ├── CounselingService.java
    │   │               │   │   ├── CounselorService.java
    │   │               │   │   └── SessionService.java
    │   │               │   ├── content/
    │   │               │   │   ├── BlogService.java
    │   │               │   │   └── CareerService.java
    │   │               │   ├── payment/
    │   │               │   │   ├── PaymentService.java
    │   │               │   │   └── RazorpayService.java
    │   │               │   ├── notification/
    │   │               │   │   ├── EmailService.java
    │   │               │   │   └── NotificationService.java
    │   │               │   └── analytics/
    │   │               │       └── AnalyticsService.java
    │   │               ├── repository/
    │   │               │   ├── postgres/
    │   │               │   │   ├── UserRepository.java
    │   │               │   │   ├── TestResultRepository.java
    │   │               │   │   ├── CounselingSessionRepository.java
    │   │               │   │   ├── CounselorRepository.java
    │   │               │   │   └── PaymentRepository.java
    │   │               │   └── mongodb/
    │   │               │       ├── AssessmentTemplateRepository.java
    │   │               │       ├── BlogArticleRepository.java
    │   │               │       ├── UserAnalyticsRepository.java
    │   │               │       └── CareerDataRepository.java
    │   │               ├── entity/
    │   │               │   ├── postgres/
    │   │               │   │   ├── User.java
    │   │               │   │   ├── TestResult.java
    │   │               │   │   ├── CounselingSession.java
    │   │               │   │   ├── Counselor.java
    │   │               │   │   ├── Payment.java
    │   │               │   │   ├── UserProfile.java
    │   │               │   │   └── BaseEntity.java
    │   │               │   └── mongodb/
    │   │               │       ├── AssessmentTemplate.java
    │   │               │       ├── BlogArticle.java
    │   │               │       ├── UserAnalytics.java
    │   │               │       ├── CareerData.java
    │   │               │       └── Question.java
    │   │               ├── dto/
    │   │               │   ├── request/
    │   │               │   │   ├── LoginRequest.java
    │   │               │   │   ├── RegisterRequest.java
    │   │               │   │   ├── TestSubmissionRequest.java
    │   │               │   │   ├── BookSessionRequest.java
    │   │               │   │   └── UpdateProfileRequest.java
    │   │               │   ├── response/
    │   │               │   │   ├── AuthResponse.java
    │   │               │   │   ├── TestResultResponse.java
    │   │               │   │   ├── UserProfileResponse.java
    │   │               │   │   ├── AssessmentResponse.java
    │   │               │   │   └── ApiResponse.java
    │   │               │   └── common/
    │   │               │       ├── PageResponse.java
    │   │               │       └── BaseResponse.java
    │   │               ├── security/
    │   │               │   ├── JwtAuthenticationFilter.java
    │   │               │   ├── JwtAuthenticationEntryPoint.java
    │   │               │   ├── UserPrincipal.java
    │   │               │   └── SecurityConstants.java
    │   │               ├── exception/
    │   │               │   ├── GlobalExceptionHandler.java
    │   │               │   ├── CustomExceptions.java
    │   │               │   └── ErrorResponse.java
    │   │               ├── util/
    │   │               │   ├── scoring/
    │   │               │   │   ├── MBTIScoringAlgorithm.java
    │   │               │   │   ├── BigFiveScoringAlgorithm.java
    │   │               │   │   ├── CareerScoringAlgorithm.java
    │   │               │   │   ├── IQScoringAlgorithm.java
    │   │               │   │   └── ScoringAlgorithmFactory.java
    │   │               │   ├── pdf/
    │   │               │   │   ├── PDFGenerator.java
    │   │               │   │   └── ReportTemplateEngine.java
    │   │               │   ├── email/
    │   │               │   │   └── EmailTemplateEngine.java
    │   │               │   └── constants/
    │   │               │       ├── TestConstants.java
    │   │               │       ├── ErrorConstants.java
    │   │               │       └── ApplicationConstants.java
    │   │               └── validation/
    │   │                   ├── ValidEmail.java
    │   │                   ├── ValidPassword.java
    │   │                   └── ValidationConstants.java
    │   └── resources/
    │       ├── application.yml
    │       ├── application-dev.yml
    │       ├── application-prod.yml
    │       ├── data.sql
    │       ├── schema.sql
    │       ├── templates/
    │       │   ├── email/
    │       │   │   ├── welcome.html
    │       │   │   ├── test-completion.html
    │       │   │   └── session-reminder.html
    │       │   └── pdf/
    │       │       ├── mbti-report.html
    │       │       ├── career-report.html
    │       │       └── comprehensive-report.html
    │       └── static/
    │           └── api-docs/
    └── test/
        ├── java/
        │   └── com/
        │       └── zplus/
        │           └── counselling/
        │               ├── integration/
        │               │   ├── AuthControllerTest.java
        │               │   ├── AssessmentControllerTest.java
        │               │   └── CounselingControllerTest.java
        │               ├── service/
        │               │   ├── AuthServiceTest.java
        │               │   ├── ScoringServiceTest.java
        │               │   └── TestResultServiceTest.java
        │               └── util/
        │                   └── TestDataBuilder.java
        └── resources/
            ├── application-test.yml
            └── test-data/
                ├── test-questions.json
                └── mock-responses.json
```

## 🗄️ Database Design

### PostgreSQL Schema (Relational Data)

```sql
-- Core user management and transactional data
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
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

-- User profiles (extended user information)
CREATE TABLE user_profiles (
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

-- Test results (all assessment results)
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    test_type VARCHAR(100) NOT NULL, -- 'MBTI', 'BIG_FIVE', 'CAREER', 'IQ', etc.
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

-- Expert counselors
CREATE TABLE counselors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    license_number VARCHAR(100),
    specializations VARCHAR(100)[] NOT NULL,
    experience_years INTEGER NOT NULL,
    education TEXT[],
    certifications TEXT[],
    languages VARCHAR(50)[] DEFAULT '{English}',
    hourly_rate DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    bio TEXT,
    consultation_types VARCHAR(50)[] DEFAULT '{INDIVIDUAL}',
    availability_hours JSONB, -- Weekly schedule
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_sessions INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Counseling sessions
CREATE TABLE counseling_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    counselor_id UUID REFERENCES counselors(id) ON DELETE CASCADE,
    session_type VARCHAR(50) NOT NULL, -- 'CAREER', 'PERSONAL', 'RELATIONSHIP', 'TEAM'
    title VARCHAR(255),
    description TEXT,
    scheduled_at TIMESTAMP NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    session_mode VARCHAR(20) DEFAULT 'VIDEO', -- 'VIDEO', 'AUDIO', 'CHAT'
    meeting_link VARCHAR(500),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(30) DEFAULT 'SCHEDULED', -- 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'
    cancellation_reason TEXT,
    counselor_notes TEXT,
    client_feedback TEXT,
    session_rating INTEGER CHECK (session_rating >= 1 AND session_rating <= 5),
    follow_up_required BOOLEAN DEFAULT FALSE,
    next_session_recommended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment transactions
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    session_id UUID REFERENCES counseling_sessions(id) NULL,
    subscription_id UUID NULL, -- For subscription payments
    payment_type VARCHAR(50) NOT NULL, -- 'SESSION', 'SUBSCRIPTION', 'ASSESSMENT'
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    payment_method VARCHAR(50), -- 'RAZORPAY', 'STRIPE', 'PAYPAL'
    payment_gateway_id VARCHAR(255),
    transaction_id VARCHAR(255) UNIQUE,
    gateway_response JSONB,
    status VARCHAR(30) DEFAULT 'PENDING', -- 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'
    payment_date TIMESTAMP,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    refund_date TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) NOT NULL, -- 'BASIC', 'PREMIUM', 'ENTERPRISE'
    amount DECIMAL(10,2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- 'MONTHLY', 'YEARLY'
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    auto_renew BOOLEAN DEFAULT TRUE,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session reviews and ratings
CREATE TABLE session_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES counseling_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    counselor_id UUID REFERENCES counselors(id) ON DELETE CASCADE,
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    helpfulness_rating INTEGER CHECK (helpfulness_rating >= 1 AND helpfulness_rating <= 5),
    professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
    review_text TEXT,
    would_recommend BOOLEAN,
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for important actions
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_type ON users(subscription_type);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_test_type ON test_results(test_type);
CREATE INDEX idx_counseling_sessions_user_id ON counseling_sessions(user_id);
CREATE INDEX idx_counseling_sessions_counselor_id ON counseling_sessions(counselor_id);
CREATE INDEX idx_counseling_sessions_scheduled_at ON counseling_sessions(scheduled_at);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
```

### MongoDB Collections (Document Data)

```javascript
// Assessment Templates Collection
db.assessmentTemplates.insertOne({
  _id: ObjectId(),
  testType: "MBTI",
  version: "2.0",
  title: "Myers-Briggs Type Indicator",
  description: "Discover your personality type based on Carl Jung's theory of psychological types",
  category: "PERSONALITY",
  estimatedTimeMinutes: 15,
  totalQuestions: 93,
  isActive: true,
  instructions: [
    "Answer each question based on your natural preferences",
    "There are no right or wrong answers",
    "Choose the option that feels most natural to you"
  ],
  dimensions: [
    {
      code: "EI",
      name: "Extraversion vs Introversion",
      description: "Where you direct your energy"
    },
    {
      code: "SN", 
      name: "Sensing vs Intuition",
      description: "How you take in information"
    },
    {
      code: "TF",
      name: "Thinking vs Feeling", 
      description: "How you make decisions"
    },
    {
      code: "JP",
      name: "Judging vs Perceiving",
      description: "How you orient to the outer world"
    }
  ],
  questions: [
    {
      id: "q1",
      text: "At a party do you:",
      type: "SINGLE_CHOICE",
      options: [
        {
          id: "a",
          text: "Interact with many, including strangers",
          weights: { "E": 1, "I": 0 }
        },
        {
          id: "b", 
          text: "Interact with a few, known to you",
          weights: { "E": 0, "I": 1 }
        }
      ],
      dimension: "EI",
      required: true
    }
    // ... more questions
  ],
  scoringAlgorithm: {
    type: "DIMENSIONAL_SCORING",
    method: "WEIGHTED_SUM",
    thresholds: {
      "E": 50, "I": 50,
      "S": 50, "N": 50, 
      "T": 50, "F": 50,
      "J": 50, "P": 50
    }
  },
  resultTypes: {
    "INTJ": {
      title: "The Architect",
      nickname: "The Mastermind",
      description: "Imaginative and strategic thinkers, with a plan for everything.",
      strengths: [
        "Strategic thinking",
        "Independence", 
        "Determination",
        "Vision"
      ],
      weaknesses: [
        "Overly critical",
        "Arrogant",
        "Perfectionist",
        "Social awkwardness"
      ],
      careerSuggestions: [
        "Software Engineer",
        "Scientist", 
        "Architect",
        "Strategic Planner"
      ],
      learningStyle: "Independent and theoretical",
      workEnvironment: "Quiet, autonomous, intellectually challenging"
    }
    // ... all 16 types
  },
  createdAt: ISODate(),
  updatedAt: ISODate()
});

// Blog Articles Collection
db.blogArticles.insertOne({
  _id: ObjectId(),
  title: "Understanding Anxiety: Evidence-Based Techniques",
  slug: "understanding-anxiety-evidence-based-techniques",
  excerpt: "Learn practical strategies from cognitive behavioral therapy to manage anxiety and improve your daily life.",
  content: "Full article content with HTML formatting...",
  author: {
    id: "author-uuid",
    name: "Dr. Emily Rodriguez",
    bio: "Clinical psychologist specializing in anxiety disorders",
    credentials: ["PhD in Clinical Psychology", "Licensed Therapist"],
    avatar: "https://example.com/avatars/emily.jpg"
  },
  category: "MENTAL_HEALTH",
  tags: ["anxiety", "cbt", "mental-health", "therapy", "self-help"],
  readTimeMinutes: 10,
  difficulty: "BEGINNER", // BEGINNER, INTERMEDIATE, ADVANCED
  language: "en",
  seo: {
    metaTitle: "Understanding Anxiety: Evidence-Based Techniques | Z Plus Counselling",
    metaDescription: "Learn practical, evidence-based techniques to manage anxiety...",
    keywords: ["anxiety management", "CBT techniques", "mental health"],
    canonicalUrl: "https://zpluscounselling.com/blog/understanding-anxiety-evidence-based-techniques"
  },
  publishedAt: ISODate(),
  lastModified: ISODate(),
  isPublished: true,
  isFeatured: false,
  viewCount: 0,
  likeCount: 0,
  shareCount: 0,
  relatedArticles: ["article-id-1", "article-id-2"],
  createdAt: ISODate(),
  updatedAt: ISODate()
});

// Career Data Collection
db.careerData.insertOne({
  _id: ObjectId(),
  industry: "TECHNOLOGY",
  jobTitles: [
    {
      title: "Software Engineer",
      level: "ENTRY", // ENTRY, MID, SENIOR, EXECUTIVE
      description: "Develops software applications and systems",
      requiredSkills: [
        "Programming languages (Java, Python, JavaScript)",
        "Problem-solving",
        "Teamwork",
        "Version control (Git)"
      ],
      preferredPersonalityTypes: ["INTJ", "INTP", "ENTJ", "ENTP"],
      salaryRange: {
        min: 600000,
        max: 1200000,
        currency: "INR",
        location: "India"
      },
      workEnvironment: {
        type: "HYBRID", // REMOTE, OFFICE, HYBRID
        teamSize: "MEDIUM",
        pace: "FAST",
        structure: "FLEXIBLE"
      },
      growthProjection: {
        demandGrowth: 15.2,
        period: "2024-2029",
        source: "Industry Report"
      }
    }
  ],
  locations: [
    {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      averageSalaryMultiplier: 1.2,
      jobAvailability: "HIGH",
      costOfLiving: "MEDIUM"
    }
  ],
  trends: [
    {
      trend: "AI and Machine Learning Integration",
      impact: "HIGH",
      description: "Increasing demand for AI-enhanced software solutions"
    }
  ],
  lastUpdated: ISODate(),
  createdAt: ISODate()
});

// User Analytics Collection
db.userAnalytics.insertOne({
  _id: ObjectId(),
  userId: "user-uuid-from-postgres",
  sessionId: "session-uuid",
  deviceInfo: {
    type: "desktop", // mobile, tablet, desktop
    os: "macOS",
    browser: "Chrome",
    userAgent: "Mozilla/5.0..."
  },
  location: {
    country: "India",
    state: "Karnataka", 
    city: "Bangalore",
    timezone: "Asia/Kolkata"
  },
  events: [
    {
      type: "PAGE_VIEW",
      page: "/test/mbti",
      timestamp: ISODate(),
      duration: 120,
      metadata: {
        referrer: "https://google.com",
        utm_source: "google",
        utm_medium: "organic"
      }
    },
    {
      type: "TEST_STARTED", 
      testType: "MBTI",
      timestamp: ISODate(),
      metadata: {
        testVersion: "2.0"
      }
    },
    {
      type: "QUESTION_ANSWERED",
      questionId: "q1",
      answer: "a",
      responseTime: 5.2,
      timestamp: ISODate()
    }
  ],
  testProgress: {
    "MBTI": {
      status: "COMPLETED",
      currentQuestion: 93,
      totalQuestions: 93,
      completionPercentage: 100,
      startedAt: ISODate(),
      completedAt: ISODate(),
      totalTime: 892
    },
    "CAREER": {
      status: "IN_PROGRESS", 
      currentQuestion: 15,
      totalQuestions: 50,
      completionPercentage: 30,
      startedAt: ISODate()
    }
  },
  engagementMetrics: {
    totalSessions: 5,
    totalTimeSpent: 3600,
    averageSessionDuration: 720,
    bounceRate: 0.2,
    pagesPerSession: 8
  },
  createdAt: ISODate(),
  lastActivity: ISODate()
});

// Question Templates Collection (for dynamic test creation)
db.questionTemplates.insertOne({
  _id: ObjectId(),
  category: "PERSONALITY",
  subcategory: "EXTRAVERSION_INTROVERSION",
  template: "In social situations, do you typically:",
  variations: [
    {
      question: "At a party do you:",
      options: [
        "Interact with many, including strangers",
        "Interact with a few, known to you"
      ]
    },
    {
      question: "In a group discussion, do you:",
      options: [
        "Speak up frequently and share ideas",
        "Listen carefully and contribute when asked"
      ]
    }
  ],
  difficulty: "BASIC",
  validatedForTests: ["MBTI", "BIG_FIVE"],
  psychometricProperties: {
    reliability: 0.85,
    validity: 0.78,
    discriminationIndex: 0.65
  },
  createdAt: ISODate(),
  updatedAt: ISODate()
});
```

## 🔐 Security Architecture

### Authentication & Authorization
```java
// JWT-based authentication with role-based access control
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/counselor/**").hasAnyRole("COUNSELOR", "ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .build();
    }
}
```

### Data Encryption
- **At Rest**: PostgreSQL TDE + MongoDB encryption
- **In Transit**: TLS 1.3 for all communications
- **Application Level**: AES-256 for sensitive fields
- **JWT**: RS256 algorithm with key rotation

## 🚀 API Design

### RESTful API Structure
```
/api/v1/
├── auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /refresh
│   ├── POST /logout
│   ├── POST /forgot-password
│   └── POST /reset-password
├── users/
│   ├── GET /profile
│   ├── PUT /profile
│   ├── GET /dashboard
│   └── DELETE /account
├── assessments/
│   ├── GET /available
│   ├── GET /{testType}
│   ├── POST /{testType}/start
│   ├── PUT /{testType}/answer
│   ├── POST /{testType}/submit
│   └── GET /{testType}/result/{resultId}
├── counseling/
│   ├── GET /counselors
│   ├── GET /counselors/{id}
│   ├── POST /sessions/book
│   ├── GET /sessions
│   ├── PUT /sessions/{id}
│   └── POST /sessions/{id}/review
├── blog/
│   ├── GET /articles
│   ├── GET /articles/{slug}
│   ├── GET /categories
│   └── GET /search
├── career/
│   ├── GET /industries
│   ├── GET /job-roles
│   ├── GET /salary-insights
│   └── GET /recommendations/{userId}
└── analytics/
    ├── POST /events
    ├── GET /dashboard
    └── GET /reports
```

### Response Format
```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {
    // Response data
  },
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 100,
    "totalPages": 5
  },
  "timestamp": "2024-08-29T10:30:00Z",
  "requestId": "req-123456"
}
```

## 📊 Performance & Scalability

### Caching Strategy
```yaml
Redis Cache Layers:
  - L1: User sessions (30 min TTL)
  - L2: Test results (24 hour TTL)
  - L3: Blog articles (1 week TTL)
  - L4: Career data (1 day TTL)
  - L5: User analytics (1 hour TTL)
```

### Database Optimization
- **Connection Pooling**: HikariCP with optimal settings
- **Read Replicas**: PostgreSQL read replicas for analytics
- **Indexing**: Comprehensive index strategy
- **Partitioning**: Time-based partitioning for analytics data

### Monitoring & Observability
```yaml
Metrics Collection:
  - Application: Micrometer + Prometheus
  - Database: PostgreSQL metrics
  - Cache: Redis metrics
  - Custom: Business metrics

Logging:
  - Structured logging with Logback
  - Centralized with ELK Stack
  - Log levels per environment

Tracing:
  - Distributed tracing with Zipkin
  - Request correlation IDs
  - Performance profiling
```

## 🐳 Deployment & DevOps

### Docker Configuration
```dockerfile
# Multi-stage build for optimal image size
FROM openjdk:17-jdk-slim as builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jre-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Environment Configuration
```yaml
# application.yml
spring:
  profiles:
    active: ${SPRING_PROFILE:dev}
  
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
  
  data:
    mongodb:
      uri: ${MONGODB_URI}
      database: ${MONGODB_DATABASE}
  
  redis:
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
    password: ${REDIS_PASSWORD}
  
  rabbitmq:
    host: ${RABBITMQ_HOST}
    port: ${RABBITMQ_PORT}
    username: ${RABBITMQ_USERNAME}
    password: ${RABBITMQ_PASSWORD}

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  metrics:
    export:
      prometheus:
        enabled: true
```

## 🧪 Testing Strategy

### Test Pyramid
```
E2E Tests (10%)
├── Integration Tests (20%)
│   ├── API Integration Tests
│   ├── Database Integration Tests
│   └── External Service Tests
└── Unit Tests (70%)
    ├── Service Layer Tests
    ├── Repository Tests
    ├── Utility Tests
    └── Scoring Algorithm Tests
```

### Test Configuration
```java
@TestConfiguration
@Testcontainers
public class TestConfig {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("zplus_test")
            .withUsername("test")
            .withPassword("test");
    
    @Container
    static MongoDBContainer mongodb = new MongoDBContainer("mongo:6.0");
    
    @Container 
    static GenericContainer<?> redis = new GenericContainer<>("redis:7-alpine")
            .withExposedPorts(6379);
}
```

This comprehensive Spring Boot architecture provides a solid foundation for your counselling platform with enterprise-grade security, scalability, and maintainability. The hybrid database approach optimizes for both relational integrity and document flexibility, while the microservice-ready design allows for future expansion.