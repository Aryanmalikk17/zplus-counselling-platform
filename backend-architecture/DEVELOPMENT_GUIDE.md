# Z Plus Counselling Platform - Development & Deployment Guide

## 🚀 Development Environment Setup

This guide provides comprehensive instructions for setting up, developing, and deploying the Z Plus Counselling Platform.

## 📋 Prerequisites

### **Required Software**
```bash
# Backend Development
Java 17+ (OpenJDK recommended)
Maven 3.8+ (or use included mvnw)
Docker 20.10+
Docker Compose 2.0+

# Frontend Development
Node.js 18+
npm 9+ (or yarn 3+)

# Development Tools (Recommended)
Git 2.30+
VS Code or IntelliJ IDEA
PostgreSQL client (pgAdmin, DBeaver)
MongoDB Compass
Postman or similar API testing tool
```

### **System Requirements**
```yaml
Minimum Development Machine:
  - RAM: 8GB
  - CPU: 4 cores
  - Storage: 20GB free space
  - OS: macOS, Linux, or Windows with WSL2

Recommended Development Machine:
  - RAM: 16GB
  - CPU: 8 cores
  - Storage: 50GB free space (SSD preferred)
```

## 🔧 Local Development Setup

### **Step 1: Repository Setup**
```bash
# Clone the repository
git clone https://github.com/Aryaanmalikk17/zpluscouncelling-project.git
cd zpluscouncelling-project

# Verify project structure
ls -la
# Should show: backend/, my-frontend-app/, backend-architecture/, etc.
```

### **Step 2: Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Start database services
docker-compose up -d postgres mongodb redis

# Verify services are running
docker-compose ps

# Expected output:
# NAME                COMMAND                  SERVICE             STATUS
# zplus-postgres     "docker-entrypoint.s…"   postgres            Up
# zplus-mongodb      "docker-entrypoint.s…"   mongodb             Up
# zplus-redis        "docker-entrypoint.s…"   redis               Up

# Run the Spring Boot application
./mvnw spring-boot:run

# Alternative: Run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### **Step 3: Frontend Setup**
```bash
# Navigate to frontend directory (in new terminal)
cd my-frontend-app

# Install dependencies
npm install

# Start development server
npm run dev

# Expected output:
# VITE v5.4.4  ready in 500 ms
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

### **Step 4: Verify Setup**
```bash
# Test backend health
curl http://localhost:8080/api/v1/actuator/health

# Expected response:
# {"status":"UP"}

# Test frontend
open http://localhost:5173
# Should show Z Plus Counselling Platform homepage
```

## 🗃️ Database Management

### **PostgreSQL Development Database**
```bash
# Connect to PostgreSQL
docker exec -it zplus-postgres psql -U zplus_user -d zplus_counselling

# Common development queries
\dt                                    # List all tables
SELECT * FROM users LIMIT 5;          # View sample users
SELECT COUNT(*) FROM users;           # Count total users

# Reset database (development only)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
# Restart application to recreate tables
```

### **MongoDB Development Database**
```bash
# Connect to MongoDB
docker exec -it zplus-mongodb mongosh zplus_content

# Common development operations
show collections                      # List collections
db.assessment_templates.find().limit(5)  # View sample templates
db.assessment_templates.countDocuments() # Count documents

# Clear collection (development only)
db.assessment_templates.deleteMany({})
```

### **Redis Cache Management**
```bash
# Connect to Redis
docker exec -it zplus-redis redis-cli

# Common Redis operations
KEYS *                    # List all keys
GET session:user-id       # Get specific session
FLUSHALL                  # Clear all cache (development only)
```

## 🧪 Testing Strategy

### **Backend Testing**
```bash
# Run all tests
cd backend
./mvnw test

# Run specific test class
./mvnw test -Dtest=AuthControllerTest

# Run integration tests
./mvnw verify

# Generate test coverage report
./mvnw jacoco:report
# View report: target/site/jacoco/index.html
```

### **Frontend Testing**
```bash
# Run component tests
cd my-frontend-app
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage

# Run end-to-end tests (if configured)
npm run test:e2e
```

### **API Testing with Postman**
```json
{
  "info": {
    "name": "Z Plus Counselling Platform API",
    "description": "API collection for development testing"
  },
  "requests": [
    {
      "name": "Register User",
      "method": "POST",
      "url": "http://localhost:8080/api/v1/auth/register",
      "body": {
        "email": "test@example.com",
        "password": "password123",
        "fullName": "Test User"
      }
    },
    {
      "name": "Login User",
      "method": "POST", 
      "url": "http://localhost:8080/api/v1/auth/login",
      "body": {
        "email": "test@example.com",
        "password": "password123"
      }
    }
  ]
}
```

## 🔨 Build Process

### **Backend Build**
```bash
# Development build
./mvnw compile

# Production build
./mvnw clean package -DskipTests

# Docker image build
docker build -t zplus-backend:latest .

# Run production build locally
java -jar target/zplus-counselling-*.jar --spring.profiles.active=prod
```

### **Frontend Build**
```bash
# Development build
npm run build

# Production build with optimization
npm run build -- --mode production

# Preview production build
npm run preview

# Build Docker image
docker build -f Dockerfile.prod -t zplus-frontend:latest .
```

## 🌐 Deployment Strategies

### **Development Deployment**
```bash
# Full stack with Docker Compose
cd backend
docker-compose up -d

# Check all services
docker-compose ps
docker-compose logs -f
```

### **Staging Deployment**
```bash
# Staging environment setup
cd backend

# Set staging environment variables
cp .env.production .env.staging
# Edit .env.staging with staging-specific values

# Deploy to staging
docker-compose -f docker-compose.staging.yml up -d

# Verify staging deployment
curl https://staging-api.yourdomain.com/api/v1/actuator/health
```

### **Production Deployment**

#### **Option 1: Traditional VPS (DigitalOcean/AWS)**
```bash
# Server setup script
#!/bin/bash
# setup-server.sh

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin

# Create application directory
sudo mkdir -p /opt/zplus-counselling
cd /opt/zplus-counselling

# Clone repository
git clone https://github.com/Aryaanmalikk17/zpluscouncelling-project.git .

# Set up environment
cp backend/.env.production backend/.env
# Edit .env with production values

# Deploy
cd backend
docker-compose -f docker-compose.prod.yml up -d

# Set up Nginx reverse proxy
sudo apt install nginx
sudo systemctl enable nginx
```

#### **Option 2: Netlify + Backend Hosting**
```bash
# Frontend to Netlify
cd my-frontend-app

# Build for production
npm run build

# Deploy to Netlify (auto-deployment from GitHub)
# Or manual deployment:
npx netlify deploy --prod --dir=dist

# Backend to separate hosting (Railway, Heroku, etc.)
# Follow platform-specific deployment guides
```

## 🔐 Environment Configuration

### **Development Environment (.env.development)**
```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/zplus_counselling
DATABASE_USERNAME=zplus_user
DATABASE_PASSWORD=secure_password

# MongoDB Configuration
MONGODB_URI=mongodb://admin:secure_password@localhost:27017/zplus_content?authSource=admin

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=secure_password

# JWT Configuration
JWT_SECRET=development_secret_key_minimum_32_characters_long
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Application Configuration
SPRING_PROFILES_ACTIVE=dev
SERVER_PORT=8080
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_ZPLUS=DEBUG

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Feature Flags
FEATURE_ASSESSMENT_ENGINE=false
FEATURE_PAYMENT_INTEGRATION=false
FEATURE_EMAIL_NOTIFICATIONS=false
```

### **Production Environment (.env.production)**
```bash
# Database Configuration (Use strong passwords)
DATABASE_URL=jdbc:postgresql://postgres:5432/zplus_counselling
DATABASE_USERNAME=zplus_user
DATABASE_PASSWORD=${POSTGRES_PASSWORD}

# Security Configuration
JWT_SECRET=${JWT_SECRET_KEY}
JWT_EXPIRATION=3600000
JWT_REFRESH_EXPIRATION=2592000000

# Application Configuration
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=8080
LOGGING_LEVEL_ROOT=WARN

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# External Services
EMAIL_SERVICE_API_KEY=${EMAIL_API_KEY}
PAYMENT_GATEWAY_KEY=${RAZORPAY_KEY}
ANALYTICS_TRACKING_ID=${GA_TRACKING_ID}
```

## 📊 Monitoring & Logging

### **Application Monitoring**
```bash
# Health checks
curl http://localhost:8080/api/v1/actuator/health
curl http://localhost:8080/api/v1/actuator/metrics

# Application logs
docker logs zplus-backend -f

# Database monitoring
docker exec zplus-postgres pg_stat_activity

# System resource monitoring
docker stats
```

### **Log Configuration**
```yaml
# logback-spring.xml configuration
logging:
  level:
    com.zplus.counselling: DEBUG
    org.springframework.security: DEBUG
    org.springframework.web: INFO
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/zplus-counselling.log
    max-size: 10MB
    max-history: 30
```

## 🚨 Troubleshooting Guide

### **Common Development Issues**

#### **Backend Issues**
```bash
# Port already in use
Error: Port 8080 is already in use
Solution: 
lsof -ti:8080 | xargs kill -9
# Or change port in application.yml

# Database connection issues
Error: Connection refused to PostgreSQL
Solution:
docker-compose restart postgres
# Check container logs: docker logs zplus-postgres
```

#### **Frontend Issues**
```bash
# Node modules issues
Error: Module not found
Solution:
rm -rf node_modules package-lock.json
npm install

# Port conflicts
Error: Port 5173 is already in use
Solution:
npm run dev -- --port 3001
# Or kill process: lsof -ti:5173 | xargs kill -9
```

#### **Docker Issues**
```bash
# Container startup failures
docker-compose logs service-name

# Volume permission issues
docker-compose down -v
docker system prune -f
docker-compose up -d

# Out of disk space
docker system df
docker system prune -a
```

### **Performance Optimization**

#### **Backend Performance**
```bash
# JVM tuning for development
export JAVA_OPTS="-Xmx2g -Xms1g -XX:+UseG1GC"

# Database query optimization
# Enable query logging in application.yml:
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

#### **Frontend Performance**
```bash
# Bundle analysis
npm run build -- --mode production
npx vite-bundle-analyzer dist

# Performance profiling
npm run dev -- --debug
# Use React DevTools Profiler
```

## 🔄 Development Workflow

### **Git Workflow**
```bash
# Feature development
git checkout -b feature/assessment-engine
git add .
git commit -m "feat: implement assessment scoring algorithm"
git push origin feature/assessment-engine

# Create pull request on GitHub
# After review and approval, merge to main

# Hotfix workflow
git checkout -b hotfix/security-fix
git add .
git commit -m "fix: resolve JWT token validation issue"
git push origin hotfix/security-fix
```

### **Code Review Checklist**
```markdown
Backend Review:
- [ ] Security: Authentication and authorization implemented
- [ ] Validation: Input validation on all endpoints
- [ ] Error Handling: Proper exception handling and responses
- [ ] Testing: Unit tests for new functionality
- [ ] Performance: Database queries optimized
- [ ] Documentation: API endpoints documented

Frontend Review:
- [ ] TypeScript: Proper type definitions
- [ ] Accessibility: ARIA labels and keyboard navigation
- [ ] Responsiveness: Mobile-friendly design
- [ ] Performance: Lazy loading and code splitting
- [ ] Testing: Component tests for critical paths
- [ ] UX: Consistent with design system
```

## 📝 Release Process

### **Version Management**
```bash
# Backend versioning (Maven)
./mvnw versions:set -DnewVersion=1.1.0
git add pom.xml
git commit -m "chore: bump version to 1.1.0"

# Frontend versioning
npm version 1.1.0
git push --tags
```

### **Release Deployment**
```bash
# Create release branch
git checkout -b release/1.1.0

# Build and test
./mvnw clean package -DskipTests=false
cd my-frontend-app && npm run build

# Deploy to staging for final testing
# After approval, merge to main and deploy to production

# Tag release
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
```

This comprehensive development and deployment guide ensures smooth development workflow and reliable deployments of the Z Plus Counselling Platform.