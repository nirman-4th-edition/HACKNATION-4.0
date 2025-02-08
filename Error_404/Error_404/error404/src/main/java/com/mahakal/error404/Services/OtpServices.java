package com.mahakal.error404.Services;

import com.mahakal.error404.Model.Otp;
import com.mahakal.error404.Repo.OtpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OtpServices {
    @Autowired
    OtpRepo otpRepo;

    public Optional<Otp> findUserbyEmail(String email) {
        if (email == null || email.isEmpty()) {
            return Optional.empty();
        }
        return otpRepo.findByEmail(email);
    }

    public void deleteOtp(String email)
    {
        otpRepo.deleteById(email);
    }

    public boolean saveOtp(Otp otp) {
        try {
            otpRepo.save(otp);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Otp getOtp(String email)
    {
        return otpRepo.getReferenceById((email));
    }
}
