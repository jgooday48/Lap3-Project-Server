 const Folders = require("../models/Folder")
 const mongoose = require("mongoose")



 //GET all folders
  const getAllFolders = async (req, res) => {
    const notes = await Folders.find({}).sort({createdAt: -1})
    res.status(200).json(notes)
}

 //GET a single folder
 const getFolder = async (req, res) => {
    const { id } = req.params

    const folder = await Folders.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    if (!folder) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(folder)    
}

 //CREATE a new folder
 const createFolder = async (req, res) => {
    const { Name, User_Id, Note_ID, Section_ID } = req.body
    try {
        const folder = await Folders.create({ Name, User_Id, Note_ID, Section_ID })
        res.status(200).json(folder)
    } catch (error) {
        res.status(400).json({ error: error.message })
        
    }
}


 //DELETE a folder
 const deleteFolder = async (req, res) => {
    const { folderId } = req.params;
    try {
      const existingFolder = await Folders.findOne({ Folder_ID: folderId });
      if (!existingFolder) {
        return res.status(404).json({ error: "folder not found" });
      }
      await existingFolder.deleteOne({ Folder_ID: folderId });
      res.status(200).json({ message: "Folder deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };




 //UPDATE a folder

 const updateFolder = async (req, res) => {
    const { folderId } = req.params;
    const { Name, Section_ID, User_ID, Note_ID } = req.body;
  
    try {
      const existingFolder = await Folders.findOne({ Folder_ID: folderId });
      if (!existingFolder) {
        return res.status(404).json({ error: "note not found" });
      }
      if (Name) existingFolder.Name = Name;
      if (Section_ID) existingFolder.Section_ID = Content;
      if (User_ID) existingFolder.User_ID = User_ID;
      if (Note_ID) existingFolder.Note_ID = Note_ID;
  
      await existingFolder.save();
      res.status(500).json({ message: "Folder updated", updateFolder: existingFolder });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };





 module.exports = {
    getAllFolders,
    getFolder,
    createFolder,
    deleteFolder,
    updateFolder
 }