const axios = require("axios");

let weatherFunction = async function (req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const key = process.env.WEATHER_API_KEY;
  let finalResult = [];

  let result = await axios.get(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`
  );
  finalResult = result.data.data.map((item) => {
    return new Forecast(item);
  });
  res.status(200).send(finalResult);
};

function Forecast(el) {
  this.description = `Low of ${el.low_temp}, high of ${el.high_temp} with ${el.weather.description}`;
  this.date = `${el.valid_date}`;
}

module.exports = weatherFunction;
