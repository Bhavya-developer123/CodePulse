package com.example.demo.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Streak;

public interface StreakRepository extends JpaRepository<Streak,Integer>{

    Streak findByUsernameAndDate(String username,LocalDate today);

    Streak findByUsername(String username);
    
}
