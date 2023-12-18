const express = require("express")
const foldersRouter = express.Router();

const {
    createFolder,
    getAllFolders,
    getFolder,
    deleteFolder,
    updateFolder

} = require('../controllers/folders')

foldersRouter.post('/', createFolder)
foldersRouter.get('/', getAllFolders)
foldersRouter.get('/:id', getFolder)
foldersRouter.delete('/:id', deleteFolder)
foldersRouter.patch('/:id', updateFolder)

module.exports = foldersRouter