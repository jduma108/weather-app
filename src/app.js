const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath )
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jill Duma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jill Duma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page.',
        name: 'Jill Duma'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    } 

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error){
            return res.send({error})
        } 
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })    
})

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term.'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404 Error',
        errorMessage: 'Help article not found.',
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404 Error',
        errorMessage: 'Page not found.',
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})