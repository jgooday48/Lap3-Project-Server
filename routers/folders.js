const express = require("express")
const foldersRouter = express.Router();

const {
    createFolder,
    getAllFolders,
    getFolder,
    deleteFolder,
    updateFolder,
    getAllFoldersByUser

} = require('../controllers/folders')

foldersRouter.post('/', createFolder)
foldersRouter.get('/', getAllFolders)
foldersRouter.get('/:id', getFolder)
foldersRouter.delete('/:id', deleteFolder)
foldersRouter.patch('/:id', updateFolder)
foldersRouter.get("/user/:userId", getAllFoldersByUser)

module.exports = foldersRouter