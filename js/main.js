var siss = new initSiss();function initSiss() {
	

	
	
    this.showLoading = function(msg) {
//    	$('#block-popup').remove();
//    	var page = $.mobile.activePage;
//    	var popup = $('<div id="block-popup" data-role="popup" data-dismissible="false" data-theme="c" data-shadow="true" data-overlay-theme="a"></div>').appendTo( page );
//    	popup.popup();
//    	page.page('destroy').page();		
//    	$('#block-popup').popup("open");
    	
    	$.mobile.loading( 'show', {text: msg,textVisible: true});
    	//setTimeout(function() {$.mobile.loading( 'show', {text: msg,textVisible: true});},100);	
    };
    
    this.hideLoading = function() {
//    	$('#block-popup').remove();
    	$.mobile.loading( 'hide'); 
    }; 
    
    this.areYouSure = function(text, callback) {

    	$('#conferma-popup').remove();
    	var page = $.mobile.activePage;
    	
    	var popup = $('<div id="conferma-popup" data-dismissible="false" data-role="popup" data-theme="f" data-shadow="true" data-overlay-theme="a"></div>').appendTo( page );    	
    	var header = $('<div id="conferma-popup-header" data-role="header" data-theme="e"><a  data-icon="question" data-iconpos="notext" class="ui-btn-left"></a> <h1>Conferma</h1> </div>').appendTo( popup );
    	var content = $('<div data-role="content" class="ui-corner-bottom ui-content" data-theme="b"> 	<h4 style="font-size: small; text-align: center;">'+text+'</h4> 	<div class="ui-content" style="text-align: center;"> 	<div style="margin:0 auto;"> 	<a ref="#"  class="conferma-popup-do" data-role="button" data-rel="back" data-inline="true" data-mini="true" data-theme="c" data-icon="check">Si</a> 	<a data-role="button" data-mini="true" data-inline="true" data-rel="back" data-transition="flow" data-theme="c" data-icon="delete">No</a> 	</div> 	</div> </div>').appendTo( popup );
    	popup.popup();
    	

    	
    	page.page('destroy').page();		
    	$('#conferma-popup').popup("open");
    	
//    	$("#conferma-popup").trigger("create");
    	page.trigger("refresh");
    	
    	$("#conferma-popup .conferma-popup-do").unbind("click.conferma-popup").on("click.conferma-popup", function() {
    	$('#conferma-popup').remove();
    	
//           page.page('destroy').page();
           $.mobile.loading( 'hide');
    		setTimeout(function() {    			
    			callback(false);
    		}, 300);
    		$(this).off("click.conferma-popup");
    	});		
    }    
    
    
 
    
    
    this.alertPopup = function(headerMsg, text, callback) {
//    function alertPopup(headerMsg, text) {

    	setTimeout(function() {

    		$('#alert-popup').remove();
    		var page = $.mobile.activePage;
    		var 
    		    popup = $('<div id="alert-popup" data-role="popup" style="max-width: 400px; " data-dismissible="false" data-theme="c" data-shadow="true" data-overlay-theme="a" data-transition="none"></div>').appendTo( page )
    		  , header = $('<div data-role="header" data-theme="e"><a data-rel="back" data-role="button" data-icon="alert" data-iconpos="notext" class="ui-btn-left"></a> <h1 class="alert-popup-header">'+headerMsg+'</h1> </div>').appendTo( popup )
    		  , content = $('<div data-role="content" class="ui-content" style="text-align: center;"><p>'+text+'</p><a href="#" id="alert-popup-button" data-mini="true" data-role="button" data-inline="true" data-rel="back" data-theme="c">Chiudi</a></div>').appendTo( popup );
    		popup.popup();
    		page.page('destroy').page();		
    		$('#alert-popup').popup("open");
    		$('#alert-popup-button').focus();
    		
        	$("#alert-popup-button").unbind("click").on("click", function() {
	     		setTimeout(function() {    			
	     			callback(false);
	     		}, 100);
//     		$(this).off("click");
     	});			

    	}, 100);		
    }    
    
}




//	window.onload = function() {		
//		var what_to_do = document.location.hash;
//		if (what_to_do != "")
//			window.location = "index.php";
//	};
//	
//	
//	$(document).on("click", ".btHome", function() {
//		var what_to_do = document.location.hash;
//		if (what_to_do != "")
//			window.location = "index.html";
//	});	
	
	jQuery.extend(jQuery.validator.messages, {
		required: "Questo campo � obbligatorio.",
		remote: "Riempire questo campo per continuare.",
		email: "Inserire un indirizzo email valido.",
		url: "Inserire un indirizzo URL valido.",
		date: "Inserire una data in formato mm-gg-aaaa.",
		dateDE: "Inserire una data in formato gg-mm-aaaa.",
		dateISO: "Inserire una data in formato aaaa-mm-gg.",
		number: "Inserire un numero.",
		digits: "Inserire (solo) un numero.",
		creditcard: "Inserire un numero di carta di credito valido.",
		equalTo: "Inserire lo stesso valore usato sopra.",
		accept: "Usare un'estensione valida.",
		maxlength: jQuery.format("Inserire al massimo {0} caratteri."),
		minlength: jQuery.format("Inserire almeno {0} caratteri."),
		rangelength: jQuery.format("Inserire da {0} a {1} caratteri."),
		range: jQuery.format("Inserire un numero compreso tra {0} e {1}."),
		max: jQuery.format("Inserire un numero minore o uguale a {0}."),
		min: jQuery.format("Inserire un numero maggiore o uguale a {0}.")
		});	

	jQuery.validator.addMethod('selectcheck', function (value) { 
		return (value != 'NULL'); 
	}, "Questo campo � obbligatorio.");


/**
 * 
 * cambio z-index, per sistemare bug di jquery con overlay di combobox
 */	
function changeZindex(input, inst) { setTimeout(function(){$('.ui-datepicker').css('z-index', 99999999999999);}, 0);}
	
$(function() {

		$( ".datepicker" ).datepicker({
			  beforeShow: changeZindex,
		      changeMonth: true,
		      changeYear: true,
		      yearRange: 'c-130:c+0'
		});	

  });




/**
 * 
 * @param date
 * @param orgFormat  %Y-%m-%d
 * @param newFormat  %d-%m-%Y
 */
function dateConvert(date, orgFormat, newFormat){
		
	  if(date == null || date == "") return date; 

	  return $.datepicker.formatDate(newFormat, $.datepicker.parseDate(orgFormat, date));

}



/**
 * 
 * @param date
 */
function strDateConvert(date){
	
	var yyyy = date.substring(0,4);
	var mm = date.substring(4,6);
	var gg = date.substring(6,8);
	return gg+"/"+mm+"/"+yyyy;
	
}




















function adderrorTooltip(text, target) {

	if($(target).IsBubblePopupOpen()){
		$(target).RemoveBubblePopup();
	}
	

	$(target).CreateBubblePopup();
	$(target).ShowBubblePopup({
		position : "top",
		align	 : "right",
		tail	 : {align: "right"},
		innerHtml: text,									
		themeName: 	'all-orange',
		themePath: 	'css/plugin/themes',
		alwaysVisible: false
	});		


};


function fakeCall(pathDati, callback) {

	// showBlockUI("Attendere Prego...");
	showLoading("Attendere Prego...");
	
	setTimeout(function() {
	
	
		$.get(pathDati, function(xml){
			
			var result = $.xml2json(xml);	 
	
			callback(result);
			
		});
		
	}, 3000);	


}




function errorPopup(headerMsg, text) {
	
	setTimeout(function() {

		$('#error-popup').remove();
		var page = $.mobile.activePage;
		var 
		    popup = $('<div id="error-popup" data-role="popup" data-dismissible="false" data-theme="e" data-shadow="true" data-overlay-theme="f" data-transition="flip"></div>').appendTo( page )
		  , header = $('<div data-role="header" data-theme="e"><a data-rel="back" data-role="button" data-icon="alert" data-iconpos="notext" class="ui-btn-left"></a> <h1 class="alert-popup-header">'+headerMsg+'</h1> </div>').appendTo( popup )
		  , content = $('<div data-role="content" class="ui-content" style="text-align: center;"><p>'+text+'</p><a href="#" id="error-popup-button" data-role="button" data-inline="true" data-rel="back" data-mini="true">Chiudi</a></div>').appendTo( popup );
		popup.popup();
		page.page('destroy').page();		
		$('#error-popup').popup("open");
		$('#error-popup-button').focus();
		$("#error-popup-button").bind ("click", function (event)
		{
		
		});
	
	}, 300);
}







function bin2String(array) {
	  return String.fromCharCode.apply(String, array);
}


function isMobileDevice(){
    return (
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent))
    );
}

function isMobileDeviceExeptIpad(){
    return (
        (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))
    );
}

function isShowBubblePopup(){

	return (!isMobileDeviceExeptIpad());
	
//	var width = $("body").css('width');
//	var height = $("body").css('height');
//	if(parseInt(width)  > 800 && parseInt(height)  > 600 && !isMobileDeviceExeptIpad()){
//		return true;
//	}else{
//		return false;
//	}
	
}
function erroreGenerale(arg1, arg2, arg3){
	errorPopup(arg2, arg3.message);  
}


