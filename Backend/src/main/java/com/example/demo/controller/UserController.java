package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.CreateUser(user);
    }
    @GetMapping
    public List<User>getAllUsers(){
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id){
        return userService.getUserById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteUserById(@PathVariable int id){
        userService.deleteUser(id);
        return "deleted successfully";
    }
    @PutMapping("/{id}")
    public User updateUserById(@PathVariable int id,@RequestBody User update){
        return userService.updateUser(id, update);
    }
}
