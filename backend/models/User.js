const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = newSchema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    hashedPassword: {
        tyep: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)