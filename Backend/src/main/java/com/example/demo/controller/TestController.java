
package com.example.demo.controller;

import com.example.demo.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private JwtService jwtService;

    @GetMapping("/token")
    public String token() {
        // Generates a token using your email
        return jwtService.generateJwtToken("bhavya@gmail.com");
    }
}
