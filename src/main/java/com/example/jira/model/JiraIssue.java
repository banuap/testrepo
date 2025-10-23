package com.example.jira.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraIssue {

    private String id;
    private String key;
    private String self;

    @JsonProperty("fields")
    private JiraIssueFields fields;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class JiraIssueFields {
        private String summary;
        private JiraIssueType issuetype;
        private JiraStatus status;
        private JiraUser assignee;
        private String created;
        private String updated;

        @JsonProperty("timetracking")
        private TimeTracking timeTracking;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class JiraIssueType {
            private String name;
            private String id;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class JiraStatus {
            private String name;
            private String id;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class JiraUser {
            private String accountId;
            private String displayName;
            private String emailAddress;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class TimeTracking {
            private String originalEstimate;
            private String remainingEstimate;
            private String timeSpent;
            private Integer originalEstimateSeconds;
            private Integer remainingEstimateSeconds;
            private Integer timeSpentSeconds;
        }
    }
}
