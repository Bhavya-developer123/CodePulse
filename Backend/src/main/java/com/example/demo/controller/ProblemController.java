package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Problem;

import com.example.demo.service.ProblemService;

@RestController
@RequestMapping("/problem")
public class ProblemController {
    @Autowired
    private ProblemService problemService;
    @PostMapping
    public Problem createProblem(@RequestBody Problem pro){
        return problemService.addProblem(pro);
    }
    @GetMapping
    public List<Problem> getProblems(){
        return problemService.getAllProblems();
    }
    @GetMapping("/{id}")
    public Problem getProblemById(@PathVariable int id){
        return problemService.getProblemById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteProblemById(@PathVariable int id){
        problemService.deleteProblem(id);;
        return "problem deleted successfully";
    }
    @PutMapping("/{id}")
    public Problem updateProblemById(@PathVariable int id,@RequestBody Problem pro){
        return problemService.updateProblem(id,pro);
        }
    }

