# Z Plus Counselling Platform - Backend

## Overview
Spring Boot backend for the Z Plus Counselling Platform, providing comprehensive APIs for psychological assessments, career guidance, and counseling services.

## Features
- **Authentication & Authorization**: JWT-based security with role-based access control
- **Assessment System**: Support for 30+ psychological tests (MBTI, Big Five, Career, IQ, etc.)
- **User Management**: Complete user profile and subscription management
- **Real-time Processing**: Async processing with RabbitMQ for test completion and notifications
- **Multi-database Support**: PostgreSQL for relational data, MongoDB for document storage
- **Caching**: Redis for session management and performance optimization
- **API Documentation**: Swagger/OpenAPI 3.0 documentation

## Technology Stack
- **Framework**: Spring Boot 3.2+
- **Language**: Java 17+ with Lombok
- **Databases**: PostgreSQL 15+, MongoDB 6.0+, Redis 7.0+
- **Security**: Spring Security 6 + JWT
- **Message Queue**: RabbitMQ
- **Documentation**: OpenAPI 3.0 (Swagger)
- **Build Tool**: Maven

## Prerequisites
- Java 17 or higher
- Docker and Docker Compose
- Maven (or use included wrapper)

## Quick Start

### 1. Clone and Navigate
```bash
cd backend
```

### 2. Start Infrastructure Services
```bash
docker-compose up -d postgres mongodb redis rabbitmq
```

### 3. Build and Run Application
```bash
# Using Maven wrapper
./mvnw clean install
./mvnw spring-boot:run

# Or using Maven directly
mvn clean install
mvn spring-boot:run
```

### 4. Access Application
- **API Base URL**: http://localhost:8080/api/v1
- **Swagger UI**: http://localhost:8080/api/v1/swagger-ui.html
- **Health Check**: http://localhost:8080/api/v1/actuator/health

## Environment Configuration

### Development (application-dev.yml)
- Database auto-creation enabled
- Detailed logging
- CORS enabled for frontend development

### Production
Set environment variables:
```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/zplus_counselling
export DATABASE_USERNAME=your_username
export DATABASE_PASSWORD=your_password
export MONGODB_URI=mongodb://localhost:27017/zplus_content
export JWT_SECRET=your_jwt_secret_key
export REDIS_HOST=localhost
export RABBITMQ_HOST=localhost
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/dashboard` - Get user dashboard

### Assessments
- `GET /assessments/available` - Get available assessments
- `GET /assessments/{testType}` - Get specific assessment
- `POST /assessments/{testType}/start` - Start assessment
- `PUT /assessments/results/{testResultId}/answer` - Submit answer
- `POST /assessments/results/{testResultId}/complete` - Complete assessment
- `GET /assessments/results/{testResultId}` - Get test result
- `GET /assessments/history` - Get test history

## Database Schema

### PostgreSQL Tables
- `users` - User accounts and profiles
- `test_results` - Assessment results and scores

### MongoDB Collections
- `assessment_templates` - Test questions and configurations
- `user_analytics` - User interaction data
- `blog_articles` - Content management

## Testing
```bash
# Run all tests
./mvnw test

# Run with specific profile
./mvnw test -Dspring.profiles.active=test
```

## Docker Deployment
```bash
# Build and start all services
docker-compose up --build

# Start only infrastructure
docker-compose up -d postgres mongodb redis rabbitmq

# View logs
docker-compose logs -f app
```

## Development Guidelines

### Code Structure
- **Controllers**: REST API endpoints
- **Services**: Business logic
- **Repositories**: Data access layer
- **Entities**: Database models
- **DTOs**: Data transfer objects
- **Security**: Authentication and authorization

### Adding New Assessment Types
1. Create assessment template in MongoDB
2. Implement scoring algorithm in `ScoringService`
3. Add result generation logic
4. Update API documentation

## Monitoring and Health Checks
- **Actuator Endpoints**: `/actuator/health`, `/actuator/metrics`
- **Prometheus Metrics**: Available at `/actuator/prometheus`
- **Application Logs**: Located in `logs/zplus-counselling.log`

## Contributing
1. Follow Spring Boot best practices
2. Add appropriate tests for new features
3. Update API documentation
4. Ensure proper error handling

## Support
For development issues, check:
- Application logs in `logs/` directory
- Docker container logs: `docker-compose logs`
- Database connectivity and migrations
- RabbitMQ queue status at http://localhost:15672