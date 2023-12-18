const mongoose = require('mongoose')

const userSchema = new Schema ({
    title: {
        type: String,
        required
    },
    name: {
        type: String,
        required
    },
    email: {
        type: String,
        required
    },
    address: {
        type: String,
        required
    },
    password: {
        type: String,
        required
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)

