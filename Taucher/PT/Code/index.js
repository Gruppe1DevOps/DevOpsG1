/**
 * Express Application Entry Point
 *
 * This file serves as the main entry point for the Notes API application.
 * It sets up the Express server, configures middleware, and defines the API routes.
 * All business logic is delegated to the notesService module.
 */

const express = require('express');
const notesService = require('./notesService');

// Initialize Express application
const app = express();

// Configure middleware to parse JSON request bodies
app.use(express.json());

/**
 * Root endpoint
 * Returns a simple welcome message
 */
app.get('/', (req, res) => {
  res.send('<h1>Willkommen bei Devops Gruppe 1!</h1>');
});

/**
 * POST /api/notes
 * Creates a new note
 *
 * Request body:
 * - content: string (required) - The content of the note
 * - important: boolean (optional) - Whether the note is important
 *
 * Response:
 * - 200: Note created successfully
 * - 400: Invalid request (missing content)
 */
app.post('/api/notes', (request, response) => {
  try {
    const note = notesService.createNote(
      request.body.content,
      request.body.important
    );
    response.json(note);
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

/**
 * GET /api/notes
 * Retrieves all notes
 *
 * Response:
 * - 200: Array of all notes
 */
app.get('/api/notes', (req, res) => {
  res.json(notesService.getAllNotes());
});

/**
 * DELETE /api/notes/:id
 * Deletes a note by ID
 *
 * URL Parameters:
 * - id: number - The ID of the note to delete
 *
 * Response:
 * - 204: Note deleted successfully
 * - 404: Note not found
 */
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const deleted = notesService.deleteNote(id);

  if (deleted) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

/**
 * GET /api/notes/:id
 * Retrieves a specific note by ID
 *
 * URL Parameters:
 * - id: number - The ID of the note to retrieve
 *
 * Response:
 * - 200: Note found
 * - 404: Note not found
 */
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notesService.getNoteById(id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// Server configuration
const PORT = 3001;

// Only start the server if this file is run directly
// This allows the app to be imported for testing without starting the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
