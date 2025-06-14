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
const app = require('../../index');

// Integration Test Suite
describe('API Integration Tests', () => {
  /**
   * Test root endpoint
   */
  test('should return hello world on root endpoint', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.text).toBe('<h1>Hello World!</h1>');
  });

  /**
   * Test error handling
   */
  test('should handle invalid note creation', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({}) // Empty body
      .expect(400);

    expect(response.body).toHaveProperty('error', 'content missing');
  });

  test('should handle non-existent note deletion', async () => {
    await request(app)
      .delete('/api/notes/999')
      .expect(404);
  });

  test('should handle invalid request body', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send(null) // Invalid body
      .expect(400);

    expect(response.body).toHaveProperty('error');
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
