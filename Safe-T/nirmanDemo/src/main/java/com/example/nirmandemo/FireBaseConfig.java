package com.example.nirmandemo;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FireBaseConfig {

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("nirman-service.json");

        if (serviceAccount == null) {
            throw new RuntimeException("Firebase service account key file not found");
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://nirman-572e8-default-rtdb.asia-southeast1.firebasedatabase.app/")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}
