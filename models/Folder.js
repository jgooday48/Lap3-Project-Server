const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
      },
      Note_ID: {
        type: String,
      },
      User_ID: {
        type: String,
      },
      Section_ID: {
        type: String,
      },
    },
    
  );
  
  module.exports = mongoose.model("Folders", FolderSchema); 