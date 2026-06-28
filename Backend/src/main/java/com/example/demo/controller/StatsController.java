package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Entity.Stats;
import com.example.demo.service.StatsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@RestController
public class StatsController {
    @Autowired
    private StatsService statsService;
    @GetMapping("/stats/{username}")
   public Stats findByUsername(@PathVariable String Username){
    return statsService.getStats(Username);
   }
}
