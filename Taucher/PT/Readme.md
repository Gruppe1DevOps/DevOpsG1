# CI/CD Pipeline Documentation

This PT part answers the tasks in [Aufgaben](./Aufgaben.pdf). The structure of the project subfolder will be found next and afertwards you find a table of contents with the explanation of the different parts that are used to fulfil the requirements of the tasks.

---

## 📁 Projektstruktur

```
├── PT/
│   ├── Code
│        ├── test
│              ├── integration                        # integration tests
│                     ├── api.integration.test.js        # integration test for API endpoints
│              ├── unit                               # unit tests
│                     ├── notes.unit.test.js             # unit tests for notes API
│   ├── eslintr.js                              # ESLint configuration file
│   ├── Dockerfile                              # Dockerfile for containerization
│   ├── index.js                                # main application entry point
│   ├── package-lock.json                       # npm package lock file
│   ├── package.json                            # npm package file
└── README.md                                   # 🔴 You are here
```

## Table of Contents

1. [Pipeline Architecture Overview](#pipeline-architecture-overview)
2. [Component Deep Dive](#component-deep-dive)
   - [GitHub Actions Workflows](#github-actions-workflows)
   - [SonarQube Integration](#sonarqube-integration)
   - [Dependabot Configuration](#dependabot-configuration)
   - [Testing Strategy](#testing-strategy)
   - [Docker Build & Deployment](#docker-build--deployment)
3. [Prerequisites & Setup](#prerequisites--setup)
4. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
5. [Conclusion](#conclusion)

---

## Pipeline Architecture Overview

### Two Separate Workflow Files

Our CI/CD pipeline is split into two focused workflow files for better separation of concerns:

#### 1. Pull Request Workflow (`pr-checks.yml`)

**Triggers**: Pull requests to main branch

**Purpose**: Fast quality feedback and validation

1. **Quality Assurance Phase**: ESLint, unit tests, integration tests
2. **Coverage Analysis**: Test coverage reporting
3. **Static Analysis**: SonarCloud code quality checks
4. **No Deployment**: Focuses only on validation

#### 2. Main Branch Workflow (`ci-build.yml`)

**Triggers**: Push to main branch

**Purpose**: Full CI/CD pipeline with deployment

1. **Quality Assurance Phase**: Complete testing and linting
2. **Static Analysis**: SonarCloud integration
3. **Build Phase**: Docker containerization
4. **Deployment Phase**: Container registry push with versioning

### Key Components Integration

- **GitHub Actions**: Two separate workflows for different purposes
- **SonarCloud**: Static code analysis and quality gates
- **Dependabot**: Automated dependency management
- **Jest**: Unit and integration testing framework
- **Docker**: Containerization and deployment (main branch only)
- **ESLint**: Code style and syntax checking

---

## Component Deep Dive

### GitHub Actions Workflows

Our CI/CD pipeline uses two separate GitHub Actions workflows:

#### Workflow 1: PR Quality Checks (`pr-checks.yml`)

```yaml
name: PR Quality Checks

permissions:
  contents: read

on:
  pull_request:
    branches:
      - main
    paths:
      - "Taucher/PT/Code/**"

jobs:
  quality-checks:
    name: Quality Gates and Testing
    runs-on: ubuntu-latest
```

#### Workflow 2: Main Branch CI/CD (`ci-build.yml`)

```yaml
name: Main Branch CI/CD

permissions:
  contents: read
  packages: write

on:
  push:
    branches:
      - main
    paths:
      - "Taucher/PT/Code/**"


jobs:
  test-and-build:
    name: Test, Build and Deploy
    runs-on: ubuntu-latest
```

### SonarQube Integration

We used SonarQube Cloud in the free version. For this we needed to make a GitHub organisation with only publicly available repositories. We followed the instruction [SonarQube Cloud - Getting started with GitHub](https://docs.sonarsource.com/sonarqube-cloud/getting-started/github/).

#### Configuration Overview

```properties
# sonar-project.properties
sonar.projectKey=Gruppe1DevOps_DevOpsG1
sonar.organization=gruppe1devops
sonar.projectName=DevOps Group 1 - Note App
sonar.projectVersion=1.0.0

# Source code location
sonar.sources=Taucher/PT/Code
sonar.exclusions=**/node_modules/**,**/coverage/**,**/tests/**,**/*.test.js,**/*.spec.js

# Test files
sonar.tests=Taucher/PT/Code/tests/
sonar.test.inclusions=**/*.test.js,**/*.spec.js

# Coverage
sonar.javascript.lcov.reportPaths=Taucher/PT/Code/coverage/lcov.info

# Language
sonar.sourceEncoding=UTF-8

# Quality Gates
sonar.qualitygate.wait=true
```

**Integration Points:**

- **PR Workflow**: Quality gate validation for pull requests
- **Main Workflow**: Complete analysis for main branch tracking
- **Quality Gates**: Blocking gates for code quality standards

### Dependabot Configuration

#### Automated Dependency Management

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/Taucher/PT/Code"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "pprugger"
    assignees:
      - "pprugger"
    commit-message:
      prefix: "chore"
      include: "scope"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

**Features:**

- **Weekly Updates**: Scheduled dependency updates every Monday
- **Dual Ecosystem**: Both npm packages and GitHub Actions
- **Review Assignment**: Automatic reviewer and assignee assignment
- **Commit Conventions**: Consistent commit message formatting

### Testing Strategy

#### Unit Tests (`notesService.test.js`)

**File**: `tests/unit/notesService.test.js`

**Test Coverage:**
- **Business Logic Testing**
  - Note retrieval (all notes and by ID)
  - Note creation with validation
  - Note deletion
  - ID generation
  - Error handling
  - Input validation
- **Root Endpoint Testing**
  - Welcome message verification

**Key Features:**
- Tests business logic in isolation
- Uses `resetNotes()` for test isolation
- No external dependencies
- Comprehensive input validation testing

#### Integration Tests (`api.integration.test.js`)

**File**: `tests/integration/api.integration.test.js`

**Test Coverage:**
- **Complete CRUD Workflow**
  - Initial state verification
  - Note creation
  - Note retrieval (all and by ID)
  - Note deletion
  - State verification
- **Concurrent Request Handling**
  - Multiple simultaneous operations
  - Data consistency verification
- **Error Handling Across Layers**
  - Service errors
  - Not found scenarios
  - Invalid request handling

**Key Features:**
- Uses actual backend implementation
- Tests component interactions
- Verifies complete workflows
- Tests error propagation

#### Test Organization

Our tests follow a clear separation of concerns:

1. **Unit Tests** (`notesService.test.js`):
   - Focus on business logic in isolation
   - Test individual functions
   - No external dependencies
   - Located in `tests/unit/`

2. **Integration Tests** (`api.integration.test.js`):
   - Test component interactions
   - Use real backend implementation
   - Test complete workflows
   - Located in `tests/integration/`

#### Test Execution in Workflows

```yaml
- name: Run ESLint (Quality Gate)
- name: Run Unit Tests
- name: Run Integration Tests
- name: Run All Tests with Coverage
```

### Docker Build & Deployment

#### Dockerfile Strategy

```dockerfile
# Use official Node.js runtime as base image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs \
&& adduser -S nodeuser -u 1001 \
&& chown -R nodeuser:nodejs /app

USER nodeuser

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["node", "-e", "require('http').get('http://localhost:3001/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"]

# Start application
CMD ["npm", "start"]
```

#### Container Registry Integration

**Multi-tag Strategy:**

```yaml
tags: |
  type=ref,event=branch
  type=sha,prefix={{branch}}-
  type=raw,value=latest,enable={{is_default_branch}}
  type=raw,value=v1.0.{{run_number}}
```

**Generated Tags:**

- `latest` - Latest stable version
- `main-<sha>` - Commit-specific builds
- `v1.0.<run_number>` - Semantic versioning

---

## Prerequisites & Setup

### Required Tools & Versions

```bash
# Node.js Environment
node --version    # >= 20.0.0
npm --version     # >= 8.0.0

# Docker Environment
docker --version  # >= 20.0.0

# Git Configuration
git --version     # >= 2.30.0
```

### Environment Variables & Secrets

```bash
# GitHub Secrets Configuration
SONAR_TOKEN=your_sonarcloud_token
GHCR_TOKEN=your_github_container_registry_token
```

## Common Pitfalls & Solutions

### 1. Workflow Separation Issues

#### Problem: Duplicate Job Execution

```
Both workflows running on same event
```

#### Solution:

Ensure proper trigger separation:

```yaml
# pr-checks.yml
on:
  pull_request:
    branches:
      - main
    paths:
      - "Taucher/PT/Code/**"

# Only run on changes under "Taucher"

# ci-build.yml
on:
  push:
    branches:
      - main
    paths:
      - "Taucher/PT/Code/**"

# Both only run on changes under "Taucher/PT/Code"
```

### 2. Permission Issues

#### Problem: Container Registry Access Denied

```
Error: Permission denied to ghcr.io
```

#### Solution:

```yaml
# Only in ci-build.yml
permissions:
  contents: read
  packages: write

# In pr-checks.yml (minimal)
permissions:
  contents: read
```

### 3. SonarCloud Integration Issues

#### Problem: Coverage Report Not Found

```
WARN: No coverage report found
```

#### Solution:

Ensure coverage is generated before SonarCloud scan:

```yaml
- name: Run All Tests with Coverage
  run: npm test
  working-directory: Taucher/PT/Code

- name: SonarCloud Scan
  uses: SonarSource/sonarqube-scan-action@master
```

### 4. Docker Build Context Issues

#### Problem: Build Context Not Found

```
ERROR: failed to read dockerfile
```

#### Solution:

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v6
  with:
    context: Taucher/PT/Code # Correct context path
    push: true
```

---

## Conclusion

This CI/CD Pipeline implements a modern two-workflow architecture that separates concerns between pull request validation and main branch deployment. The pipeline includes:

**Quality Assurance:**

- ESLint for code style enforcement
- Jest for comprehensive testing (5 unit + 2 integration tests)
- SonarCloud for static code analysis

**Automation:**

- Dependabot for dependency management
- Automated Docker builds and deployments
- Multi-tag container versioning

**Security:**

- Minimal permissions per workflow
- Non-root container execution
- Automated security scanning

The separation into `pr-checks.yml` and `ci-build.yml` provides fast feedback for developers while ensuring robust deployment processes for the main branch.

---
