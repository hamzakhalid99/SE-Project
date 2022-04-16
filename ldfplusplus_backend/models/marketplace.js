const mongoose = require('mongoose')

const marketTemp = new mongoose.Schema({
    postedby:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userprofile"
    },
    date: {
        type: Date,
        default: Date.now
    },
    content:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    field:{
        type:String,
        required:true
    },
    image:{
        type:Buffer
    },  
})
module.exports = mongoose.model('marketplace', marketTemp)
