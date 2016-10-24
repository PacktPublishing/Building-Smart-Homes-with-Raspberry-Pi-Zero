$( document ).ready(function() {

  console.log( "ready!" );

  // Get data
  $.get('/get', function(data) {

    $('#thermostat').html(data.targetTemperature);

  });

  $.get('/temperature', function(data) {

    $('#temperature').html(data.temperature);

  });

  $( "#set-thermostat" ).click(function() {

    // Get value
    var newThermostatValue = $('#thermostatValue').val();

    // Set new value
    $.get('/set?targetTemperature=' + newThermostatValue, function(data) {
      $('#thermostat').html(data.targetTemperature);
    });

  });


});
