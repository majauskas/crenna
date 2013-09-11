

$(function() {

	$("#validation-invio-anagrafica").validate({
		invalidHandler: function(e, validator) {

			alertPopup("Errore di validazione", validator.numberOfInvalids() + " campi non sono validi");
		},
		showErrors: function(map, list) {
			$.each(this.currentElements, function() {
				$(this).RemoveBubblePopup();
			});	
	
			var errorList = this.errorList;
			for(i=0; i<errorList.length; i++){				
				adderrorTooltip(errorList[i].message, errorList[i].element);
				return;
			}	
		},
		submitHandler: function() {
			$.mobile.changePage("#invio-certificato-page-1-1");
		},
		rules: {
			codicefiscale: "required",
			cognome: "required",
			nome: "required",
			rdSessoCittadino: "required",
			datanascita: "required",
			provincianascita: { selectcheck: true }
		}
	
	});		

	
	
$("#invio-certificato-page-2").on('click', '#bt-to-home-from-invio', function (event) {
	areYouSure("Proseguendo non sarà più possibile stampare il certificato. Si vuole procedere?", function() {	
		window.location = "index.html";
	});
});	
	
	
});
















var invioCertificatoPageCreated=false;

$("#invio-certificato-page-1").live("pagecreate", function (event, data) {
	
	invioCertificatoPageCreated = true;
});


function cleanAddFieldsDatiAnagrafici(){

	 if(!invioCertificatoPageCreated) return;
	
	 if(application.datiCittadino == null){
			$("#dati-anagrafici-edit").show();
			$("#dati-anagrafici-no-edit").hide();	



	 }else{
			$("#dati-anagrafici-edit").hide();
			$("#dati-anagrafici-no-edit").show();	

	 }
	
}

$("#invio-certificato-page-1").live("pagebeforeshow", function (event, data) {
	
	cleanAddFieldsDatiAnagrafici();	
});	

	


	
$("#invio-certificato-page-1").live("pageinit", function (event, data) {

	

	$('#select-choice-provincianascita').selectmenu('refresh');
	//$('#select-choice-comunenascita').selectmenu('disable');	

	if(application.elencoProvince != null) return;

	WebSalusService({
		 method: "getElencoProvince",
		 data: [""],
		 dataTypes: ["java.lang.String"],
		 success: function(response){
		
			 application.elencoProvince = response.result;
			 
			 
			 
			 for(var key in application.elencoProvince) {
				 var provincia = application.elencoProvince[key];
				 $("#select-choice-provincia-residenza", "#invio-certificato-page-1-1").append('<option cd-sigla="' + provincia[2] + '" value="' + provincia[1] + '">' + provincia[0] + '</option>');
				 $("#select-choice-provincia-reperibilita", "#invio-certificato-page-1-1").append('<option cd-sigla="' + provincia[2] + '" value="' + provincia[1] + '">' + provincia[0] + '</option>');
				 
				 
			 }
			 
		    var foption = $('#select-choice-provincia-residenza option:first');
		    var soptions = $('#select-choice-provincia-residenza option:not(:first)').sort(function(a, b) {
		       return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
		    });
		    $('#select-choice-provincia-residenza').html(soptions).prepend(foption); 	

		    var foption = $('#select-choice-provincia-reperibilita option:first');
		    var soptions = $('#select-choice-provincia-reperibilita option:not(:first)').sort(function(a, b) {
		       return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
		    });
		    $('#select-choice-provincia-reperibilita').html(soptions).prepend(foption); 			 
			 
			 
		   
			 
			 
		 },
		 error: function(error){}
	});		


	 
	
	
});		



/**
 *  datanascita
 */
$('#datanascita').live('change', function (event, data) {
	
	
	 var datanascita = $("#datanascita").val();
	 $("#select-choice-provincianascita option[value != 'NULL']").remove();
	 $("#select-choice-comunenascita option[value != 'NULL']").remove();
	 
	 $("#select-choice-provincianascita").selectmenu('refresh');
	 $("#select-choice-comunenascita").selectmenu('refresh');
	 $("#select-choice-statoesteronascita").selectmenu('refresh');
	 
	 WebSalusService({
		 method: "getElencoProvince",
		 data: [datanascita],
		 dataTypes: ["java.lang.String"],
		 success: function(response){

			 $("#cbprovincianascita").show();	
			 
			 if(response.result.length>0){

				 $("#select-choice-provincianascita", "#invio-certificato-page-1").append('<option value="EE">- EE-ESTERO</option>');
				 
				 for(var key in response.result) {
					 var provincia = response.result[key];
					 $("#select-choice-provincianascita", "#invio-certificato-page-1").append('<option cd-sigla="' + provincia[2] + '" value="' + provincia[1] + '">' + provincia[0] + '</option>');
					 
				 }
			 
			    var foption = $('#select-choice-provincianascita option:first');
			    var soptions = $('#select-choice-provincianascita option:not(:first)').sort(function(a, b) {
			       return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			    });
			    $('#select-choice-provincianascita').html(soptions).prepend(foption); 	
			 }
			 
	 


		 },
		 error: function(error){}
	});			 

});



/**
 *  select-choice-provincianascita
 */
$('#select-choice-provincianascita').live('change', function (event, data) {
		
		var datanascita = $("#datanascita").val();
		var cdIstat = $('#select-choice-provincianascita option:selected').val();
		var isStatoEstero = false;
		
		
		if(cdIstat == "EE"){
			isStatoEstero = true;
			$("#cbcomunenascita").hide();
			$("#cbStatoEstero").show();	
		
		}else{
			$("#cbcomunenascita").show();
			$("#cbStatoEstero").hide();	
		}

		var selectId = "#select-choice-comunenascita";

		var method = "getElencoComuni";
		if(isStatoEstero){
			method = "getElencoNazioni";
			selectId = "#select-choice-statoesteronascita";
		}

		$(selectId+" option[value != 'NULL']").remove();
		$(selectId).selectmenu('refresh');
	
		WebSalusService({
			 method: method,
			 data: [datanascita,cdIstat],
			 dataTypes: ["java.lang.String","java.lang.String"],
			 success: function(response){

					$(selectId+" option[value != 'NULL']").remove();
					$(selectId).selectmenu('refresh');
				 
				 for(var key in response.result) {
					 var provincia = response.result[key];
					 $(selectId, "#invio-certificato-page-1").append('<option cd-comune-istat="' + provincia[3] + '" value="' + provincia[1] + '">' + provincia[0] + '</option>');					 
				 }
				 
			    var foption = $(selectId+' option:first');
			    var soptions = $(selectId+' option').sort(function(a, b) {
			       return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
			    });
			    $(selectId).html(soptions).prepend(foption); 			 
			    $(selectId).selectmenu('enable');
			    

			 },
			 error: function(error){}
		});			
		
		
		
		
	});








/**
 *  bt
 */
$('#btAvantiToReperibilita').live('click', function (event, data) {	
	$("#validation-invio-anagrafica").submit();
});

$("#invio-certificato-page-1").live("pagebeforehide", function (event, data) {
	$("a, input, textarea").RemoveBubblePopup();
});



$("#invio-certificato-page-1").live("pageshow", function (event, data) {

	 if(application.datiCittadino == null){
		 if(!isShowBubblePopup()) return;
		 
		 var target = $(this).find(".bt-header-open-panel");		
		 $(target).CreateBubblePopup(); 
		var datatooltip = JSON.parse($(target).attr("data-tooltip"));

		$(target).ShowBubblePopup({
			position : datatooltip.position,
			align	 : datatooltip.align,
			tail	 : {align: datatooltip.align},
			innerHtml: datatooltip.innerHtml,									
			themeName: 	'all-yellow',
			themePath: 	'css/plugin/themes',
			alwaysVisible: false
		});
		 
	 }
});



