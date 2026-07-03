package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Stats;
import com.example.demo.repository.StatsRepository;

@Service
public class StatsService {
    @Autowired
    StatsRepository statsRepository;
    public Stats getStats(String username){
        return statsRepository.findByUsername(username);
    }
    public Stats createOrUpdateStats(Stats stats) {
        return statsRepository.save(stats);
    }
     public void updateOnProblemSolved(String username, String difficulty) {
        Stats stats = statsRepository.findByUsername(username);
        if (stats == null) {
            stats = new Stats();
            stats.setUsername(username);
            stats.setTotalProblemsSolved(0);
            stats.setEasyCount(0);
            stats.setMediumCount(0);
            stats.setHardCount(0);
            stats.setXp(0);
        }
        stats.setTotalProblemsSolved(stats.getTotalProblemsSolved()+1);
        if(difficulty.equalsIgnoreCase("easy")){
            stats.setEasyCount(stats.getEasyCount()+1);
            stats.setXp(stats.getXp()+10);
        }
        else if(difficulty.equalsIgnoreCase("medium")){
            stats.setMediumCount(stats.getMediumCount()+1);
            stats.setXp(stats.getXp()+20);
        }
        else{
            stats.setHardCount(stats.getHardCount()+1);
            stats.setXp(stats.getXp()+40);
        }
        statsRepository.save(stats);
}
}