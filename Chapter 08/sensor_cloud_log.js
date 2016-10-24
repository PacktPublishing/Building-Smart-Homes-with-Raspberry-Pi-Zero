// Required modules
var sensorLib = require('node-dht-sensor');
var request = require('request');

// Thing name
var thingName = 'mypizero';

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

        // Log data
        logData(readout);

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

function logData(readout) {

  // Build URL
  var url = "https://dweet.io/dweet/for/" + thingName;
  url += "?temperature=" + readout.temperature.toFixed(2);
  url += "&humidity=" + readout.humidity.toFixed(2);

  // Make request
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show response
    }
  });

}
