'use strict'
const express = require ('express');
const server = express();
const weatherData = require ('./data/weather.json')
const PORT = 3010;


// http://localhost:3010/weather
server.get('/weather',(req,res)=>{
    const cityName = req.qury.cityName;
const lat = req.qury.lat;
const lon = req.qury.lon;
let theWeather = weatherData[0].data.find((item) =>{
    if( item.city_name === cityName && itemm.lat === lat && item.lon === lon ){
    return item;
    }
    else{
        return 'nothing-found';
    }
});

});
let resultArr = [];
if (result != 'nothing-found'){
    result.data.forEach(item => {
        resultArr.push(
            {
                description: `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`, data: `${item.datetime}`}
        )

        
    });
    res.send(resultArr);
}


server.get('*',(req,res) =>{
    res.status(404).send('PAGE NOT FOUND')
})
server.listen(PORT,() =>{
    console.log(`I am listening on ${PORT}`)
})

