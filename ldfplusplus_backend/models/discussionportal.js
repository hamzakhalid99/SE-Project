const mongoose = require('mongoose')

const dpTemp = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
    },
    postedby:{
        type:String,
        required:true
    },
    likes: {
        type : [String],
    },
    comments: {
        type : [String],
    },
    anonymous:{
        type:Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('discussionportal', dpTemp)