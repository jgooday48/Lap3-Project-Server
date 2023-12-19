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
        // Assuming you pass the folderId as a parameter in the request
          const folderId = req.params.folderId;

        // Use Mongoose to find all notes in the specified folder
        const notes = await Note.find({ Folder: folderId });

        res.status(200).json(notes );
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
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

    // Update only if the fields are present in the request body
    // if (Name !== undefined) existingNote.Name = Name;
    // if (Content !== undefined) existingNote.Content = Content;
    // if (IsImportant !== undefined) existingNote.IsImportant = IsImportant;

    // // Check if User_Id is provided, and if so, find the corresponding user
    // if (User_Id !== undefined) {
    //   const user = await User.findOne({ _id: User_Id });
    //   if (!user) {
    //     return res.status(404).json({ error: "User not found" });
    //   }
    //   existingNote.User = user;
    // }

    // Check if Section_Id is provided, and if so, find the corresponding section
    // if (Section_Id !== undefined) {
    //   const section = await Section.findOne({ _id: Section_Id });
    //   if (!section) {
    //     return res.status(404).json({ error: "Section not found" });
    //   }
    //   existingNote.Section = section;
    // }
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
    getAllNotesByFolder
}