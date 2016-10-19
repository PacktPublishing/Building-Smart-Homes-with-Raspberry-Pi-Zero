$( document ).ready(function() {

  // Buttons
  $( "#on" ).click(function() {

    // Set lamp ON
    $.get('/on');

  });

  $( "#off" ).click(function() {

    // Set lamp OFF
    $.get('/off');

  });

  // Indicators
  setInterval(function () {

    // Current
    $.get('/current', function(data) {
      $( "#current" ).text(data.current);
    });

    // Power
    $.get('/power', function(data) {
      $( "#power" ).text(data.power);
    });

  });

});
