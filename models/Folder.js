const mongoose = require("mongoose");
const Note = require('./Note')
const User = require('./User')

const FolderSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
      },
      Note: {
        type: Note,
      },
      User: {
        type: User
    }
    },
    
  );
  
  module.exports = mongoose.model("Folders", FolderSchema); 