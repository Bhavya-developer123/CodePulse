package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Problem;
import com.example.demo.repository.ProblemRepository;

@Service
public class ProblemService {
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    StatsService statsService;
    
    public Problem addProblem(Problem problem) {
    Problem saved = problemRepository.save(problem);
    statsService.updateOnProblemSolved(problem.getUsername(),problem.getDifficulty());
    return saved;
}
    public List<Problem> getAllProblems(){
        return problemRepository.findAll();
    }
    public Problem getProblemById(int id){
        return problemRepository.findById(id).orElse(null);
    }
    public void deleteProblem(int id){
        problemRepository.deleteById(id);
    }
    public List<Problem> getByUsername(String username){
        return problemRepository.findByUsername(username);
    }
    public Problem updateProblem(int id,Problem updatedProblem){
        Problem problem=problemRepository.findById(id).orElse(null);
        if(problem!=null){
            problem.setUsername(updatedProblem.getUsername());
            problem.setTitle(updatedProblem.getTitle());
            problem.setDifficulty(updatedProblem.getDifficulty());
            problem.setTopic(updatedProblem.getTopic());
            problem.setPlatform(updatedProblem.getPlatform());
            problem.setSolvedDate(updatedProblem.getSolvedDate());
            return problemRepository.save(problem);
        }
        return null;
    }
    
}
