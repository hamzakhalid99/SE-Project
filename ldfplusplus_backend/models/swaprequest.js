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
    have: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('swaprequest', swapTemp)