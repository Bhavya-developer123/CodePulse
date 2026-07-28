package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.LoginResponseDto;
import com.example.demo.dto.RegisterRequestDto; // Import your DTO
import com.example.demo.service.AuthService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public LoginResponseDto login(@Valid @RequestBody LoginRequestDto request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequestDto request) { // Use RegisterRequestDto here!
        return authService.register(request);
    }
}