package com.example.jira.service;

import com.example.jira.model.AllocationData;
import com.example.jira.model.JiraIssue;
import com.example.jira.model.JiraSearchResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JiraAllocationService {

    private final WebClient jiraWebClient;

    /**
     * Fetch allocation data for all issues from Jira
     * 
     * @return List of allocation data
     */
    public List<AllocationData> getAllAllocations() {
        return getAllAllocations(null, 0, 50);
    }

    /**
     * Fetch allocation data with JQL filter
     * 
     * @param jql JQL query string (optional)
     * @param startAt Start position for pagination
     * @param maxResults Maximum number of results to return
     * @return List of allocation data
     */
    public List<AllocationData> getAllAllocations(String jql, int startAt, int maxResults) {
        log.info("Fetching allocation data from Jira API - JQL: {}, startAt: {}, maxResults: {}", 
                jql, startAt, maxResults);

        try {
            String searchUrl = "/search";
            StringBuilder urlBuilder = new StringBuilder(searchUrl);
            urlBuilder.append("?startAt=").append(startAt);
            urlBuilder.append("&maxResults=").append(maxResults);
            urlBuilder.append("&fields=summary,assignee,status,issuetype,timetracking,created,updated");
            
            if (jql != null && !jql.trim().isEmpty()) {
                urlBuilder.append("&jql=").append(jql);
            }

            JiraSearchResponse response = jiraWebClient.get()
                    .uri(urlBuilder.toString())
                    .retrieve()
                    .bodyToMono(JiraSearchResponse.class)
                    .block();

            if (response == null || response.getIssues() == null) {
                log.warn("No issues found in Jira response");
                return new ArrayList<>();
            }

            log.info("Found {} issues out of {} total", 
                    response.getIssues().size(), response.getTotal());

            return response.getIssues().stream()
                    .map(this::mapToAllocationData)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Error fetching allocation data from Jira: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch allocation data from Jira", e);
        }
    }

    /**
     * Fetch allocation data for a specific issue
     * 
     * @param issueKey The issue key (e.g., "PROJ-123")
     * @return Allocation data for the issue
     */
    public AllocationData getAllocationByIssueKey(String issueKey) {
        log.info("Fetching allocation data for issue: {}", issueKey);

        try {
            JiraIssue issue = jiraWebClient.get()
                    .uri("/issue/{issueKey}?fields=summary,assignee,status,issuetype,timetracking,created,updated", 
                         issueKey)
                    .retrieve()
                    .bodyToMono(JiraIssue.class)
                    .block();

            if (issue == null) {
                log.warn("Issue not found: {}", issueKey);
                throw new RuntimeException("Issue not found: " + issueKey);
            }

            return mapToAllocationData(issue);

        } catch (Exception e) {
            log.error("Error fetching allocation data for issue {}: {}", issueKey, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch allocation data for issue: " + issueKey, e);
        }
    }

    /**
     * Map JiraIssue to AllocationData
     */
    private AllocationData mapToAllocationData(JiraIssue issue) {
        AllocationData allocation = new AllocationData();
        allocation.setIssueKey(issue.getKey());

        if (issue.getFields() != null) {
            JiraIssue.JiraIssueFields fields = issue.getFields();
            
            allocation.setSummary(fields.getSummary());
            
            if (fields.getAssignee() != null) {
                allocation.setAssignee(fields.getAssignee().getDisplayName());
            }
            
            if (fields.getStatus() != null) {
                allocation.setStatus(fields.getStatus().getName());
            }
            
            if (fields.getIssuetype() != null) {
                allocation.setIssueType(fields.getIssuetype().getName());
            }

            if (fields.getTimeTracking() != null) {
                JiraIssue.JiraIssueFields.TimeTracking tt = fields.getTimeTracking();
                AllocationData.TimeAllocation timeAllocation = new AllocationData.TimeAllocation(
                        tt.getOriginalEstimate(),
                        tt.getRemainingEstimate(),
                        tt.getTimeSpent(),
                        tt.getOriginalEstimateSeconds(),
                        tt.getRemainingEstimateSeconds(),
                        tt.getTimeSpentSeconds()
                );
                allocation.setTimeAllocation(timeAllocation);
            }
        }

        return allocation;
    }
}
