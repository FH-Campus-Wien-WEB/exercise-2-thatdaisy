const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  /* Task 1.2. Remove the line below and eturn the movies from 
     the model as an array */
  const moviesArray = Object.entries(movieModel).map(([id, movie]) => ({
    imdbID: id,
    ...movie // spread operator
  }));
  res.json(moviesArray);
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
  const movie = movieModel[req.params.imdbID];
  if (movie) {
    res.send({ imdbID: req.params.imdbID, ...movie });
  } else {
    res.sendStatus(404);
  }
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */
app.put('/movies/:imdbID', function (req, res) {
  if (movieModel[req.params.imdbID]) {
    movieModel[req.params.imdbID] = req.body;
    res.sendStatus(200);
  } else {
    movieModel[req.params.imdbID] = req.body;
    console.log('new movie added', req.params.imdbID, Object.keys(movieModel));
    res.status(201).send(req.body);
  }
});
     
app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

