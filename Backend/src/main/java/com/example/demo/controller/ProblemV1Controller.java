package com.example.demo.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProblemResponseDto;
import com.example.demo.entity.Problem;
import com.example.demo.service.ProblemService;

@RestController
@RequestMapping("/api/v1/problems")
public class ProblemV1Controller {

    private final ProblemService problemService;

    public ProblemV1Controller(ProblemService problemService) {
        this.problemService = problemService;
    }

    @PostMapping
    public ResponseEntity<Problem> createProblem(@RequestBody Problem problem) {
        return ResponseEntity.status(HttpStatus.CREATED).body(problemService.addProblem(problem));
    }

    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        return ResponseEntity.ok(problemService.getAllProblems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable int id) {
        return ResponseEntity.ok(problemService.getProblemById(id));
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("@authorizationService.isOwnerOrAdmin(authentication, #username)")
    public ResponseEntity<List<Problem>> getProblemsByUsername(@PathVariable("username") String username) {
        return ResponseEntity.ok(problemService.getByUsername(username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProblemById(@PathVariable int id) {
        problemService.deleteProblem(id);
        return ResponseEntity.ok("Problem deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Problem> updateProblemById(@PathVariable int id, @RequestBody Problem problem) {
        return ResponseEntity.ok(problemService.updateProblem(id, problem));
    }

    @GetMapping("/paged")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Page<Problem>> getProblems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(problemService.getProblems(page, size, sortBy, direction));
    }

    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Page<Problem>> filterProblems(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String platform,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(problemService.filterProblems(difficulty, topic, platform, page, size, sortBy, direction));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Page<Problem>> searchProblems(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(problemService.searchProblems(title, page, size, sortBy, direction));
    }

    @GetMapping("/query")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Page<ProblemResponseDto>> queryProblems(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String platform,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(problemService.queryProblems(title, difficulty, topic, platform, page, size, sortBy, direction));
    }
}