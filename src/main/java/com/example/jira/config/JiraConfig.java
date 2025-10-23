package com.example.jira.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "jira.api")
public class JiraConfig {

    @NotBlank
    private String baseUrl;

    @NotBlank
    private String apiToken;

    @NotBlank
    private String email;

    private int version = 3;
}
