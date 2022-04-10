const mongoose = require('mongoose')

const instRevTemp = new mongoose.Schema({
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
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('instructorreviews', instRevTemp)