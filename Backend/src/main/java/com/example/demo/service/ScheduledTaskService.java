package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ScheduledTaskService {

    @Scheduled(cron = "0 0 0 * * *")
    public void dailyMaintenanceTask() {

        log.info("CODEPULSE DAILY MAINTENANCE: {}", LocalDateTime.now());
    }
}
