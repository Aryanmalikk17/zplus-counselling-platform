package com.zplus.counselling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(exclude = {
        MongoAutoConfiguration.class,
        MongoDataAutoConfiguration.class,
        RabbitAutoConfiguration.class
})
@EnableAsync
@EnableCaching
public class ZPlusCounsellingApplication {

	public static void main(String[] args) {
		System.out.println("🚀 Starting ZPluse Counselling Platform...");
		System.out.println("📊 Initializing Spring Boot Application");
		SpringApplication.run(ZPlusCounsellingApplication.class, args);
		System.out.println("✅ ZPluse Counselling Platform Started Successfully!");
	}
}