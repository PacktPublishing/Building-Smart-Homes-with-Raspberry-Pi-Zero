// Modules
var Gpio = require('pigpio').Gpio;

// Create motor instance
var motorSpeed = new Gpio(18, {mode: Gpio.OUTPUT});
var motorDirectionOne = new Gpio(14, {mode: Gpio.OUTPUT});
var motorDirectionTwo = new Gpio(15, {mode: Gpio.OUTPUT})

// Init motor direction
motorDirectionOne.digitalWrite(0);
motorDirectionTwo.digitalWrite(1);

var dutyCycle = 0;

// Go from 0 to maximum brightness
setInterval(function () {
  motorSpeed.pwmWrite(dutyCycle);

  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 20);
