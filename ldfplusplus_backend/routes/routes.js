// Routing the Requests that come to our server
const crypto = require('crypto');

// Comment Empty
const express = require('express')
const router = express.Router()
const userprofile = require('../models/userprofile')
const gettogehter = require('../models/gettogether');




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


router.get('/gettogether', (request,response) => {
    gettogehter.find( (err, docs) =>{
        if (err){
            console.log(err);
        }
        else{
            const temp = docs.sort({date:1})
            response.send(temp)
        }
    })
})

router.post('/gettogether/post', async (request,response) => {
    const gettogetherpost = new gettogehter({
        content: request.body.content,
        title: request.body.title,
        contact: request.body.contact,
        postedby: request.body._id
    })
    const getpost = await gettogetherpost.populate("postedby", "fullname")
    getpost.save().then(data => {
        response.json(data)
    }).catch(error => {
        response.json(error)
    })
})

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



module.exports = router