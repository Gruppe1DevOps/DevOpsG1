# Unit Tests

This directory contains unit tests for the Notes API application. Unit tests focus on testing individual components and functions in isolation.

## Overview

Unit tests are designed to test specific functionality of the API endpoints without external dependencies. They use a mock Express application that replicates the core functionality of the main application.

## Test Structure

### `notes.unit.test.js`

Contains unit tests for the Notes API endpoints:

- **GET /api/notes** - Tests retrieval of all notes
- **POST /api/notes** - Tests note creation with valid and invalid data
- **GET /api/notes/:id** - Tests retrieval of specific notes by ID

## Test Cases

### 1. Get All Notes

```javascript
test("should return all notes", async () => {
  // Tests that the API returns all notes with correct structure
  // Verifies response status, content-type, and data format
});
```

### 2. Create New Note

```javascript
test("should create a new note with valid content", async () => {
  // Tests successful note creation with valid data
  // Verifies that the created note has all required properties
});
```

### 3. Validation Testing

```javascript
test("should return 400 when creating note without content", async () => {
  // Tests error handling for invalid requests
  // Ensures proper error messages are returned
});
```

### 4. Get Specific Note

```javascript
test("should return specific note by id", async () => {
  // Tests retrieval of individual notes
  // Verifies correct note data is returned
});
```

### 5. Error Handling

```javascript
test("should return 404 for non-existent note", async () => {
  // Tests proper 404 responses for missing resources
});
```

## Running Unit Tests

### Run only unit tests:

```bash
npm run test:unit
```

### Run with coverage:

```bash
npm test
```

## Test Data

The unit tests use a minimal dataset with 2 predefined notes:

- Note 1: "HTML is easy" (important: true)
- Note 2: "Browser can execute only Javascript" (important: false)

## Dependencies

- **Jest**: Testing framework
- **Supertest**: HTTP assertion library for testing Express applications
- **Express**: Web framework (mocked for testing)

## Best Practices

1. **Isolation**: Each test is independent and doesn't affect others
2. **Mocking**: Uses a separate app instance to avoid side effects
3. **Coverage**: Tests both success and error scenarios
4. **Assertions**: Comprehensive checks for response structure and data
5. **Setup**: Fresh app instance created for each test using `beforeEach`

## Test Environment

- Node.js test environment
- In-memory data storage (no external database)
- Isolated Express application instance per test
