/**
 * Notes Service Module
 * Handles all notes-related business logic and data management
 */

const initialNotes = [
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

let notes = [...initialNotes];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

const getAllNotes = () => {
  return [...notes];
};

const getNoteById = (id) => {
  return notes.find((note) => note.id === id);
};

const createNote = (content, important = false) => {
  if (!content) {
    throw new Error('content missing');
  }

  const note = {
    content,
    important,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);
  return note;
};

const deleteNote = (id) => {
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== id);
  return initialLength !== notes.length;
};

// For testing purposes only
const resetNotes = () => {
  notes = [...initialNotes];
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  resetNotes, // Exported for testing
};
