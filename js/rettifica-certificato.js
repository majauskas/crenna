$("#rettifica-certificato-page-1").live("pageshow", function (event, data) {

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


$(function() {

	
	

	$("#form-rettifica").validate({
		invalidHandler: function(e, validator) {},
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
		submitHandler: successValidationRettifica,
		rules: {
			codicefiscale: "required",
			protocollo: "required",
			datafine: "required"
		},
		 messages: {
			    datafine: "Data fine è un campo obbligatorio"
		 }		
	});		

	
	
	
	
$("#rettifica-certificato-page-2").on('click', '#bt-to-home-from-rettifica', function (event) {
	areYouSure("Proseguendo non sarà più possibile stampare il certificato. Si vuole procedere?", function() {	
		window.location = "index.html";
	});
});		


$("#rettifica-certificato-page-1").on('click', '#btRettificaCertificato', function (event) {	


////    var url = "data:application/pdf;base64,JVBERi0xLjQKJaqrrK0K";
//
//	var specialElementHandlers = {
//			'#codice-fiscale-rettifica':function(element, renderer){
//				return true;
//			}
//	}
//	var doc = new jsPDF();
//	var aaaaa = doc.fromHTML($("#form-rettifica").get(0),15,15,{
//		'width':170,
//		'elementHandlers':specialElementHandlers
//	});
//	 var out = jQuery.base64.encode(doc.output());
//	 
//	
//	document.location.href = "data:application/pdf;base64,"+out;
	
	

	
	
	
	
	$("#form-rettifica").submit();

});



});

	

$("#rettifica-certificato-page-1").live("pagebeforehide", function (event, data) {
	$("a, input, textarea").RemoveBubblePopup();
});	









	

	
function successValidationRettifica() {
	
	areYouSure("Sei sicuro di voler inviare la rettifica all'INPS?", function() {

					
			//fakeCall("dati/rettificaCertificatoMalattiaResponse.xml", successRettifica); return;

		 
			 var param = 
			   {
							"param":{
									"rettificaCertificato":{
										  "medico":{"codiceASL":application.codiceASL,"regione":"030"},
			                              "lavoratore":{
			                                              "codiceFiscale": $('#codice-fiscale-rettifica').val()
			                                           },
			                               "certificato":{
			                            	   				"dataFine":$('#data-fine-rettifica').val(),
			                            	   				"protocolloDaRettificare": $('#protocollo-rettifica').val()
			                            	   			 }
									}
			        }
				};
			 
			
			CertificatiMalattiaService({
				 method: "rettificaCertificatoMalattia",
				 data: [param],
				 dataTypes: ["it.lombardia.crs.schemas.dcsanita.salus._2010_01.rettificacertificatomalattia.salusRettificaCertificatoMalattia"],
				 init: function(error){
					 showLoading("Il sistema è in attesa di ricevere il nuovo protocollo assegnato da INPS al certificato...");			 	
				 },		 
				 success: successRettifica,
				 error: function(error){
					 showErrorPage(error);
				 }
			});			

				

			});	

}

function successRettifica(response) {
	
	application.rettificaCertificatoDocumento = response.result.param.rispostaRettificaCertificato.documento;
	
	$.mobile.changePage("#rettifica-certificato-page-2");
	
	$("#rettifica-certificato-page-2 .protocolloINPS").html(" Protocollato con nr. " + response.result.param.rispostaRettificaCertificato.datiINPS.protocolloINPS);
	
}




$('#bt-stampa-promemoria-rettifica').live('click', function (event, data) {

	$.mobile.changePage("#view-pdf-page");
	$.mobile.loading( 'show');	
	
	var rettificaCertificatoDocumento = bin2String(application.rettificaCertificatoDocumento);

	
	$.ajax({
		   type: 'POST',
		   url: "pdf",
		   dataType: "json",
		   data: { "action" : "save", "document" : rettificaCertificatoDocumento },
		   success: function(data, textStatus, jqXHR){	
				
			    new PDFObject({url: "pdf?action=view"}).embed("pdf-container");	
				$.mobile.loading( 'hide');	
		   },
		   error: function(error, textStatus, errorThrown){	
			   showErrorPage(error);
		   }
		});		
	
	
});

