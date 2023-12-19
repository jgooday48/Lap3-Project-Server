const request = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");
const NoteController = require("../../../controllers/notes");


//working but these are unit test
describe("Note Controller Functions", () => {
  it("should have createNote function", () => {
    expect(NoteController.createNote).toBeDefined();
  });

  it("should have getAllNotes function", () => {
    expect(NoteController.getAllNotes).toBeDefined();
  });
});


//wirking but these are not "controller"test
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
  
    test("responds to GET / home with status 200", (done) => {
      request(api).get("/").expect(200, done);
    });
  
    it("responds to GET /home with a title and description", async () => {
      const response = await request(api).get("/");
  
      expect(response.statusCode).toBe(200);
    });
  });
  
  



  // NOT WORKING .....👇
  describe("Note Controller Integration Test", () => {
    let connection;
  
    beforeAll(async () => {
      const testDBUri = "mongodb://localhost:27017/testdb";
  
      connection = await mongoose.createConnection(testDBUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Clear the notes collection before each test
      await Note.deleteMany();
    });
  
    it("should create a new note", async () => {
      const mockNoteData = {
        Title: "Mock Note",
        Content: "This is a mock note.",
        IsImportant: true,
        Section: "Mock Section",
        User_Id: "mockUserId",
        Note_ID: "mockNoteId",
      };
  
      const response = await request(app)
        .post("/notes")
        .send(mockNoteData)
        .expect(200);
  
      expect(response.body).toHaveProperty("Title", mockNoteData.Title);
    });
  
    it("should get all notes", async () => {
      const response = await request(app)
        .get("/notes")
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    afterAll(async () => {
      // Close the connection and drop the test database
      await connection.dropDatabase();
      await connection.close();
    });
  });