package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Problem;
import com.example.demo.repository.ProblemRepository;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private StatsService statsService;

    @Autowired
    private WeeklyProgressService weeklyProgressService;

    @Autowired
    private StreakService streakService;

    public Problem addProblem(Problem problem) {
        // Extract authenticated username automatically from JWT context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        if (currentUsername != null && !currentUsername.equals("anonymousUser")) {
            problem.setUsername(currentUsername);
        }

        Problem saved = problemRepository.save(problem);

        statsService.updateOnProblemSolved(problem.getUsername(), problem.getDifficulty());
        weeklyProgressService.updateWeeklyProgress(problem.getUsername());
        streakService.updateStreak(problem.getUsername());

        return saved;
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public Problem getProblemById(int id) {
        return problemRepository.findById(id).orElse(null);
    }

    public void deleteProblem(int id) {
        problemRepository.deleteById(id);
    }

    public List<Problem> getByUsername(String username) {
        return problemRepository.findByUsername(username);
    }

    public Problem updateProblem(int id, Problem updatedProblem) {
        Problem problem = problemRepository.findById(id).orElse(null);
        if (problem != null) {
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

    public Page<Problem> getProblems(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return problemRepository.findAll(pageable);
    }

    public Page<Problem> filterProblems(String difficulty, String topic, String platform, int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        if (difficulty != null && topic != null) {
            return problemRepository.findByDifficultyIgnoreCaseAndTopicIgnoreCase(difficulty, topic, pageable);
        }
        if (difficulty != null) {
            return problemRepository.findByDifficultyIgnoreCase(difficulty, pageable);
        }
        if (topic != null) {
            return problemRepository.findByTopicIgnoreCase(topic, pageable);
        }
        if (platform != null) {
            return problemRepository.findByPlatformIgnoreCase(platform, pageable);
        }

        return problemRepository.findAll(pageable);
    }

    public Page<Problem> searchProblems(String title, int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return problemRepository.findByTitleContainingIgnoreCase(title, pageable);
    }
}