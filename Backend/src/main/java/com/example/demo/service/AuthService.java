package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.LoginResponseDto;
import com.example.demo.dto.RegisterRequestDto;
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
        User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));
        if(user==null){
            throw new RuntimeException("User not found");
        }
        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        String token = jwtService.generateJwtToken(user.getEmail());
        return new LoginResponseDto("Login Successful",token);
    }
public String register(RegisterRequestDto request) {

    if (userRepository.existsByEmail(request.getEmail())) {
        return "Email already registered!";
    }

    User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setCollege(request.getCollege());
    user.setRole(request.getRole());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    userRepository.save(user); // Standard JpaRepository save method

    return "Registration Successful";
}
}
