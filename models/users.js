const mongoose = require('mongoose');
// import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must Provide a Username']
    },
    password: {
        type: String,
        required: [true, 'Must Provide a Password']
    }
});

// This is basic validation not advanced
module.exports = mongoose.model('users', UserSchema);