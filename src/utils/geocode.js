const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW51dXNocmVlIiwiYSI6ImNqeHhoZ3VlejA1em4zbG12cmhqeGQwMjcifQ.ukk_9tpHPlGcDPcoDEMdgg&limit=1';
    request({url, json: true}, (error, { body } = 0) => {
        if (error) {
            callback('Unable to connect weather app!', undefined);
        }
        else if (body.features.length === 0){
            callback('Unable to find location! Try another search.' , undefined);
        }
       else {
           callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
                location: body.features[0].place_name
           });
       }
       
    })

}

module.exports = geocode;