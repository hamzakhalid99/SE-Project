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
    interested: {
        type : [mongoose.SchemaTypes.ObjectId],
        ref:"userprofile"
    },
    going: {
        type : [mongoose.SchemaTypes.ObjectId],
        ref:"userprofile"
    }


})

module.exports = mongoose.model('events', eventTemp)