$( document ).ready(function() {

  $( "#duty-cycle" ).mouseup(function() {

    // Get value
    var dutyCycle = $('#duty-cycle').val();

    // Set new value
    $.get('/set?dutyCycle=' + dutyCycle);

  });


});
