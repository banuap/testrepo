package com.example.jira.service;

import com.example.jira.model.AllocationData;
import com.example.jira.model.JiraIssue;
import com.example.jira.model.JiraSearchResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JiraAllocationServiceTest {

    @Mock
    private WebClient jiraWebClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    private JiraAllocationService service;

    @BeforeEach
    void setUp() {
        service = new JiraAllocationService(jiraWebClient);
    }

    @Test
    void testGetAllAllocations_Success() {
        // Given
        JiraSearchResponse mockResponse = new JiraSearchResponse();
        mockResponse.setTotal(2);
        mockResponse.setStartAt(0);
        mockResponse.setMaxResults(50);

        JiraIssue issue1 = createMockIssue("PROJ-1", "Test Issue 1", "John Doe");
        JiraIssue issue2 = createMockIssue("PROJ-2", "Test Issue 2", "Jane Smith");
        mockResponse.setIssues(Arrays.asList(issue1, issue2));

        when(jiraWebClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(JiraSearchResponse.class)).thenReturn(Mono.just(mockResponse));

        // When
        List<AllocationData> result = service.getAllAllocations();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("PROJ-1", result.get(0).getIssueKey());
        assertEquals("Test Issue 1", result.get(0).getSummary());
        assertEquals("John Doe", result.get(0).getAssignee());
    }

    @Test
    void testGetAllocationByIssueKey_Success() {
        // Given
        JiraIssue mockIssue = createMockIssue("PROJ-1", "Test Issue", "John Doe");

        when(jiraWebClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString(), (Object[]) any())).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(JiraIssue.class)).thenReturn(Mono.just(mockIssue));

        // When
        AllocationData result = service.getAllocationByIssueKey("PROJ-1");

        // Then
        assertNotNull(result);
        assertEquals("PROJ-1", result.getIssueKey());
        assertEquals("Test Issue", result.getSummary());
        assertEquals("John Doe", result.getAssignee());
    }

    private JiraIssue createMockIssue(String key, String summary, String assigneeName) {
        JiraIssue issue = new JiraIssue();
        issue.setKey(key);
        issue.setId("12345");

        JiraIssue.JiraIssueFields fields = new JiraIssue.JiraIssueFields();
        fields.setSummary(summary);

        JiraIssue.JiraIssueFields.JiraUser assignee = new JiraIssue.JiraIssueFields.JiraUser();
        assignee.setDisplayName(assigneeName);
        assignee.setAccountId("abc123");
        fields.setAssignee(assignee);

        JiraIssue.JiraIssueFields.JiraStatus status = new JiraIssue.JiraIssueFields.JiraStatus();
        status.setName("In Progress");
        status.setId("3");
        fields.setStatus(status);

        JiraIssue.JiraIssueFields.JiraIssueType issueType = new JiraIssue.JiraIssueFields.JiraIssueType();
        issueType.setName("Task");
        issueType.setId("10001");
        fields.setIssuetype(issueType);

        issue.setFields(fields);
        return issue;
    }
}
