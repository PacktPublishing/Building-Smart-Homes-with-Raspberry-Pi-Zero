// Sensor
var sensorLib = require('node-dht-sensor');

// Express app
var express = require('express');
var app = express();

// Main route
app.get('/', function (req, res) {

  var readout = sensor.read();
  answer = 'Temperature: ' + readout.temperature.toFixed(2);
  answer += ' Humidity: ' + readout.humidity.toFixed(2);
  res.send(answer);

});

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero app listening on port 3000!');
});


// Sensor
var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {

        // Read
        var readout = sensorLib.read();
        return readout;   
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}