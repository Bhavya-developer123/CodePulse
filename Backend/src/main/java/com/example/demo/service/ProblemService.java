package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProblemResponseDto;
import com.example.demo.entity.Problem;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.ProblemRepository;
import com.example.demo.repository.ProblemSpecification;
import com.example.demo.validation.ProblemQueryValidator;
import org.springframework.cache.annotation.Cacheable;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private StatsService statsService;

    @Autowired
    private WeeklyProgressService weeklyProgressService;

    @Autowired
    private StreakService streakService;

    @Autowired
    private ActivityService activityService; 

    public Problem addProblem(Problem problem) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        if (currentUsername != null && !currentUsername.equals("anonymousUser")) {
            problem.setUsername(currentUsername);
        }

        Problem saved = problemRepository.save(problem);
        log.info("Problem solved: username={}, title={}, difficulty={}",
        problem.getUsername(),
        problem.getTitle(),
        problem.getDifficulty());
        statsService.updateOnProblemSolved(problem.getUsername(), problem.getDifficulty());
        weeklyProgressService.updateWeeklyProgress(problem.getUsername());
        streakService.updateStreak(problem.getUsername());
        activityService.logProblemSolved(saved.getUsername(), saved.getTitle());

        return saved;
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }
    @Cacheable(value = "problems", key = "#id")
    public Problem getProblemById(int id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("problem not find with id:" + id));
    }

    public void deleteProblem(int id) {
        if (!problemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Problem not found with id: " + id);
        }
        problemRepository.deleteById(id);
    }

    public List<Problem> getByUsername(String username) {
        return problemRepository.findByUsername(username);
    }

    public Problem updateProblem(int id, Problem updatedProblem) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Problem not found with id: " + id));

        problem.setUsername(updatedProblem.getUsername());
        problem.setTitle(updatedProblem.getTitle());
        problem.setDifficulty(updatedProblem.getDifficulty());
        problem.setTopic(updatedProblem.getTopic());
        problem.setPlatform(updatedProblem.getPlatform());
        problem.setSolvedDate(updatedProblem.getSolvedDate());
        return problemRepository.save(problem);
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

    public Page<ProblemResponseDto> queryProblems(String title, String difficulty, String topic, String platform, int page,
            int size, String sortBy, String direction) {
        ProblemQueryValidator.validate(page, size, sortBy, direction);
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Specification<Problem> specification = ProblemSpecification.filterProblems(title, difficulty, topic, platform);
        Page<Problem> problems = problemRepository.findAll(specification, pageable);
        return problems.map(problem -> new ProblemResponseDto(problem.getId(), problem.getUsername(), problem.getTitle(),
                problem.getDifficulty(), problem.getTopic(), problem.getPlatform(), problem.getSolvedDate()));
    }
}