// Modules
var express = require('express');
var sensorLib = require('node-dht-sensor');

// Express app
var app = express();

// aREST
var piREST = require('pi-arest')(app);
piREST.set_id('4g0d7f');
piREST.set_name('sensor_module');
piREST.set_mode('bcm');

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero motion sensor started!');
});

// Sensor loop
var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        var readout = sensorLib.read();
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}