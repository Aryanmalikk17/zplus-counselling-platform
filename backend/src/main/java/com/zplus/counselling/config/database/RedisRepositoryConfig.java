package com.zplus.counselling.config.database;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@Configuration
@EnableRedisRepositories(basePackages = "com.zplus.counselling.repository.redis")
public class RedisRepositoryConfig {
}
