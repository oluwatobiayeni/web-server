const request = require('request')
const forecast= (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0532abc710196d7af96645d48c8cd429&query='+latitude +','+longitude+' &units=f'
    request({url,json:true }, (error,{body})=>{
        if (error) {
            callback('unable to connect to weather services')
        }
        else if (body.error){
            callback('unable to find location')
        }
        else {
            const temp= body.current.temperature
            const like= body.current.feelslike
            callback(undefined,'It is currently'+temp,'degrees out,It feels like',+like,'degrees out.')
        }
    })
} 
module.exports= forecast