const express = require("express")
const notesRouter = express.Router();

const {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote

} = require('../controllers/notes')

notesRouter.post('/', createNote)
notesRouter.get('/', getAllNotes)
notesRouter.get('/:id', getNote)
notesRouter.delete('/:id', deleteNote)
notesRouter.patch('/:id', updateNote)

module.exports = notesRouter