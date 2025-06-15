/**
 * Unit Tests for Notes Service
 *
 * These tests focus on testing the business logic in isolation,
 * verifying that each function in the notesService works correctly
 * without any external dependencies.
 *
 * Test Coverage:
 * - Note retrieval (all notes and by ID)
 * - Note creation with validation
 * - Note deletion
 * - ID generation
 * - Error handling
 * - Input validation
 */

const notesService = require('../../notesService');

describe('Notes Service Unit Tests', () => {
  beforeEach(() => {
    // Reset the notes array to initial state before each test
    // This ensures test isolation and prevents test interference
    notesService.resetNotes();
  });

  describe('getAllNotes', () => {
    test('should return all notes with correct structure', () => {
      const notes = notesService.getAllNotes();
      expect(notes).toHaveLength(3);
      expect(notes[0]).toHaveProperty('content', 'HTML is easy');
    });
  });

  describe('getNoteById', () => {
    test('should return note when id exists', () => {
      const note = notesService.getNoteById(1);
      expect(note).toBeDefined();
      expect(note.content).toBe('HTML is easy');
    });

    test('should return undefined when id does not exist', () => {
      const note = notesService.getNoteById(999);
      expect(note).toBeUndefined();
    });
  });

  describe('createNote', () => {
    test('should create note with valid content and important flag', () => {
      const note = notesService.createNote('Test note', true);
      expect(note).toHaveProperty('content', 'Test note');
      expect(note).toHaveProperty('important', true);
      expect(note).toHaveProperty('id');
      expect(note).toHaveProperty('date');
    });

    describe('input validation', () => {
      test('should throw error when content is undefined', () => {
        expect(() => {
          notesService.createNote(undefined);
        }).toThrow('content missing');
      });

      test('should throw error when content is null', () => {
        expect(() => {
          notesService.createNote(null);
        }).toThrow('content missing');
      });

      test('should throw error when content is empty string', () => {
        expect(() => {
          notesService.createNote('');
        }).toThrow('content missing');
      });
    });

    test('should set important to false by default', () => {
      const note = notesService.createNote('Test note');
      expect(note.important).toBe(false);
    });

    test('should generate ID 1 when no notes exist', () => {
      // Clear all notes
      notesService.resetNotes();
      notesService.getAllNotes().forEach(note => {
        notesService.deleteNote(note.id);
      });

      // Create a new note
      const note = notesService.createNote('First note');
      expect(note.id).toBe(1);
    });
  });

  describe('deleteNote', () => {
    test('should return true and delete note when id exists', () => {
      const initialCount = notesService.getAllNotes().length;
      const deleted = notesService.deleteNote(1);
      expect(deleted).toBe(true);
      expect(notesService.getAllNotes()).toHaveLength(initialCount - 1);
    });

    test('should return false when id does not exist', () => {
      const deleted = notesService.deleteNote(999);
      expect(deleted).toBe(false);
    });
  });
});
