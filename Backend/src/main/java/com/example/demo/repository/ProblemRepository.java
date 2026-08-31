package com.example.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.demo.entity.Problem;

public interface ProblemRepository extends JpaRepository<Problem,Integer>,JpaSpecificationExecutor<Problem>{

    List<Problem> findByUsername(String username);
    Page<Problem>findByDifficultyIgnoreCase(String difficulty,Pageable pageable);
    Page<Problem>findByTopicIgnoreCase(String topic,Pageable pageable);
    Page<Problem>findByPlatformIgnoreCase(String platform,Pageable pageable);
    Page<Problem>findByDifficultyIgnoreCaseAndTopicIgnoreCase(String difficulty,String topic,Pageable pageable);
    Page<Problem>findByTitleContainingIgnoreCase(String title,Pageable pageable);
}
