package com.example.demo.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemResponseDto {
    private int id;
    private String username;
    private String title;
    private String difficulty;
    private String topic;
    private String platform;
    private LocalDate solvedDate;
}
