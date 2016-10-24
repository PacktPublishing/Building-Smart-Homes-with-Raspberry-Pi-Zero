// Start
var express = require('express');
var app = express();
var piREST = require('pi-arest')(app);

piREST.set_id('34f5eQ');
piREST.set_name('my_rpi_zero');

var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});
