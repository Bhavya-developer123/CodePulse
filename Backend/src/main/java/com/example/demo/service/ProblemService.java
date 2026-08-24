package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Problem;
import com.example.demo.repository.ProblemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class ProblemService {
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    StatsService statsService;
    @Autowired
    WeeklyProgressService weeklyProgressService;
    @Autowired
    StreakService streakService;
    public Problem addProblem(Problem problem) {
    Problem saved = problemRepository.save(problem);
    statsService.updateOnProblemSolved(problem.getUsername(),problem.getDifficulty());
    weeklyProgressService.updateWeeklyProgress(problem.getUsername());
    streakService.updateStreak(problem.getUsername());
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
    public Page<Problem>filterProblems(String difficulty,String topic,String platform,int page,int size,String sortBy,String direction){
        Sort sort;
        if(direction.equalsIgnoreCase("desc")){
           sort=Sort.by(sortBy).descending();
        }
        else{
            sort=Sort.by(sortBy).ascending();
        }
        Pageable pageable=PageRequest.of(page,size,sort);
        if(difficulty!=null&&topic!=null){
            return problemRepository.findByDifficultyIgnoreCaseAndTopicIgnoreCase(difficulty,topic,pageable);
        }
        if(difficulty!=null){
            return problemRepository.findByDifficultyIgnoreCase(difficulty,pageable);
        }
        if(topic!=null){
            return problemRepository.findByTopicIgnoreCase(topic,pageable);
        }
        if(platform!=null){
            return problemRepository.findByPlatformIgnoreCase(platform,pageable);
        }
        return problemRepository.findAll(pageable);
    }
}
