"use strict";
require(dotenv).config();
const express = require("express");
const server = express();
const weatherData = require("./data/weather.json");
const PORT =process.env.PORT;

// http://localhost:.3010/weather
server.get("/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  console.log(`req: lat=${lat}, lon=${lon}`);

  let theWeather = weatherData.find((item) => {
    if (item.lat === lat && item.lon === lon) {
      return true;
    }
  });

  if (theWeather) {
    let resultArr = [];
    theWeather.data.forEach((item) => {
      resultArr.push({
        description: `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`,
        date: `${item.datetime}`,
      });
      console.log(resultArr);
    });
    
    res.set('Access-Control-Allow-Origin', '*');
    res.send(resultArr);
  }
});

server.get("*", (req, res) => {
  res.status(500).send("Somthing Went Wrong");
});
server.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
