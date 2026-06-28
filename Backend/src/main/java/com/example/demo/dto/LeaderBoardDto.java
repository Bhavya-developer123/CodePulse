package com.example.demo.dto;

import lombok.Data;

@Data
public class LeaderBoardDto {
    private String UserName;
    private int totalSolved;
    private int Streak;
    private int rank;
}
