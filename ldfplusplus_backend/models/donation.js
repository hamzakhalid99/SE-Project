const mongoose = require('mongoose')

const donTemp = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model('donation', donTemp)