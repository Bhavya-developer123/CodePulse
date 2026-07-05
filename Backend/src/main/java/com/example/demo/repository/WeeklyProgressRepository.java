package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.WeeklyProgress;

public interface WeeklyProgressRepository extends JpaRepository<WeeklyProgress,Integer> {

	WeeklyProgress findByUsernameAndDate(String username, LocalDate today);

    List<WeeklyProgress> findByUsername(String username);
    
}
