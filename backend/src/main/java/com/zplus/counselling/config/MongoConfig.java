package com.zplus.counselling.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@Profile("!test") // Exclude from test profile
@EnableMongoRepositories(basePackages = "com.zplus.counselling.repository.mongodb")
public class MongoConfig {
    // Intentionally empty — Spring Boot auto-configures the MongoClient
    // from the MONGODB_URI property in application.yml / application-docker.yml.
    // Do NOT extend AbstractMongoClientConfiguration here, as it overrides
    // the auto-config and ignores the MONGODB_URI environment variable.
}