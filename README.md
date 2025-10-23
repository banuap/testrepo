# Jira Allocation API

A Spring Boot application that integrates with Jira REST API v3 to fetch allocation data from Jira issues.

## Features

- Fetch allocation data from Jira using REST API v3
- Support for JQL queries to filter issues
- Pagination support for large datasets
- Retrieve time tracking information (estimates, time spent)
- RESTful API endpoints for integration

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Jira Cloud account with API access

## Configuration

Create or update `src/main/resources/application.yml` with your Jira credentials:

```yaml
jira:
  api:
    base-url: https://your-domain.atlassian.net
    api-token: your-api-token
    email: your-email@example.com
```

Or set environment variables:
- `JIRA_API_BASE_URL`
- `JIRA_API_TOKEN`
- `JIRA_EMAIL`

## Building the Application

```bash
mvn clean install
```

## Running the Application

```bash
mvn spring-boot:run
```

The application will start on port 8080 by default.

## API Endpoints

### Get All Allocations

```
GET /api/allocations?jql=<optional-jql>&startAt=0&maxResults=50
```

**Query Parameters:**
- `jql` (optional): JQL query to filter issues
- `startAt` (optional): Start position for pagination (default: 0)
- `maxResults` (optional): Maximum number of results (default: 50)

**Example:**
```bash
curl http://localhost:8080/api/allocations
```

### Get Allocation by Issue Key

```
GET /api/allocations/{issueKey}
```

**Example:**
```bash
curl http://localhost:8080/api/allocations/PROJ-123
```

## Response Format

```json
{
  "issueKey": "PROJ-123",
  "summary": "Issue summary",
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
```

## Running Tests

```bash
mvn test
```

## Technology Stack

- Spring Boot 3.1.5
- Java 17
- Maven
- Lombok
- JUnit 5 & Mockito

## Jira REST API v3

This application uses Jira REST API v3 for all operations. Key endpoints used:
- `/rest/api/3/search` - Search for issues
- `/rest/api/3/issue/{issueKey}` - Get specific issue details
