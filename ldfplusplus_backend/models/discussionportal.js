const mongoose = require('mongoose')

const dpTemp = new mongoose.Schema({
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
    likes: {
        type : [mongoose.SchemaTypes.ObjectId],
        ref:"userprofile"
    },
    comments: {
        type : [(String,mongoose.SchemaTypes.ObjectId)],
        ref:"userprofile"
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