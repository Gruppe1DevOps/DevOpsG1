# Unit Tests

This directory contains unit tests for the Notes API application. Unit tests focus on testing individual functions in isolation, verifying that each component works correctly without external dependencies.

## Overview

Unit tests verify the business logic in `notesService.js` by testing each function in isolation. They ensure that:
- Each function works correctly on its own
- Input validation is properly handled
- Error cases are properly managed
- Business rules are correctly implemented

## Test Structure

### 1. Business Logic Testing
Tests the core functionality of the notes service:
- Note retrieval (all notes and by ID)
- Note creation with validation
- Note deletion
- ID generation
- Error handling
- Input validation

### 2. Root Endpoint Testing
Tests the basic endpoint functionality:
- Welcome message verification

## Running Unit Tests

### Run only unit tests:
```bash
npm run test:unit
```

### Run all tests including unit:
```bash
npm test
```

## Key Features

1. **Isolated Testing**
   - Tests individual functions
   - No external dependencies
   - Controlled test environment

2. **Input Validation**
   - Tests invalid inputs
   - Verifies error messages
   - Checks edge cases

3. **State Management**
   - Uses `resetNotes()` for test isolation
   - Ensures clean state between tests
   - Prevents test interference

4. **Error Handling**
   - Tests error conditions
   - Verifies error messages
   - Checks error propagation

## Dependencies

- **Jest**: Testing framework
- **notesService**: Business logic module
- **index.js**: For root endpoint testing

## Best Practices

1. **Test Isolation**
   - Reset state before each test
   - No shared state between tests
   - Clean test environment

2. **Input Validation**
   - Test invalid inputs
   - Check error messages
   - Verify edge cases

3. **Function Coverage**
   - Test all functions
   - Verify all code paths
   - Check error conditions

4. **Clear Test Names**
   - Descriptive test names
   - Clear failure messages
   - Easy to understand purpose

## Coverage Areas

- ✅ **Note Retrieval**: All notes and by ID
- ✅ **Note Creation**: Valid and invalid inputs
- ✅ **Note Deletion**: Success and failure cases
- ✅ **ID Generation**: Unique ID creation
- ✅ **Error Handling**: Various error scenarios
- ✅ **Input Validation**: All validation rules
- ✅ **Root Endpoint**: Basic functionality

## Test Organization

Tests are organized by functionality:
1. **Root Endpoint Tests**
   - Basic endpoint functionality
   - Welcome message verification

2. **Note Service Tests**
   - `getAllNotes`: Retrieving all notes
   - `getNoteById`: Finding specific notes
   - `createNote`: Creating new notes
   - `deleteNote`: Removing notes
   - `resetNotes`: Test state management

Each test group focuses on a specific aspect of the functionality, making it easy to:
- Locate specific tests
- Understand test coverage
- Maintain test code
- Debug failures 