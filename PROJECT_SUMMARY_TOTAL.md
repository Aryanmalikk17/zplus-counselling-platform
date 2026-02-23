# 🧠 Z Plus Counselling Platform: Comprehensive Project Details

This document provides a consolidated, 360-degree view of the Z Plus Counselling Platform, covering architecture, technology, production status, and deployment roadmap.

---

## 📅 Project Vision & Overview
The Z Plus Counselling Platform is a high-performance, full-stack application designed to provide accessible mental health services and psychological assessments. 

- **Target**: Individuals seeking professional counselling and career guidance.
- **Scale**: Designed for 30+ psychological assessments and real-time career recommendations.
- **Core Value**: Secure, scalable, and data-driven mental health support.

---

## 🏗️ Technical Architecture
The platform follows a modern micro-services-ready monolithic architecture.

- **Frontend**: Single Page Application (SPA) built with React and Vite.
- **Backend**: Java Spring Boot 3.2+ REST API with JWT security.
- **Data Layer**: 
    - **PostgreSQL**: Relational data (Users, Payments, Sessions).
    - **MongoDB**: Document storage (Assessment templates, dynamic content).
    - **Redis**: Caching, session management, and refresh tokens.
- **Infrastructure**: Dockerized environment with Nginx as a reverse proxy.

---

## 🛠️ Technology Stack Detail

### Frontend
- **Framework**: React 18.3+ (TypeScript)
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **State Management**: React Query (Server state), Context API (Client state)
- **Data Viz**: Recharts (for assessment results)
- **Utilities**: Axios, Lucide React, jspdf (Report generation)

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security 6, JWT, BCrypt
- **ORM/JPA**: Hibernate / Spring Data JPA
- **Communication**: RabbitMQ (for async tasks/notifications)
- **Monitoring**: Spring Boot Actuator, Micrometer, Prometheus

---

## 🔐 Production Readiness Audit (Results)
*Last Audit performed on 2026-02-23*

| Category | Status | Details |
|----------|---------|---------|
| **Secrets** | ✅ Clean | No hardcoded API keys or passwords found in code. |
| **Configs** | ⚠️ Warning | `localhost` found in `docker-compose.prod.yml` and `nginx.conf`. |
| **Frontend**| ⚠️ Warning | `console.log` statements remaining in 3 files. |
| **Security**| ℹ️ Info | `SecurityConfig.java` permits all by default; CSRF is disabled. |

---

## 🚀 Deployment Roadmap (Render.com)
The project is set up for deployment on Render.

- **Backend**: Render Web Service (Docker). Requires `SPRING_PROFILES_ACTIVE=prod`.
- **Frontend**: Render Static Site (Automatic build from `npm run build`).
- **Required External Services**:
    - **MongoDB Atlas**: Since Render doesn't natively host MongoDB.
    - **CloudAMQP**: For RabbitMQ hosting.
    - **Render Managed PostgreSQL & Redis**.

---

## 🗄️ Core Data Models

### PostgreSQL (Relational)
- `User`: ID, Name, Email (Unique), Role (USER/ADMIN), Password (Encrypted).
- `AssessmentResult`: User ID, Test Type, Score, Timestamp, PDF URI.
- `Payment`: Transaction ID, User ID, Status, Amount.

### MongoDB (Documents)
- `AssessmentTemplate`: Questions, Scoring Logic, Metadata.
- `BlogContent`: Articles, Transcripts for YouTube videos.

---

## 🛑 Recent Development Status
- **Current Issue**: The backend fails to start locally without a running PostgreSQL instance at `localhost:5432`.
- **Latest Feature**: YouTube video integration with auto-transcription capabilities.
- **Audit Tool**: `production_audit.py` is now available in the root for ongoing checks.

---

## 📂 Navigation Reference
- **Root**: `README.md`, `production_audit.py`, `render.yaml` (Planned).
- **Backend Source**: `backend/src/main/java/com/zplus/counselling/`.
- **Frontend Source**: `my-frontend-app/src/`.
- **Docs**: `backend-architecture/` contains deep-dive design guides.
