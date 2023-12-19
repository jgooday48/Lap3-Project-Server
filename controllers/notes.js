const Note = require('../models/Note')
const mongoose = require('mongoose')
const User = require('../models/User')
const Section = require('../models/Folder')

//GET all notes
const getAllNotes = async (req, res) => {
    const notes = await Note.find({}).sort({createdAt: -1})
    res.status(200).json(notes)
}


const getAllNotesByFolder = async (req, res) => {
      try {
        
          const folderId = req.params.folderId;

        
        const notes = await Note.find({ Folder: folderId });

        res.status(200).json(notes );
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const getAllNotesByName = async (req, res) => {
  const { name } = req.params;

  try {
    const notes = await Note.find({ Name: { $regex: new RegExp(name, 'i') } })
      .populate('Folder')
      .populate('User');

    if (notes.length === 0) {
      return res.status(404).json({ error: "No notes found with the given name" });
    }

    res.status(200).json({ message: "Notes found", notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//GET a single notes
const getNote = async (req, res) => {
    const { id } = req.params

    const note = await Note.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    if (!note) {
        return res.status(404).json({error: 'No such note'})
    }
    res.status(200).json(note)    
}



const createNote = async (req, res) => {
    const { Name, Content, IsImportant, folderId, userId } = req.body;

    // Check if a note with the same Name and content already exists
    const existingNote = await Note.findOne({ Name, Content });

    if (existingNote) {
        res.status(409).json({ error: 'Note with the same Name and content already exists' });
    } else {
        try {
            // Create a new note
            const newNote = new Note({
                Name,
                Content,
                IsImportant: IsImportant || false,
                Folder: folderId,
                User: userId
            });

            // Save the new note
            await newNote.save();
            res.status(201).json(newNote);
        } catch (error) {
            console.error('Error creating note:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
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




// UPDATE a note
const updateNote = async (req, res) => {
 
//   const { Name, Content, IsImportant, Section_Id, User_Id } = req.body;

    try {
        const { id } = req.params;
        console.log("note: ", id)
      const existingNote = await Note.findOneAndUpdate({ _id: id }, {
          ...req.body
      });
    if (!existingNote) {
      return res.status(404).json({ error: "Note not found" });
    }

      const updatedNote = await Note.findById(id);
 


    // await existingNote.save();

    // Return a success message along with the updated note
    res.status(200).json({ message: "Note updated", updateNote: updatedNote });
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
    updateNote,
    getAllNotesByFolder,
    getAllNotesByName
}