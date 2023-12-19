const Folder = require('../../../models/Folder')
const mongoose = require('mongoose')

const db = require("../../../app")

const userData = {
    Name: "TekLoon"
};

beforeAll(async () => {
    await db.setUp();
  });
  
  afterEach(async () => {
    await db.drop();
  });
  
  afterAll(async () => {
    await db.dropDatabase();
  });

describe("Folder model", () => {
    it("create and save folder successfully", async () => {
        const validFolder = new Folder(userData)
        const savedFolder = await validFolder.save()
        expect(savedFolder._id).toBeDefined()
        expect(savedFolder.Name).toBe(userData.Name)

    })

    it("field undefined in Schema should be undefined", async () => {
        const folderWithInvalidField = new Folder({
            ...userData,
            nickname: "Handsome TekLoon",
          });
          const savedFolderWithInvalidField = await folderWithInvalidField.save();
          expect(savedFolderWithInvalidField._id).toBeDefined()
          expect(savedFolderWithInvalidField.nickname).toBeUndefined();
    })
})
  