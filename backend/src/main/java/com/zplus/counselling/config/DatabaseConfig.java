package com.zplus.counselling.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.zplus.counselling.repository.postgres")
@EnableTransactionManagement
public class DatabaseConfig {
    // PostgreSQL configuration is handled by application.yml
}