package com.mahakal.error404.Services;

import com.mahakal.error404.Model.User;
import com.mahakal.error404.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    UserRepo userRepo;

    public User saveData(User user)
    {
       return userRepo.save(user);
    }

    public Optional<User> getData(String email)
    {
        Optional<User> byId = userRepo.findByEmail(email);
        return byId;

    }
}
