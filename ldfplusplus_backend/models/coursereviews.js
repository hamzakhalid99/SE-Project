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
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userprofile"
    }
})

module.exports = mongoose.model('coursereview', coursereviewT)