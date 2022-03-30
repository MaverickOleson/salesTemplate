const mongoose = require('mongoose');
// import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'Must Provide a Username']
    },
    password: {
        type: String,
        required: [true, 'Must Provide a Password']
    },
    token: {
        type: String,
        required: false
    },
    info: {
        type: String,
        default: '{}'
    }
});

// This is basic validation not advanced
module.exports = mongoose.model('users', UserSchema);