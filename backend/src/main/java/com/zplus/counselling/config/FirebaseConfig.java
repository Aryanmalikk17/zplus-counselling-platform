package com.zplus.counselling.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                // Try to load from classpath first (for production/docker)
                InputStream serviceAccount = null;
                try {
                    serviceAccount = new ClassPathResource("serviceAccountKey.json").getInputStream();
                } catch (IOException e) {
                    // Fallback to local file system (for local dev)
                    // You might want to make this path configurable via properties
                    serviceAccount = new FileInputStream("serviceAccountKey.json");
                }

                if (serviceAccount != null) {
                    FirebaseOptions options = FirebaseOptions.builder()
                            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                            .build();

                    FirebaseApp.initializeApp(options);
                    System.out.println("Firebase Admin SDK initialized successfully.");
                } else {
                    System.err.println("Failed to load serviceAccountKey.json. Firebase features will not work.");
                }
            }
        } catch (IOException e) {
            System.err.println("Error initializing Firebase: " + e.getMessage());
            // In a real app, you might want to throw an exception to fail startup
            // throw new RuntimeException("Failed to initialize Firebase", e);
        }
    }
}
