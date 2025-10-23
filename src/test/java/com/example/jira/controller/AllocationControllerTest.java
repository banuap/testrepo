package com.example.jira.controller;

import com.example.jira.model.AllocationData;
import com.example.jira.service.JiraAllocationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AllocationController.class)
class AllocationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JiraAllocationService allocationService;

    @Test
    void testGetAllAllocations() throws Exception {
        // Given
        AllocationData allocation1 = new AllocationData();
        allocation1.setIssueKey("PROJ-1");
        allocation1.setSummary("Test Issue 1");
        allocation1.setAssignee("John Doe");
        allocation1.setStatus("In Progress");

        AllocationData allocation2 = new AllocationData();
        allocation2.setIssueKey("PROJ-2");
        allocation2.setSummary("Test Issue 2");
        allocation2.setAssignee("Jane Smith");
        allocation2.setStatus("Done");

        List<AllocationData> allocations = Arrays.asList(allocation1, allocation2);

        when(allocationService.getAllAllocations(isNull(), eq(0), eq(50)))
                .thenReturn(allocations);

        // When & Then
        mockMvc.perform(get("/api/allocations")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].issueKey").value("PROJ-1"))
                .andExpect(jsonPath("$[0].summary").value("Test Issue 1"))
                .andExpect(jsonPath("$[1].issueKey").value("PROJ-2"));
    }

    @Test
    void testGetAllocationByIssueKey() throws Exception {
        // Given
        AllocationData allocation = new AllocationData();
        allocation.setIssueKey("PROJ-1");
        allocation.setSummary("Test Issue");
        allocation.setAssignee("John Doe");
        allocation.setStatus("In Progress");

        when(allocationService.getAllocationByIssueKey("PROJ-1"))
                .thenReturn(allocation);

        // When & Then
        mockMvc.perform(get("/api/allocations/PROJ-1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.issueKey").value("PROJ-1"))
                .andExpect(jsonPath("$.summary").value("Test Issue"))
                .andExpect(jsonPath("$.assignee").value("John Doe"));
    }
}
