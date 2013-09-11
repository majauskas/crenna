

//$("#cancella-certificato-page-1").live("pageshow", function (event, data) {
$(document).on('pageshow', '#cancella-certificato-page-1', function (event, data) {
	
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


$('#btCancellaCertificato').live('click', function (event, data) {
	$("#validation-cancella").submit();
});

$("#cancella-certificato-page-1").live("pagebeforehide", function (event, data) {
	$("a, input, textarea").RemoveBubblePopup();
});	

$(function() {

	$("#validation-cancella").validate({
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
		submitHandler: successValidationCancella,
		rules: {
			codicefiscale: "required",
			protocollo: "required"
		}	
	});		

});
	
function successValidationCancella() {

	
	areYouSure("Sei sicuro di voler annullare il certificato?", function() {

		//fakeCall("dati/cancellaCertificatoMalattiaResponse.xml", successCancella); return;
		
	 var param = 
	   {
					"param":{
							"cancellaCertificato":{
								  "medico":{"codiceASL":application.codiceASL,"regione":"030"},
	                              "lavoratore":{
	                                              "codiceFiscale": $('#codice-fiscale-cancella').val()
	                                           },
	                               "certificato":{
	                            	   				"protocolloDaCancellare": $('#protocollo-cancella').val()
	                            	   			 }
							}
	        }
		};
	 
	
	CertificatiMalattiaService({
		 method: "cancellaCertificatoMalattia",
		 data: [param],
		 dataTypes: ["it.lombardia.crs.schemas.dcsanita.salus._2010_01.cancellacertificatomalattia.salusCancellaCertificatoMalattia"],
		 init: function(error){
			 showLoading("Il sistema è in attesa di ricevere la conferma di annullamento del certificato da parte di INPS...");			 	
		 },		 
		 success: successCancella,
		 error: function(error){
			 showErrorPage(error);
		 }
	});			

	});		

}


function successCancella(response) {
	
	$.mobile.changePage("#cancella-certificato-page-2");

	var protocolloDaCancellare = response.result.param.rispostaCancellaCertificato.certificato.protocolloDaCancellare; 
	var protocolloINPS = response.result.param.rispostaCancellaCertificato.datiINPS.protocolloINPS; 			
	$("#cancella-certificato-page-2 .description").html("Il certificato con protocollo N. "+protocolloDaCancellare+" e' stato annullato correttamente");				
	$("#cancella-certificato-page-2 .protocolloINPS").html("Identificativo del annullamento: "+protocolloINPS);
	
}
