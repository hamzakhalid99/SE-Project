// Routing the Requests that come to our server
const crypto = require('crypto');
const express = require('express')
const router = express.Router()
const userprofile = require('../models/userprofile');
const gettogehter = require('../models/gettogether');
const events = require('../models/events');
const jobposting = require('../models/jobposting');
const donations = require('../models/donation');
const fooddelivery = require('../models/fooddelivery');
const instructorreviews = require('../models/instructoreviews');
const coursereviews = require('../models/coursereviews');
const courses =  require('../models/courses');
const discussionportal = require('../models/discussionportal');
const reqadmin = require('../models/reqadmin');
const swaprequest = require('../models/swaprequest');
const marketplace = require('../models/marketplace');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken')
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxf3dda59e7eec4d0390aecf845b778728.mailgun.org';
const api_key = '4c1b6bf25b1648865a70ae6f0f07b9a3-162d1f80-c68639a6';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
const _ = require('lowdash')

function isSuperadmin(req, res, next) {
    try  
    {
           return true
        }
    catch{
        return false
    }
}

function isAdmin(req, res, next) {
    try  
    {
        userprofile.findById(req.body.user_id, (err,docs) =>{
            if (err){
                res.send({"Error": "Not Super Admin"})
            }
            else{
                if (docs.length <=0)
                {
                    res.send({"Error": "Not Super Admin"})
                }
                if (docs.length ==1 && (docs[0].superadmin == true || docs[0].adminstatus == true))
                {
                    next()
                } 
            }
        })
    }
    catch{
        res.send({"Error": "Not Super Admin"})
    }
}


router.post('/signup', (request, response) => {
    try{
        const emailtemp = sanitize(request.body.email)
        const passwordy = sanitize(request.body.password)
        const fullname = sanitize(request.body.fullname)
        userprofile.find({ email: (emailtemp).toLowerCase()}, (err,docs) => {
            if (err){
                response.send(400).json({error:err})
            }
            else{
                if (docs.length >= 1)
                {
                    response.json({error:"Email already registered"})
                }
                else{
                    const hashedpassword = crypto.createHash('sha256').update(passwordy).digest('base64')
                    const signedUpUser = new userprofile({
                        fullname: fullname,
                        email: (emailtemp).toLowerCase(),
                        password: hashedpassword
                    })
                    signedUpUser.save().then(data => {
                        response.json({message:"Sucessful Signup"})
                    }).catch(error => {
                        response.json({error:error})
                    })
                }
            }
        })
    }
    catch(err){
        response.send(400).json({error:err})
    }
})

router.post('/login', (request,response) => {
    try{
        const emailtemp = sanitize(request.body.email)
        const passwordy = sanitize(request.body.password)
        const hashedpassword = crypto.createHash('sha256').update(passwordy).digest('base64')
        userprofile.find({ email: emailtemp}).lean().exec(function(err, docs) {
            if (err){
                response.json({error:err})
            }
            else{
                if (docs.length < 1)
                {
                    response.json({error:"Not Found"})
                    // response.json({"Error":"Not Found"})
                }
                else{
                    const doc = docs[0]
                    if (doc.password == hashedpassword)
                    {
                        delete doc.password
                        response.json({backenddata:doc})
                    }
                    else{
                        response.json({error:"Incorrect Credentials"})
                        // response.json({"Error":"Incorrect Password/Username"})
                    }
                }
            }
        });
    }
    catch(err){
        response.json({error:err})
    }
})

//// Get Togethers
// load posts view more button, view post simply uses the object returned here
router.post('/gettogether', (request,response) => {
    try{
        const numberofposts = sanitize(request.body.numberofposts)
        gettogehter.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                // console.log(err)
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts), rem:docs.length-numberofposts})
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs, rem:0})
                    // response.send(docs)
                }
                else{
                 console.log('CODE error')
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/gettogether/post', async (request,response) => {
    try{
        const gettogetherpost = new gettogehter({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            contact: sanitize(request.body.contact),
            postedby: sanitize(request.body.user_id)
        })
        const getpost = await gettogetherpost.populate("postedby", "fullname")
        getpost.save().then(data => {
            response.json({message:"Post Successful"})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err)
    {
        response.json({error:err})
    }
})

// render my posts
router.post('/gettogether/myposts', async (request,response) => {
    try{
        gettogehter.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
            }
        })    
    }
    catch(err)
    {
        response.json({error:err})
    }
})

// delete selected post
router.post('/gettogether/delete', async (request,response) => {
    try{
        gettogehter.deleteOne({ _id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Sucessfully Deleted"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
////


/// Events

// load posts view more button, view post simply uses the object returned here
router.post('/events', (request,response) => {
    try{
        const numberofposts = sanitize(request.body.numberofposts)
        events.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
                // response.send({"error":err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts), rem:docs.length-numberofposts})
                    // response.send(docs.slice(0, numberofposts))
                }
                if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                }
            }
        })
    }
    catch(err)
    {
        response.json({error:err})
    }
})

//mark interested
router.post('/events/interested', async (request,response) => {
    try{
        events.updateOne({ postedby: sanitize(request.body.user_id), _id:sanitize(request.body._id)},{ $push: { "interested": sanitize(request.body.user_id) }}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:'Status Updated'})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// mark going
router.post('/events/going', async (request,response) => {    
    try{
        events.updateOne({ postedby: sanitize(request.body.user_id), _id:sanitize(request.body._id)},{ $push: { "going": sanitize(request.body.user_id) }}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Status Updated"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/events/post', async (request,response) => {
    try{
        const eventspost = new events({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            contact: sanitize(request.body.contact),
            postedby: sanitize(request.body.user_id)
        })
        const getpost = await eventspost.populate("postedby", "fullname")
        getpost.save().then(data => {
            response.json({message:"Posted Succesffuly"})
        }).catch(err => {
            response.json({error:err})
        })    
    }
    catch(err){
        console.log(err)
    }
})

// render my posts
router.post('/events/myposts', async (request,response) => {
    try{
        events.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
                // response.send(docs) 
            }
        })    
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/events/delete', async (request,response) => {
    try{
        events.deleteOne({_id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:'Post Deleted'})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

//////


/// Job Posting/Career help

// load posts view more button, view post simply uses the object returned here
router.post('/careerhelp', (request,response) => {
    try{
        const numberofposts = sanitize(request.body.numberofposts)
        jobposting.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
                // console.log(err)
                // response.send({"error":err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send(docs.slice(0, numberofposts))
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
        // console.log(err)
    }
})

// post 
router.post('/careerhelp/post', async (request,response) => {
    try{
        const jobposty = new jobposting({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            salary: sanitize(request.body.salary),
            location: sanitize(request.body.location),
            postedby: sanitize(request.body.user_id)
        })
        const jobpost = await jobposty.populate("postedby", "fullname")
        jobpost.save().then(data => {
            response.json({message:"Post Successful"})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// render my posts
router.post('/careerhelp/myposts', async (request,response) => {
    try{
        jobposting.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
                // response.send(docs) 
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/careerhelp/delete', async (request,response) => {
    try{
        jobposting.deleteOne({_id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Deleted Successfully"})
            }
        })    
    }
    catch(err){
        response.json({error:err})
    }
})
////



// Donations

// load posts view more button, view post simply uses the object returned here
router.post('/donations', (request,response) => {
    try{
        console.log(request.body)
        const numberofposts = request.body.numberofposts
        donations.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
                // console.log(err)
                // response.send({"error":err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send(docs.slice(0, numberofposts))
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/donations/post', async (request,response) => {
    try{
        console.log(request.body)
        const donationpost = new donations({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            postedby: sanitize(request.body.user_id)
        })
        const donpost = await donationpost.populate("postedby", "fullname")
        donpost.save().then(data => {
            response.json({message:"Post Sucessful"})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// render my posts
router.post('/donations/myposts', async (request,response) => {
    try{
        console.log(request.body)
        donations.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
            }
        })    
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/donations/delete', async (request,response) => {
    try{
        console.log(request.body)
        donations.deleteOne({ _id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Deleted Sucessfully"})
            }
        })    
    }
    catch(err){
        response.json({error:err})
    }
})
////


// Food Delivery

// load posts view more button, view post simply uses the object returned here
router.post('/fooddelivery', (request,response) => {
    try{
        const numberofposts = request.body.numberofposts
        fooddelivery.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
                // response.send({"error":err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send(docs.slice(0, numberofposts))
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/fooddelivery/post', async (request,response) => {
    try{
        const foodpost = new fooddelivery({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            postedby: sanitize(request.body.user_id),
            contact: sanitize(request.body.contact),
            compensation: sanitize(request.body.compensation),
            areafrom: sanitize(request.body.areafrom),
            areato: sanitize(request.body.areato)
        })
        const foopos = await foodpost.populate("postedby", "fullname")
        foopos.save().then(data => {
            response.json({message:"Posted Sucessfully"})
        }).catch(err => {
            response.json({error:err})
        })
    
    }
    catch(err){
        response.json({error:err})
    }
})

// render my posts
router.post('/fooddelivery/myposts', async (request,response) => {
    console.log(request.body)
    try{
        fooddelivery.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
            }
        })    
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/fooddelivery/delete', async (request,response) => {
    try{
        fooddelivery.deleteOne({ _id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Post Deleted"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
////

// Instructor Reviews

// search based on keywords
router.post('/instructorreviews', (request,response) => {
    try{
        const numberofposts = sanitize(request.body.numberofposts)
        const tmp = `.*`+sanitize(request.body.search)+'.*'
        instructorreviews.find({ "title": { "$regex": tmp, "$options": "i" } }).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send(docs.slice(0, numberofposts))
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/instructorreviews/post', async (request,response) => {
    try{
        const insrev = new instructorreviews({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            postedby: sanitize(request.body.user_id),
            rating: sanitize(request.body.rating)
        })
        const inspos = await insrev.populate("postedby", "fullname")
        inspos.save().then(data => {
            response.json({message:"Posted Sucessfully"})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err){
        console.log(err)
    }
})

// render my posts
router.post('/instructorreviews/myposts', async (request,response) => {
    try{
        instructorreviews.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                // response.send(docs) 
                response.json({backenddata:docs})
            }
        })    
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/instructorreviews/delete', async (request,response) => {
    try{
        instructorreviews.deleteOne({  _id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Post Deleted"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
////

// Course Reviews

// search based on keywords
router.post('/coursereviews', (request,response) => {
    console.log(request)
    try{
        const tmp = `.*`+sanitize(request.body.search)+'.*'
        const numberofposts = request.body.numberofposts
        coursereviews.find({ "title": { "$regex": tmp, "$options": "i" } }).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send())
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/coursereviews/post', async (request,response) => {
    try{
        const corsrev = new coursereviews({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            postedby: sanitize(request.body.user_id),
            rating: sanitize(request.body.rating)
        })
        const corspos = await corsrev.populate("postedby", "fullname")
        corspos.save().then(data => {
            response.json({message:"Post Sucessful"})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// render my posts
router.post('/coursereviews/myposts', async (request,response) => {
    try{
        coursereviews.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/coursereviews/delete', async (request,response) => {
    try{
        coursereviews.deleteOne({ _id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Post Deleted"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

router.get('/coursereviews/browse', (request,response) => {
    try{
        const numberofposts = request.body.numberofposts
        courses.find({ semester: sanitize(request.body.semester), major: sanitize(request.body.major)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send(docs.slice(0, numberofposts))
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
////


// Discussion Portal

router.get('/homepagehappenings', (request,response)=>{
    try{
        discussionportal.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err){
                response.json({error:err})
            }
            else{
                response.json({backenddata:docs.slice(0, 3)})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// search based on keywords
router.post('/discussionportal', (request,response) => {
    try{
        const tmp = `.*`+sanitize(request.body.search)+'.*'
        const numberofposts = request.body.numberofposts
        discussionportal.find({ "title": { "$regex": tmp, "$options": "i" } }).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:0})
                    // response.send(docs.slice(0, numberofposts))
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
        // response.json({error:err})
    }
})

// post 
router.post('/discussionportal/post', async (request,response) => {
    try{
        const disport = new discussionportal({
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            postedby: sanitize(request.body.user_id),
            anonymous: sanitize(request.body.anonymous)
        })
        const disp = await disport.populate("postedby", "fullname")
        disp.save().then(data => {
            response.json({message:"Posted Sucessfully"})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// render my posts
router.post('/discussionportal/myposts', async (request,response) => {
    try{
        discussionportal.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs}) 
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/discussionportal/delete', async (request,response) => {
    try{
        discussionportal.deleteOne({ postedby: sanitize(request.body.user_id), _id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Post Deleted"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

router.post('/discussionportal/like', async (request,response) => {    
    try{
        discussionportal.updateOne({ postedby: sanitize(request.body.user_id), _id:sanitize(request.body._id)},{ $push: { "likes": sanitize(request.body.user_id) }}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Post Liked"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

router.post('/discussionportal/comment', async (request,response) => {    
    try{
        discussionportal.updateOne({ postedby: sanitize(request.body.user_id), _id:sanitize(request.body._id)},{ $push: { "comments": (sanitize(request.body.user_id),sanitize(request.body.comments)) }}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Comment Sucessful"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

router.get('/discussionportal/comment', async (request,response) => {    
    try{
        const numberofposts = request.body.numberofposts
        discussionportal.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
////


/// Request Admin
router.post('/requestadmin', async (request,response) => {
    try{
        const adminpos = new reqadmin({
            content: sanitize(request.body.content),
            fullname: sanitize(request.body.fullname)
        })
        const reqad = await adminpos.populate("postedby", "fullname")
        reqad.save().then(data => {
            response.json({message:"Request Submitted"})
        }).catch(err => {
            response.json({error:err})
        })    
    }
    catch(err){
        response.json({error:err})
    }
})

//// Admin Items

// search based on email or fullname number of posts required
router.get('/removeadmin',isSuperadmin, (request,response) => {
    try{
        // const tmp = `.*`+sanitize(request.body.keywords)+'.*'
        // const numberofposts = sanitize(request.body.numberofposts)
        userprofile.find({ $or:[ { "fullname": { "$regex": tmp, "$options": "i" }},{"email":sanitize(request.body.keywords) } ]}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send()
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
//remove admin based on _id
router.post('/removeadmin', (request,response)=> {
    // request.body.toremove
    try{
        userprofile.updateOne({ _id: sanitize(request.body._id)},{ $set: { "adminstatus": false }}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Admin Removed"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
//reject admin request based on postid
router.post('/adminreqs/reject', (request,response)=> {
    // request.body.toremove
    // request.body.postid // id of to delete request
    try{
        reqadmin.deleteOne({ _id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Rejected Adminship"})
            }
        })    
    }
    catch(err){
        response.json({error:err})
    }
})

//accept admin request based on postid, 
router.post('/adminreqs/accept', (request,response)=> {
    // request.body.toremove
    // request.body.postid // id of to delete request
    try{
        userprofile.findOne({$and: [{_id: sanitize(request.body.postedby)}, { "adminstatus": false }]}, (err,docs) =>{
            if (err){
                response.json({error:"err1"})
            }
            else{
                if (docs.length <=0)
                {
                    response.json({error:"Not Super Admin"})
                }
                else 
                {
                    userprofile.updateOne({ _id: sanitize(request.body.postedby)},{ $set: { "adminstatus": true }}, (err) => {
                        if (err){

                            response.json({error:"err2"})
                        }
                        else{
                            reqadmin.deleteOne({ _id:sanitize(request.body._id)}, (err) =>{
                                if (err){
                                    response.json({error:"err3"})
                                }
                                else{
                                    response.json({message:"Added Admin"})
                                }
                            })
                        }
                    })
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// get all admin requests
router.post('/adminreqs', (request,response) => {
    try{
        if (request.body.superadmin) {
            reqadmin.find({}).sort({date: -1}).exec((err, docs) => {   
                if(err)
                {
                    response.json({error:err})
                }
                else{
                    // if(docs.length > numberofposts)
                    // {
                    //     response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    //     // response.send()
                    // }
                    // else if(docs.length <= numberofposts)
                    // {
                    //     response.json({backenddata:docs,rem:0})
                    //     // response.send(docs)
                    // }
                    // else{
                        response.json({backenddata:docs,rem:0})
                        // response.send(docs)
                    // }
                }
            })
        }
        else {
            response.json({error: "Not Super Admin"})
        }
    }
    catch(err){
        response.json({error:err})
    }
})

// list remove user based on keywords,email, (search)
router.get('/removeuser', (request,response) => {
    try{
        // const tmp = `.*`+sanitize(request.body.keywords)+'.*'
        // const numberofposts = sanitize(request.body.numberofposts)
        userprofile.find({}).sort({date: -1}).exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
            }
            else{
                response.json({backenddata:docs})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// remove user based on _id
router.post('/removeuser/delete', (request,response)=> {
    // request.body.toremove
    try{
        userprofile.deleteOne({ _id: sanitize(request.body.toremove)}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Deleted User"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})




/// Swap Reqeust

// load posts view more button, view post simply uses the object returned here
router.post('/swaprequest', (request,response) => {
    try{
        const numberofposts = sanitize(request.body.numberofposts)
        swaprequest.find({fullfilled:false}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send()
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/swaprequest/post', async (request,response) => {
    try{
        const swappost = new swaprequest({
            want: sanitize(request.body.want),
            contact: sanitize(request.body.contact),
            have: sanitize(request.body.have),
            postedby: sanitize(request.body.user_id)
        })
        const swapy = await swappost.populate("postedby", "fullname")
        swapy.save().then(data => {
            response.json({message:"Post Sucessful"})
        }).catch(err => {
            response.json({error:err})
        })    
    }
    catch(err){
        response.json({error:err})
    }
})

// render my posts
router.post('/swaprequest/myposts', async (request,response) => {
    try{
        swaprequest.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/swaprequest/delete', async (request,response) => {
    try{

        swaprequest.deleteOne({ _id:sanitize(request.body._id)}, (err) =>{

            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Post Deleted"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
// mark as fullfileed
router.post('/swaprequest/myposts/fulfilled', async (request,response) => {
    try{
        events.updateOne({ postedby: sanitize(request.body.user_id), _id:sanitize(request.body._id)},{ $set: { "fullfilled": true }}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Status Updated"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
//////


//// Marketplace

// load posts view more button, view post simply uses the object returned here
router.post('/marketplace', (request,response) => {
    try{
        const numberofposts = request.body.numberofposts
        marketplace.find().sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
            if(err)
            {
                response.json({error:err})
            }
            else{
                if(docs.length > numberofposts)
                {
                    response.json({backenddata:docs.slice(0, numberofposts),rem:docs.length-numberofposts})
                    // response.send()
                }
                else if(docs.length <= numberofposts)
                {
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
                else{
                    response.json({backenddata:docs,rem:0})
                    // response.send(docs)
                }
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// post 
router.post('/marketplace/post', async (request,response) => {
    try{
        const marketpost = new marketplace({
            field: sanitize(request.body.field),
            contact: sanitize(request.body.contact),
            content: sanitize(request.body.content),
            title: sanitize(request.body.title),
            image: sanitize(request.body.image),
            postedby: sanitize(request.body.user_id)
        })
        const masky = await marketpost.populate("postedby", "fullname")
        masky.save().then(data => {
            response.json({message:"Post Sucessfull"})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err){
        console.log(err)
    }
})

// render my posts
router.post('/marketplace/myposts', async (request,response) => {
    try{
        marketplace.find({ postedby: sanitize(request.body.user_id)}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// delete selected post
router.post('/marketplace/delete', async (request,response) => {
    try{
        marketplace.deleteOne({_id:sanitize(request.body._id)}, (err) =>{
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Post Deleted"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
// 


/// Myprofile
// load posts view more button, view post simply uses the object returned here

// render my status
router.get('/myprofile/status', async (request,response) => {

    try{
        userprofile.find({ postedby: sanitize(request.body.user_id)}).select({ "status": 1})
        .exec(function (err, docs) {
            if (err){
                response.json({error:err})
            }
            else{
                // Sending an array of posts
                response.json({backenddata:docs})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

// add to status
router.post('/myprofile/poststatus', async (request,response) => {    
    try{
        userprofile.updateOne({ postedby: sanitize(request.body.user_id), _id:sanitize(request.body._id)},{ $push: { "status": sanitize(request.body.status) }}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:'Added to status'})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})

router.post('/requestadminship', async (request,response) => {
    try{
        const adminreq = new reqadmin({
            fullname: sanitize(request.body.fullname),
            content: sanitize(request.body.content),
            postedby: sanitize(request.body.user_id)
        })
        const reqy = await adminreq.populate("postedby", "fullname")
        reqy.save().then(data => {
            response.json({message:'Request Submitted'})
        }).catch(err => {
            response.json({error:err})
        })
    }
    catch(err){
        response.json({error:err})
    }
})


router.post('/changepassword', (request,response) => {
    // newpassword
    // password
    //user_id
    try{
        const hashedpassword = crypto.createHash('sha256').update(sanitize(request.body.password)).digest('base64')
        userprofile.find({$and:[{ _id: sanitize(request.body.user_id)}, {password:hashedpassword}]}, (err, docs) =>{
            if (err){
                response.json({error:err})
            }
            else{
                if (docs.length < 1)
                {
                    response.json({message:'Password not mathced with previous password'})
                }
                else{
                    const newhashpass = crypto.createHash('sha256').update(sanitize(request.body.newpassword)).digest('base64')
                    userprofile.updateOne({ _id: sanitize(request.body.user_id)},{$set:{password:newhashpass}}, (err) => {
                        if(err){
                            response.json({error:err})
                        }
                        else{
                            response.json({message:"password changed"})
                        }
                    })
                }
            }
        });
    }
    catch(err){
        response.json({error:err})
    }
})
  
router.post('/changedisplayname', (request,response) => {
    // display name
    // user_id
    try{
        userprofile.updateOne({ _id: sanitize(request.body.user_id)},{ $set: { fullname: sanitize(request.body.displayname)}}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Name Updated"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})
   
router.post('/changedisplaypic', (request,response) => {
    // image
    // user_id
    try{
        userprofile.updateOne({ _id: sanitize(request.body.user_id)},{ $set: { image: sanitize(request.body.image)}}, (err) => {
            if (err){
                response.json({error:err})
            }
            else{
                response.json({message:"Image Updated"})
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
})


router.post('/forgotpassword', (request,response) => {

    try{
        const emaily = sanitize(request.body.email)

        userprofile.findOne({email:emaily}, (err,user)=>{
            if(err || !user){
                response.json({error:"User Does not exist"})
            }
            else{
                // const token = jwt.sign({_id:user.id},"secretkeyforgpass", {expiresIn:"20m"})
                // const href = `linkhere/resetpassword/${token}`  /// Link hoga app ka is se pehle
                const key =  crypto.randomBytes(32)
                const data ={
                    to:emaily,
                    from:"no-reply@ldf.com",
                    subject:"Password Reset",
                    html:`
                    <p> You Requested for password reset</p>
                    <h5> Reset Key is ${key}</h5>`
                }
                user.updateOne({resetlink:key, resettime: Date.now()+(600000*2)}, (err,sucess)=>{
                    if(err || !user){
                        response.json({error:"Link Error"})
                    }
                    else{
                        mg.messages().send(data, function (err, body) {
                            if(err){
                                response.json({error:err})
                            }
                            else{
                                response.json({message:"Email Sent, Check Inbox"});
                            }
                        });        
                    }
                })
            }
        })
    }
    catch(err){
        response.json({error:err})
    }
    
})

router.post('/resetpassword', (request,response)=>{
    try{
        const tokenfromuser = sanitize(request.body.token)
        const newpassword = sanitize(request.body.newpassword)

        if(tokenfromuser){
        
            userprofile.findOne({resetlink: tokenfromuser}, (err,user)=>{
                if(err || !user){
                    response.json({error:"No user with token"})
                }
                else if(user.resettime < Date.now){
                    response.json({error:"Token Expired"})
                }
                else{
                    const hashedpassword = crypto.createHash('sha256').update(newpassword).digest('base64')
                    const obj = {
                        password: hashedpassword,
                        resetlink: '',
                        resettime: -1
                    }
                    user = _.extend(user,obj)
                    user.save((err,result)=>{
                        if(err){
                            response.json({error:"Not processed"})
                        }
                        else{
                            response.json({message:"Updated Successfully"})
                        }
                    })
                }
            })
            
        }
        else{
            response.json(({error:"Auth Error"}))
        }
    }
    catch(err){
        response.json(({error:err}))
    }
})

// To de Done
//courses
router.post('/uploadcourses', (request,response) => {
    // image
    // user_id
    try{
        userprofile.updateOne({ _id: sanitize(request.body.user_id)},{ $set: { image: sanitize(request.body.image)}}, (err) => {
            if (err){
                console.log(err);
            }
            else{
                console.log('updated')
            }
        })
    }
    catch(err){
        console.log(err)
    }
})
// pictures wala sara compnent

module.exports = router


// backenddata
// message
// error