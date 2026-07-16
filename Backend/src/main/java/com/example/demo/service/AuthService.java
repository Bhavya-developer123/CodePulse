package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.LoginResponseDto;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;

@Service
public class AuthService {
    @Autowired 
    private UserRepository userRepository;
    @Autowired 
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    public LoginResponseDto login(LoginRequestDto request){
        User user=userRepository.findByEmail(request.getEmail());
        if(user==null){
            throw new RuntimeException("User not found");
        }
        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        String token = jwtService.generateJwtToken(user.getEmail());
        return new LoginResponseDto("Login Successful",token);
    }
    // Add this method inside com.example.demo.service.AuthService

public String register(User user) {
    // 1. Check if user already exists
    if (userRepository.findByEmail(user.getEmail()) != null) {
        throw new RuntimeException("Email already registered!");
    }

    // 2. Encrypt/Hash the raw password before saving!
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    // 3. Save the user to the database
    userRepository.save(user);

    return "User registered successfully!";
}
}
