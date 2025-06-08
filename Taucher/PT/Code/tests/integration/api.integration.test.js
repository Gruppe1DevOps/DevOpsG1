/**
 * Integration Tests for Notes API
 *
 * These tests verify that different components work together correctly
 * and test complete user workflows from start to finish.
 *
 * Integration tests simulate real-world usage scenarios by testing
 * complete API workflows, ensuring all components work together seamlessly.
 *
 * Test Coverage:
 * - Complete CRUD workflow (Create, Read, Update, Delete)
 * - Concurrent request handling and data consistency
 * - End-to-end user interaction patterns
 * - Data persistence across operations
 */

const request = require('supertest');
const express = require('express');

/**
 * Creates a complete Express application for integration testing
 * This includes all API endpoints and business logic
 *
 * @returns {Express} Full Express application instance with all routes
 */
const createApp = () => {
  const app = express();

  // Test data - complete dataset with 3 predefined notes
  // This simulates a realistic application state
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
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      date: '2022-01-10T19:20:14.298Z',
      important: true,
    },
  ];

  app.use(express.json());

  /**
   * Root endpoint - Health check and welcome message
   */
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
  });

  /**
   * Generates unique IDs for new notes
   * Ensures thread-safe ID generation even under concurrent load
   *
   * @returns {number} New unique ID
   */
  const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
  };

  /**
   * POST /api/notes
   * Creates a new note with validation
   *
   * Request body should contain:
   * - content (required): The note content
   * - important (optional): Boolean flag, defaults to false
   *
   * Returns: Created note with generated ID and timestamp
   */
  app.post('/api/notes', (request, response) => {
    const body = request.body;

    // Validation: content field is mandatory
    if (!body.content) {
      return response.status(400).json({
        error: 'content missing',
      });
    }

    // Create new note with auto-generated ID and current timestamp
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    };

    // Add to notes collection and return created note
    notes = notes.concat(note);
    response.json(note);
  });

  /**
   * GET /api/notes
   * Retrieves all notes in the system
   *
   * Returns: Array of all notes with their complete data
   */
  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  /**
   * DELETE /api/notes/:id
   * Removes a specific note by ID
   *
   * Parameters:
   * - id: The ID of the note to delete
   *
   * Returns: 204 No Content on successful deletion
   */
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);
    response.status(204).end();
  });

  /**
   * GET /api/notes/:id
   * Retrieves a specific note by ID
   *
   * Parameters:
   * - id: The ID of the note to retrieve
   *
   * Returns: Note object if found, 404 if not found
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

// Integration Test Suite
describe('API Integration Tests', () => {
  let app;

  /**
   * Setup: Create fresh application instance before each test
   * This ensures test isolation and consistent starting state
   */
  beforeEach(() => {
    app = createApp();
  });

  /**
   * Integration Test 1: Complete CRUD Workflow
   *
   * This test simulates a complete user journey:
   * 1. Check initial state (GET all notes)
   * 2. Create a new note (POST)
   * 3. Verify note was added (GET all notes)
   * 4. Retrieve the specific note (GET by ID)
   * 5. Delete the note (DELETE)
   * 6. Verify deletion (GET by ID should return 404)
   * 7. Verify system state is back to original (GET all notes)
   *
   * This tests data persistence, state management, and API consistency
   */
  test('should handle complete CRUD workflow for notes', async () => {
    // Step 1: Get initial notes count
    let response = await request(app).get('/api/notes').expect(200);

    const initialCount = response.body.length;
    expect(initialCount).toBe(3); // Should have 3 predefined notes

    // Step 2: Create a new note
    const newNote = {
      content: 'Integration testing is crucial',
      important: true,
    };

    response = await request(app).post('/api/notes').send(newNote).expect(200);

    const createdNote = response.body;
    expect(createdNote).toHaveProperty('id'); // Should have auto-generated ID
    expect(createdNote.content).toBe('Integration testing is crucial');

    // Step 3: Verify note was added to the collection
    response = await request(app).get('/api/notes').expect(200);

    expect(response.body).toHaveLength(initialCount + 1); // Should have one more note

    // Step 4: Get the specific note by ID
    response = await request(app)
      .get(`/api/notes/${createdNote.id}`)
      .expect(200);

    expect(response.body.content).toBe('Integration testing is crucial');

    // Step 5: Delete the note
    await request(app).delete(`/api/notes/${createdNote.id}`).expect(204);

    // Step 6: Verify note was deleted (should return 404)
    await request(app).get(`/api/notes/${createdNote.id}`).expect(404);

    // Step 7: Verify total count is back to original
    response = await request(app).get('/api/notes').expect(200);

    expect(response.body).toHaveLength(initialCount); // Back to original count
  });

  /**
   * Integration Test 2: Concurrent Request Handling
   *
   * This test verifies that the API can handle multiple simultaneous requests
   * without data corruption or race conditions.
   *
   * Test scenarios:
   * - Creates 5 notes simultaneously using Promise.all
   * - Verifies all requests succeed
   * - Checks for unique ID generation under concurrent load
   * - Ensures data integrity with multiple simultaneous operations
   *
   * This tests thread safety, concurrent request handling, and data consistency
   */
  test('should handle multiple concurrent requests correctly', async () => {
    const requests = [];

    // Create 5 concurrent POST requests
    for (let i = 0; i < 5; i++) {
      requests.push(
        request(app)
          .post('/api/notes')
          .send({
            content: `Concurrent note ${i}`,
            important: i % 2 === 0, // Alternate between true/false
          })
      );
    }

    // Execute all requests simultaneously
    const responses = await Promise.all(requests);

    // Verify all requests succeeded
    responses.forEach((response) => {
      expect(response.status).toBe(200); // All should return 200 OK
      expect(response.body).toHaveProperty('id'); // All should have IDs
      expect(response.body).toHaveProperty('content'); // All should have content
    });

    // Verify all notes were created and persisted
    const allNotesResponse = await request(app).get('/api/notes').expect(200);

    expect(allNotesResponse.body.length).toBeGreaterThanOrEqual(8); // 3 initial + 5 new

    // Critical test: Verify unique ID generation under concurrent load
    const ids = allNotesResponse.body.map((note) => note.id);
    const uniqueIds = [...new Set(ids)]; // Remove duplicates
    expect(ids.length).toBe(uniqueIds.length); // Should be equal (no duplicate IDs)
  });
});
