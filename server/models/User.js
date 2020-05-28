const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    regDate: {
        type: Date,
        default: Date.now
    },
    rt: {
        type: String,
        default: ''
    },
    reviewed: {
        type: Array
    },
    liked: {
        type: Array
    }
})

module.exports = mongoose.model('User', userSchema, 'users')