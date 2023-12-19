
const mongoose = require("mongoose");
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
// const stripHtml = require('string-strip-html');

// Define the Notes schema
const NotesSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Content: {
        type: String
    },
    IsImportant: {
        type: Boolean,
        default: false
    },
    Folder: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Folders'
    },
    User: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
}, { timestamps: true });

// Create the Notes model and export it
const NotesModel = mongoose.model("Notes", NotesSchema);
module.exports = NotesModel;
