


function btCercaCittadinoControl(){
	
	var txCodiceFiscaleCittadinoRicerca = $("#txCodiceFiscaleCittadinoRicerca").val();	
	var txCognomeCittadinoRicerca = $("#txCognomeCittadinoRicerca").val();
	var txNomeCittadinoRicerca = $("#txNomeCittadinoRicerca").val();
	var sessoCittadinoRicerca = $('input[name=sessoCittadinoRicerca]:radio:checked').val();
	
	
	if(txCodiceFiscaleCittadinoRicerca.length == 16 || (txCognomeCittadinoRicerca != "" && txNomeCittadinoRicerca != "" && sessoCittadinoRicerca != undefined)) {
		$("#bt-cerca-cittadino").removeClass('ui-disabled');
	}else if (txCognomeCittadinoRicerca == "" || txNomeCittadinoRicerca == "" || sessoCittadinoRicerca == undefined){
		$("#bt-cerca-cittadino").addClass('ui-disabled');
	}	
}


$(function() {

$("body").on('keyup', '#txCodiceFiscaleCittadinoRicerca, #txCognomeCittadinoRicerca, #txNomeCittadinoRicerca', function (event) {
	btCercaCittadinoControl();
});	

$("body").on('keypress', '.panel-1', function (e) {

	if(e.which == 13 && !(/ui-disabled/i.test($("#bt-cerca-cittadino").attr("class")))){
		
		onbtCercaCittadino();
	}

});	

});





$('.bt-header-open-panel').live('click', function (event, data) {

	$(".bubblepopup").each(function( index ) {$(this).RemoveBubblePopup();});

	$('#panel-identifica-cittadino').remove();
	var page = $.mobile.activePage;
	var 
    panel = $('<div data-role="panel" data-position="right" data-position-fixed="false" data-display="reveal" id="panel-identifica-cittadino" data-theme="b"></div>').appendTo( page )	  
  , content = $($('#panel-identifica-cittadino-content').html()).appendTo(panel);
	panel.panel();
	page.page('destroy').page();

	panel.panel("open");
	
	$("#panel-identifica-cittadino input[name=sessoCittadinoRicerca]:radio").unbind("click").on("click", function() {
		btCercaCittadinoControl();
	});		
		
	
});


$('#bt-indietro-ricerca-cittadino').live('click', function (event, data) {

	
	 
	 $(".dati-cittadino").html("&nbsp;");
	 $("#txCodiceFiscaleCittadino").val("");
	 $("#txCognomeCittadino").val("");
	 $("#txNomeCittadino").val("");
	 $("#dtDataNascitaCittadino").val("");

	 $(".txCodiceFiscaleCittadino").val("");
	 $(".txCognomeCittadino").val("");
	 $(".txNomeCittadino").val("");
	 $(".dtDataNascitaCittadino").val("");	 
	
 
	$(".panel-2").hide();
	$(".panel-1").show();
	$(".headerCittadinoIdentificato").html("");

	
	  $(".txCodiceFiscaleCittadino").removeClass('ui-disabled');

	application.datiCittadino = null;
	cleanAddFieldsDatiAnagrafici();
	cleanAddFieldsDatiReperibilita();

});




$('#bt-cerca-cittadino').live('click', function (event, data) {

	onbtCercaCittadino();	


});

function onbtCercaCittadino(){
	
	//fakeCall("dati/identificaCittadinoEstesoResponse.xml", successIdentifica); return;
	
	var codiceSesso = $('input[name=sessoCittadinoRicerca]:radio:checked').val();
	if (codiceSesso == undefined)
		codiceSesso = "";
		    

	 var request = {
				"param":{
					"profiloCittadino":{
											"nome": $("#txNomeCittadinoRicerca").val(),
											"cognome": $("#txCognomeCittadinoRicerca").val(),												
											//"dataNascita": dateConvert($("#dtNascitaCittadinoRicerca").val(), "dd/mm/yy", "yymmdd"),
											"codiceSesso":codiceSesso,
											"codiceFiscale": $("#txCodiceFiscaleCittadinoRicerca").val()
										}
				}
			};
	 
	identificaCittadinoEsteso(request);	
	
}




function identificaCittadinoEsteso(request){

	NicceService({
		 method: "identificaCittadinoEsteso",
		 data: [request],
		 dataTypes: ["it.lombardia.crs.schemas.dcsanita.icce._2012_01.identificacittadinoesteso.ICCEIdentificaCittadinoEsteso"],
		 init: function(){
			 showLoading("Attendere Prego...");
			
		 },				 
		 success: successIdentifica,
		 error: function(error){
			 $.mobile.loading( 'hide'); 
			 alertPopup(error.exception.code, error.exception.message);	
		 }
	});
	
}



function successIdentifica(response) {
	
	 $.mobile.loading( 'hide');
	 
	 var assistitoTrovato = response.result.assistitoTrovato;
	 if(assistitoTrovato != undefined){
		 
		 var listview = $("#listview-cittadini");
		 listview.html("");
		 listview.listview("refresh");
		 
		 var str = "";

		 if(assistitoTrovato.length>0){

			 for(var key in assistitoTrovato) {
				 var cittadino = assistitoTrovato[key];
				
				 
				 	str += "<li data-icon='false'><a codice-fiscale='"+cittadino.codiceFiscaleCittadino+"'><img src='images/icone/24/" +
				 			cittadino.sessoCittadino +
				 			".gif' class='ui-li-icon ui-corner-none'><p><strong>" +
				 			cittadino.nomeCittadino + " " + cittadino.cognomeCittadino +
				 			"</strong></p><p>" +
				 			cittadino.codiceFiscaleCittadino +
				 			"</p><p class='ui-li-content'>" +
				 			strDateConvert(cittadino.dataNascitaCittadino)+ " - " + cittadino.comuneNascitaCittadino +
				 			"</p></a></li>";

			 }

			 listview.html(str);
			 listview.listview("refresh");	
			 
				$('#listview-cittadini').on('click','a',function(e){
					var codiceFiscale = $(this).attr("codice-fiscale");
					var request = {"param":{"profiloCittadino":{"codiceFiscale": codiceFiscale}}};					 
					identificaCittadinoEsteso(request);				
									
				});		

				
			 
		 }	


		$(".panel-1").hide();
		$(".panel-3").show();		 
		 return;
	 }
	 
	 
	 
	 
	 
	 $('#panel-identifica-cittadino').panel("close");
	 showNotificationUI("Cittadino identificato");
	 
	 
	 
	 
	 
	 var datiCittadino = response.result;	

	

	 

	 application.datiCittadino = datiCittadino;
	 
	
	 var strDate = dateConvert(datiCittadino.dataNascitaCittadino, "yymmdd", "dd/mm/yy");	
	 var strSesso = datiCittadino.sessoCittadino;
	 if(strSesso == "F"){strSesso = "Femmina";}else if(strSesso == "M"){strSesso = "Maschio";}		
	
	
	 $(".txCodiceFiscaleCittadino").val(datiCittadino.codiceFiscaleCittadino);			 
	 $(".txCognomeCittadino").val(datiCittadino.cognomeCittadino);
	 $(".txNomeCittadino").val(datiCittadino.nomeCittadino);
	 $(".dtDataNascitaCittadino").val(strDate);
	 $(".txSessoCittadino").val(strSesso);
	 
	 $(".classCodiceFiscaleCittadino").html(datiCittadino.codiceFiscaleCittadino);	
	 $(".classCognomeCittadino").html(datiCittadino.cognomeCittadino);
	 $(".classNomeCittadino").html(datiCittadino.nomeCittadino);
	 $(".classDataNascitaCittadino").html(strDate);
	 $(".classSessoCittadino").html(strSesso);
 
	 $(".classComuneNascitaCittadino").html(datiCittadino.comuneNascitaCittadino);
	 $(".classComuneResidenzaCittadino").html(datiCittadino.comuneResidenzaCittadino);
	 $(".classCapResidenzaCittadino").html(datiCittadino.capResidenzaCittadino);
	 $(".classIndirizzoResidenzaCittadino").html(datiCittadino.indirizzoResidenzaCittadino+"  "+datiCittadino.civicoResidenzaCittadino);	 
	 $(".classStatoProComuneNascitaCittadino").html(datiCittadino.comuneNascitaCittadino+" ("+datiCittadino.provinciaNascitaCittadino+")");
	 

	 $(".headerCittadinoIdentificato").html(datiCittadino.nomeCittadino + "&nbsp;&nbsp;"+ datiCittadino.cognomeCittadino +"&nbsp;&nbsp;"+datiCittadino.codiceFiscaleCittadino);

	$(".panel-1, panel-3").hide();
	$(".panel-2").show();

	
	$(".txCodiceFiscaleCittadino").addClass('ui-disabled');
	
	cleanAddFieldsDatiAnagrafici();	
	cleanAddFieldsDatiReperibilita();
	
	
}

