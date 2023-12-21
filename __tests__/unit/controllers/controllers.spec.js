const request = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");
const Note = require("../../../controllers/notes");




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
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("_id");
  });

  //As a user I can delete a note
  it("responds to DELETE /notes/:id with status 204", async () => {
    const mockNoteData = {
      Name: " delete mock data 1",
      Content: "This is a mock 2",
      IsImportant: true,
      // Section_Id: "Mock Section",
      // User_Id: "mockUserId",
    };

    const response = await request(api).post("/notes").send(mockNoteData);
    expect(response.statusCode).toBe(201);

    const deleteId = response.body._id;

    await request(api).delete(`/notes/${deleteId}`).expect(200);

    const findResponse = await request(api).get(`/notes/${deleteId}`);
    expect(findResponse.statusCode).toBe(404);
  });

  //As a user I can add note to the database
  it("create a new note and validate the response", async () => {
    const mockNoteData = {
      Name: " Contoller Test N20",
      Content: "This is a mock note one more time n20",
      IsImportant: true,
      // Section_Id: "Mock Section",
      // User_Id: "mockUserId",
    };

    const response = await request(api).post("/notes").send(mockNoteData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("Content");

    // this part is to clean up
    const deleteId = response.body._id;
    await request(api).delete(`/notes/${deleteId}`).expect(200);
  });

  //As a user I can update a note

  it("Update an existing note and validate the response", async () => {
    // create new note
    const createdNoteResponse = await request(api).post("/notes").send({
      Name: "Update Contoller Test N21",
      Content: "Cintent Update Contoller Test N21",
      IsImportant: true,
    });

    const noteId = createdNoteResponse.body._id;

    const updateResponse = await request(api).patch(`/notes/${noteId}`).send({
      Name: "Updated Test Note 23",
      Content: "This is the updated test note 23",
      IsImportant: true,
      // User_Id: new mongoose.Types.ObjectId(),
      // Section_Id: new mongoose.Types.ObjectId(),
    });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.updateNote.Content).toBe(
      "This is the updated test note 23"
    );

    // this part is to clean up
    await request(api).delete(`/notes/${noteId}`).expect(200);
  });
});
