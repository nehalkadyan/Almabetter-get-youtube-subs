const express = require('express');
const app = express();
const subscriberModel = require("./models/subscribers")

// Your code goes here
app.use(express.json());

//endpoint for getting an array of all subscribers
app.get("/subscribers", async (req, res) => {
   try{
    const subscribers = await subscriberModel.find();
    res.json(subscribers)
   }catch(err){
      res.status(500).json({message : err.message})
   }
})

// endpoint for getting an array of subscribers with their name and subscribedChannel only
app.get("/subscribers/names", async (req, res) => {
    try{
        const subscribersInfo = await subscriberModel.find({}, "name subscribedChannel")
        const subscribers = subscribersInfo.map(subscriber => ({
            name : subscriber.name,
            subscribedChannel: subscriber.subscribedChannel
        }))
        res.json(subscribers)
    }catch(err){
        res.status(500).json({message : err.message})
    }

})

//endpoint for getting a subscriber with id
app.get("/subscribers/:id", async(req, res) => {
    const subscriberId = req.params.id;
    try{
      const subscriber = await subscriberModel.findById(subscriberId);
      if(subscriber){
        res.json(subscriber)
      }else{
        res.status(400).json({message : "subscriber not found!"})
      }
    }catch(err){
        res.status(400).json({message : err.message})
    }
})



module.exports = app;
