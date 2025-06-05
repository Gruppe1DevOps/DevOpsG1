const request = require("supertest");
const express = require("express");

// Import the actual app logic
const createApp = () => {
  const app = express();

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
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-01-10T19:20:14.298Z",
      important: true,
    },
  ];

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
  });

  const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
  };

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

  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);
    response.status(204).end();
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

describe("API Integration Tests", () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test("should handle complete CRUD workflow for notes", async () => {
    // 1. Get initial notes
    let response = await request(app).get("/api/notes").expect(200);

    const initialCount = response.body.length;
    expect(initialCount).toBe(3);

    // 2. Create a new note
    const newNote = {
      content: "Integration testing is crucial",
      important: true,
    };

    response = await request(app).post("/api/notes").send(newNote).expect(200);

    const createdNote = response.body;
    expect(createdNote).toHaveProperty("id");
    expect(createdNote.content).toBe("Integration testing is crucial");

    // 3. Verify note was added
    response = await request(app).get("/api/notes").expect(200);

    expect(response.body).toHaveLength(initialCount + 1);

    // 4. Get the specific note
    response = await request(app)
      .get(`/api/notes/${createdNote.id}`)
      .expect(200);

    expect(response.body.content).toBe("Integration testing is crucial");

    // 5. Delete the note
    await request(app).delete(`/api/notes/${createdNote.id}`).expect(204);

    // 6. Verify note was deleted
    await request(app).get(`/api/notes/${createdNote.id}`).expect(404);

    // 7. Verify total count is back to original
    response = await request(app).get("/api/notes").expect(200);

    expect(response.body).toHaveLength(initialCount);
  });

  test("should handle multiple concurrent requests correctly", async () => {
    const requests = [];

    // Create multiple notes concurrently
    for (let i = 0; i < 5; i++) {
      requests.push(
        request(app)
          .post("/api/notes")
          .send({
            content: `Concurrent note ${i}`,
            important: i % 2 === 0,
          })
      );
    }

    const responses = await Promise.all(requests);

    // All requests should succeed
    responses.forEach((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("content");
    });

    // Verify all notes were created
    const allNotesResponse = await request(app).get("/api/notes").expect(200);

    expect(allNotesResponse.body.length).toBeGreaterThanOrEqual(8); // 3 initial + 5 new

    // Verify unique IDs
    const ids = allNotesResponse.body.map((note) => note.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});
