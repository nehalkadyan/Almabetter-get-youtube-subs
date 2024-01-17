const express = require('express')
const app = require('./app.js');
const cors = require("cors");
const mongoose = require('mongoose')
const port = 3000;
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Use CORS middleware
app.use(cors());



// Your code goes here
const options = {
    definition : {
      openapi : '3.0.0',
      info : {
        title : 'Documentation : Get Youtuber Subscribers (Capstone Project)',
        version : "1.0"
      },
      servers : [
        {
          url : "https://get-youtube-subs-yzwd.onrender.com/",
        }
      ]
    },
    apis : ["./src/app.js"]
  }
  
  const swaggerSpec = swaggerJSDoc(options)
  console.log(JSON.stringify(swaggerSpec, null, 2));

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  
 

// Connect to DATABASE
const DATABASE_URL = "mongodb+srv://kadyannehal:WtPfCZ5e5d6wPiZI@cluster0.5usidnl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
