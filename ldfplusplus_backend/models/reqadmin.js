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
    },
    postedby:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userprofile"
    }
})

module.exports = mongoose.model('reqadmin', reqadminTemp)