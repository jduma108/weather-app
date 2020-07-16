const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9c973bf103ad4cb6da2be63f9e4fa7bd&query=' + lat + ',' + long + '&units=f'
    request({url: url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            const weatherDescription = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const feelsLikeTemp = body.current.feelslike
            const humidity = body.current.humidity
            const windSpeed = body.current.wind_speed
            callback(
                undefined, 
                weatherDescription + '. ' + 'It is currently ' + temp + ' degrees out, but it feels like ' + feelsLikeTemp + ' degrees. Humidity is ' + humidity + ' degrees and the wind speed is ' + windSpeed + ' mph.'
            )
        }
    })
}

module.exports = forecast