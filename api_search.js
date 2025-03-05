//
// app.get('/search/:city', async (req, res) => {...})
//
// Return events based on city, and other optional parameters

const eventsdb = require('./eventdb.js')

const axios = require('axios')

// Will move to better folder later
const key = 'AedbGcl2gJCJDcQP2UplDow8bdRn03Za'
const base_url = 'https://app.ticketmaster.com/discovery/v2/events'



//
// Calls to ticketmaster
//
const searchEvents = async (city, category='') => {

    try {
        const params = {
            apikey: key,
            city: city,
            // ...(category && { classificationName: category }), // Optional param
            sort: 'date,asc',
            size: 10  // Limit number of results
        }

        const response = await axios.get(base_url, { params });

        if (response.data._embedded && response.data._embedded.events) {
            return response.data._embedded.events.map(event => ({
                event_id: event.id,
                name: event.name,
                date: event.dates.start.dateTime,
                location: `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}`,
                url: event.url
            }));
        } else {
            return [];
        }

    }//try
    catch (error) {
        console.error('Error fetching events from Ticketmaster:', error.response?.data || error.message);
        throw new Error('Failed to fetch events.');
    }//catch
}//searchEvents

//
// get /search
//

exports.search_events = async (req, res) => {
    console.log('**Call to get /search/:city...')

    try {
        const city = req.params.city;

        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        
        const data = await searchEvents(city)

    
        res.json({
            message: 'success',
            data: data
        });

    }//try
    catch (err) {
        console.log("**Error in /users");
        console.log(err.message);
        
        res.status(500).json({
          "message": err.message,
          "data": []
        });
      }//catch



}//get