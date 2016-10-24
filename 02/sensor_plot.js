// Sensor
var sensorLib = require('node-dht-sensor');

// Express app
var express = require('express');
var app = express();

// Use public directory
app.use(express.static('public'));

// Datastore
var Datastore = require('nedb')
  , db = new Datastore();

// Main route
app.get('/', function (req, res) {

  var readout = sensor.read();
  answer = 'Temperature: ' + readout.temperature.toFixed(2);
  answer += ' Humidity: ' + readout.humidity.toFixed(2);
  res.send({answer});

});


// Data route
app.get('/data', function (req, res) {

  db.find({}, function (err, docs) {

    res.json(docs); 

  });

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
        }, 10000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}