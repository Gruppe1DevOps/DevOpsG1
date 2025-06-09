# Integration Tests

This directory contains integration tests for the Notes API application. Integration tests verify that different components work together correctly and test complete user workflows.

## Overview

Integration tests simulate real-world usage scenarios by testing complete API workflows from start to finish. They verify that all components of the application work together seamlessly, including request handling, data processing, and response generation.


## Test Data

Integration tests use a complete dataset with 3 predefined notes:

- Note 1: "HTML is easy" (important: true)
- Note 2: "Browser can execute only Javascript" (important: false)
- Note 3: "GET and POST are the most important methods of HTTP protocol" (important: true)

## Running Integration Tests

### Run only integration tests:

```bash
npm run test:integration
```

### Run all tests including integration:

```bash
npm test
```

## Key Features Tested

### 1. **Data Persistence**

- Verifies that created notes persist across requests
- Ensures deleted notes are properly removed
- Validates data integrity throughout operations

### 2. **API Consistency**

- Tests that all endpoints work together correctly
- Verifies consistent response formats
- Ensures proper HTTP status codes

### 3. **Concurrency Handling**

- Tests multiple simultaneous requests
- Verifies unique ID generation under load
- Ensures no data corruption with concurrent access

### 4. **Error Scenarios**

- Tests 404 responses for deleted/non-existent notes
- Verifies proper error handling in workflows
- Ensures graceful failure handling

## Test Workflow Example

```javascript
// 1. Initial State Check
GET /api/notes → Verify 3 initial notes

// 2. Create New Note
POST /api/notes → Create "Integration testing is crucial"

// 3. Verify Creation
GET /api/notes → Verify 4 total notes
GET /api/notes/:id → Verify specific note exists

// 4. Cleanup
DELETE /api/notes/:id → Remove created note

// 5. Final Verification
GET /api/notes/:id → Verify 404 response
GET /api/notes → Verify back to 3 notes
```

## Dependencies

- **Jest**: Testing framework with async/await support
- **Supertest**: HTTP testing library for Express applications
- **Express**: Full Express application instance
- **Promise.all**: For concurrent request testing

## Best Practices

1. **Complete Workflows**: Tests entire user journeys, not just individual endpoints
2. **State Management**: Proper setup and teardown to maintain test isolation
3. **Concurrency Testing**: Validates application behavior under concurrent load
4. **Data Verification**: Comprehensive checks for data integrity
5. **Error Scenarios**: Tests both success and failure paths
6. **Realistic Data**: Uses realistic test data that mirrors production scenarios

## Performance Considerations

- Tests concurrent request handling to ensure scalability
- Verifies response times are reasonable
- Checks for memory leaks in long-running operations
- Validates proper resource cleanup

## Coverage Areas

- ✅ **API Endpoints**: All CRUD operations
- ✅ **Data Flow**: Complete request-response cycles
- ✅ **Concurrency**: Multiple simultaneous operations
- ✅ **Error Handling**: Various failure scenarios
- ✅ **State Management**: Data consistency across operations
- ✅ **ID Generation**: Unique identifier creation under load
