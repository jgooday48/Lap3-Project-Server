const express = require("express")
const notesRouter = express.Router();

const {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote,
    getAllNotesByFolder

} = require('../controllers/notes')

notesRouter.post('/', createNote)
notesRouter.get('/', getAllNotes)
notesRouter.get("/folder/:folderId", getAllNotesByFolder)
notesRouter.get('/:id', getNote)
notesRouter.delete('/:id', deleteNote)
notesRouter.patch('/:id', updateNote)

module.exports = notesRouter