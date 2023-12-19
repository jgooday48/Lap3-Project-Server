const mongoose = require("mongoose");
const Note = require('./Note')
const User = require('./User')

const FolderSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
      },
      Note: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Notes',
      },
      User: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }
    },
    
  );
  
  module.exports = mongoose.model("Folders", FolderSchema); 