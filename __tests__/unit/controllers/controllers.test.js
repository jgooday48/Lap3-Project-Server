//Unit Test

const Note = require("../../../models/Note");
const { getNote } = require("../../../controllers/notes");
const mongoose = require("mongoose");

describe("getNote", () => {
  it("should get a single note", async () => {
    // Spy on the findById method
    const findByIdSpy = jest.spyOn(Note, "findById");

    // Mock note data
    const new_id = new mongoose.Types.ObjectId();
    const mockNote = {
      _id: new_id,
      Title: "Mocked Note",
      Content: "Mocked Content",
      Section: new mongoose.Types.ObjectId(),
      User: new mongoose.Types.ObjectId(),
    };

    // Mock the implementation of findById
    findByIdSpy.mockResolvedValueOnce(mockNote);

    // Mock Express request and response objects
    const req = { params: { id: new_id } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Call the getNote function
    await getNote(req, res);

    // Perform assertions
    expect(findByIdSpy).toHaveBeenCalledWith(new_id);
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(mockNote);

    // Restore the original implementation after the test
    findByIdSpy.mockRestore();
  });








});
