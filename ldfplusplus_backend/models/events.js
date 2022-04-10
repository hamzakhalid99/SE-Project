const mongoose = require('mongoose')

const eventTemp = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    postedby:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    contact: {
        type: String,
        required: true
    },
    interested: {
        type : [String],
    },
    going: {
        type : [String],
    }


})

module.exports = mongoose.model('events', eventTemp)