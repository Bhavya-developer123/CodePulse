package com.example.demo.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Problem;
import com.example.demo.dto.StreakDto;
import com.example.demo.repository.ProblemRepository;

@RestController
public class StreakController {

    @Autowired
    private ProblemRepository problemRepository;

    @GetMapping("/streak/{username}")
    public StreakDto getStreak(@PathVariable String username) {

        List<Problem> problems = problemRepository.findByUsername(username);

        List<LocalDate> dates = new ArrayList<>();

        for (int i = 0; i < problems.size(); i++) {

            if (problems.get(i).getSolvedDate() != null) {

                dates.add(
                    LocalDate.parse(problems.get(i).getSolvedDate())
                );
            }
        }

        Collections.sort(dates);

        StreakDto dto = new StreakDto();

        if (dates.isEmpty()) {

            dto.setCurrentStreak(0);
            dto.setLongestStreak(0);
            dto.setLastSolvedDate(null);

            return dto;
        }

        int tempStreak = 1;
        int longestStreak = 1;

        for (int i = 1; i < dates.size(); i++) {

            long daysBetween =
                ChronoUnit.DAYS.between(dates.get(i - 1), dates.get(i));

            if (daysBetween == 0) {
                continue;
            }

            if (daysBetween == 1) {

                tempStreak++;

                if (tempStreak > longestStreak) {
                    longestStreak = tempStreak;
                }

            } else {

                tempStreak = 1;
            }
        }

        int currentStreak = 1;

        LocalDate latestDate = dates.get(dates.size() - 1);

        long gap =
            ChronoUnit.DAYS.between(latestDate, LocalDate.now());

        if (gap > 1) {

            currentStreak = 0;

        } else {

            currentStreak = 1;

            for (int i = dates.size() - 1; i > 0; i--) {

                long daysBetween =
                    ChronoUnit.DAYS.between(
                        dates.get(i - 1),
                        dates.get(i)
                    );

                if (daysBetween == 1) {

                    currentStreak++;

                } else if (daysBetween > 1) {

                    break;
                }
            }
        }

        dto.setCurrentStreak(currentStreak);
        dto.setLongestStreak(longestStreak);
        dto.setLastSolvedDate(latestDate.toString());

        return dto;
    }
}