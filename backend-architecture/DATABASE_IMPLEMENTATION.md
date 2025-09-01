# Database Implementation Guide

## 🗄️ Database Setup Instructions

### PostgreSQL Setup

#### 1. Installation & Configuration
```bash
# Using Docker (Recommended for development)
docker run --name zplus-postgres \
  -e POSTGRES_DB=zplus_counselling \
  -e POSTGRES_USER=zplus_user \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d postgres:15

# Or using Homebrew on macOS
brew install postgresql@15
brew services start postgresql@15
```

#### 2. Database Schema Creation
```sql
-- Create database
CREATE DATABASE zplus_counselling;
CREATE USER zplus_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE zplus_counselling TO zplus_user;

-- Connect to the database and run the schema from SPRING_BOOT_ARCHITECTURE.md
\c zplus_counselling;
-- Run all CREATE TABLE statements from the architecture document
```

#### 3. Performance Tuning
```sql
-- Recommended PostgreSQL settings for the application
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
```

### MongoDB Setup

#### 1. Installation & Configuration
```bash
# Using Docker
docker run --name zplus-mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secure_password \
  -e MONGO_INITDB_DATABASE=zplus_content \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  -d mongo:6.0

# Initialize the database
docker exec -it zplus-mongodb mongosh --eval "
use zplus_content;
db.createUser({
  user: 'zplus_user',
  pwd: 'secure_password',
  roles: [{ role: 'readWrite', db: 'zplus_content' }]
});
"
```

#### 2. Index Creation
```javascript
// Connect to MongoDB and create indexes
use zplus_content;

// Assessment Templates
db.assessmentTemplates.createIndex({ "testType": 1 });
db.assessmentTemplates.createIndex({ "isActive": 1 });
db.assessmentTemplates.createIndex({ "category": 1 });

// Blog Articles
db.blogArticles.createIndex({ "slug": 1 }, { unique: true });
db.blogArticles.createIndex({ "category": 1 });
db.blogArticles.createIndex({ "tags": 1 });
db.blogArticles.createIndex({ "publishedAt": -1 });
db.blogArticles.createIndex({ "isPublished": 1 });

// Career Data
db.careerData.createIndex({ "industry": 1 });
db.careerData.createIndex({ "jobTitles.title": 1 });
db.careerData.createIndex({ "jobTitles.level": 1 });

// User Analytics
db.userAnalytics.createIndex({ "userId": 1 });
db.userAnalytics.createIndex({ "sessionId": 1 });
db.userAnalytics.createIndex({ "events.type": 1 });
db.userAnalytics.createIndex({ "createdAt": -1 });

// Question Templates
db.questionTemplates.createIndex({ "category": 1, "subcategory": 1 });
db.questionTemplates.createIndex({ "validatedForTests": 1 });
```

### Redis Setup

#### 1. Installation & Configuration
```bash
# Using Docker
docker run --name zplus-redis \
  -p 6379:6379 \
  -v redis_data:/data \
  -d redis:7-alpine redis-server --appendonly yes --requirepass secure_password

# Test connection
docker exec -it zplus-redis redis-cli -a secure_password ping
```

#### 2. Redis Configuration
```conf
# redis.conf optimizations
maxmemory 512mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

## 🔄 Data Migration Strategy

### Initial Data Setup

#### 1. Sample Assessment Data
```javascript
// Insert MBTI Assessment Template
db.assessmentTemplates.insertOne({
  testType: "MBTI",
  version: "2.0",
  title: "Myers-Briggs Type Indicator",
  description: "Discover your personality type based on Carl Jung's theory",
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
    }
    // ... other dimensions
  ],
  questions: [
    // Sample questions from your existing frontend
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
  resultTypes: {
    "INTJ": {
      title: "The Architect",
      description: "Imaginative and strategic thinkers...",
      strengths: ["Strategic thinking", "Independence"],
      careerSuggestions: ["Software Engineer", "Scientist"]
    }
    // ... all 16 types
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert other assessment types (Big Five, Career, IQ, etc.)
```

#### 2. Blog Content Migration
```javascript
// Sample blog articles based on your existing content
const blogArticles = [
  {
    title: "Understanding Anxiety: Evidence-Based Techniques",
    slug: "understanding-anxiety-evidence-based-techniques",
    category: "MENTAL_HEALTH",
    content: "...", // Full content
    author: {
      name: "Dr. Emily Rodriguez",
      bio: "Clinical psychologist specializing in anxiety disorders"
    }
  },
  {
    title: "Career Transition Strategies for Mid-Career Professionals",
    slug: "career-transition-strategies-mid-career",
    category: "CAREER_DEVELOPMENT",
    content: "...",
    author: {
      name: "Sarah Johnson",
      bio: "Career counselor with 10+ years experience"
    }
  }
  // ... more articles
];

db.blogArticles.insertMany(blogArticles);
```

#### 3. Career Data Population
```javascript
// Industry and role data
const careerData = [
  {
    industry: "TECHNOLOGY",
    jobTitles: [
      {
        title: "Software Engineer",
        level: "ENTRY",
        description: "Develops software applications and systems",
        requiredSkills: ["Java", "Python", "JavaScript", "Problem-solving"],
        preferredPersonalityTypes: ["INTJ", "INTP", "ENTJ"],
        salaryRange: {
          min: 600000,
          max: 1200000,
          currency: "INR",
          location: "India"
        }
      }
    ]
  }
  // ... more industries
];

db.careerData.insertMany(careerData);
```

## 🔒 Database Security

### PostgreSQL Security
```sql
-- Create read-only user for analytics
CREATE ROLE analytics_user WITH LOGIN PASSWORD 'analytics_password';
GRANT CONNECT ON DATABASE zplus_counselling TO analytics_user;
GRANT USAGE ON SCHEMA public TO analytics_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_user;

-- Row Level Security for sensitive data
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY test_results_user_policy ON test_results
  USING (user_id = current_setting('app.current_user_id')::uuid);

-- Audit trigger for sensitive operations
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values)
  VALUES (
    current_setting('app.current_user_id', true)::uuid,
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply audit trigger to sensitive tables
CREATE TRIGGER users_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

### MongoDB Security
```javascript
// Enable authentication and create users
use admin;
db.createUser({
  user: "admin",
  pwd: "secure_admin_password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
});

use zplus_content;
db.createUser({
  user: "zplus_app",
  pwd: "secure_app_password",
  roles: [
    { role: "readWrite", db: "zplus_content" },
    { role: "dbAdmin", db: "zplus_content" }
  ]
});

// Create read-only user for analytics
db.createUser({
  user: "analytics_readonly",
  pwd: "analytics_password",
  roles: [{ role: "read", db: "zplus_content" }]
});
```

## 📊 Monitoring & Maintenance

### Database Monitoring Queries

#### PostgreSQL Health Checks
```sql
-- Connection monitoring
SELECT 
  count(*) as total_connections,
  count(*) FILTER (WHERE state = 'active') as active_connections,
  count(*) FILTER (WHERE state = 'idle') as idle_connections
FROM pg_stat_activity;

-- Performance monitoring
SELECT 
  schemaname,
  tablename,
  seq_scan,
  seq_tup_read,
  idx_scan,
  idx_tup_fetch
FROM pg_stat_user_tables
ORDER BY seq_tup_read DESC;

-- Slow query analysis
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

#### MongoDB Health Checks
```javascript
// Database status
db.runCommand({dbStats: 1});

// Collection statistics
db.stats();

// Index usage
db.runCommand({collStats: "assessmentTemplates", indexDetails: true});

// Slow operations
db.getProfilingData().sort({ts: -1}).limit(5);
```

### Backup Strategy

#### PostgreSQL Backups
```bash
#!/bin/bash
# Daily backup script
BACKUP_DIR="/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)

# Full backup
pg_dump -h localhost -U zplus_user -d zplus_counselling \
  --format=custom --compress=9 \
  --file="$BACKUP_DIR/zplus_full_$DATE.backup"

# Cleanup old backups (keep last 30 days)
find $BACKUP_DIR -name "zplus_full_*.backup" -mtime +30 -delete
```

#### MongoDB Backups
```bash
#!/bin/bash
# MongoDB backup script
BACKUP_DIR="/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
mongodump --host localhost:27017 \
  --db zplus_content \
  --username zplus_user \
  --password secure_password \
  --out "$BACKUP_DIR/zplus_content_$DATE"

# Compress backup
tar -czf "$BACKUP_DIR/zplus_content_$DATE.tar.gz" \
  "$BACKUP_DIR/zplus_content_$DATE"

# Cleanup
rm -rf "$BACKUP_DIR/zplus_content_$DATE"
find $BACKUP_DIR -name "zplus_content_*.tar.gz" -mtime +30 -delete
```

## 🚀 Performance Optimization

### Query Optimization Tips

#### PostgreSQL
```sql
-- Use EXPLAIN ANALYZE for query optimization
EXPLAIN (ANALYZE, BUFFERS) 
SELECT u.full_name, tr.personality_type
FROM users u
JOIN test_results tr ON u.id = tr.user_id
WHERE tr.test_type = 'MBTI'
AND tr.created_at >= NOW() - INTERVAL '30 days';

-- Optimize with proper indexes
CREATE INDEX CONCURRENTLY idx_test_results_type_date 
ON test_results(test_type, created_at);
```

#### MongoDB
```javascript
// Use explain() for query analysis
db.blogArticles.find({category: "MENTAL_HEALTH"}).explain("executionStats");

// Optimize with compound indexes
db.blogArticles.createIndex({
  "category": 1,
  "publishedAt": -1,
  "isPublished": 1
});
```

### Scaling Strategies

#### Read Replicas Setup
```yaml
# docker-compose.yml for read replicas
version: '3.8'
services:
  postgres-primary:
    image: postgres:15
    environment:
      - POSTGRES_REPLICATION_MODE=master
      - POSTGRES_REPLICATION_USER=replicator
      - POSTGRES_REPLICATION_PASSWORD=replica_password

  postgres-replica:
    image: postgres:15
    environment:
      - POSTGRES_REPLICATION_MODE=slave
      - POSTGRES_MASTER_HOST=postgres-primary
      - POSTGRES_REPLICATION_USER=replicator
      - POSTGRES_REPLICATION_PASSWORD=replica_password
```

This database implementation guide provides detailed setup instructions, security configurations, monitoring strategies, and optimization techniques for your Spring Boot backend. The hybrid PostgreSQL + MongoDB approach gives you the best of both worlds - ACID compliance for critical user data and flexible document storage for dynamic content.