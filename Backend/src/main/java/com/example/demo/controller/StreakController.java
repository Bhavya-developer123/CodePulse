package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Streak;
import com.example.demo.service.StreakService;

@RestController
@RequestMapping("/streak")
public class StreakController {

    @Autowired
    private StreakService streakService;

    @GetMapping("/{username}")
    public Streak getStreak(@PathVariable String username){
        return streakService.getStreak(username);
    }

    
}