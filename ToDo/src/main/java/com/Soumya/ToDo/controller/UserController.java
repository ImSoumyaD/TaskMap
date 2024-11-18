package com.Soumya.ToDo.controller;

import com.Soumya.ToDo.entity.LoginResponse;
import com.Soumya.ToDo.entity.User;
import com.Soumya.ToDo.services.JwtUtil;
import com.Soumya.ToDo.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    UserServices userServices;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/signup")
    public User addUser(@RequestBody User user){
        return userServices.addUser(user);
    }
    @GetMapping("/all-user")
    public List<User> getAll(){
        return userServices.getAllUser();
    }



    @PostMapping("/signin")
    public ResponseEntity<?> singIn(@RequestBody User loginDetails){
        String email = loginDetails.getEmail();
        String password = loginDetails.getPassword();

        Optional<User> userEntity = userServices.findByEmail(email);
        if (userEntity.isPresent()){
            User user = userEntity.get();
            if (passwordEncoder.matches(password,user.getPassword())){
                String token = jwtUtil.generateToken(user.getFirstname(), user.getId());
                LoginResponse loginResponse = new LoginResponse(token,user.getFirstname());
                return ResponseEntity.ok(loginResponse);
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong Password");
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong email id");
        }

    }
}
