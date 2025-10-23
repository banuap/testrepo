package com.example.jira.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraSearchResponse {

    private Integer startAt;
    private Integer maxResults;
    private Integer total;
    private List<JiraIssue> issues;
}
