const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9c973bf103ad4cb6da2be63f9e4fa7bd&query=' + lat + ',' + long + '&units=f'
    request({url: url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(
                undefined, 
                body.current.weather_descriptions[0] +  '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.'
            )
        }
    })
}

module.exports = forecast