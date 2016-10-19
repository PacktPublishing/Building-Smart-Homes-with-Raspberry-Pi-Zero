// Modules
var mcpadc = require('mcp-spi-adc');
var express = require('express');
var app = express();

// Use public directory
app.use(express.static('public'));

// Datastore
var Datastore = require('nedb')
  , db = new Datastore();

// Pin
var outputPin = 18;

// Routes
app.get('/', function (req, res) {

  res.sendfile(__dirname + '/public/interface.html');

});

app.get('/on', function (req, res) {

  piREST.digitalWrite(outputPin, 1);

  // Answer
  answer = {
    status: 1
  };
  res.json(answer);

});

app.get('/off', function (req, res) {

  piREST.digitalWrite(outputPin, 0);

  // Answer
  answer = {
    status: 0
  };
  res.json(answer);

});

// Data route
app.get('/data', function (req, res) {

  db.find({}, function (err, docs) {

    res.json(docs);

  });

});

// Pi-aREST instance
var piREST = require('pi-arest')(app);

// ADC channel
var channel = 5;

// Load resistance
var resistance = 10;

// AC voltage
var voltage = 230; // Europe

// ID should be 6 characters long
piREST.set_id('34f5eQ');
piREST.set_name('energy_meter');
piREST.set_mode('bcm');

// Variables
current = 0;
power = 0;

// Start server
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});

// Sensor measurement loop
var sensor = mcpadc.open(channel, {speedHz: 20000}, function (err) {
  if (err) throw err;

  // Measurement interval
  setInterval(function () {

    // Read
    sensor.read(function (err, reading) {
      if (err) throw err;

      // Calculate current
      var measuredVoltage = reading.value * 3.3;
      var measuredCurrent = (measuredVoltage/resistance) * 2000 / 1.41;

      // Calculate power
      var power = voltage * measuredCurrent;

      // Assign to aREST
      piREST.variable('power', power.toFixed(2));
      piREST.variable('current', measuredCurrent.toFixed(2));

      // Log
      var data = {
          current: measuredCurrent.toFixed(2),
          power: power.toFixed(2),
          date: new Date()
      };
      db.insert(data, function (err, newDoc) {
          console.log(newDoc);
      });

      // Log output
      console.log("Measured current: " + measuredCurrent.toFixed(2) + 'A');
      console.log("Measured power: " + power.toFixed(2) + 'W');

    });
  }, 500);
});
