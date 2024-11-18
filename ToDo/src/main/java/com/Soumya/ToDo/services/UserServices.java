package com.Soumya.ToDo.services;

import com.Soumya.ToDo.entity.User;
import com.Soumya.ToDo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;

    public User addUser(User user){
        String password = user.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        return userRepo.save(user);
    }

    public Optional<User> findByEmail(String email){
        return userRepo.findByEmail(email);
    }
    public Optional<User> findById(int id){
        return userRepo.findById(id);
    }

    public Optional<User> getUserId(String email){
        Optional<User> byEmail = findByEmail(email);
        return byEmail;
    }

    public List<User> getAllUser(){
        return userRepo.findAll();
    }
}
