const mongoose = require('mongoose')

const reqadminTemp = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('reqadmin', reqadminTemp)