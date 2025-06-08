/**
 * Unit Tests for Notes API
 *
 * These tests focus on testing individual API endpoints in isolation.
 * Each test uses a fresh mock application instance to ensure test independence.
 *
 * Test Coverage:
 * - GET /api/notes - Retrieve all notes
 * - POST /api/notes - Create new notes (valid and invalid data)
 * - GET /api/notes/:id - Retrieve specific notes by ID
 * - Error handling for various scenarios
 */

const request = require('supertest');
const express = require('express');

/**
 * Creates a mock Express application for testing
 * This replicates the main app functionality without external dependencies
 *
 * @returns {Express} Configured Express application instance
 */
const createApp = () => {
  const app = express();
  app.use(express.json());

  // Test data - minimal dataset for unit testing
  let notes = [
    {
      id: 1,
      content: 'HTML is easy',
      date: '2022-01-10T17:30:31.098Z',
      important: true,
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      date: '2022-01-10T18:39:34.091Z',
      important: false,
    },
  ];

  /**
   * Generates unique IDs for new notes
   * Finds the maximum existing ID and increments by 1
   *
   * @returns {number} New unique ID
   */
  const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
  };

  // API Routes

  /**
   * GET /api/notes
   * Returns all notes in the system
   */
  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  /**
   * POST /api/notes
   * Creates a new note with validation
   * Requires 'content' field, 'important' is optional (defaults to false)
   */
  app.post('/api/notes', (request, response) => {
    const body = request.body;

    // Validation: content is required
    if (!body.content) {
      return response.status(400).json({
        error: 'content missing',
      });
    }

    // Create new note with generated ID and current timestamp
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    };

    // Add to notes array and return created note
    notes = notes.concat(note);
    response.json(note);
  });

  /**
   * GET /api/notes/:id
   * Returns a specific note by ID
   * Returns 404 if note doesn't exist
   */
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find((note) => note.id === id);

    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  });

  return app;
};

// Test Suite
describe('Notes Unit Tests', () => {
  let app;

  /**
   * Setup: Create fresh app instance before each test
   * This ensures test isolation - each test starts with clean state
   */
  beforeEach(() => {
    app = createApp();
  });

  /**
   * Test Case 1: GET /api/notes
   * Verifies that the API returns all notes with correct structure
   */
  test('should return all notes', async () => {
    const response = await request(app)
      .get('/api/notes')
      .expect(200) // HTTP 200 OK
      .expect('Content-Type', /application\/json/); // JSON response

    // Verify response structure and content
    expect(response.body).toHaveLength(2); // Should have 2 initial notes
    expect(response.body[0]).toHaveProperty('content', 'HTML is easy');
  });

  /**
   * Test Case 2: POST /api/notes (Valid Data)
   * Tests successful note creation with valid input
   */
  test('should create a new note with valid content', async () => {
    const newNote = {
      content: 'Testing is important',
      important: true,
    };

    const response = await request(app)
      .post('/api/notes')
      .send(newNote)
      .expect(200) // HTTP 200 OK
      .expect('Content-Type', /application\/json/); // JSON response

    // Verify created note has all required properties
    expect(response.body).toHaveProperty('content', 'Testing is important');
    expect(response.body).toHaveProperty('important', true);
    expect(response.body).toHaveProperty('id'); // Should have generated ID
  });

  /**
   * Test Case 3: POST /api/notes (Invalid Data)
   * Tests error handling when required 'content' field is missing
   */
  test('should return 400 when creating note without content', async () => {
    const invalidNote = {
      important: true, // Missing 'content' field
    };

    const response = await request(app)
      .post('/api/notes')
      .send(invalidNote)
      .expect(400) // HTTP 400 Bad Request
      .expect('Content-Type', /application\/json/); // JSON error response

    // Verify error message
    expect(response.body).toHaveProperty('error', 'content missing');
  });

  /**
   * Test Case 4: GET /api/notes/:id (Valid ID)
   * Tests retrieval of a specific note by ID
   */
  test('should return specific note by id', async () => {
    const response = await request(app)
      .get('/api/notes/1') // Request note with ID 1
      .expect(200) // HTTP 200 OK
      .expect('Content-Type', /application\/json/); // JSON response

    // Verify correct note is returned
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('content', 'HTML is easy');
  });

  /**
   * Test Case 5: GET /api/notes/:id (Invalid ID)
   * Tests error handling for non-existent note IDs
   */
  test('should return 404 for non-existent note', async () => {
    await request(app)
      .get('/api/notes/999') // Request non-existent note
      .expect(404); // HTTP 404 Not Found
  });
});
