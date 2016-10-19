$( document ).ready(function() {

  $( "#on" ).click(function() {

    // Set lamp ON
    $.get('/on');

  });

  $( "#off" ).click(function() {

    // Set lamp OFF
    $.get('/off');

  });


});
