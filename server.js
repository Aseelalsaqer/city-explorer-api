"use strict";

require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT;

const Cors = require("cors");
server.use(Cors());
const Weather = require("./weather.js");
const Movie = require("./movies");

// http://localhost:3300/weather?cityName=Amman&lat=31.9515694&lon=35.9239625
server.get("/weather", Weather);

// http://localhost:3300/movies?query=Amman
server.get("/movies", Movie);

server.get("*", (req, res) => {
  res.status(500).send("Somthing Went Wrong");
});
server.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
