var express = require('express');
var http = require('http');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var api_key = '864422500';
app.get('/films', function(request, response) {
  response.json(
    [
      {
        title: "Terminator Quadrilogy",
        distance: 0.21,
        genres: [
          "Action"
        ],
        certificate: "15",
        duration: "458",
        times: [
          {
            starttime: "2015-06-06 20:40:00",
            endtime: "2015-06-06 22:35:00",
            tickets: "http://cineworld.co.uk/booking?performance=3665518&amp;seats=STANDARD",
          }
        ]
      }
    ]
  );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
