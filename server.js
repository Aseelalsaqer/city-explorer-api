"use strict";

require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT;
const axios = require("axios");
const Cors = require("cors");
server.use(Cors());

// http://localhost:3300/weather?cityName=Amman&lat=31.9515694&lon=35.9239625
server.get("/weather", async (req, res) => {
  const cityName = req.query.cityName;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const key = process.env.WEATHER_API_KEY;
  let finalResult = [];
//   try {
    let result = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&lat=${lat}&lon=${lon}&key=${key}`
    );
    finalResult = result.data.data.map((item) => {
      return new Forecast(item);
    });
    res.status(200).send(finalResult);
//   } catch {
//     console.log("error");
//   }
});
function Forecast(el) {
  this.description = `Low of ${el.low_temp}, high of ${el.high_temp} with ${el.weather.description}`;
  this.date = `${el.valid_date}`;
}
// http://localhost:3300/movies?query=Amman
server.get("/movies", async (req, res) => {
  const key = process.env.MOVIES_API_KEY;
  const movieName = req.query.query;
  let moviesArr = [];
  let moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieName}`;
  console.log(moviesURL);
  try {
    let movieResult = await axios.get(moviesURL);
    moviesArr = movieResult.data.results.map((item) => {
      return new Movies(item);
    });
    res.status(200).send(moviesArr);
  } catch {
    console.log("Err");
  }
});
function Movies(elemnt) {
  this.title = elemnt.title;
  this.overview = elemnt.overview;
  this.avaregVotes = elemnt.vote_average;
  this.totalVotes = elemnt.vote_count;
  this.imageUrl = `https://image.tmdb.org/t/p/w500${elemnt.poster_path}`;
  this.popularity = elemnt.popularity;
  this.poster = elemnt.release_date;
}
server.get("*", (req, res) => {
  res.status(500).send("Somthing Went Wrong");
});
server.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
