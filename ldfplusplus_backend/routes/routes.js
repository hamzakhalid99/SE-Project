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
    const tmp = `.*`+request.body.keywords+'.*'
    events.find({ "title": { "$regex": tmp, "$options": "i" } }).sort({date: -1}).populate("postedby", "fullname").exec((err, docs) => {   
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
router.post('/careerhelp/post', async (request,response) => {
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
router.get('/careerhelp/myposts', async (request,response) => {
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
router.post('/careerhelp/myposts', async (request,response) => {
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


module.exports = router