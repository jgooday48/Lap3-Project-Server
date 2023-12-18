require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// const Routes = require('./routes/')

const app = express()
app.use(express.json())
app.use(cors())



// app.use('/', Routes)

mongoose.connect('mongodb+srv://admin:pass123@notesapi.yxruyix.mongodb.net/') 
    .then(() => {
        app.listen(3000, () => {
            console.log(`API listening on Port 3000`);
        })
        

    })
    .catch((error) => {
        console.log(error)
    })

app.get('/', (req,res) => {
    res.json({message: "welcome"})
})


module.exports = app
