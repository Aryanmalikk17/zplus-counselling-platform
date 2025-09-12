# Z Plus Counselling Platform - System Flow & Architecture Guide

## 🔄 Complete System Flow Documentation

This document provides a comprehensive understanding of how the Z Plus Counselling Platform works internally, showing the complete flow from user interaction to database storage and response.

## 🏗️ System Architecture Overview

### **Admin Panel Architecture (Phase 1)**

```
┌─────────────────────────────────────────────────────────────────┐
│                   Admin Panel Frontend (React)                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │Admin Login  │ │User Mgmt    │ │Basic        │ │System       ││
│  │& Dashboard  │ │Interface    │ │Analytics    │ │Settings     ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS/REST API
┌─────────────────────────▼───────────────────────────────────────┐
│              Existing Spring Boot Backend (Extended)            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │Admin Auth   │ │Admin User   │ │Admin        │ │Admin System ││
│  │Controller   │ │Controller   │ │Analytics    │ │Controller   ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                 Existing Data Layer                             │
│              PostgreSQL + MongoDB + Redis                      │
└─────────────────────────────────────────────────────────────────┘
```

### **Complete Platform Architecture**

```
┌──────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                           │
│    ┌─────────────────┐          ┌─────────────────┐             │
│    │ React User App  │          │ React Admin     │             │
│    │                 │          │ Panel           │             │
│    └─────────────────┘          └─────────────────┘             │
└──────────────┬───────────────────────────┬───────────────────────┘
               │                           │
┌──────────────▼───────────────────────────▼───────────────────────┐
│                     API Gateway Layer                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │User         │ │Admin        │ │Assessment   │ │Auth         ││
│  │Controllers  │ │Controllers  │ │Controllers  │ │Controllers  ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      Service Layer                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │User Service │ │Assessment   │ │Analytics    │ │Auth Service ││
│  │             │ │Service      │ │Service      │ │             ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      Data Storage                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │PostgreSQL   │ │MongoDB      │ │Redis Cache  │               │
│  │User Data    │ │Assessment   │ │Sessions     │               │
│  │             │ │Data         │ │             │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

### **User Authentication Process**

```
A[User Login Request] --> B[Auth Controller]
B --> C[Validate Credentials]
C --> D{Valid?}
D -->|Yes| E[Generate JWT Token]
D -->|No| F[Return Error]
E --> G[Store Session in Redis]
G --> H[Return Success Response]
F --> I[Show Login Error]
H --> J[Store Token in Frontend]
J --> K[Access Protected Routes]
```

### **JWT Token Validation Flow**

```
A[API Request with Token] --> B[JWT Filter]
B --> C[Extract Token]
C --> D[Validate Signature]
D --> E{Token Valid?}
E -->|Yes| F[Extract User Info]
E -->|No| G[Return 401]
F --> H[Set Security Context]
H --> I[Process Request]
G --> J[Redirect to Login]
I --> K[Return Response]
```

## 🎯 User Registration Flow

### **Registration Process**

```
A[Registration Form] --> B[Frontend Validation]
B --> C{Valid Input?}
C -->|No| D[Show Errors]
C -->|Yes| E[Submit to Backend]
E --> F[Auth Controller]
F --> G[Check Email Exists]
G --> H{Email Exists?}
H -->|Yes| I[Return Error]
H -->|No| J[Hash Password]
J --> K[Create User Entity]
K --> L[Save to Database]
L --> M[Generate JWT Tokens]
M --> N[Return Success]
D --> A
I --> O[Show Email Error]
N --> P[Store Tokens]
P --> Q[Redirect to Dashboard]
```

## 🎮 Assessment Flow

### **Assessment Taking Process**

```
A[Select Assessment] --> B[Load Questions]
B --> C[Start Assessment Session]
C --> D[Display Question]
D --> E[User Answers]
E --> F[Save Answer]
F --> G{More Questions?}
G -->|Yes| H[Next Question]
G -->|No| I[Calculate Results]
H --> D
I --> J[Generate Report]
J --> K[Save Results]
K --> L[Display Results]
```

### **Assessment Data Flow**

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Assessment   │ │Question     │ │Answer Input │               │
│  │Component    │ │Display      │ │             │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                        Backend                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Assessment   │ │Assessment   │ │Scoring      │               │
│  │Controller   │ │Service      │ │Engine       │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                       Database                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Questions    │ │User Answers │ │Results      │               │
│  │(MongoDB)    │ │(PostgreSQL) │ │(PostgreSQL) │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Database Architecture

### **Multi-Database Strategy**

```
┌─────────────────────────────────────────────────────────────────┐
│                    Application Layer                            │
│                ┌─────────────────────┐                         │
│                │ Spring Boot         │                         │
│                │ Application         │                         │
│                └─────────────────────┘                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                   Repository Layer                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │User         │ │Assessment   │ │Content      │ │Cache        ││
│  │Repository   │ │Repository   │ │Repository   │ │Repository   ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Database Layer                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │PostgreSQL   │ │MongoDB      │ │Redis        │               │
│  │User Data    │ │Assessment   │ │Cache Data   │               │
│  │             │ │Data         │ │             │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### **Data Relationship Flow**

```
┌─────────────────────────────────────────────────────────────────┐
│                      User Entity                                │
│                    ┌─────────────────┐                         │
│                    │ User            │                         │
│                    │ - id            │                         │
│                    │ - email         │                         │
│                    │ - profile       │                         │
│                    └─────────────────┘                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ 1:N
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Assessment Session                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Session      │ │- user_id    │ │- test_type  │               │
│  │- id         │ │- start_time │ │- status     │               │
│  │- questions  │ │- end_time   │ │- progress   │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────┬───────────────────────────────────┬───────────────────┘
          │ 1:N                               │ 1:1
          ▼                                   ▼
┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│        User Answers             │ │       Test Results              │
│  ┌─────────────┐ ┌─────────────┐│ │  ┌─────────────┐ ┌─────────────┐│
│  │Answer       │ │- session_id ││ │  │Result       │ │- session_id ││
│  │- id         │ │- question   ││ │  │- id         │ │- scores     ││
│  │- response   │ │- timestamp  ││ │  │- report     │ │- insights   ││
│  └─────────────┘ └─────────────┘│ │  └─────────────┘ └─────────────┘│
└─────────────────────────────────┘ └─────────────────────────────────┘
          ▲                                   │
          │ N:1                               │ 1:N
          │                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Assessment Templates                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Template     │ │Question     │ │Analytics    │               │
│  │- id         │ │Bank         │ │Data         │               │
│  │- questions  │ │- categories │ │- trends     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 API Request Flow

### **Standard Request Processing**

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Request                             │
│                    ┌─────────────────┐                         │
│                    │ HTTP Request    │                         │
│                    │ + JWT Token     │                         │
│                    └─────────────────┘                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Security Layer                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │CORS Filter  │ │Security     │ │JWT          │               │
│  │             │ │Filter       │ │Authentication│               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                   Controller Layer                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Route to     │ │Input        │ │Call Service │               │
│  │Controller   │ │Validation   │ │Layer        │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                   Business Layer                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Business     │ │Database     │ │Create       │               │
│  │Logic        │ │Operation    │ │Response     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      Response                                   │
│                    ┌─────────────────┐                         │
│                    │ JSON Response   │                         │
│                    │ + Status Code   │                         │
│                    └─────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Frontend Component Flow

### **React Component Architecture**

```
┌─────────────────────────────────────────────────────────────────┐
│                        App Layer                                │
│                    ┌─────────────────┐                         │
│                    │ App.tsx         │                         │
│                    │ (Root)          │                         │
│                    └─────────────────┘                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Provider Layer                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Auth         │ │Router       │ │Query        │               │
│  │Provider     │ │Provider     │ │Provider     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      Page Layer                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │Login Page   │ │Dashboard    │ │Profile      │ │Test Pages  ││
│  │             │ │Page         │ │Page         │ │             ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                   Feature Layer                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Test         │ │Profile      │ │Results      │               │
│  │Components   │ │Components   │ │Components   │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Common Layer                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Navbar       │ │Buttons      │ │Form         │               │
│  │             │ │             │ │Components   │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### **State Management Flow**

```
┌─────────────────────────────────────────────────────────────────┐
│                      User Interaction                           │
│                    ┌─────────────────┐                         │
│                    │ User Action     │                         │
│                    │ (Click/Submit)  │                         │
│                    └─────────────────┘                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                   Component Layer                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Event        │ │API Call     │ │Backend      │               │
│  │Handler      │ │             │ │Response     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                     State Layer                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Global State │ │Local State  │ │Server State │               │
│  │(Auth)       │ │(Component)  │ │(React Query)│               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                       UI Layer                                  │
│                    ┌─────────────────┐                         │
│                    │ Re-render UI    │                         │
│                    │ Components      │                         │
│                    └─────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

## 🚨 Error Handling Flow

### **Error Processing**

```
A[Error Occurs] --> B{Error Type}
B -->|Auth Error| C[401/403 Response]
B -->|Validation Error| D[400 Response]
B -->|Server Error| E[500 Response]
B -->|Not Found| F[404 Response]

C --> G[Redirect to Login]
D --> H[Show Field Errors]
E --> I[Show Error Message]
F --> J[Show Not Found Page]

G --> K[User Re-authenticates]
H --> L[User Fixes Input]
I --> M[User Retries]
J --> N[User Navigates Away]
```

## 🔧 Development Workflow

### **Code Development Process**

```
A[Feature Request] --> B[Create Branch]
B --> C[Write Code]
C --> D[Write Tests]
D --> E[Local Testing]
E --> F{Tests Pass?}
F -->|No| G[Fix Issues]
F -->|Yes| H[Create PR]
G --> C
H --> I[Code Review]
I --> J{Approved?}
J -->|No| K[Address Comments]
J -->|Yes| L[Merge to Main]
K --> C
L --> M[Deploy to Staging]
M --> N[Integration Testing]
N --> O[Deploy to Production]
```

### **Deployment Pipeline**

```
┌─────────────────────────────────────────────────────────────────┐
│                       Git Repository                            │
│                    ┌─────────────────┐                         │
│                    │ Code Commit     │                         │
│                    └─────────────────┘                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      Build Stage                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │Build        │ │Unit Tests   │ │Security     │ │Create       ││
│  │Process      │ │             │ │Scan         │ │Artifacts    ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Staging Environment                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Deploy to    │ │Staging      │ │Manual       │               │
│  │Staging      │ │Tests        │ │Approval     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                  Production Environment                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │Deploy to    │ │Health       │ │Monitor &    │               │
│  │Production   │ │Checks       │ │Alerts       │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

This system flow documentation uses simple text-based flow charts that are easy to understand and follow the exact style you requested.