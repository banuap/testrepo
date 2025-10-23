package com.example.jira.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AllocationData {

    private String issueKey;
    private String summary;
    private String assignee;
    private String status;
    private String issueType;
    private TimeAllocation timeAllocation;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeAllocation {
        private String originalEstimate;
        private String remainingEstimate;
        private String timeSpent;
        private Integer originalEstimateSeconds;
        private Integer remainingEstimateSeconds;
        private Integer timeSpentSeconds;
    }
}
