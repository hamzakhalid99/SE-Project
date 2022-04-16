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