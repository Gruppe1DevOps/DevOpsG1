const express = require('express');
const notesService = require('./notesService');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

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

app.get('/api/notes', (req, res) => {
  res.json(notesService.getAllNotes());
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const deleted = notesService.deleteNote(id);

  if (deleted) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notesService.getNoteById(id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
