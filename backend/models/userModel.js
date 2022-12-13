const mongoose = require('mongoose')
const Schema = mongoose.Schema
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
    }
})

module.exports = mongoose.model('User', userSchema)
