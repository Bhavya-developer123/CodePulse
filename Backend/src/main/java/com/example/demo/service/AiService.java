package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.example.demo.dto.AiTestRequest;
import com.example.demo.dto.AiTestResponse;

@Service
public class AiService {

    private final RestClient restClient;

    public AiService(RestClient.Builder restClientBuilder,@Value("${ai.service.url}") String aiServiceUrl) {
this.restClient = restClientBuilder.baseUrl(aiServiceUrl).build();
    }

    public AiTestResponse testAi(AiTestRequest request) {
        return restClient.post().uri("/ai/test").body(request).retrieve().body(AiTestResponse.class);
    }
}