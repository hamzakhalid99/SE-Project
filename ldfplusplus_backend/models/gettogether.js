const mongoose = require('mongoose')

const gettogTemp = new mongoose.Schema({
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
    contact: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('gettogether', gettogTemp)