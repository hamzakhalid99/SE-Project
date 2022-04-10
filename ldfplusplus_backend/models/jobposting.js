const mongoose = require('mongoose')

const jobTemp = new mongoose.Schema({
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
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('jobposting', jobTemp)