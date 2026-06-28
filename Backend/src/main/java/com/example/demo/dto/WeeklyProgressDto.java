package com.example.demo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class WeeklyProgressDto {
    private LocalDate date;
private int problemsSolved;
}
