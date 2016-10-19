// Modules
var express = require('express');

// Express app
var app = express();

// aREST
var piREST = require('pi-arest')(app);
piREST.set_id('47g40f');
piREST.set_name('motion_module');
piREST.set_mode('bcm');

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero motion sensor started!');
});
