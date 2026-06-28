package com.example.demo.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Problem;
import com.example.demo.dto.WeeklyProgressDto;
import com.example.demo.repository.ProblemRepository;

@RestController
public class WeeklyProgressController {
    @Autowired
    private ProblemRepository problemRepository;
    @GetMapping("/weekly-progress")
    public List<WeeklyProgressDto> getWeeklyProgress() {
    List<Problem> problems = problemRepository.findAll();
    Map<LocalDate, Integer> progressMap = new HashMap<>();
    for (int i = 0; i < problems.size(); i++) {
    String solvedDateStr = problems.get(i).getSolvedDate();
    if (solvedDateStr != null && !solvedDateStr.trim().isEmpty()) {
        LocalDate date = LocalDate.parse(solvedDateStr);
        progressMap.put(date, progressMap.getOrDefault(date, 0) + 1);
    }
}
      List<Map.Entry<LocalDate, Integer>> entries = new ArrayList<>(progressMap.entrySet());
        List<WeeklyProgressDto> result = new ArrayList<>();
        for (int i = 0; i < entries.size(); i++) {
            Map.Entry<LocalDate, Integer> entry = entries.get(i);
            WeeklyProgressDto dto = new WeeklyProgressDto();
            dto.setDate(entry.getKey());
            dto.setProblemsSolved(entry.getValue());
            result.add(dto);
        }
        return result;
    }
}
