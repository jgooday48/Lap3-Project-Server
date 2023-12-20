require('dotenv').config()
const { MongoMemoryServer } = require('mongodb-memory-server');
const Folder = require('../../../models/Note')
const mongoose = require('mongoose')
let mongo = undefined

const userData = {
    Name: "TekLoon"
};
beforeEach(async () => {
      mongo = await MongoMemoryServer.create();
      const url = mongo.getUri();
      await mongoose.connect(url);
});

afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
});

describe("Folder model", () => {
    it("create and save folder successfully", async () => {
        const validNote = new Folder(userData)
        const savedNote = await validNote.save()
        expect(savedNote._id).toBeDefined()
        expect(savedNote.Name).toBe(userData.Name)
    })
    it("field undefined in Schema should be undefined", async () => {
        const noteWithInvalidField = new Folder({
            ...userData,
            nickname: "Handsome TekLoon",
          });
          const savedNoteWithInvalidField = await noteWithInvalidField.save();
          expect(savedNoteWithInvalidField._id).toBeDefined()
          expect(savedNoteWithInvalidField.nickname).toBeUndefined();
    })
}
)
