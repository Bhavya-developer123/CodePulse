package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Stats;

public interface StatsRepository extends JpaRepository<Stats,Integer>{

    Stats findByUsername(String username);

    List<Stats> findAllByOrderByXpDesc();
    
}
