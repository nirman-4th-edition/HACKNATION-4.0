package com.mahakal.error404.Repo;

import com.mahakal.error404.Model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepo extends JpaRepository<Otp,String> {
    Optional<Otp> findByEmail(String email);
}
