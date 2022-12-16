const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({    
    uid: {
        type: String,
        required: true,
        unique: true
      },
    credits: {
        type: Number,
        require: true
    },
    authType: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
})




module.exports = mongoose.model('User', userSchema)
