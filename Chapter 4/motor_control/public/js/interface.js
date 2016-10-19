$( document ).ready(function() {

  $( "#motor-speed" ).mouseup(function() {

    // Get value
    var speed = $('#motor-speed').val();

    // Set new value
    $.get('/set?speed=' + speed);

  });


});
