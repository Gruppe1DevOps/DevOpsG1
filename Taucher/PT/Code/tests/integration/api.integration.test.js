/**
 * Integration Tests for Notes API
 *
 * These tests verify that different components work together correctly
 * and test complete user workflows from start to finish.
 *
 * Integration tests verify the interaction between:
 * - Express routes and middleware
 * - Notes service business logic
 * - Request/response handling
 * - Error handling across layers
 *
 * Test Coverage:
 * - Complete CRUD workflow
 * - Concurrent request handling
 * - Data persistence across operations
 * - Error propagation through layers
 * - Route error handling
 * - Basic endpoint functionality
 */

const request = require('supertest');
const app = require('../../index');

// Integration Test Suite
describe('API Integration Tests', () => {
  /**
   * Test basic endpoint functionality
   */
  describe('Basic Endpoints', () => {
    test('should return welcome message on root endpoint', async () => {
      const response = await request(app).get('/').expect(200);
      expect(response.text).toBe('<h1>Willkommen bei Devops Gruppe 1!</h1>');
    });
  });

  /**
   * Test error handling in routes
   */
  describe('Error Handling', () => {
    test('should handle service errors in POST route', async () => {
      const response = await request(app)
        .post('/api/notes')
        .send({ content: '' }) // Empty content will trigger service error
        .expect(400);

      expect(response.body).toHaveProperty('error', 'content missing');
    });

    test('should handle non-existent note deletion', async () => {
      await request(app)
        .delete('/api/notes/999')
        .expect(404);
    });

    test('should handle non-existent note retrieval', async () => {
      await request(app)
        .get('/api/notes/999')
        .expect(404);
    });
  });

  /**
   * Integration Test: Complete CRUD Workflow
   *
   * This test verifies the complete lifecycle of a note:
   * 1. Initial state check
   * 2. Note creation
   * 3. Note retrieval (all and by ID)
   * 4. Note deletion
   * 5. Verification of deletion
   * 6. State restoration check
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
   * Integration Test: Concurrent Request Handling
   *
   * This test verifies that the API can handle multiple simultaneous requests
   * without data corruption or race conditions by:
   * - Creating multiple notes concurrently
   * - Verifying all requests succeed
   * - Checking for unique ID generation
   * - Ensuring data consistency
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
