
$(function() {

	$("#ricerca-certificato-page-2").on('click', '#bt-stampa-lista', function (event) {	
		$("#table-certificati").jqprint();

	});

});	







$("#ricerca-certificato-page-1").live("pageshow", function (event, data) {

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

	$("#validation-ricerca").validate({
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
		submitHandler: successValidationRicerca,
		rules: {
			codicefiscale: "required"
		}	
	});		

});


$("#ricerca-certificato-page-1").live("pagebeforehide", function (event, data) {
	$("a, input").RemoveBubblePopup();
});

$('#btCercaCertificato').live('click', function (event, data) {
	$("#validation-ricerca").submit();
});


function successValidationRicerca() {

	$("#ricerca-certificato-page-2 h1").text("Lista Certificati");
	$("#table-certificati").hide();
	$("#tbody-certificati").html("");
	

	fakeCall("dati/ricercaCertificatiMalattiaResponse.xml", successRicerca); return;
	
	
	 var param = 
	   {
			"param":{
						"ricercaCertificati":{
							  "medico":{"codiceASL":application.codiceASL,"regione":"030"},
							  "codiceFiscale":$("#codice-fiscale-cerca").val(),
							  "dataInizioRicerca": $("#data-inizio-cerca").val(),
							  "dataFineRicerca": $("#data-fine-cerca").val()
						}
	        		}
		};
	 

	 
	
	CertificatiMalattiaService({
		 method: "ricercaCertificatiMalattia",
		 data: [param],
		 dataTypes: ["it.lombardia.crs.schemas.dcsanita.salus._2012_01.ricercacertificatimalattia.salusRicercaCertificatiMalattia"],
		 init: function(error){
			 showLoading("Il sistema è in attesa di ricevere la lista da INPS..");			 	
		 },			 
		 success: successRicerca,
		 error: function(error){
			 showErrorPage(error);
		 }
	});			
}





function successRicerca(response) {
	
    $.mobile.changePage("#ricerca-certificato-page-2");
    var listaCertificati = response.result.param.listaCertificati.datiCertificato;

    $("#ricerca-certificato-page-2 h1").text("Lista Certificati ( "+listaCertificati.length+" )");
	
	for(i=0; i<listaCertificati.length; i++){

		var annullato = (listaCertificati[i].annullato == "0") ? "NO" : "SI";
		
		 var str = "<tr> <td>" +
		 		listaCertificati[i].idCertificato +
		 		"</td><td>" +
		 		strDateConvert(listaCertificati[i].dataRicezione)  +
		 		"</td> <td>" +
		 		annullato+
		 		"</td><td>" +
		 		strDateConvert(listaCertificati[i].certificato.dataRilascio) +
		 		"</td><td>" +
		 		strDateConvert(listaCertificati[i].certificato.dataInizio) +
		 		"</td><td>" +
		 		strDateConvert(listaCertificati[i].certificato.dataFine) +
		 		"</td><td>" +
		 		listaCertificati[i].certificato.visita +
		 		"</td><td>" +
		 		listaCertificati[i].certificato.tipoCertificato +
		 		"</td></tr>";
		 
		 $("#tbody-certificati").append(str);
		 
	 }				

	 $("#table-certificati").show();


}


