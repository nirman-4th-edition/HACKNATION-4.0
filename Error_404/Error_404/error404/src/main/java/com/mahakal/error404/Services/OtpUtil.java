package com.mahakal.error404.Services;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Component
@Service
public class OtpUtil {
    public static final int OTP_LENGTH = 6;
    private SecureRandom secureRandom = new SecureRandom();

    public String generateOtp() {
        int randomNumber = secureRandom.nextInt((int) Math.pow(10, OTP_LENGTH));
        return String.format("%06d", randomNumber);
    }
}

