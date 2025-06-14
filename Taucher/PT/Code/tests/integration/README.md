# Integration Tests

This directory contains integration tests for the Notes API application. Integration tests verify that different components work together correctly and test complete user workflows.

## Overview

Integration tests use the actual backend implementation from `index.js` to verify that all components work together seamlessly. They test complete workflows and verify the interaction between:
- Express routes and middleware
- Notes service business logic
- Request/response handling
- Error handling across layers

## Test Structure

### 1. Complete CRUD Workflow
Tests the entire lifecycle of a note:
1. Initial state verification
2. Note creation
3. Note retrieval (all and by ID)
4. Note deletion
5. State verification

### 2. Concurrent Request Handling
Tests multiple simultaneous operations:
- Creates 5 notes concurrently
- Verifies all requests succeed
- Checks unique ID generation
- Ensures data consistency

### 3. Error Handling Across Layers
Tests error propagation through the application:
- Service errors
- Not found scenarios
- Invalid request handling

## Running Integration Tests

### Run only integration tests:
```bash
npm run test:integration
```

### Run all tests including integration:
```bash
npm test
```

## Key Features

1. **Uses Real Backend**
   - Tests against actual `index.js` implementation
   - No mocked components
   - Real request/response flow

2. **Complete Workflows**
   - Tests entire user journeys
   - Verifies data persistence
   - Checks state management

3. **Concurrency Testing**
   - Multiple simultaneous requests
   - Data consistency verification
   - Race condition prevention

4. **Error Handling**
   - Service error propagation
   - HTTP status code verification
   - Error message validation

## Dependencies

- **Jest**: Testing framework
- **Supertest**: HTTP testing library
- **Express**: Full application instance
- **Promise.all**: Concurrent request testing

## Best Practices

1. **Use Real Implementation**
   - Test against actual backend
   - No code duplication
   - Real-world scenarios

2. **Complete Workflows**
   - Test entire user journeys
   - Verify data persistence
   - Check state management

3. **Error Scenarios**
   - Test error propagation
   - Verify status codes
   - Check error messages

4. **Concurrency**
   - Test simultaneous operations
   - Verify data consistency
   - Check unique ID generation

## Coverage Areas

- ✅ **API Endpoints**: All CRUD operations
- ✅ **Data Flow**: Complete request-response cycles
- ✅ **Concurrency**: Multiple simultaneous operations
- ✅ **Error Handling**: Various failure scenarios
- ✅ **State Management**: Data consistency across operations
- ✅ **ID Generation**: Unique identifier creation under load
