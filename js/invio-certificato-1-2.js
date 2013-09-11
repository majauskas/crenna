
$(function() {
	

	$( "#datainizio" ).datepicker({
		  beforeShow: changeZindex,				      
	      maxDate: 0
	});		
	
	$( "#datarilascio" ).datepicker({
	  beforeShow: changeZindex,
      minDate: -1, 				      
      maxDate: 0
    });	



	$( "#datafine" ).datepicker({
		  beforeShow: changeZindex,				      
		  minDate: -1
	});	


	$("#validation-invio-dati-certificato").validate({
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
		submitHandler: successValidationInvio,
		rules: {
			datarilascio: "required",
			datainizio: "required",
			datafine: "required",
			tipovisita: { selectcheck: true },
			tipocertificato: { selectcheck: true },
			notediagnosi: "required"

		}		
	});		

	
	


	
	
	$("#invio-certificato-page-1-2").on('keypress', '#tx-search-diagnosi', function (event) {
		if (event.keyCode == '13') {
			searchDiagnosi();
		}
	});	
	

	$("#invio-certificato-page-1-2").on('click', '#bt-search-diagnosi', function (event) {
		searchDiagnosi();
	});	

	
	
});


	
$("#invio-certificato-page-1-2").live("pageinit", function (event, data) {


	
	$('#listview-diagnosi').on('click','p',function(e){

		var dsDiagnose = $(this).text();
		var cdDiagnose = $(this).attr("codice");
	    
		
		$("#tx-note-diagnosi").val(dsDiagnose);
		$("#tx-codice-diagnosi").val(cdDiagnose);
		$("#fc-codice-diagnosi").show();
		
		$("#listview-diagnosi").html("");
		$("#listview-diagnosi").listview("refresh");
	});	
	

	var currentDate = $.datepicker.formatDate('dd/mm/yy', new Date());	
	$("#datarilascio").val(currentDate);
	$("#datainizio").val(currentDate);
	
	
});		


function searchDiagnosi(){
	
	var sugList = $("#listview-diagnosi");
	var text = $("#tx-search-diagnosi").val();
	

	
	if(text.length < 4) {
		sugList.html("");
		sugList.listview("refresh");
	} else {
		
		$.mobile.showPageLoadingMsg();

		WebSalusService({
			 method: "getElencoDiagnosi",
			 data: [text],
			 dataTypes: ["java.lang.String"],
			 success: function(response){

				var str = "";

				 if(response.result.length>0){

					 for(var key in response.result) {
						 var diagnose = response.result[key];
						 str += "<li data-icon='false'><a style='font-size: x-small;'><p class='my-list-view' codice='" +
						 		diagnose[1] +
						 		"'>" +
						 		diagnose[0] +
						 		"</p><span class='ui-li-count'>" +
						 		diagnose[1] +
						 		"</span></a></li>";
					 }
				 }
				 
				 sugList.html(str);
				 sugList.listview("refresh");	
				$("#fc-codice-diagnosi").hide();
				$("#tx-note-diagnosi").val("");
				$("#tx-codice-diagnosi").val("");	
				$.mobile.hidePageLoadingMsg();	
				 
			 },
			 error: function(error){$.mobile.hidePageLoadingMsg();}
		});	

	}
}	



/**
 *  bt
 */
$('#btInviaCertificato').live('click', function (event, data) {
	$("#validation-invio-dati-certificato").submit();
});

$("#invio-certificato-page-1-2").live("pagebeforehide", function (event, data) {
	$("#invio-certificato-page-1-2 select, input, textarea").RemoveBubblePopup();
});


	
function successValidationInvio() {



	areYouSure("Sei sicuro di voler inviare il certificato all'INPS?", function() {	

	//	fakeCall("dati/invioCertificatoMalattiaResponse.xml", successInvio); return;

	
		var sessoCittadino = $('input[name=rdSessoCittadino]:radio:checked').val();
		if(sessoCittadino == undefined && application.datiCittadino != null){
			sessoCittadino = application.datiCittadino.sessoCittadino;
		}
		
		var comunenascita = $('#select-choice-comunenascita option:selected');	
		var idComuneNascita = comunenascita.attr("cd-comune-istat");
		var comuneNascita = comunenascita.text();
		if(idComuneNascita == undefined && application.datiCittadino != null){
			idComuneNascita = application.datiCittadino.idComuneNascitaCittadino;
			comuneNascita = application.datiCittadino.comuneNascitaCittadino;
		}		
		var provinciaNascita = $('#select-choice-provincianascita option:selected').attr("cd-sigla");
		if(provinciaNascita == undefined && application.datiCittadino != null){
			provinciaNascita = application.datiCittadino.provinciaNascitaCittadino;		
		}
		
		
		var comuneResidenza = $('#select-choice-comune-residenza option:selected');	
		var idComuneResidenza = comuneResidenza.attr("cd-comune-istat");
		var comuneResidenza = comuneResidenza.text();
		if(idComuneResidenza == undefined && application.datiCittadino != null){
			idComuneResidenza = application.datiCittadino.idComuneResidenzaCittadino;
			comuneResidenza = application.datiCittadino.comuneResidenzaCittadino;
		}		
		var provinciaResidenza = $('#select-choice-provincia-residenza option:selected').attr("cd-sigla");
		if(provinciaResidenza == undefined && application.datiCittadino != null){
			provinciaResidenza = application.datiCittadino.provinciaResidenzaCittadino;		
		}
		
		
	 var param = 
	   {
					"param":{
							"invioCertificato":{
								  "medico":{"codiceASL":application.codiceASL,"regione":"030"},
	                              "lavoratore":{
	                                              "codiceFiscale":$(".txCodiceFiscaleCittadino").val(),
	                                              "cognome":$(".txCognomeCittadino").val(),
	                                              "nome":$(".txNomeCittadino").val(),
	                                              "sesso":sessoCittadino,
	                                              "dataNascita":dateConvert($(".dtDataNascitaCittadino").val(), "dd/mm/yy", "yymmdd"),
	                                              "idComuneNascita":idComuneNascita,
	                                              "comuneNascita":comuneNascita,
	                                              "provinciaNascita":provinciaNascita,
	                                              "residenzaAbituale":{
	                                            	  					"indirizzo":$("#indirizzoResidenza").val(),
	                                            	  					"CAP":$("#capResidenza").val(),
	                                            	  					"idComune":idComuneResidenza,
	                                            	  					"comune":comuneResidenza,
	                                            	  					"provincia":provinciaResidenza
	                                            	  				   }
	                                            },
	                               "certificato":{
	                            	   				"dataRilascio":dateConvert($("#datarilascio").val(), "dd/mm/yy", "yymmdd"),
	                            	   				"dataInizio":dateConvert($("#datainizio").val(), "dd/mm/yy", "yymmdd"),
	                            	   				"dataFine":dateConvert($("#datafine").val(), "dd/mm/yy", "yymmdd"),
	                            	   				"codiceDiagnosi":$("#tx-codice-diagnosi").val(),
	                            	   				"noteDiagnosi":$("#tx-note-diagnosi").val()
	                            	   			 }
							}
	        }
		};
	 
	 

	var ischecked = $("#checkbox-reperibilita-residenza").attr("checked");
	if(!ischecked){			
		var comuneReperibilita = $('#select-choice-comune-reperibilita option:selected');	
		var idComuneReperibilita = comuneReperibilita.attr("cd-comune-istat");
		var comuneReperibilita = comuneReperibilita.text();
		var provinciaReperibilita = $('#select-choice-provincia-reperibilita option:selected').attr("cd-sigla");	
		
		param.param.invioCertificato.lavoratore.residenzaReperibilita = {
											"nominativo":$("#cognome-reperibilita").val(),
											"indirizzo":$("#indirizzo-reperibilita").val(),
											"CAP": $("#cap-reperibilita").val(),
											"idComune":idComuneReperibilita,
											"comune":comuneReperibilita,
											"provincia":provinciaReperibilita
										   }; 
	}


	 var tipoCertificato = $('#select-choice-tipocertificato option:selected').val();
	 var tipoVisita = $('#select-choice-tipovisita option:selected').val();
	 
	 
	CertificatiMalattiaService({
		 method: "invioCertificatoMalattia",
		 data: [param,tipoVisita,tipoCertificato],
		 dataTypes: ["it.lombardia.crs.schemas.dcsanita.salus._2010_01.inviocertificatomalattia.salusInvioCertificatoMalattia","java.lang.String","java.lang.String"],
		 init: function(error){
			 showLoading("Il sistema è in attesa di ricevere il protocollo assegnato da INPS al certificato...");
		 },			 
		 success: successInvio,
		 error: function(error){
			 showErrorPage(error);

		 }
	});

	 
	});
}





function successInvio(response) {

	application.invioCertificatoDocumento = response.result.param.rispostaInvioCertificato.documento;

	 $.mobile.changePage("#invio-certificato-page-2");
	$("#protocolloINPS").html("Nr Protocollo INPS: " + response.result.param.rispostaInvioCertificato.datiINPS.protocolloINPS);

	
	
}


/**
 * bt-stampa-promemoria
 */
$('#bt-stampa-promemoria').live('click', function (event, data) {

	$.mobile.changePage("#view-pdf-page");
	$.mobile.loading( 'show');
	
	
	var invioCertificatoDocumento = bin2String(application.invioCertificatoDocumento);

	
	$.ajax({
		   type: 'POST',
		   url: "pdf",
		   dataType: "json",
		   data: { "action" : "save", "document" : invioCertificatoDocumento },
		   success: function(data, textStatus, jqXHR){	
			    new PDFObject({url: "pdf?action=view"}).embed("pdf-container");
			    $.mobile.loading( 'hide');
		   },
		   error: function(error, textStatus, errorThrown){	
			   showErrorPage(error);
		   }
		});		
	
	
});















