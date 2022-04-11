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
const instructorreviews = require('../models/instructoreviws');
const coursereviews = require('../models/coursereviews');
const courses =  require('../models/courses');
const discussionportal = require('../models/discussionportal');
const reqadmin = require('../models/reqadmin');
const swaprequest = require('../models/swaprequest');
const marketpalce = require('../models/marketplace');

function isSuperadmin(req, res, next) {
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
                if (docs.length ==1 && docs[0].superadmin == true)
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
    userprofile.find({ email: request.body.email}, (err,docs) => {
        if (err){
            console.log(err)
        }
        else{
            if (docs.length >= 1)
            {
                response.json(false)
            }
            else{
                const hashedpassword = crypto.createHash('sha256').update(request.body.password).digest('base64')
                const signedUpUser = new userprofile({
                    fullname: request.body.fullname,
                    email: (request.body.email).toLowerCase(),
                    password: hashedpassword
                })
                signedUpUser.save().then(data => {
                    response.json(data)
                }).catch(error => {
                    response.json(error)
                })
            }
        }
    })
})

router.post('/login', (request,response) => {
    const hashedpassword = crypto.createHash('sha256').update(request.body.password).digest('base64')
    userprofile.find({ email: request.body.email}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            if (docs.length < 1)
            {
                response.send(false)
            }
            else{
                const doc = docs[0]
                if (doc.password == hashedpassword)
                {
                    response.send(doc)
                }
                else{
                    response.send(false)
                }
            }
        }
    });
})

//// Get Togethers
// load posts view more button, view post simply uses the object returned here
router.get('/gettogether', (request,response) => {
    gettogehter.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/gettogether/post', async (request,response) => {
    const gettogetherpost = new gettogehter({
        content: request.body.content,
        title: request.body.title,
        contact: request.body.contact,
        postedby: request.body.user_id
    })
    const getpost = await gettogetherpost.populate("postedby", "fullname")
    getpost.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/gettogether/myposts', async (request,response) => {
    gettogehter.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/gettogether/myposts', async (request,response) => {
    gettogehter.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})
////


/// Events

// load posts view more button, view post simply uses the object returned here
router.get('/events', (request,response) => {
    events.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

//mark interested
router.post('/events/interested', async (request,response) => {
    events.updateOne({ postedby: request.body.user_id, _id:request.body._id},{ $push: { "interested": request.body.user_id }}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('updated')
        }
    })
})
// mark going
router.post('/events/going', async (request,response) => {    
    events.updateOne({ postedby: request.body.user_id, _id:request.body._id},{ $push: { "going": request.body.user_id }}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('updated')
        }
    })
})

// post 
router.post('/events/post', async (request,response) => {
    const eventspost = new events({
        content: request.body.content,
        title: request.body.title,
        contact: request.body.contact,
        postedby: request.body.user_id
    })
    const getpost = await eventspost.populate("postedby", "fullname")
    getpost.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/events/myposts', async (request,response) => {
    events.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/events/myposts', async (request,response) => {
    events.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})

//////


/// Job Posting/Career help

// load posts view more button, view post simply uses the object returned here
router.get('/careerhelp', (request,response) => {
    jobposting.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/careerhelp/post', async (request,response) => {
    const jobposty = new jobposting({
        content: request.body.content,
        title: request.body.title,
        salary: request.body.salary,
        location: request.body.location,
        postedby: request.body.user_id
    })
    const jobpost = await jobposty.populate("postedby", "fullname")
    jobpost.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/careerhelp/myposts', async (request,response) => {
    jobposting.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/careerhelp/myposts', async (request,response) => {
    jobposting.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})
////



// Donations

// load posts view more button, view post simply uses the object returned here
router.get('/donations', (request,response) => {
    donations.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/donations/post', async (request,response) => {
    const donationpost = new donations({
        content: request.body.content,
        title: request.body.title,
        postedby: request.body.user_id
    })
    const donpost = await donationpost.populate("postedby", "fullname")
    donpost.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/donations/myposts', async (request,response) => {
    donations.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/donations/myposts', async (request,response) => {
    donations.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})
////


// Food Delivery

// load posts view more button, view post simply uses the object returned here
router.get('/fooddelivery', (request,response) => {
    fooddelivery.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/fooddelivery/post', async (request,response) => {
    const foodpost = new fooddelivery({
        content: request.body.content,
        title: request.body.title,
        postedby: request.body.user_id,
        contact: request.body.contact,
        compensation: request.body.compensation,
        areafrom: request.body.areafrom,
        areato: request.body.areato
    })
    const foopos = await foodpost.populate("postedby", "fullname")
    foopos.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/fooddelivery/myposts', async (request,response) => {
    fooddelivery.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/fooddelivery/myposts', async (request,response) => {
    fooddelivery.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})
////

// Instructor Reviews

// search based on keywords
router.get('/instructorreviews', (request,response) => {
    const tmp = `.*`+request.body.keywords+'.*'
    instructorreviews.find({ "title": { "$regex": tmp, "$options": "i" } }).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/instructorreviews/post', async (request,response) => {
    const insrev = new instructorreviews({
        content: request.body.content,
        title: request.body.title,
        postedby: request.body.user_id,
        rating: request.body.rating
    })
    const inspos = await insrev.populate("postedby", "fullname")
    inspos.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/instructorreviews/myposts', async (request,response) => {
    instructorreviews.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/instructorreviews/myposts', async (request,response) => {
    instructorreviews.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})
////

// Course Reviews

// search based on keywords
router.get('/coursereviews', (request,response) => {
    const tmp = `.*`+request.body.keywords+'.*'
    coursereviews.find({ "title": { "$regex": tmp, "$options": "i" } }).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/coursereviews/post', async (request,response) => {
    const corsrev = new coursereviews({
        content: request.body.content,
        title: request.body.title,
        postedby: request.body.user_id,
        rating: request.body.rating
    })
    const corspos = await corsrev.populate("postedby", "fullname")
    corspos.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/coursereviews/myposts', async (request,response) => {
    coursereviews.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/coursereviews/myposts', async (request,response) => {
    coursereviews.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})

router.get('/coursereviews/browse', (request,response) => {
    courses.find({ semester: request.body.semester, major: request.body.major}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})
////


// Discussion Portal

// search based on keywords
router.get('/discussionportal', (request,response) => {
    const tmp = `.*`+request.body.keywords+'.*'
    discussionportal.find({ "title": { "$regex": tmp, "$options": "i" } }).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/discussionportal/post', async (request,response) => {
    const disport = new discussionportal({
        content: request.body.content,
        title: request.body.title,
        postedby: request.body.user_id,
        anonymous: request.body.anonymous
    })
    const disp = await disport.populate("postedby", "fullname")
    disp.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/discussionportal/myposts', async (request,response) => {
    discussionportal.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/discussionportal/myposts', async (request,response) => {
    discussionportal.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})

router.post('/discussionportal/like', async (request,response) => {    
    discussionportal.updateOne({ postedby: request.body.user_id, _id:request.body._id},{ $push: { "likes": request.body.user_id }}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('updated')
        }
    })
})

router.post('/discussionportal/comment', async (request,response) => {    
    discussionportal.updateOne({ postedby: request.body.user_id, _id:request.body._id},{ $push: { "comments": (request.body.user_id,request.body.comments) }}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('updated')
        }
    })
})

router.get('/discussionportal/comment', async (request,response) => {    
    discussionportal.find({}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})
////


/// Request Admin
router.post('/discussionportal/post', async (request,response) => {
    const adminpos = new reqadmin({
        content: request.body.content,
        fullname: request.body.fullname
    })
    const reqad = await adminpos.populate("postedby", "fullname")
    reqad.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

//// Admin Items

// search based on email or fullname number of posts required
router.get('/removeadmin',isSuperadmin, (request,response) => {
    const tmp = `.*`+request.body.keywords+'.*'
    userprofile.find({ $or:[ { "fullname": { "$regex": tmp, "$options": "i" }},{"email":request.body.keywords } ]}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})
//remove admin based on _id
router.post('/removeadmin', isSuperadmin, (request,response)=> {
    // request.body.toremove
    userprofile.updateOne({ _id: request.body.toremove},{ $set: { "adminstatus": false }}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('updated')
        }
    })
})
//reject admin request based on postid
router.post('/adminreqs/reject', isSuperadmin, (request,response)=> {
    // request.body.toremove
    // request.body.postid // id of to delete request
    reqadmin.deleteOne({ _id:request.body.postid}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})

//accept admin request based on postid, 
router.post('/adminreqs/accept', isSuperadmin, (request,response)=> {
    // request.body.toremove
    // request.body.postid // id of to delete request

    userprofile.findOne({$and: [{_id: req.body.user_id}, { "adminstatus": false }]}, (err,docs) =>{
        if (err){
            res.send({"Error": "Not Super Admin"})
        }
        else{
            if (docs.length <=0)
            {
                res.send({"Error": "Not Found"})
            }
            else 
            {
                userprofile.updateOne({ _id: request.body.toadd},{ $set: { "adminstatus": true }}, (err) => {
                    if (err){
                        console.log(err);
                    }
                    else{
                        reqadmin.deleteOne({ _id:request.body.postid}, (err) =>{
                            if (err){
                                console.log(err);
                            }
                            else{
                                response.json({'deleted':1})
                            }
                        })
                        console.log('updated')
                    }
                })
            }
        }
    })
})

// get all admin requests
router.get('/adminreqs',isSuperadmin, (request,response) => {
    reqadmin.find({}).sort({date: -1}).exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// list remove user based on keywords,email, (search)
router.get('/removeuser',isAdmin, (request,response) => {
    const tmp = `.*`+request.body.keywords+'.*'
    userprofile.find({ $or:[ { "fullname": { "$regex": tmp, "$options": "i" }},{"email":request.body.keywords } ]}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// remove user based on _id
router.post('/removeuser', isAdmin, (request,response)=> {
    // request.body.toremove
    userprofile.deleteOne({ _id: request.body.toremove}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('deleted')
        }
    })
})




/// Swap Reqeust

// load posts view more button, view post simply uses the object returned here
router.get('/swaprequest', (request,response) => {
    swaprequest.find({fullfilled:false}).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/swaprequest/post', async (request,response) => {
    const swappost = new swaprequest({
        want: request.body.want,
        contact: request.body.contact,
        have: request.body.have,
        postedby: request.body.user_id
    })
    const swapy = await swappost.populate("postedby", "fullname")
    swapy.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/swaprequest/myposts', async (request,response) => {
    swaprequest.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/swaprequest/myposts', async (request,response) => {
    swaprequest.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})
// mark as fullfileed
router.post('/swaprequest/myposts/fulfilled', async (request,response) => {
    events.updateOne({ postedby: request.body.user_id, _id:request.body._id},{ $set: { "fullfilled": true }}, (err) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('updated')
        }
    })
})
//////


//// Marketplace

// load posts view more button, view post simply uses the object returned here
router.get('/marketpalce', (request,response) => {
    marketpalce.find().sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
        if(err)
        {
            console.log(err)
            response.send({"error":err})
        }
        else{
            if(docs.length > request.body.numberofposts)
            {
                response.send(docs.slice(0, request.body.numberofposts))
            }
            if(docs.length <= request.body.numberofposts)
            {
                response.send(docs)
            }
            else{
                response.send(docs)
            }
        }
    })
})

// post 
router.post('/marketpalce/post', async (request,response) => {
    const marketpost = new marketpalce({
        field: request.body.field,
        contact: request.body.contact,
        content: request.body.content,
        title: request.body.title,
        image: request.body.image,
        postedby: request.body.user_id
    })
    const masky = await marketpost.populate("postedby", "fullname")
    masky.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

// render my posts
router.get('/marketpalce/myposts', async (request,response) => {
    marketpalce.find({ postedby: request.body.user_id}, (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            // Sending an array of posts
            response.send(docs) 
        }
    })
})

// delete selected post
router.post('/marketpalce/myposts', async (request,response) => {
    marketpalce.deleteOne({ postedby: request.body.user_id, _id:request.body._id}, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            response.json({'deleted':1})
        }
    })
})
// 


module.exports = router