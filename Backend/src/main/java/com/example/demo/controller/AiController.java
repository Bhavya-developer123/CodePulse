package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.AiTestRequest;
import com.example.demo.dto.AiTestResponse;
import com.example.demo.service.AiService;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/test")
    public AiTestResponse testAi(@RequestBody AiTestRequest request) {

        return aiService.testAi(request);
    }
}