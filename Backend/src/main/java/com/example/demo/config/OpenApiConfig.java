package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI codePulseOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("CodePulse API")
                        .version("1.0")
                        .description(
                                "REST API for the CodePulse coding analytics platform"
                        ));
    }
}