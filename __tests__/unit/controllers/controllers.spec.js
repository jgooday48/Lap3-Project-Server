const request = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");
const Note = require("../../../controllers/notes");

/////⭐️//////////⭐️/////////⭐️///
//Integration test
describe("API Server", () => {
  let api;

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log("Test server running on port 4000");
    });
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  //As a user can see all notes
  it("request to GET /home with status 200", async () => {
    const response = await request(api).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("request to GET notes data", async () => {
    const response = await request(api).get("/notes");
    //console.log("BODYYYYYY", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("_id");
  });

  // As a user I can add note to the database
  it("create a new note and validate the response", async () => {
    const mockNoteData = {
      Title: " new Mock Note 3",
      Content: "This is a mock note one more time",
      IsImportant: true,
      // Section_Id: "Mock Section",
      // User_Id: "mockUserId",
    };

    const response = await request(api).post("/notes").send(mockNoteData);
    console.log("oooi", response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("Title");
  });

  //As a user I can delete a note
  it("responds to DELETE /notes/:id with status 204", async () => {
    const mockNoteData = {
      Title: " delete mock data",
      Content: "This is a mock",
      IsImportant: true,
      // Section_Id: "Mock Section",
      // User_Id: "mockUserId",
    };

    const response = await request(api).post("/notes").send(mockNoteData);
    console.log(response.body);

    const deleteId = response.body._id;
    console.log(deleteId);

    await request(api).delete(`/notes/${deleteId}`).expect(200);
    expect(Number(deleteId)).toBeNaN();
  });

  //As a user I can update a note
  it("Update an existing note and validate the response", async () => {
    // create new note
    const createdNoteResponse = await request(api).post("/notes").send({
      Title: " new Mock Note 4",
      Content: "Update test note",
      IsImportant: true,
    });

    const noteId = createdNoteResponse.body._id;

    const updateResponse = await request(api).patch("/notes/${noteId}").send({
      Title: "Updated Test Note",
      Content: "This is the updated test note.",
      IsImportant: true,
    });
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.updateNote.Content).toBe(
      "This is the updated test note."
    );
    
  });
});
