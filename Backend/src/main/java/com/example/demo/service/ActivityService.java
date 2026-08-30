package com.example.demo.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {
    @Async
    public void logProblemSolved(String username,String title){
        System.out.println("ASYNC ACTIVITY: User "+username+" solved "+title);
    }
}
