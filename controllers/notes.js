const Note = require('../models/Note')
const mongoose = require('mongoose')
const User = require('../models/User')
const Section = require('../models/Folder')

//GET all notes
const getAllNotes = async (req, res) => {
    const notes = await Note.find({}).sort({createdAt: -1})
    res.status(200).json(notes)
}

//GET a single notes
const getNote = async (req, res) => {
    const { id } = req.params

    const note = await Note.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    if (!note) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(note)    
}



//CREATE a new note
const createNote = async (req, res) => {
    const { Title, Content, IsImportant, Section_Id, User_Id } = req.body;
    try {
        const note = await Note.create({ Title, Content, IsImportant, Section: Section_Id, User: User_Id });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



//DELETE a note
const deleteNote = async(req,res)=>{
    const { noteId } = req.params;
    try {
        const existingNote = await Note.findOne({ Note_ID : noteId})
        if(!existingNote){
            return res.status(404).json({ error:"note not found"})
        }
        await existingNote.deleteOne({Note_ID : noteId});
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//UPDATE a note
const updateNote = async (req, res) => {
    const { noteId } = req.params;
    const { Title, Content, IsImportant, Section_Id, User_Id } = req.body;
    try {
      const existingNote = await Note.findOne({ _id: noteId });
      if (!existingNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      // Update only if the fields are present in the request body
      if (Title !== undefined) existingNote.Title = Title;
      if (Content !== undefined) existingNote.Content = Content;
      if (IsImportant !== undefined) existingNote.IsImportant = IsImportant;
      // Check if User_Id is provided, and if so, find the corresponding user
      if (User_Id !== undefined) {
        const user = await User.findOne({ _id: User_Id });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        existingNote.User = user;
      }
      // Check if Section_Id is provided, and if so, find the corresponding section
      if (Section_Id !== undefined) {
        const section = await Section.findOne({ _id: Section_Id });
        if (!section) {
          return res.status(404).json({ error: "Section not found" });
        }
        existingNote.Section = section;
      }
      await existingNote.save();
      // Return a success message along with the updated note
      res.status(200).json({ message: "Note updated", updateNote: existingNote });
    } catch (error) {
      // Handle errors and return an appropriate response
      res.status(400).json({ error: error.message });
    }
  };






module.exports = {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote
}