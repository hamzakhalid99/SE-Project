const mongoose = require('mongoose')

const courseTemplate = new mongoose.Schema({
    semester: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    coursedetails:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('courses', courseTemplate)