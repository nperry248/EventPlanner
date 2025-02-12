// app.js

const express = require('express');
const app = express();
const config = require('./config.js');

const event_db = require('./eventdb.js')



var startTime;

//
// main():
//
app.listen(config.port, () => {
  startTime = Date.now();
  console.log('**Web service running, listening on port', config.port);
  //
  // Configure AWS to use our config file:
  //
  process.env.AWS_SHARED_CREDENTIALS_FILE = config.events_config;
});

//
// request for default page /
//
app.get('/', (req, res) => {
  try {
    console.log("**Call to /...");
    
    let uptime = Math.round((Date.now() - startTime) / 1000);

    res.json({
      "status": "running",
      "uptime-in-secs": uptime,
      "dbConnection": event_db.state
    });
  }
  catch(err) {
    console.log("**Error in /");
    console.log(err.message);

    res.status(500).json(err.message);
  }
});


//
//
// Web Service Functions - API
//
//

// Search
let search = require('./api_search.js')
app.get('/search/:city', search.search_events);

/*
let details = require('./api_details.js')
let save = require('./api_save.js')
let saved = require('./api_saved.js')
*/