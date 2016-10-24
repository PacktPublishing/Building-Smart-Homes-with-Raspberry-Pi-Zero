// Sensor
var sensorLib = require('node-dht-sensor');

// Datastore
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'path/to/datafile', autoload: true });

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {

        // Read
        var readout = sensorLib.read();
        
        // Log
        var data = {
            humidity: readout.humidity.toFixed(2),
            temperature: readout.temperature.toFixed(2),
            date: new Date()
        };
        db.insert(data, function (err, newDoc) { 
            console.log(newDoc);
        });

        // Repeat
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