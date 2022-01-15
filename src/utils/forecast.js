const request = require('request')
const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9fc558bc3f291020397aabf474525450&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)
    request({url , json: true},(error, response) => {
        if(error){
            callback('Unable to connect.', undefined)
        }else if(response.body.error){
            callback('Unable to find location co-ordinates.' , undefined)
        }else{
            callback(undefined , "The temperature is "+ response.body.current.temperature +" degree in "+response.body.location.name);
        }
    })
}

module.exports = forecast;