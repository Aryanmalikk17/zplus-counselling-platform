# API Specification & Implementation Roadmap

## 🐳 Docker Setup Instructions

### Prerequisites
```bash
# Install Docker Desktop for macOS
brew install --cask docker

# Start Docker Desktop
open -a Docker

# Verify installation
docker --version
docker-compose --version
```

### Local Development Setup
```bash
# Clone the repository
git clone <repository-url>
cd zpluscouncelling-project/backend

# Create required directories
mkdir -p scripts logs

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Access services
# Application: http://localhost:8080
# PostgreSQL: localhost:5432
# MongoDB: localhost:27017
# Redis: localhost:6379
# RabbitMQ Management: http://localhost:15672 (guest/guest)
```

### Useful Docker Commands
```bash
# Stop all services
docker-compose down

# Rebuild application container
docker-compose build app

# View service status
docker-compose ps

# Execute commands in containers
docker-compose exec postgres psql -U zplus_user -d zplus_counselling
docker-compose exec mongodb mongosh --username admin --password secure_password
docker-compose exec redis redis-cli -a secure_password

# View container logs
docker-compose logs postgres
docker-compose logs mongodb
```

## 🚀 Implementation Phases

### Phase 1: Core Backend Setup (Week 1-2)
```
Priority: HIGH
Timeline: 2 weeks
Team Size: 2-3 developers

Tasks:
✅ Spring Boot project initialization
✅ Database setup (PostgreSQL + MongoDB)
✅ Basic security configuration
✅ Docker containerization
✅ CI/CD pipeline setup
```

### Phase 2: Authentication & User Management (Week 3-4)
```
Priority: HIGH
Timeline: 2 weeks

Features:
- User registration/login
- JWT authentication
- Password reset functionality
- Email verification
- Profile management
- Role-based access control
```

### Phase 3: Assessment Engine (Week 5-7)
```
Priority: HIGH
Timeline: 3 weeks

Features:
- Dynamic test loading from MongoDB
- Real-time test progress tracking
- Scoring algorithms implementation
- Result calculation and storage
- PDF report generation
```

### Phase 4: Counseling System (Week 8-10)
```
Priority: MEDIUM
Timeline: 3 weeks

Features:
- Counselor registration and verification
- Session booking system
- Payment integration (Razorpay)
- Video call integration
- Review and rating system
```

### Phase 5: Content Management (Week 11-12)
```
Priority: MEDIUM
Timeline: 2 weeks

Features:
- Blog article management
- Career data management
- Admin dashboard
- Content publishing workflow
```

### Phase 6: Analytics & Optimization (Week 13-14)
```
Priority: LOW
Timeline: 2 weeks

Features:
- User behavior tracking
- Performance analytics
- A/B testing framework
- Advanced reporting
```

## 📋 Detailed API Specifications

### Authentication APIs

#### POST /api/v1/auth/register
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "phone": "+91-9876543210",
  "dateOfBirth": "1990-01-01",
  "gender": "MALE"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "isEmailVerified": false,
      "subscriptionType": "FREE"
    },
    "token": "jwt-token",
    "refreshToken": "refresh-token"
  }
}
```

#### POST /api/v1/auth/login
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "subscriptionType": "PREMIUM",
      "lastLoginAt": "2024-08-29T10:30:00Z"
    },
    "token": "jwt-token",
    "refreshToken": "refresh-token",
    "expiresIn": 3600
  }
}
```

### Assessment APIs

#### GET /api/v1/assessments/available
```json
Response:
{
  "success": true,
  "data": [
    {
      "testType": "MBTI",
      "title": "Myers-Briggs Type Indicator",
      "description": "Discover your personality type",
      "category": "PERSONALITY",
      "estimatedTimeMinutes": 15,
      "totalQuestions": 93,
      "isCompleted": false,
      "lastAttemptDate": null,
      "price": 0,
      "difficulty": "BEGINNER"
    },
    {
      "testType": "BIG_FIVE",
      "title": "Big Five Personality Test",
      "description": "Measure your five major personality dimensions",
      "category": "PERSONALITY",
      "estimatedTimeMinutes": 12,
      "totalQuestions": 60,
      "isCompleted": true,
      "lastAttemptDate": "2024-08-15T14:20:00Z",
      "price": 0,
      "difficulty": "INTERMEDIATE"
    }
  ]
}
```

#### POST /api/v1/assessments/{testType}/start
```json
Request:
{
  "testVersion": "2.0",
  "language": "en"
}

Response:
{
  "success": true,
  "data": {
    "sessionId": "session-uuid",
    "testType": "MBTI",
    "totalQuestions": 93,
    "currentQuestion": 1,
    "timeLimit": null,
    "instructions": [
      "Answer based on your natural preferences",
      "There are no right or wrong answers"
    ],
    "firstQuestion": {
      "id": "q1",
      "text": "At a party do you:",
      "type": "SINGLE_CHOICE",
      "options": [
        {
          "id": "a",
          "text": "Interact with many, including strangers"
        },
        {
          "id": "b",
          "text": "Interact with a few, known to you"
        }
      ],
      "required": true
    }
  }
}
```

#### PUT /api/v1/assessments/{testType}/answer
```json
Request:
{
  "sessionId": "session-uuid",
  "questionId": "q1",
  "answer": "a",
  "responseTime": 5.2
}

Response:
{
  "success": true,
  "data": {
    "currentQuestion": 2,
    "totalQuestions": 93,
    "completionPercentage": 2.15,
    "nextQuestion": {
      "id": "q2",
      "text": "Are you more:",
      "type": "SINGLE_CHOICE",
      "options": [
        {
          "id": "a",
          "text": "Realistic than speculative"
        },
        {
          "id": "b",
          "text": "Speculative than realistic"
        }
      ]
    }
  }
}
```

#### POST /api/v1/assessments/{testType}/submit
```json
Request:
{
  "sessionId": "session-uuid"
}

Response:
{
  "success": true,
  "data": {
    "resultId": "result-uuid",
    "personalityType": "INTJ",
    "scores": {
      "E": 25,
      "I": 75,
      "S": 30,
      "N": 70,
      "T": 80,
      "F": 20,
      "J": 65,
      "P": 35
    },
    "summary": {
      "title": "The Architect",
      "description": "Imaginative and strategic thinkers...",
      "strengths": ["Strategic thinking", "Independence"],
      "careerSuggestions": ["Software Engineer", "Scientist"]
    },
    "reportUrl": "/api/v1/reports/download/result-uuid",
    "completedAt": "2024-08-29T11:45:00Z"
  }
}
```

### Counseling APIs

#### GET /api/v1/counseling/counselors
```json
Query Parameters:
- specialization: string (optional)
- rating: number (optional, minimum rating)
- availability: string (optional, "TODAY", "THIS_WEEK")
- priceRange: string (optional, "0-2000", "2000-5000")
- language: string (optional)

Response:
{
  "success": true,
  "data": [
    {
      "id": "counselor-uuid",
      "name": "Dr. Rajesh Kumar",
      "specializations": ["TECHNOLOGY", "CAREER_TRANSITION"],
      "experienceYears": 15,
      "rating": 4.9,
      "totalSessions": 2500,
      "hourlyRate": 2999,
      "currency": "INR",
      "languages": ["English", "Hindi", "Tamil"],
      "bio": "Expert in technology career guidance...",
      "profilePicture": "https://example.com/photos/rajesh.jpg",
      "isAvailable": true,
      "nextAvailableSlot": "2024-08-30T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

#### POST /api/v1/counseling/sessions/book
```json
Request:
{
  "counselorId": "counselor-uuid",
  "sessionType": "CAREER",
  "scheduledAt": "2024-08-30T10:00:00Z",
  "durationMinutes": 60,
  "sessionMode": "VIDEO",
  "notes": "Need help with career transition from finance to tech"
}

Response:
{
  "success": true,
  "data": {
    "sessionId": "session-uuid",
    "counselor": {
      "name": "Dr. Rajesh Kumar",
      "specialization": "Technology Careers"
    },
    "scheduledAt": "2024-08-30T10:00:00Z",
    "amount": 2999,
    "currency": "INR",
    "paymentUrl": "https://rzp.io/payment/session-uuid",
    "meetingLink": "https://meet.zplus.com/session-uuid",
    "status": "PAYMENT_PENDING"
  }
}
```

### Career APIs

#### GET /api/v1/career/recommendations/{userId}
```json
Response:
{
  "success": true,
  "data": {
    "personalityType": "INTJ",
    "topCareers": [
      {
        "title": "Software Engineer",
        "matchPercentage": 92,
        "industry": "Technology",
        "salaryRange": {
          "min": 600000,
          "max": 1200000,
          "currency": "INR"
        },
        "workEnvironment": {
          "type": "HYBRID",
          "teamSize": "MEDIUM",
          "pace": "FAST"
        },
        "requiredSkills": ["Programming", "Problem-solving"],
        "growthProspects": "EXCELLENT"
      }
    ],
    "skillGaps": [
      {
        "skill": "Machine Learning",
        "currentLevel": "BEGINNER",
        "requiredLevel": "INTERMEDIATE",
        "recommendedCourses": [
          {
            "title": "ML Fundamentals",
            "provider": "Coursera",
            "duration": "8 weeks"
          }
        ]
      }
    ],
    "learningPath": {
      "immediate": ["Complete Python basics", "Learn Git"],
      "shortTerm": ["Build portfolio projects", "Get internship"],
      "longTerm": ["Specialize in AI/ML", "Leadership roles"]
    }
  }
}
```

### Blog APIs

#### GET /api/v1/blog/articles
```json
Query Parameters:
- category: string (optional)
- tag: string (optional)
- search: string (optional)
- author: string (optional)
- page: number (default: 1)
- size: number (default: 20)

Response:
{
  "success": true,
  "data": [
    {
      "id": "article-uuid",
      "title": "Understanding Anxiety: Evidence-Based Techniques",
      "slug": "understanding-anxiety-evidence-based-techniques",
      "excerpt": "Learn practical strategies from CBT...",
      "category": "MENTAL_HEALTH",
      "tags": ["anxiety", "cbt", "mental-health"],
      "author": {
        "name": "Dr. Emily Rodriguez",
        "bio": "Clinical psychologist",
        "avatar": "https://example.com/avatars/emily.jpg"
      },
      "readTimeMinutes": 10,
      "publishedAt": "2024-08-15T09:00:00Z",
      "featuredImage": "https://example.com/images/anxiety-article.jpg",
      "viewCount": 1250
    }
  ],
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## 🔧 Technical Implementation Details

### Security Implementation

#### JWT Configuration
```java
@Component
public class JwtTokenProvider {
    
    private final String jwtSecret = "${app.jwt.secret}";
    private final int jwtExpirationInMs = 604800000; // 7 days
    
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date expiryDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);
        
        return Jwts.builder()
                .setSubject(userPrincipal.getId().toString())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
```

#### Rate Limiting
```java
@Configuration
public class RateLimitConfig {
    
    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(10, 100); // 10 requests per second, burst of 100
    }
    
    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> exchange.getPrincipal()
                .cast(JwtAuthenticationToken.class)
                .map(JwtAuthenticationToken::getToken)
                .map(jwt -> jwt.getClaimAsString("sub"))
                .switchIfEmpty(Mono.just("anonymous"));
    }
}
```

### Scoring Algorithm Implementation

#### MBTI Scoring Service
```java
@Service
public class MBTIScoringService implements ScoringService {
    
    @Override
    public TestResult calculateResults(List<Answer> answers, AssessmentTemplate template) {
        Map<String, Integer> dimensionScores = new HashMap<>();
        
        // Initialize dimension scores
        dimensionScores.put("E", 0); dimensionScores.put("I", 0);
        dimensionScores.put("S", 0); dimensionScores.put("N", 0);
        dimensionScores.put("T", 0); dimensionScores.put("F", 0);
        dimensionScores.put("J", 0); dimensionScores.put("P", 0);
        
        // Calculate scores based on answers
        for (Answer answer : answers) {
            Question question = findQuestion(template, answer.getQuestionId());
            Option selectedOption = findOption(question, answer.getSelectedOption());
            
            // Add weights to dimension scores
            selectedOption.getWeights().forEach((dimension, weight) -> 
                dimensionScores.merge(dimension, weight, Integer::sum)
            );
        }
        
        // Determine personality type
        String personalityType = determinePersonalityType(dimensionScores);
        
        // Get result template
        ResultTemplate resultTemplate = template.getResultTypes().get(personalityType);
        
        return TestResult.builder()
                .personalityType(personalityType)
                .dimensionScores(dimensionScores)
                .strengths(resultTemplate.getStrengths())
                .careerSuggestions(resultTemplate.getCareerSuggestions())
                .build();
    }
    
    private String determinePersonalityType(Map<String, Integer> scores) {
        StringBuilder type = new StringBuilder();
        type.append(scores.get("E") > scores.get("I") ? "E" : "I");
        type.append(scores.get("S") > scores.get("N") ? "S" : "N");
        type.append(scores.get("T") > scores.get("F") ? "T" : "F");
        type.append(scores.get("J") > scores.get("P") ? "J" : "P");
        return type.toString();
    }
}
```

### Background Job Processing

#### Email Service Implementation
```java
@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private TemplateEngine templateEngine;
    
    @RabbitListener(queues = "email.queue")
    public void sendEmail(EmailMessage emailMessage) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setTo(emailMessage.getTo());
            helper.setSubject(emailMessage.getSubject());
            
            // Process template
            Context context = new Context();
            context.setVariables(emailMessage.getTemplateVariables());
            String htmlContent = templateEngine.process(emailMessage.getTemplate(), context);
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            
            log.info("Email sent successfully to: {}", emailMessage.getTo());
        } catch (Exception e) {
            log.error("Failed to send email to: {}", emailMessage.getTo(), e);
            // Implement retry logic
        }
    }
}
```

### PDF Report Generation

#### Report Generator Service
```java
@Service
public class ReportGeneratorService {
    
    @Autowired
    private TemplateEngine templateEngine;
    
    public byte[] generateMBTIReport(TestResult result, User user) {
        try {
            // Prepare template context
            Context context = new Context();
            context.setVariable("user", user);
            context.setVariable("result", result);
            context.setVariable("generatedDate", LocalDateTime.now());
            
            // Process HTML template
            String htmlContent = templateEngine.process("pdf/mbti-report", context);
            
            // Convert to PDF using Flying Saucer
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(htmlContent);
            renderer.layout();
            
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            renderer.createPDF(outputStream);
            
            return outputStream.toByteArray();
        } catch (Exception e) {
            log.error("Failed to generate PDF report for user: {}", user.getId(), e);
            throw new ReportGenerationException("Failed to generate PDF report");
        }
    }
}
```

## 🚀 Deployment Strategy

### Docker Compose for Development
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - DATABASE_URL=jdbc:postgresql://postgres:5432/zplus_counselling
      - MONGODB_URI=mongodb://mongo:27017/zplus_content
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - mongo
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: zplus_counselling
      POSTGRES_USER: zplus_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  mongo:
    image: mongo:6.0
    environment:
      MONGO_INITDB_DATABASE: zplus_content
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass secure_password
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  mongodb_data:
  redis_data:
```

### Production Deployment (Kubernetes)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zplus-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: zplus-backend
  template:
    metadata:
      labels:
        app: zplus-backend
    spec:
      containers:
      - name: zplus-backend
        image: zplus/backend:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
```

This comprehensive API specification and implementation roadmap provides everything needed to build your Spring Boot backend. The phased approach ensures steady progress while the detailed API specs give clear implementation targets. The technical examples show exactly how to implement key features like authentication, scoring algorithms, and report generation.