const mongoose = require("mongoose")
const domPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const htmlPurify = domPurifier(new JSDOM().window)
const Section = require('./Folder')
// const stripHtml = require('string-strip-html')

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
        type: mongoose.Schema.Types.ObjectId, ref: 'Folders'
    }, 
    User: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },   
  },{ timestamps: true });
  
  module.exports = mongoose.model("Notes", NotesSchema); //make data schema