

var invioCertificatoPage11Created=false;

$("#invio-certificato-page-1-1").live("pagecreate", function (event, data) {
	invioCertificatoPage11Created = true;
});


function cleanAddFieldsDatiReperibilita(){

	 if(!invioCertificatoPage11Created) return;
	
	 if(application.datiCittadino == null){


			$("#select-choice-provincia-residenza option[value='NULL']").attr("selected", "selected");
			$("#select-choice-comune-residenza option[value !='NULL']").remove();
			
			$('#select-choice-provincia-residenza').selectmenu('refresh');	
			$('#select-choice-comune-residenza').selectmenu('refresh');	

			$("#select-choice-provincia-reperibilita option[value='NULL']").attr("selected", "selected");
			$("#select-choice-comune-reperibilita option[value != 'NULL']").remove();
			$('#select-choice-provincia-reperibilita').selectmenu('refresh');	
			$('#select-choice-comune-reperibilita').selectmenu('refresh');	
			
			$('.res-rep').val(""); 			

	 }else{
			
			var capResidenzaCittadino = application.datiCittadino.capResidenzaCittadino;
			var cdProvinciaIstat = application.datiCittadino.idComuneResidenzaCittadino.substring(0,3);

			$('#capResidenza').val(capResidenzaCittadino); 
			$('#indirizzoResidenza').val(application.datiCittadino.indirizzoResidenzaCittadino+"  "+application.datiCittadino.civicoResidenzaCittadino);			

										
			$("#select-choice-provincia-residenza option[value='"+cdProvinciaIstat+"']").attr("selected", "selected");
			$('#select-choice-provincia-residenza').selectmenu('refresh');
			
			$("#select-choice-comune-residenza option[value != 'NULL']").remove();
			$('#select-choice-comune-residenza').append('<option cd-sigla="' + application.datiCittadino.provinciaResidenzaCittadino + '" value="1">' + application.datiCittadino.comuneResidenzaCittadino + '</option>');
			$("#select-choice-comune-residenza option[value='1']").attr("selected", "selected");
			$('#select-choice-comune-residenza').selectmenu('refresh');
			
			loadComboBoxComuni("select-choice-provincia-residenza", "select-choice-comune-residenza", capResidenzaCittadino);				

	 }
	
}

$("#invio-certificato-page-1-1").live("pagebeforeshow", function (event, data) {	
	cleanAddFieldsDatiReperibilita();	
});	



/**
 *  bt
 */
$('#btAvantiToDatiCertificato').live('click', function (event, data) {	
	$("#validation-invio-dati-reperibilita").submit();
});

$("#invio-certificato-page-1-1").live("pagebeforehide", function (event, data) {
	$("#invio-certificato-page-1-1 select, input, textarea").RemoveBubblePopup();
});


	
$("#invio-certificato-page-1-1").live("pageinit", function (event, data) {


	//if(invioCertificatoPage11Created) return;
	 
	 if(application.elencoProvince.length>0){

//		 for(var key in application.elencoProvince) {
//			 var provincia = application.elencoProvince[key];
//			 $("#select-choice-provincia-residenza", "#invio-certificato-page-1-1").append('<option cd-sigla="' + provincia[2] + '" value="' + provincia[1] + '">' + provincia[0] + '</option>');
//			 $("#select-choice-provincia-reperibilita", "#invio-certificato-page-1-1").append('<option cd-sigla="' + provincia[2] + '" value="' + provincia[1] + '">' + provincia[0] + '</option>');
//			 
//			 
//		 }
//		 
//	    var foption = $('#select-choice-provincia-residenza option:first');
//	    var soptions = $('#select-choice-provincia-residenza option:not(:first)').sort(function(a, b) {
//	       return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
//	    });
//	    $('#select-choice-provincia-residenza').html(soptions).prepend(foption); 	
//
//	    var foption = $('#select-choice-provincia-reperibilita option:first');
//	    var soptions = $('#select-choice-provincia-reperibilita option:not(:first)').sort(function(a, b) {
//	       return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
//	    });
//	    $('#select-choice-provincia-reperibilita').html(soptions).prepend(foption); 
	    
//	    if(application.datiCittadino != null){
//	    	
//	    	cleanAddFieldsDatiReperibilita();
//	    	
//
//	    }
	    
	    
	 }
	
		
	
	
	
});		






$(function() {


	$("#validation-invio-dati-reperibilita").validate({
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
			$.mobile.changePage("#invio-certificato-page-1-2");
		},
		rules: {
			provinciaresidenza: { selectcheck: true },
			comuneresidenza: { selectcheck: true },
			capresidenza: "required",
			indirizzoResidenza: "required",			
			provinciareperibilita: { selectcheck: true },
			comunereperibilita: { selectcheck: true },
			capreperibilita: "required",
			indirizzoreperibilita: "required",
			datarilascio: "required",
			datainizio: "required",
			datafine: "required",
			tipovisita: { selectcheck: true },
			tipocertificato: { selectcheck: true },
			notediagnosi: "required"

		}	
	});		

});





function loadComboBoxComuni(idcbProvincia, idcbComunene, capCittadino){

	
	var cdIstat = $('#'+idcbProvincia+' option:selected').val();

	var selectId = "#"+idcbComunene;

//	$(selectId+" option[value != 'NULL']").remove();
//	$(selectId).selectmenu('refresh');

	 WebSalusService({
		 method: "getElencoComuni",
		 data: ["",cdIstat],
		 dataTypes: ["java.lang.String","java.lang.String"],
		 success: function(response){

				$(selectId+" option[value != 'NULL']").remove();
				$(selectId).selectmenu('refresh');
			 
			 for(var key in response.result) {
				 var comune = response.result[key];
				 $(selectId, "#invio-certificato-page-1-1").append('<option cd-comune-istat="' + comune[3] + '" value="' + comune[1] + '">' + comune[0] + '</option>');					 
			 }
			 
		    var foption = $(selectId+' option:first');
		    var soptions = $(selectId+' option').sort(function(a, b) {
		       return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
		    });
		    $(selectId).html(soptions).prepend(foption); 			 
		    $(selectId).selectmenu('enable');
		    
		    
			if(capCittadino!=null){			
				$(selectId+" option[value='"+capCittadino+"']").attr("selected", "selected");					
				$(selectId).selectmenu('refresh');		    
			}
		    

		 },
		 error: function(error){}
	});	
	
	
}


/**
 *  select-choice-provincia-residenza
 */
$('#select-choice-provincia-residenza').live('change', function (event, data) {
	
	loadComboBoxComuni("select-choice-provincia-residenza", "select-choice-comune-residenza", null);

});


/**
 *  select-choice-provincia-residenza
 */
$('#select-choice-provincia-reperibilita').live('change', function (event, data) {
	
	loadComboBoxComuni("select-choice-provincia-reperibilita", "select-choice-comune-reperibilita", null);

});












