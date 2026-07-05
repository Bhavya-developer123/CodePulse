package com.example.demo.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Streak;
import com.example.demo.repository.StreakRepository;

@Service
public class StreakService {
    @Autowired
    StreakRepository streakRepository;
    public void updateStreak(String username){
        LocalDate today=LocalDate.now();
        Streak streak=streakRepository.findByUsernameAndDate(username,today);
        if(streak==null){
            streak = new Streak();
            streak.setUsername(username);
            streak.setDate(today);
            streak.setCurrentStreak(1);
            streak.setLongestStreak(1);
        }
        else {
            LocalDate lastDate=streak.getDate();
            if(lastDate.equals(today)){
                return;
            }
            else if(lastDate.plusDays(1).equals(today)){
                streak.setCurrentStreak(streak.getCurrentStreak()+1);}
            else{
                streak.setCurrentStreak(1);
            }
            if(streak.getCurrentStreak()>streak.getLongestStreak()){
                streak.setLongestStreak(streak.getCurrentStreak());
            }
            streak.setDate(today);
            }
            streakRepository.save(streak);
        }
        public Streak getStreak(String username){
            return streakRepository.findByUsername(username);
        }
    }

