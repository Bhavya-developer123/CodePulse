package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.WeeklyProgress;
import com.example.demo.service.WeeklyProgressService;

@RestController
@RequestMapping("/weekly-progress")
public class WeeklyProgressController {
    @Autowired
    WeeklyProgressService weeklyProgressService;
    @GetMapping("/{username}")
    public List<WeeklyProgress>getWeeeklyProgress(@PathVariable String username){
        return weeklyProgressService.getWeeklyProgress(username);
    }
}
