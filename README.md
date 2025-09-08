# Z Plus Counselling Platform

A comprehensive web-based counselling and psychological assessment platform built with Spring Boot and React.

## 🎯 Overview

Z Plus Counselling Platform provides:
- **30+ Psychological Assessments** (MBTI, Big Five, IQ, Career Tests)
- **Expert Counselling Services** with certified professionals
- **Career Guidance** and recommendations
- **Comprehensive User Management** with JWT authentication
- **Real-time Analytics** and progress tracking

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2+
- **Language**: Java 17+
- **Database**: PostgreSQL 15+ (primary), MongoDB 6.0+ (assessments)
- **Cache**: Redis 7.0+
- **Security**: Spring Security 6 + JWT
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18 + TypeScript
- **UI Library**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context
- **HTTP Client**: Fetch API

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL + MongoDB
- **Caching**: Redis

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Java 17+ (for local development)
- Node.js 18+ (for frontend development)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/zplus-counselling-platform.git
cd zplus-counselling-platform
```

### 2. Start with Docker (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### 3. Access Applications
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api/v1
- **API Documentation**: http://localhost:8080/swagger-ui.html

## 🏗️ Project Structure

```
zplus-counselling-platform/
├── backend/                 # Spring Boot API
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   ├── docker-compose.yml  # Docker services
│   └── pom.xml             # Maven dependencies
├── my-frontend-app/        # React frontend
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   └── package.json        # npm dependencies
├── backend-architecture/   # Documentation
│   ├── API_IMPLEMENTATION_GUIDE.md
│   ├── DATABASE_IMPLEMENTATION.md
│   └── SPRING_BOOT_ARCHITECTURE.md
└── README.md              # This file
```

## 🔧 Development Setup

### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Development
```bash
cd my-frontend-app
npm install
npm run dev
```

### Database Access
```bash
# PostgreSQL
docker exec -it zplus-postgres psql -U zplus_user -d zplus_counselling

# MongoDB
docker exec -it zplus-mongodb mongosh zplus_content
```

## 📊 Features

### ✅ Implemented
- [x] User Authentication (Register, Login, JWT)
- [x] User Profile Management
- [x] Database Integration (PostgreSQL + MongoDB)
- [x] Docker Containerization
- [x] CORS Configuration
- [x] Security Configuration
- [x] API Documentation (Swagger)

### 🚧 In Development
- [ ] Psychology Assessment Engine
- [ ] Expert Counselling System
- [ ] Career Guidance Module
- [ ] Payment Integration (Razorpay)
- [ ] Email Notifications
- [ ] Real-time Chat

## 🔐 Security Features

- JWT-based authentication
- Password encryption (BCrypt)
- CORS protection
- Request validation
- SQL injection prevention
- XSS protection

## 📱 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout

### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `GET /api/v1/users/dashboard` - User dashboard

### Assessments
- `GET /api/v1/assessments/available` - Get available tests
- `POST /api/v1/assessments/{testType}/start` - Start assessment
- `PUT /api/v1/assessments/{testType}/answer` - Submit answer
- `POST /api/v1/assessments/{testType}/submit` - Complete assessment

## 🗄️ Database Schema

### PostgreSQL (Relational Data)
- `users` - User accounts and profiles
- `test_results` - Assessment results
- `counseling_sessions` - Counselling appointments
- `assessment_sessions` - Active test sessions

### MongoDB (Document Data)
- `assessmentTemplates` - Test questions and templates
- `userAnalytics` - User behavior analytics
- `blogArticles` - Content management

## 🐳 Docker Services

- **zplus-postgres** - PostgreSQL database
- **zplus-mongodb** - MongoDB database  
- **zplus-redis** - Redis cache
- **zplus-backend** - Spring Boot API
- **zplus-frontend** - React application

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd my-frontend-app
npm test
```

## 📈 Monitoring

- **Health Checks**: `/api/v1/actuator/health`
- **Metrics**: `/api/v1/actuator/metrics`
- **Application Logs**: `backend/logs/`

## 🔒 Environment Variables

### Backend (.env)
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/zplus_counselling
DATABASE_USERNAME=zplus_user
DATABASE_PASSWORD=secure_password
JWT_SECRET=your-jwt-secret-key
MONGODB_URI=mongodb://localhost:27017/zplus_content
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api/v1
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: support@zpluscounselling.com
- Issues: [GitHub Issues](https://github.com/your-username/zplus-counselling-platform/issues)

## 🙏 Acknowledgments

- Spring Boot Team for the excellent framework
- React Team for the powerful frontend library
- Contributors and testers

---

**Built with ❤️ for mental health and career guidance**