package com.mahakal.error404.Services;

import com.mahakal.error404.Model.Register;
import com.mahakal.error404.Repo.LoginRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class SingupLogin {
    private static final Logger log = LoggerFactory.getLogger(SingupLogin.class);
    @Autowired
    LoginRepo loginRepo;

    @Autowired
    Register register;

    public boolean exist(String email) {
        return loginRepo.findById(email).isPresent();
    }

    public boolean register(Register register) {
        try {
            loginRepo.save(register);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Optional<Register> login(String email) {
        return loginRepo.findById(email);
    }



}
