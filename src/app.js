const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views' );
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handelbars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather!',
        name: 'Anushree Sharma'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me!',
        name: 'Anushree Sharma'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need help?',
        message: 'this is a weather app.',
        name: 'Anushree Sharma'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if(error){ 
            return res.send( { error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send( { error});
            }
            res.send( {
                forecast: forecastData,
                location,
                address: req.query.address
            })
        
    })
})
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search area'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*' , (req,res) => {
    res.render('404', {
        title: 'ERROR:',
        name: 'Anushree Sharma',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404' , {
        title: 'ERROR:',
        name: 'Anushree Sharma',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port );
})