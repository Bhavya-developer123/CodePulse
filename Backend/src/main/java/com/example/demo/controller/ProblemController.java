package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProblemResponseDto;
import com.example.demo.entity.Problem;
import com.example.demo.service.ProblemService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
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
    @GetMapping("/user/{username}")
    @PreAuthorize("@authorizationService.isOwnerOrAdmin(authentication,#username)")
    public List<Problem> getProblemsByUsername(@PathVariable("username") String username){
        return problemService.getByUsername(username);
    }
    @DeleteMapping("/{id}")
    public String deleteProblemById(@PathVariable int id){
        problemService.deleteProblem(id);
        return "problem deleted successfully";
    }
    @PutMapping("/{id}")
    public Problem updateProblemById(@PathVariable int id,@RequestBody Problem pro){
        return problemService.updateProblem(id,pro);
    }
    @GetMapping("/paged")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Page<Problem>>getProblems(@RequestParam(defaultValue="0")int page,
    @RequestParam(defaultValue="5")int size,
    @RequestParam(defaultValue="id")String sortBy,
    @RequestParam(defaultValue="asc")String direction){
    return ResponseEntity.ok(problemService.getProblems(page,size,sortBy,direction));}
    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
public ResponseEntity<Page<Problem>> filterProblems(
        @RequestParam(required = false) String difficulty,
        @RequestParam(required = false) String topic,
        @RequestParam(required = false) String platform,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String direction){
    return ResponseEntity.ok(problemService.filterProblems(difficulty,topic,platform,page,size,sortBy,direction));
}
@GetMapping("/search")
@PreAuthorize("hasAnyRole('USER','ADMIN')")
public ResponseEntity<Page<Problem>> searchProblems(
        @RequestParam String title,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String direction) {
    return ResponseEntity.ok(problemService.searchProblems(title,page,size,sortBy,direction));
}
@GetMapping("/query")
@PreAuthorize("hasAnyRole('USER','ADMIN')")
public ResponseEntity<Page<ProblemResponseDto>> queryProblems(
        @RequestParam(required = false)
        String title,
        @RequestParam(required = false)
        String difficulty,
        @RequestParam(required = false)
        String topic,
        @RequestParam(required = false)
        String platform,
        @RequestParam(defaultValue = "0")
        int page,
        @RequestParam(defaultValue = "5")
        int size,
        @RequestParam(defaultValue = "id")
        String sortBy,
        @RequestParam(defaultValue = "asc")
        String direction) {
    return ResponseEntity.ok(problemService.queryProblems(title,difficulty,topic,platform,page,size,sortBy,direction));
}
}
