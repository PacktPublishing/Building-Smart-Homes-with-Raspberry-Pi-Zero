// Required modules
var request = require('request');
var sensorLib = require('node-dht-sensor');

// IFTTT data
var key = "key";
var eventNameLow = 'temperature_low';
var eventNameHigh = 'temperature_high';

// Temperature sensor GPIO
var sensorPin = 18;

// Threshold
var target = 25;
var tolerance = 1;

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, sensorPin);
    },
    read: function () {

        // Read
        var readout = sensorLib.read();
        temperature = readout.temperature.toFixed(2);
        console.log('Current temperature: ' + temperature);

          if (temperature < target - tolerance) {

            // Send event
            alertIFTTT(temperature_low);

          }

          if (temperature > target + tolerance) {

            // Send event
            alertIFTTT(temperature_high);

          }

        // Repeat
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

// Init sensor
if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
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
