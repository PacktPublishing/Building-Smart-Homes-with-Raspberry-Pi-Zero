// Modules
var Gpio = require('pigpio').Gpio;
var express = require('express');

// Express app
var app = express();

// Use public directory
app.use(express.static('public'));

// Create led instance
var motorSpeed = new Gpio(18, {mode: Gpio.OUTPUT});
var motorDirectionOne = new Gpio(14, {mode: Gpio.OUTPUT});
var motorDirectionTwo = new Gpio(15, {mode: Gpio.OUTPUT});

// Routes
app.get('/', function (req, res) {

  res.sendfile(__dirname + '/public/interface.html');

});

app.get('/set', function (req, res) {

  // Set motor speed
  speed = req.query.speed;
  motorSpeed.pwmWrite(speed);

  // Set motor direction
  motorDirectionOne.digitalWrite(0);
  motorDirectionTwo.digitalWrite(1);

  // Answer
  answer = {
    speed: speed
  };
  res.json(answer);

});

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero Motor control started!');
});
