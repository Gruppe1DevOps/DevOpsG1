# Integration Tests

This directory contains integration tests for the Notes API application. Integration tests verify that different components work together correctly and test complete user workflows.

## Overview

Integration tests use the actual backend implementation from `index.js` to verify that all components work together seamlessly. They test complete workflows and verify the interaction between:
- Express routes and middleware
- Notes service business logic
- Request/response handling
- Error handling across layers

## Test Structure

### 1. Basic Endpoint Testing
Tests fundamental API functionality:
- Root endpoint welcome message
- HTTP status code verification
- Response format validation

### 2. Complete CRUD Workflow
Tests the entire lifecycle of a note:
- Initial state verification
- Note creation
- Note retrieval (all and by ID)
- Note deletion
- State verification

### 3. Concurrent Request Handling
Tests multiple simultaneous operations:
- Creates 5 notes concurrently
- Verifies all requests succeed
- Checks unique ID generation
- Ensures data consistency

### 4. Error Handling Across Layers
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

- ✅ **Basic Endpoints**: Root endpoint and welcome message
- ✅ **API Endpoints**: All CRUD operations
- ✅ **Data Flow**: Complete request-response cycles
- ✅ **Concurrency**: Multiple simultaneous operations
- ✅ **Error Handling**: Various failure scenarios
- ✅ **State Management**: Data consistency across operations
- ✅ **ID Generation**: Unique identifier creation under load

## Test Organization

Tests are organized by functionality:
1. **Basic Endpoints**
   - Root endpoint testing
   - Welcome message verification

2. **CRUD Operations**
   - Complete note lifecycle
   - State verification
   - Data persistence

3. **Error Handling**
   - Service errors
   - Not found scenarios
   - Invalid requests

4. **Concurrency**
   - Simultaneous operations
   - Data consistency
   - ID generation

Each test group focuses on a specific aspect of the API, making it easy to:
- Locate specific tests
- Understand test coverage
- Maintain test code
- Debug failures
