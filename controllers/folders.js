const Folders = require("../models/Folder");
const mongoose = require("mongoose");
const User = require("../models/User");

//GET all folders
const getAllFolders = async (req, res) => {
  const notes = await Folders.find({}).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

//GET a single folder
const getFolder = async (req, res) => {
  const { id } = req.params;

  const folder = await Folders.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  if (!folder) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(folder);
};

const getAllFoldersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all folders by user ID
    const folders = await Folders.find({ User: userId });

    // Send the folders as a response
    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//CREATE a new folder
const createFolder = async (req, res) => {
  const { Name, User } = req.body;
  try {
    const folder = await Folders.create({ Name, User: User });
    res.status(200).json(folder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a folder

// const deleteFolder = async (req, res) => {
//   const { id } = req.params;
//   if (!id) {
//     return res.status(400).json({ error: "no id passed" });
//   }
//   try {
//     await existingNote.deleteOne({ _id: id });
//     res.status(200).json({ message: "Folder deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const deleteFolder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "no id passed" });
  }

  try {
    const existingFolder = await Folders.findOne({ _id: id });
    if (!existingFolder) {
      return res.status(404).json({ error: "folder not found" });
    }
    await existingFolder.deleteOne({ _id: id });
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//UPDATE a folder

const updateFolder = async (req, res) => {
  const { folderId } = req.params;
  const { Name, User_ID } = req.body;

  try {
    const existingFolder = await Folders.findOne({ Folder_ID: folderId });
    if (!existingFolder) {
      return res.status(404).json({ error: "folder not found" });
    }
    if (Name !== undefined) existingFolder.Name = Name;
    if (User_ID !== undefined) {
      const user = await User.findOne({ _id: User_ID });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      existingFolder.User = user;
    }
    await existingFolder.save();
    res
      .status(200)
      .json({ message: "Folder updated", updateFolder: existingFolder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllFolders,
  getFolder,
  createFolder,
  deleteFolder,
  updateFolder,
  getAllFoldersByUser,
};
