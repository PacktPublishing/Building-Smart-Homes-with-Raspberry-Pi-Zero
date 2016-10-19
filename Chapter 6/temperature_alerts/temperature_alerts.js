// Required modules
var request = require('request');
var sensorLib = require('node-dht-sensor');

// IFTTT data
var key = "key";
var eventName = 'temperature_low';

// Temperature sensor GPIO
var sensorPin = 18;

// Threshold
var threshold = 30;

// Counter between two alerts
var interval = 60 * 1000; // 1 minute
var counter = new Date();

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, sensorPin);
    },
    read: function () {

        // Read
        var readout = sensorLib.read();
        temperature = readout.temperature.toFixed(2);
        console.log('Current temperature: ' + temperature);

        // Check counter so we don't trigger IFTTT all the time
        var currentTime = (new Date()).getTime();
        var counterTime = counter.getTime();

        if ( (currentTime - counterTime) > interval) {

          if (temperature < threshold) {

            // Restart Counter
            counter = new Date();

            // Send event
            alertIFTTT();

          }

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
function alertIFTTT() {

  // Send alert to IFTTT
  console.log("Sending alert to IFTTT");
  var url = 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Alert sent to IFTTT");
    }
  });
}
