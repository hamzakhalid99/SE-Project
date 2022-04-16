const mongoose = require('mongoose')

const swapTemp = new mongoose.Schema({
    want: {
        type: String,
        required: true
    },
    fulfilled: {
        type: Boolean,
        default:false
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
    have: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('swaprequest', swapTemp)