const mongoose = require("mongoose")


const NotesSchema = new mongoose.Schema({
    Note_ID: {
      type: ObjectId,
      required
    },
    Title: {
      type: String,
    },
    Content: {
        type: String,
        required
      },
    
      IsImportant: {
        type: Boolean,
      },
      Section: {
        type: String,
      },
      User_Id: {
        type: ObjectId,
      },
    
  },{ timestamps: true });
  
  module.exports = mongoose.model("Notes", NotesSchema); //make data schema