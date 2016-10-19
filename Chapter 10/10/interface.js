// Modules
var express = require('express');
var request = require('request');

// Express app
var app = express();

// Raspberry Pi boards IP addresses
var motionSensorPi = "192.168.0.101:3000";
var sensorPi = "192.168.0.102:3000"
var lampPi = "192.168.0.103:3000"

// Pins
var lampPin = 12;
var motionSensorPin = 17;

// Use public directory
app.use(express.static('public'));

// Routes
app.get('/', function (req, res) {

  res.sendfile(__dirname + '/public/interface.html');

});

app.get('/motion', function (req, res) {

  request("http://" + motionSensorPi + "/digital/" + motionSensorPin,
    function (error, response, body) {

      // Answer
      answer = {
        status: body.return_value
      };
      res.json(answer);

  });

});

app.get('/temperature', function (req, res) {

  request("http://" + sensorPi + "/temperature",
    function (error, response, body) {

      // Answer
      answer = {
        temperature: body.temperature
      };
      res.json(answer);

  });

});

app.get('/humidity', function (req, res) {

  request("http://" + sensorPi + "/humidity",
    function (error, response, body) {

      // Answer
      answer = {
        humidity: body.humidity
      };
      res.json(answer);

  });

});

app.get('/on', function (req, res) {

  request("http://" + lampPi + "/digital/" + lampPin + '/1');

  // Answer
  answer = {
    status: 1
  };
  res.json(answer);

});

app.get('/off', function (req, res) {

  request("http://" + lampPi + "/digital/" + lampPin + '/0');

  // Answer
  answer = {
    status: 0
  };
  res.json(answer);

});

// Automation
setInterval(function() {

  // Check sensor
  request("http://" + motionSensorPi + "/digital/" + motionSensorPin,
    function (error, response, body) {

      // If motion was detected
      if (body.return_value == true) {

        request("http://" + lampPi + "/digital/" + lampPin + '/1');

      }
      else if {

        request("http://" + lampPi + "/digital/" + lampPin + '/0');

      }

  });

}, 1000);

// Start server
app.listen(3000, function () {
  console.log('Home automation system started');
});
