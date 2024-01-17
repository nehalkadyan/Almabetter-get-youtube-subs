const express = require('express');
const app = express();
const subscriberModel = require("./models/subscribers")
// importing the path
const path = require('path'); 

// initializing static path for the index.html file
const staticPath = path.join(__dirname, "../public")
// middleware to first load the html before going at the api routes
app.use(express.static(staticPath));
// middleware to parse the JSON data into javascript object
app.use(express.json());
// using the swagger library for node documentation
 /**
   * @swagger
   * /subscribers:
   *  get:
   *      summary: Get all subscribers
   *      description : Retreive an array of all subscribers
   *      responses : 
   *          200:
   *              description : Successful Response
   * @swagger
   * /subscribers/names:
   *  get:
   *      summary: Get all subscribers' names and subscribed channels only
   *      description : Retrieve an array of subscribers with their names and subscribed channels only.
   *      responses : 
   *          200:
   *              description : Successful Response
   * @swagger
   * /subscribers/{id}:
   *  get:
   *      summary: Get a subscriber by ID
   *      description : Retrieve a subscriber by their unique ID
   *      parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          description: Subscriber ID
   *          schema:
   *            type: string
   *      responses : 
   *          200:
   *              description : Successful Response
   *          400:
   *              description : Subscriber not found
   */


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



// exporting the app
module.exports = app;
