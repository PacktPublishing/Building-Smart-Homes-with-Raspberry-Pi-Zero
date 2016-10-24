// Required modules
var express = require('express');
var app = express();
var piREST = require('pi-arest')(app);

// Thing name
piREST.set_id('98t52d');
piREST.set_name('pi_zero_cloud');
piREST.set_mode('bcm');

// Connect to cloud.aREST.io
piREST.connect();

// Start server
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});
