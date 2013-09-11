


$(document).on('click', '#bt-registrati', function (event) {
	$("#accedi-view").hide();
	$("#registrati-view").show();
});

$(document).on('click', '#bt-annulla', function (event) {
	$("#accedi-view").show();
	$("#registrati-view").hide();
});




$(document).on('click', '#bt-registrazione', function (event) {

});


$(document).on('click', '#bt-accedi', function (event) {

});



$(document).on('pageinit', '#home-page', function (event) {

	//setTimeout(function() {$.mobile.loading( 'show', {text: "asdas",textVisible: true});},100);	
	

    $.ajax({ 
      type: "POST",
      url: 'php/api.php',               
      data: {sql_string: "SELECT * FROM utenti"},                       
      dataType: 'json',                   
      success: function(data)          
      {
    	  alert(data);

      },
	  error: function(error){	

	  } 
    });	
	
	
});	




//$(document).ready(function() {
//   
//});



