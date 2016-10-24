// Modules
var express = require('express');

// Express app
var app = express();

// aREST
var piREST = require('pi-arest')(app);
piREST.set_id('35f5fc');
piREST.set_name('alarm');
piREST.set_mode('bcm');

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero alarm started!');
});
