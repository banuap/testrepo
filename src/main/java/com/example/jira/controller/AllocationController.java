package com.example.jira.controller;

import com.example.jira.model.AllocationData;
import com.example.jira.service.JiraAllocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/allocations")
@RequiredArgsConstructor
public class AllocationController {

    private final JiraAllocationService allocationService;

    /**
     * Get all allocations
     * 
     * @param jql Optional JQL query to filter issues
     * @param startAt Start position for pagination (default: 0)
     * @param maxResults Maximum number of results (default: 50)
     * @return List of allocation data
     */
    @GetMapping
    public ResponseEntity<List<AllocationData>> getAllAllocations(
            @RequestParam(required = false) String jql,
            @RequestParam(defaultValue = "0") int startAt,
            @RequestParam(defaultValue = "50") int maxResults) {
        
        log.info("GET /api/allocations - jql: {}, startAt: {}, maxResults: {}", jql, startAt, maxResults);
        
        try {
            List<AllocationData> allocations = allocationService.getAllAllocations(jql, startAt, maxResults);
            return ResponseEntity.ok(allocations);
        } catch (Exception e) {
            log.error("Error fetching allocations: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get allocation data for a specific issue
     * 
     * @param issueKey The issue key (e.g., "PROJ-123")
     * @return Allocation data for the issue
     */
    @GetMapping("/{issueKey}")
    public ResponseEntity<AllocationData> getAllocationByIssueKey(@PathVariable String issueKey) {
        log.info("GET /api/allocations/{}", issueKey);
        
        try {
            AllocationData allocation = allocationService.getAllocationByIssueKey(issueKey);
            return ResponseEntity.ok(allocation);
        } catch (Exception e) {
            log.error("Error fetching allocation for issue {}: {}", issueKey, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
