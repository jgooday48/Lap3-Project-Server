const mongoose = require("mongoose")


const NotesSchema = new mongoose.Schema({
    Title: {
        type: String,
    },
    Content: {
        type: String,
        
    },
    IsImportant: {
        type: Boolean,
    },
    Section: {
        type: String,
    },    
  },{ timestamps: true });
  
  module.exports = mongoose.model("Notes", NotesSchema); //make data schema