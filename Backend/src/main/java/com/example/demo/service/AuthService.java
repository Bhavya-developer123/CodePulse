package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.LoginResponseDto;
import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.entity.User;
import com.example.demo.exception.DuplicateResourceException;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthService {

    @Autowired 
    private UserRepository userRepository;

    @Autowired 
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Failed login attempt: email={} not found", request.getEmail());
                    return new InvalidCredentialsException("User not found with email: " + request.getEmail());
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Failed login attempt: invalid password for email={}", request.getEmail());
            throw new InvalidCredentialsException("Invalid Password");
        }

        String token = jwtService.generateJwtToken(user.getEmail());
        log.info("User login successful: email={}", user.getEmail());

        return new LoginResponseDto("Login Successful", token);
    }

    public String register(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Registration failed: email={} already exists", request.getEmail());
            throw new DuplicateResourceException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setCollege(request.getCollege());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        log.info("User registration successful: email={}", request.getEmail());

        return "Registration Successful";
    }
}