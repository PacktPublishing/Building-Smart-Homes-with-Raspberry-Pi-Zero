// Required modules
var request = require('request');
var sensorLib = require('node-dht-sensor');

// IFTTT data
var key = "key";
var eventName = 'data';

// Temperature sensor GPIO
var sensorPin = 18;

// Counter between two notifications
var interval = 60 * 1000; // 1 minute

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, sensorPin);
    },
    read: function () {

        // Read
        var readout = sensorLib.read();
        temperature = readout.temperature.toFixed(2);
        humidity = readout.humidity.toFixed(2);

        console.log('Current temperature: ' + temperature);
        console.log('Current humidity: ' + humidity);

        // Send event
        logIFTTT(temperature, humidity);

        // Repeat
        setTimeout(function () {
            sensor.read();
        }, interval);
    }
};

// Init sensor
if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}

// Make request
function logIFTTT(temperature, humidity) {

  // Send alert to IFTTT
  console.log("Sending message to IFTTT");
  var url = 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + key;
  url += '?value1=' + temperature + '&value2=' + humidity;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Data sent to IFTTT");
    }
  });
}
