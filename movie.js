const axios = require("axios");

let moviesFunction = async function (req, res) {
  const key = process.env.MOVIES_API_KEY;
  const movieName = req.query.query;
  let moviesArr = [];
  let moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieName}`;
  console.log(moviesURL);

  let movieResult = await axios.get(moviesURL);
  moviesArr = movieResult.data.results.map((item) => {
    return new Movies(item);
  });
  if (moviesArr.length > 20) moviesArr = moviesArr.slice(0, 20);
  res.status(200).send(moviesArr);
};

function Movies(elemnt) {
  this.title = elemnt.title;
  this.overview = elemnt.overview;
  this.avaregVotes = elemnt.vote_average;
  this.totalVotes = elemnt.vote_count;
  this.imageUrl = `https://image.tmdb.org/t/p/w500${elemnt.poster_path}`;
  this.popularity = elemnt.popularity;
  this.released_on = elemnt.release_date;
}
module.exports = moviesFunction;
