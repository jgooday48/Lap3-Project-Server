require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const cookieParser = require("cookie-parser")



// const Routes = require('./routes/')
const userRoutes = require("./routers/users")
const notesRouter = require("./routers/notes")
const foldersRouter = require("./routers/folders")

const { notFound, errorHandler } = require("./middleware/errorMiddleware")



const port = process.env.PORT || 3000;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
}))


app.use(cookieParser());


// app.use('/', Routes)

mongoose.connect(process.env.DB_URI) //connect mongoose db
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`API listening on Port ${process.env.PORT}`);
        })
        

    })
    .catch((error) => {
        console.log(error)
    })



app.use("/user", userRoutes)
app.use("/notes", notesRouter)
app.use("/folders", foldersRouter)


app.get('/', (req,res) => {
    res.json({message: "welcome"})
})

app.use(notFound);
app.use(errorHandler);



module.exports = app