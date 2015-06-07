/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var http = require('http');

var app = express();
var utils = require('./utils');
var _ = require('lodash');
var faf = require('./findanyfilm');

app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/films', function (request, response) {
  var lat = request.query.lat || 0;
  var lon = request.query.lon || 0;

  // utils.getPostcode(lat, lon)
  //   .then(faf.getCinemas)
  //   .then(faf.getFilms)
  //   .then(function (films) {
  //   response.json(films);
  // });
  // screw the api

  var resp_films = [];
  utils.getPostcode(lat, lon)
    .then(faf.getFilmsByLoc)
    .then(function (films) {
      console.log(films[0].screenings[0])
      var film_id = films[0].screenings[0].film_id;
      
      var screenings = {
        venue_website: films[0].venue_website,
        screenings: films[0].screenings[0]
      }

      resp_films.push(screenings)
      return faf.getFilmInfo(film_id);
    })
    .then(function (film) {
      var resp = {}
      resp.title = film[0].title;
      resp.genres = film[0].genres;
      resp.certificate = film[0].certificate;
      resp.duration = film[0].duration;
      resp.venue_website = resp_films[0].venue_website;
      resp.starttime = resp_films[0].screenings.times[0].starttime
      resp.tickets = resp_films[0].screenings.times[0].tickets
      response.json(resp);
    });
  
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
