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
      resp_films[0].title = film[0].title;
      resp_films[0].genres = film[0].genres;
      resp_films[0].certificate = film[0].certificate;
      resp_films[0].duration = film[0].duration;
      
      response.json(resp_films);
    });
  
    
    
  
  // response.json(
  //   [
  //     {
  //       title: "Terminator Quadrilogy",
  //       distance: 0.21,
  //       genres: [
  //         "Action"
  //       ],
  //       certificate: "15",
  //       duration: "458",
  //       times: [
  //         {
  //           starttime: "2015-06-06 20:40:00",
  //           endtime: "2015-06-06 22:35:00",
  //           tickets: "http://cineworld.co.uk/booking?performance=3665518&amp;seats=STANDARD",
  //         }
  //       ]
  //     }
  //   ]
  // );
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
