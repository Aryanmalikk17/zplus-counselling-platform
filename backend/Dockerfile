# Multi-stage build for optimal image size
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Optimize build by caching dependencies
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
# Download dependencies beforehand, allows caching this layer
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root user for security (Render best practice)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /app/target/*.jar app.jar

# Render assigns a dynamic port. Spring Boot is configured to read $PORT in application.yml.
# ENTRYPOINT uses strict exec form (JSON array) and passes JVM memory flags to stay under 512MB.
ENTRYPOINT ["java", "-Xmx300m", "-Xss512k", "-XX:MaxRAM=400m", "-jar", "app.jar"]