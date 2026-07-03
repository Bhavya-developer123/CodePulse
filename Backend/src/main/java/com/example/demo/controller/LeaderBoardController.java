package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LeaderBoardDto;
import com.example.demo.service.LeaderboardService;

@RestController
@RequestMapping("/Leaderboard")
public class LeaderBoardController{
@Autowired
private LeaderboardService Leaderboardservice;
@GetMapping
public List<LeaderBoardDto>getLeaderBoard(){
    return Leaderboardservice.getLeaderBoard();
}
}