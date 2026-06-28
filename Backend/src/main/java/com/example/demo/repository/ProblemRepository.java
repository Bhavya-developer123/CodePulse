package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Problem;

public interface ProblemRepository extends JpaRepository<Problem,Integer>{

    List<Problem> findByUsername(String username);
    
}
