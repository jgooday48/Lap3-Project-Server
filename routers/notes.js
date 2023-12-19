const express = require("express")
const notesRouter = express.Router();

const {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote,
    getAllNotesBySection

} = require('../controllers/notes')

notesRouter.post('/', createNote)
notesRouter.get('/', getAllNotes)
notesRouter.get("/section/:sectionId", getAllNotesBySection)
notesRouter.get('/:id', getNote)
notesRouter.delete('/:id', deleteNote)
notesRouter.patch('/:id', updateNote)

module.exports = notesRouter