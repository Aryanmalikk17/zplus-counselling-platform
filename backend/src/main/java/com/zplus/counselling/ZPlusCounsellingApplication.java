package com.zplus.counselling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableAsync
@EnableCaching
public class ZPlusCounsellingApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZPlusCounsellingApplication.class, args);
	}
}