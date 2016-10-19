// Required modules
var request = require('request');
var gpio = require('rpi-gpio');

// IFTTT data
var key = "key"
var eventOnName = 'motion_detected';
var eventOffName = 'no_motion';

// Motion sensor
var motionSensorPin = 18;
var motionSensorState = false;

// Setup gpio library
gpio.setMode(gpio.MODE_BCM);

// Check status every second
setInterval(function() {

  // Check sensor
  gpio.setup(motionSensorPin, gpio.DIR_IN, checkSensor);

}, 1000);

// Check motion sensor
function checkSensor() {
  gpio.read(motionSensorPin, function(err, value) {

      // If motion is detected
      if (value == true && motionSensorState == false) {

        // Send event
        alertIFTTT(eventOnName);

      }

      // No motion anymore
      if (value == false && motionSensorState == true) {

        // Send event
        alertIFTTT(eventOffName);

      }

      // Set status
      motionSensorState = value;
  });
}

// Make request
function alertIFTTT(eventName) {

  // Send alert to IFTTT
  console.log("Sending alert to IFTTT");
  var url = 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Alert sent to IFTTT");
    }
  });
}
