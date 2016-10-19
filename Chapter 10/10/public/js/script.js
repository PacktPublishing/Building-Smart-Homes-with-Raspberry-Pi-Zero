$( document ).ready(function() {

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
    $.get('/motion', function(data) {

      if (data.status == true) {
        $( "#motion-status" ).text("No Motion");
      }
      else {
        $( "#motion-status" ).text("Motion Detected");
      }

    });

  }, 2000);

  setInterval(function () {

  	// Temperature
    $.get('/temperature', function(data) {

      $( "#temperature-status" ).text(data.temperature);
   
    });

  }, 2000);

  setInterval(function () {

    // Temperature
    $.get('/humidity', function(data) {

      $( "#humidity-status" ).text(data.humidity);
   
    });

  }, 2000);

});
