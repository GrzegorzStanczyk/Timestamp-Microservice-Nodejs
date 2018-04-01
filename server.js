var express = require('express');
var app = express();
var moment = require('moment');

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', function(req, res) {
  const data = req.params.date;
  const parseDate = !!Number(data) ? Number(data) * 1000 : data;
  const d = new Date(parseDate);
  const unix = moment(d).isValid() ? moment(d).unix() : null;
  const natural = moment(d).isValid() ? moment(d).format('MMMM DD, YYYY') : null;
  const json = {
    'unix': unix,
    'natural': natural
  }
  res.json(json)
});

app.use((req, res, next) => {
  res.status(404).end('404');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
