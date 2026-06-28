package com.example.demo.dto;

import lombok.Data;

@Data
public class StreakDto {
    private int currentStreak;
    private int longestStreak;
    private String lastSolvedDate;
}
