package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Stats;

public interface StatsRepository extends JpaRepository<Integer,Stats>{

    Stats findByUsername(String username);

    Stats save(Stats stats);
    
}
