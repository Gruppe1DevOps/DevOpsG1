const request = require("supertest");
const express = require("express");

// Mock the main app functionality for unit testing
const createApp = () => {
  const app = express();
  app.use(express.json());

  let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-01-10T17:30:31.098Z",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-01-10T18:39:34.091Z",
      important: false,
    },
  ];

  const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
  };

  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  app.post("/api/notes", (request, response) => {
    const body = request.body;

    if (!body.content) {
      return response.status(400).json({
        error: "content missing",
      });
    }

    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    };

    notes = notes.concat(note);
    response.json(note);
  });

  app.get("/api/notes/:id", (request, response) => {
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

describe("Notes Unit Tests", () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test("should return all notes", async () => {
    const response = await request(app)
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("content", "HTML is easy");
  });

  test("should create a new note with valid content", async () => {
    const newNote = {
      content: "Testing is important",
      important: true,
    };

    const response = await request(app)
      .post("/api/notes")
      .send(newNote)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveProperty("content", "Testing is important");
    expect(response.body).toHaveProperty("important", true);
    expect(response.body).toHaveProperty("id");
  });

  test("should return 400 when creating note without content", async () => {
    const invalidNote = {
      important: true,
    };

    const response = await request(app)
      .post("/api/notes")
      .send(invalidNote)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveProperty("error", "content missing");
  });

  test("should return specific note by id", async () => {
    const response = await request(app)
      .get("/api/notes/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("content", "HTML is easy");
  });

  test("should return 404 for non-existent note", async () => {
    await request(app).get("/api/notes/999").expect(404);
  });
});
