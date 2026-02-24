package com.zplus.counselling.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.credential.json}")
    private String firebaseCredentialsJson;

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                if (firebaseCredentialsJson == null || firebaseCredentialsJson.trim().isEmpty()) {
                    System.err.println("Failed to load Firebase credentials. FIREBASE_CREDENTIALS environment variable is missing or empty.");
                    return;
                }

                InputStream serviceAccount = new ByteArrayInputStream(firebaseCredentialsJson.getBytes(StandardCharsets.UTF_8));

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
                System.out.println("Firebase Admin SDK initialized successfully.");
            }
        } catch (IOException e) {
            System.err.println("Error initializing Firebase: " + e.getMessage());
            // In a real app, you might want to throw an exception to fail startup
            // throw new RuntimeException("Failed to initialize Firebase", e);
        }
    }
}
