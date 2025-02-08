package com.mahakal.error404.Model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Component
public class Otp {

    @Id
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String otp;

    public Otp() {}

    public Otp(String email, String otp, LocalDateTime createdAt) {
        this.email = email;
        this.otp = otp;
        this.createdAt = createdAt;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public boolean isExpired() {
        LocalDateTime expirationTime = createdAt.plusMinutes(1);
        LocalDateTime currentTime = LocalDateTime.now(ZoneOffset.UTC);
        return currentTime.isAfter(expirationTime);
    }

    public void refreshCreatedAt() {
        this.createdAt = LocalDateTime.now(ZoneOffset.UTC);
    }
}
