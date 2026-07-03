package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Stats;
import com.example.demo.dto.LeaderBoardDto;
import com.example.demo.repository.StatsRepository;
@Service
public class LeaderboardService {
    @Autowired
    private StatsRepository statsRepository;
    public List<LeaderBoardDto> getLeaderBoard(){
        List<Stats>statsList=statsRepository.findAllByOrderByXpDesc();
        List<LeaderBoardDto> leaderboard=new ArrayList<>();
        int rank=1;
        for(int i=0;i<statsList.size();i++){
            Stats s=statsList.get(i);
            LeaderBoardDto dto=LeaderBoardDto.builder().UserName(s.getUsername()).Xp(s.getXp()).rank(rank++).build();
            leaderboard.add(dto);
        }
        return leaderboard;
    }
}
