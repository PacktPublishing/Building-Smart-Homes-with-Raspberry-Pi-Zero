// Modules
var Gpio = require('pigpio').Gpio;
var express = require('express');

// Express app
var app = express();

// Use public directory
app.use(express.static('public'));

// Create led instance
var led = new Gpio(18, {mode: Gpio.OUTPUT});

// Routes
app.get('/', function (req, res) {

  res.sendfile(__dirname + '/public/interface.html');

});

app.get('/set', function (req, res) {

  // Set LED
  dutyCycle = req.query.dutyCycle;
  led.pwmWrite(dutyCycle);

  // Answer
  answer = {
    dutyCycle: dutyCycle
  };
  res.json(answer);

});

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero LED control started!');
});
