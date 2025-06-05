# Note App - DevOps Implementation

A simple Node.js Express API for managing notes with comprehensive DevOps pipeline.

## Features

- RESTful API for note management (CRUD operations)
- Automated CI/CD pipeline
- Docker containerization
- Comprehensive testing (Unit & Integration)
- Code quality checks with ESLint
- Static code analysis with SonarCloud
- Automated dependency updates

## API Endpoints

- `GET /` - Welcome message
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `DELETE /api/notes/:id` - Delete note

## DevOps Implementation

### 1. CI/CD Pipeline (GitHub Actions)

The pipeline runs on:

- Every push to `main` branch
- Every pull request to `main` branch

**Pipeline stages:**

1. **Test Stage**: Runs on Node.js 18.x and 20.x

   - Install dependencies
   - Run ESLint (Quality Gate)
   - Run unit tests
   - Run integration tests
   - Generate test coverage
   - SonarCloud static analysis

2. **Build & Push Stage**: Only on push to main
   - Build Docker image
   - Tag with version number and latest
   - Push to Docker registry

### 2. Docker Containerization

- **Base Image**: `node:18-alpine` (lightweight)
- **Security**: Non-root user execution
- **Health Check**: Built-in health monitoring
- **Multi-stage**: Optimized for production

**Build and run locally:**

```bash
docker build -t noteapp .
docker run -p 3001:3001 noteapp
```

**Pull and run from GitHub Packages:**

```bash
docker pull ghcr.io/your-username/your-repo/noteapp:latest
docker run -p 3001:3001 ghcr.io/your-username/your-repo/noteapp:latest
```

### 3. Testing Strategy

**Unit Tests (5 tests):**

- Get all notes
- Create note with valid content
- Reject note without content
- Get specific note by ID
- Handle non-existent note

**Integration Tests (2 tests):**

- Complete CRUD workflow
- Concurrent request handling

**Run tests:**

```bash
npm test              # All tests with coverage
npm run test:unit     # Unit tests only
npm run test:integration  # Integration tests only
```

### 4. Code Quality

**ESLint Configuration:**

- Enforces consistent code style
- Catches potential errors
- Configured as Quality Gate in CI

**Run linting:**

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

### 5. Static Code Analysis

**SonarCloud Integration:**

- Code quality metrics
- Security vulnerability detection
- Code coverage analysis
- Technical debt assessment

### 6. Dependency Management

**Dependabot Configuration:**

- Weekly dependency updates
- Automatic security updates
- GitHub Actions updates
- Pull request automation

## Setup Instructions

### Prerequisites

- Node.js 18+
- Docker
- GitHub account

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Required GitHub Secrets

For the CI/CD pipeline to work, configure these secrets in your GitHub repository:

- `GHCR_TOKEN` - Personal access token for GitHub Container Registry
- `SONAR_TOKEN` - SonarCloud token

### SonarCloud Setup

1. Create account at sonarcloud.io
2. Import your GitHub repository
3. Update `sonar-project.properties` with your organization
4. Add `SONAR_TOKEN` to GitHub secrets

## Quality Gates

The pipeline enforces these quality gates:

- ✅ All tests must pass
- ✅ ESLint checks must pass
- ✅ SonarCloud quality gate must pass
- ✅ Code coverage threshold

## Monitoring

- **Health Check**: `/` endpoint for container health
- **Logs**: Structured logging with timestamps
- **Metrics**: Test coverage and code quality metrics

## Version Management

Docker images are tagged and pushed to GitHub Packages with:

- `latest` - Latest stable version
- `main-<sha>` - Commit-specific builds
- `v1.0.<build-number>` - Semantic versioning

Images are available at: `ghcr.io/your-username/your-repo/noteapp:tag`

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Ensure all quality gates pass
5. Submit pull request

The CI pipeline will automatically:

- Run all tests
- Check code quality
- Verify Docker build
- Provide feedback on PR
