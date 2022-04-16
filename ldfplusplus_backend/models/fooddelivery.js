const mongoose = require('mongoose')

const foodTemp = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    postedby:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userprofile"
    },
    date: {
        type: Date,
        default: Date.now
    },
    contact: {
        type: String,
        required: true
    },
    compensation: {
        type: String,
        required: true
    },
    areafrom: {
        type: String,
        required: true
    },
    areato: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('fooddelivery', foodTemp)