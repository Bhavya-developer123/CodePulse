package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Problem;
import com.example.demo.dto.LeaderBoardDto;
import com.example.demo.repository.ProblemRepository;


@RestController
public class LeaderBoardController {
    @Autowired
    private ProblemRepository problemRepository;
    @GetMapping("/leader-board")
    private List<LeaderBoardDto>getLeader(){
        List<Problem>problems=problemRepository.findAll();
        Map<String,Integer>leadermap=new HashMap<>();
        for(int i=0;i<problems.size();i++){
            Problem problem=problems.get(i);
            String username=problem.getUsername();
            leadermap.put(username,leadermap.getOrDefault(username,0)+1);
        }
        List<Map.Entry<String, Integer>> entries = new ArrayList<>(leadermap.entrySet());
        List<LeaderBoardDto> result = new ArrayList<>();
        for (int i = 0; i < entries.size(); i++) {
            Map.Entry<String, Integer> entry = entries.get(i);
            LeaderBoardDto dto = new LeaderBoardDto();
            dto.setUserName(entry.getKey());
            dto.setTotalSolved(entry.getValue());
            result.add(dto);
        }
        result.sort(Comparator.comparingInt(LeaderBoardDto::getTotalSolved).reversed());
        for(int i=0;i<result.size();i++){
            result.get(i).setRank(i+1);
        }
        return result;
    }
}
