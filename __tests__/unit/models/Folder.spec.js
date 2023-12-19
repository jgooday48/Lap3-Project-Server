require('dotenv').config()

const { MongoMemoryServer } = require('mongodb-memory-server');

const Folder = require('../../../models/Folder')
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
  
// afterAll(async () => {
//   // await db.dropDatabase(); 
//     const collections = mongoose.connection.collections;

//     for (const key in collections) {
//         const collection = collections[key];
//         await collection.deleteMany();
//     }
  
//   });

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
  