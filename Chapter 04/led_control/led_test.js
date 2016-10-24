// Modules
var Gpio = require('pigpio').Gpio;

// Create led instance
var led = new Gpio(18, {mode: Gpio.OUTPUT});
var dutyCycle = 0;

// Go from 0 to maximum brightness
setInterval(function () {
  led.pwmWrite(dutyCycle);

  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 20);
