const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recipientSchema = require ('./recipientModel')
const surveySchema = new Schema({    

    title: {
        type: String,
        required: true,
      },
    body: {
        type: String,
        require: true
    },    
    subject: {
        type: String,
        required: true,
      },
    recipient: {
        type: [recipientSchema],
        require: true
    },
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
})

module.exports = mongoose.model('survey', surveySchema)
