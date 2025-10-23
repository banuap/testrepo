# Quick Start Guide - Jira Allocation API

This guide will help you get the Jira Allocation API up and running quickly.

## Prerequisites

- Java 17 or higher installed
- Maven 3.6+ installed
- A Jira Cloud account with API access
- Jira API token (see steps below)

## Step 1: Generate Jira API Token

1. Log in to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click "Create API token"
3. Give it a label (e.g., "Jira Allocation API")
4. Copy the generated token (you won't be able to see it again)

## Step 2: Configure the Application

Option A: Using Environment Variables (Recommended for production)
```bash
export JIRA_API_BASE_URL=https://your-domain.atlassian.net
export JIRA_API_TOKEN=your-api-token
export JIRA_EMAIL=your-email@example.com
```

Option B: Using application.yml
```bash
cp application.yml.example src/main/resources/application.yml
# Edit src/main/resources/application.yml with your credentials
```

## Step 3: Build the Application

```bash
mvn clean install
```

## Step 4: Run the Application

```bash
mvn spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/jira-allocation-1.0.0.jar
```

The application will start on http://localhost:8080

## Step 5: Test the API

### Get all allocations
```bash
curl http://localhost:8080/api/allocations
```

### Get all allocations with JQL filter
```bash
curl "http://localhost:8080/api/allocations?jql=project=MYPROJECT"
```

### Get allocation for a specific issue
```bash
curl http://localhost:8080/api/allocations/PROJ-123
```

### Get allocations with pagination
```bash
curl "http://localhost:8080/api/allocations?startAt=0&maxResults=10"
```

## Example Response

```json
[
  {
    "issueKey": "PROJ-123",
    "summary": "Implement user authentication",
    "assignee": "John Doe",
    "status": "In Progress",
    "issueType": "Task",
    "timeAllocation": {
      "originalEstimate": "8h",
      "remainingEstimate": "4h",
      "timeSpent": "4h",
      "originalEstimateSeconds": 28800,
      "remainingEstimateSeconds": 14400,
      "timeSpentSeconds": 14400
    }
  }
]
```

## Common JQL Queries

- All issues in a project: `project=MYPROJECT`
- Issues assigned to you: `assignee=currentUser()`
- Issues in progress: `status="In Progress"`
- Issues updated recently: `updated >= -7d`
- Combine filters: `project=MYPROJECT AND status="In Progress" AND assignee=currentUser()`

## Troubleshooting

### 401 Unauthorized
- Verify your API token is correct
- Ensure your email matches your Jira account
- Check if the API token has the necessary permissions

### 404 Not Found
- Verify the base URL is correct (should end with .atlassian.net)
- Check if the issue key exists in your Jira instance

### Connection Timeout
- Check your internet connection
- Verify the Jira instance URL is accessible
- Check if there are any firewall restrictions

## API Documentation

For more details on Jira REST API v3, visit:
https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/

## Next Steps

- Explore additional Jira fields by modifying the `JiraIssue` model
- Add custom endpoints for specific business needs
- Implement caching for better performance
- Add authentication/authorization to the API endpoints
- Deploy to production environment
