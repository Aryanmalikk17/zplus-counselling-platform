package com.zplus.counselling.config.database;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.zplus.counselling.repository.mongo")
public class MongoRepositoryConfig {
}
