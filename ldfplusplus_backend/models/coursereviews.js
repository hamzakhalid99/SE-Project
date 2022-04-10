const mongoose = require('mongoose')

const coursereviewT = new mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    postedby:{
        type:String,
        default:false
    }
})

module.exports = mongoose.model('coursereview', coursereviewT)