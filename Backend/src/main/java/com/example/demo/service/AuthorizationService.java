package com.example.demo.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service("authorizationService")
@RequiredArgsConstructor
public class AuthorizationService {
    private final UserRepository userRepository;
    public boolean isOwnerOrAdmin(Authentication authentication,String username){
        String email=authentication.getName();
        User user=userRepository.findByEmail(email).orElse(null);
        if(user==null){
            return false;
        }
        if("ADMIN".equals(user.getRole())){
            return true;
        }
        return user.getName().equalsIgnoreCase(username);
    }
    
}
