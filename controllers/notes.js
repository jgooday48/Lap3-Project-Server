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
// const createNote = async (req, res) => {
//     const { Title, Content, IsImportant, Section, User_Id, Note_ID } = req.body
//     try {
//         const note = await Note.create({ Title, Content, IsImportant, Section, User_Id, Note_ID })
//         res.status(200).json(note)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
        
//     }
// }



const createNote = async (req, res) => {
    const { Title, Content, IsImportant, Section_Id, User_Id } = req.body;
    try {
        const note = await Note.create({ Title, Content, IsImportant, Section: Section_Id, User: User_Id });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



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
const updateNote = async (req,res) => {
    const { noteId } = req.params
    const { Title, Content, IsImportant, Section, User_Id, Note_ID } = req.body

    try {
        const existingNote = await Note.findOne({ Note_ID : noteId})
        if(!existingNote){
            return res.status(404).json({ error:"note not found"})
        }
        if (Title) existingNote.Title = Title;
        if (Content) existingNote.Content = Content;
        if (IsImportant !== undefined) existingNote.IsImportant = IsImportant;
        if (Section) existingNote.Section = Section;
        if (User_Id) existingNote.User_Id = User_Id;
        if (Note_ID) existingNote.Note_ID = Note_ID;

await existingNote.save()
res.status(500).json({ message:"Note updated",updateNote:existingNote})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
} 






module.exports = {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote
}