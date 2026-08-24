package com.example.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Problem;

public interface ProblemRepository extends JpaRepository<Problem,Integer>{

    List<Problem> findByUsername(String username);
    Page<Problem>findByDifficultyIgnoreCase(String difficulty,Pageable pageable);
    Page<Problem>findByTopicIgnoreCase(String topic,Pageable pageable);
    Page<Problem>findByPlatformIgnoreCase(String platform,Pageable pageable);
    Page<Problem>findByDifficultyIgnoreCaseAndTopicIgnoreCase(String difficulty,String topic,Pageable pageable);
}
