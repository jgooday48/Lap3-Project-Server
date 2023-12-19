const mongoose = require("mongoose");


const FolderSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
      },
      Note: {
        type: String,
      },
      User: {
        type: String
    }
    },
    
  );
  
  module.exports = mongoose.model("Folders", FolderSchema); 