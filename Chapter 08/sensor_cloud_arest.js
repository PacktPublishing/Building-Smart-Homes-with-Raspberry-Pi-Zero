// Required modules
var sensorLib = require('node-dht-sensor');
var express = require('express');
var app = express();
var piREST = require('pi-arest')(app);

// Thing name
piREST.set_id('73gutg');
piREST.set_name('pi_zero_cloud');
piREST.set_mode('bcm');

// Sensor measurement loop
var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {

        // Readout
        var readout = sensorLib.read();
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');

        // Save data
        piREST.variable('temperature', readout.temperature.toFixed(2));
        piREST.variable('humidity', readout.humidity.toFixed(2));

        // Get motion sensor data
        piREST.digitalRead(18, function(data) {

          if (data == 1) {
            piREST.variable('motion', "Motion Detected");
          }
          else {
            piREST.variable('motion', "No Motion");
          }

        });

        // Repeat
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

// Connect to cloud.aREST.io
piREST.connect();

// Start server
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});

// Init sensor
if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}
