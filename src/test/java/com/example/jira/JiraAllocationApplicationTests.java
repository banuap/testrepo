package com.example.jira;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "jira.api.base-url=https://test.atlassian.net",
    "jira.api.api-token=test-token",
    "jira.api.email=test@example.com"
})
class JiraAllocationApplicationTests {

    @Test
    void contextLoads() {
        // Test that the application context loads successfully
    }
}
