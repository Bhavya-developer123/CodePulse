package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    public User CreateUser(User user){
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
    public List<User>getAllUsers(){
        return userRepository.findAll();
    }
    public User getUserById(int id){
        return userRepository.findById(id).orElse(null);
    }
    public User updateUser(int id,User updatedUser){
        User user=userRepository.findById(id).orElse(null);
        if(user!=null){
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setCollege(updatedUser.getCollege());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            return userRepository.save(updatedUser);
        }
        return null;
    }
    public void deleteUser(int id){
        userRepository.deleteById(id);
    }
}
