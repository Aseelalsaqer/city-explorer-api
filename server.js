'use strict'
const express = require ('express');
const server = express();
const weatherData = require ('./data/weather.json')
const PORT = 3010;


// http://localhost:3010/weather?cityName=Seattle
server.get('/weather',(req,res)=>{
    const cityName = req.query.cityName;
const lat = req.query.lat;
const lon = req.query.lon;
let theWeather = weatherData.find((item) =>{
    if( item.city_name === cityName && item.lat === lat && item.lon === lon ){
    return item;
    }
    else{
        return 'nothing-found';
    }
});
let resultArr = [];
if (theWeather != 'nothing-found'){
    theWeather.data.forEach(item => {
        resultArr.push(
            {
                description: `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`, data: `${item.datetime}`}
        )
        console.log(resultArr);
        
    });
    
    res.send(resultArr);
}

});


server.get('*',(req,res) =>{
    res.status(500).send('Somthing Went Wrong')
})
server.listen(PORT,() =>{
    console.log(`I am listening on ${PORT}`)
})

