const Folder = require("../../../models/Folder");
const { getFolder } = require("../../../controllers/folders");
const mongoose = require("mongoose");

describe("getFolder", () => {
    it("should get a single folder", async () => {
      // Spy on the findById method
      const findByIdSpy = jest.spyOn(Folder, "findById");
  
      // Mock note data
      const new_id = new mongoose.Types.ObjectId();
      const mockFolder = {
        _id: new_id,
        Name: "Mocked Folder",
        User: new mongoose.Types.ObjectId(),
      };
  
      // Mock the implementation of findById
      findByIdSpy.mockResolvedValueOnce(mockFolder);
  
      // Mock Express request and response objects
      const req = { params: { id: new_id } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      // Call the getNote function
      await getFolder(req, res);
  
      // Perform assertions
      expect(findByIdSpy).toHaveBeenCalledWith(new_id);
      expect(res.status).toHaveBeenCalledWith(200);
      // expect(res.json).toHaveBeenCalledWith(mockNote);
  
      // Restore the original implementation after the test
      findByIdSpy.mockRestore();
    });
  
  
  
  
  
  
  
  
  });
  

