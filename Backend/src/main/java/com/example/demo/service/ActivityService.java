package com.example.demo.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ActivityService {
    @Async
    public void logProblemSolved(String username,String title){
         log.info("ASYNC ACTIVITY: User {} solved {}", username, title);
    }
}
