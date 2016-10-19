// Modules
var express = require('express');

// Express app
var app = express();

// Use public directory
app.use(express.static('public'));

// aREST
var piREST = require('pi-arest')(app);
piREST.set_id('34f5eQ');
piREST.set_name('lamp_module');
piREST.set_mode('bcm');

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero lamp module started!');
});
