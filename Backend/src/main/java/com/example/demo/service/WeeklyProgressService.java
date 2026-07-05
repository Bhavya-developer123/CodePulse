package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.WeeklyProgress;
import com.example.demo.repository.WeeklyProgressRepository;

@Service
public class WeeklyProgressService {
    @Autowired
    WeeklyProgressRepository weeklyProgressRepository;
    public void updateWeeklyProgress(String username){
        LocalDate today=LocalDate.now();
        WeeklyProgress progress=weeklyProgressRepository.findByUsernameAndDate(username,today);
         if(progress==null){
            progress=new WeeklyProgress();
            progress.setUsername(username);
            progress.setDate(today);
            progress.setProblemSolved(1);
         }
         else{
            progress.setProblemSolved(progress.getProblemSolved()+1);
         }
         weeklyProgressRepository.save(progress);
        }
         public List<WeeklyProgress>getWeeklyProgress(String username){
            return weeklyProgressRepository.findByUsername(username);
         }
    }

