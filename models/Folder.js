const mongoose = require("mongoose");
const Note = require('./Note')
const User = require('./User')

const FolderSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
      },
      User: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }
    },{ timestamps: true });
  
  module.exports = mongoose.model("Folders", FolderSchema); 