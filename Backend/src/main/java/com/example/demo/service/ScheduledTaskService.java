package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ScheduledTaskService {
    @Scheduled(fixedRate=60000)
    public void dailyMaintainenceTask(){
        System.out.println(
                "CODEPULSE SCHEDULED TASK RUNNING: "
                        + LocalDateTime.now()
        );
    }
}
