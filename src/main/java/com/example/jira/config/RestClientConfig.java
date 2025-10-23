package com.example.jira.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;

@Configuration
public class RestClientConfig {

    @Bean
    public WebClient jiraWebClient(JiraConfig jiraConfig) {
        String auth = jiraConfig.getEmail() + ":" + jiraConfig.getApiToken();
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        return WebClient.builder()
                .baseUrl(jiraConfig.getBaseUrl() + "/rest/api/" + jiraConfig.getVersion())
                .defaultHeader("Authorization", "Basic " + encodedAuth)
                .defaultHeader("Accept", "application/json")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}
