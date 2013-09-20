

var loged_user;
window.onload = function() {		
//	$("#main-page").remove();
		loged_user = localStorage["loged_user"];	
		if(loged_user){
			
			$.mobile.changePage("#home-page");
//			$("#slidemenu-panel").panel("open");
					
			loged_user = JSON.parse(loged_user);
			$("#accedi-view, #registrati-view").hide();
			$("#user-view").show();		
			$(".user_nome_cognome").html(loged_user.nome + "&nbsp;"+loged_user.cognome);
			$(".user_datanascita").html(loged_user.data_nascita);
			$(".user_scala").html(loged_user.scala);
			$(".user_email").html(loged_user.email);
			
			if(loged_user.img_path){
				$('.img_avatar').attr("src", loged_user.img_path);	
			}else{
				$('.img_avatar').attr("src", "images/avatar.png");	
			}
			
			login(loged_user.email, loged_user.password);		
			
	
				
			
		}else{
			
//			 $.mobile.changePage("#login-page", {transition: 'none', role: 'dialog'} );    
			 $.mobile.changePage("#login-page");   

			
		}
		

};

//$(window).resize(function() {
//	
//	if(!isMobileDevice){
//		$.mobile.activePage.find("[data-role='content']").css("min-height", ($.mobile.activePage.parent().height()-74));
//		$.mobile.activePage.find("[data-role='content']").css("height", $.mobile.activePage.parent().height()-74+"px");
//	}
//});



$(document).on('pagecreate', '[panel-menu="true"]', function(){     

	if($(this).find("[data-role='panel']").attr("id") == undefined){		
		
		var dataDismissible = "false";
		if(isMobileDevice) dataDismissible = "true";
		
		var panel = $('<div data-display="reveal" data-role="panel" data-animate="'+dataDismissible+'" data-position-fixed="true" id="slidemenu-panel" data-theme="a" data-dismissible="'+dataDismissible+'"></div>'); 
		panel.appendTo($(this));
		var content = $($('#slidemenu-panel-content').html()).appendTo(panel);	
		
//		if(!isMobileDevice){
//			$(this).find("[data-role='content']").css("height", $(this).parent().height()-74+"px");
//		}else{
//			$(this).find("[data-role='header']").attr("data-position","fixed");
//		}

		
		
		
		var settings = {
		url: "php/upload.php",
		method: "POST",
		allowedTypes:"jpg,png,gif,doc,pdf,zip",
		formData: {file_name: "aaaaaaaaaaa.png"},
		fileName: "myfile",
		multiple: false,
		onSuccess:function(files,data,xhr)
		{		

			var res = JSON.parse(data);
			loged_user.img_path = res.url;
			localStorage["loged_user"] = JSON.stringify(loged_user);
			

	         $('.img_avatar').attr("src", res.url+"?"+new Date().getTime());	

		      $.ajax({ 
		      type: "POST",
		      url: 'php/insert.php',               
		      data: {sql_string: "UPDATE utenti SET img_path = '"+res.url+"' WHERE email = '"+loged_user.email+"'"},                       
		      dataType: 'json',                   
		      success: function(data)          
		      {			    	 

		      },
			  error: function(error){	
				 
			  } 
		    });		        

		},
		onChangeData:function(formData)
		{				
			return {file_name: $(".user_email").html()+".png"};
		}			
		
		
	}
	$(this).find(".img_avatar").uploadFile(settings);		


	}


});

$(document).on('pageshow', '[panel-menu="true"]', function (event) {

	if(!isMobileDevice){
//		var cwidth = $.mobile.activePage.find("[data-role='content']").css("width");
//		$.mobile.activePage.find("[data-role='header'] h1").css("margin-left","0px");
//		$.mobile.activePage.find("[data-role='header'] h1").css("width",cwidth);
		$.mobile.activePage.find("[data-role='content']").css("height", $.mobile.activePage.parent().height()-74+"px");

	}

});




$(document).on('pagebeforeshow', '[panel-menu="true"]', function (event) {

	if(!isMobileDevice){

//		 $.mobile.activePage.find("[data-role='content']").css("margin-right","270px");
		 $.mobile.activePage.find('#slidemenu-panel').panel("open"); 
		

	}else{
		$.mobile.activePage.find('#bt-menu-toggle').buttonMarkup({ icon: 'grid' });
	}
	
	$.mobile.activePage.find("[href='#"+$.mobile.activePage.attr("id")+"']").parent().addClass("ui-focus");
});



//$(document).on('swiperight', ':jqmData(role="page")', function (event) {
//
//	if(isMobileDevice){
//		 $.mobile.activePage.find('#slidemenu-panel').panel("open"); 
//	}
//
//});


$(document).on('click', '#bt-registrati', function (event) {
	 $.mobile.changePage("#registrazione-page");   
});

$(document).on('click', '#bt-menu-toggle', function (event) {

	$.mobile.activePage.find('#slidemenu-panel').panel("toggle");
	 if(!isMobileDevice){

		 if($(this).attr("data-icon") == "arrow-l"){	
//			 $.mobile.activePage.find("[data-role='content']").css("margin-right","0px");
			 $(this).buttonMarkup({ icon: 'arrow-r' }); 
			
		 }else{
			 $(this).buttonMarkup({ icon: 'arrow-l' }); 
//			 $.mobile.activePage.find("[data-role='content']").css("margin-right","270px");
		 }
		 
//		 var cwidth = $.mobile.activePage.find("[data-role='content']").css("width");
//		 $.mobile.activePage.find("[data-role='header'] h1").css("width",cwidth);	
	 }
	 
	 

	 
	 
});




//$(document).on('click', '#bt-registrati', function (event) { 
//	$("#accedi-view").hide();
//	$("#registrati-view").show();
//});

//$(document).on('click', '#bt-annulla', function (event) {
//	$(".accedi-view").show();
//	$(".registrati-view").hide();
//});

$(document).on('click', '#bt-logout', function (event) {
//	$("#user-view, #registrati-view").hide();
//	$("#accedi-view").show();
	localStorage.removeItem("loged_user");
	$.mobile.changePage("#login-page"); 
});



$(document).on('click', '#bt-registrazione', function (event) {
	
	siss.alertPopup("", 'Per motivi di sicurezza, la tua registrazione dovrà essere confermata dal amministratore del sito. Dopo la conferma riceverai una prima e-mail, intitolata "Conferma di registrazione". Solo in quel caso potrai accedere il sito', function() {
		 $.mobile.changePage("#login-page");
	}); 
	
	
	
});



$(document).on('keypress', '#userpassword', function (event) {
	if (event.keyCode == '13') {
		$("#bt-accedi").click();
	}
});



$(document).on('click', '#bt-accedi', function (event) {
	

	siss.showLoading("Attendere..");
	
	localStorage.removeItem("loged_user");

	login($("#username").val(), $("#userpassword").val());
    
	
});


function login(username, userpassword){

//	loged_user = {nome:"Mindaugas", cognome:"Ajauskas", email:"m.ajauskas@hotmail.it"};	
//	localStorage["loged_user"] = JSON.stringify(loged_user);	
//	$(".user_nome_cognome").html(loged_user.nome + "&nbsp;"+loged_user.cognome);
//	$(".user_email").html(loged_user.email);
//	
//	$('#img_avatar').attr("src", "images/avatar.png");	
//	$.mobile.changePage("#home-page"); 
//	return;
	
	
	
    $.ajax({ 
        type: "POST",
        url: 'php/api.php',               
        data: {sql_string: "select * from utenti where email = '"+username+"' and password = '"+userpassword+"'"},                       
        dataType: 'json',
        complete : function(ss){
        	siss.hideLoading();
        },
        success: function(data)          
        {
        	
        	
        	if(data[0] == undefined){       		
        		localStorage.removeItem("loged_user");
        		errorPopup("Login", "username o password non sono corretti"); 
        	}else{
        		
        		localStorage["loged_user"] = JSON.stringify(data[0]);	
        		loged_user = data[0];
        		
        		
        		$(".user_nome_cognome").html(data[0].nome + "&nbsp;"+data[0].cognome);
        		$(".user_datanascita").html(data[0].data_nascita);
        		$(".user_scala").html(data[0].scala);
        		$(".user_email").html(data[0].email);
        		
        		if(data[0].img_path){
        			$('.img_avatar').attr("src", data[0].img_path);		
        		}else{
        			$('.img_avatar').attr("src", "images/avatar.png");	
        		}       		
        		
        		$.mobile.changePage("#home-page");  
//        		$("#accedi-view, #registrati-view").hide();
//        		$("#user-view").show();
        		
        	}
        },
	  	error: erroreGenerale 
      });	
}
//
//var loged_user;
//$(document).on('pageshow', '#home-page', function (event) {
//	 
//	loged_user = localStorage["loged_user"];	
//	if(loged_user){
//		loged_user = JSON.parse(loged_user);
//		$("#accedi-view, #registrati-view").hide();
//		$("#user-view").show();		
//		$("#user_nome_cognome").html(loged_user.nome + "&nbsp;"+loged_user.cognome);
//		$("#user_datanascita").html(loged_user.data_nascita);
//		$("#user_scala").html(loged_user.scala);
//		$("#user_email").html(loged_user.email);
//		
//		if(loged_user.img_path){
//			$('#img_avatar').attr("src", loged_user.img_path);	
//		}else{
//			$('#img_avatar').attr("src", "images/avatar.png");	
//		}
//		
//		login(loged_user.email, loged_user.password);		
//		
//	}else{
////		 $.mobile.changePage("#login-page", {transition: 'none', role: 'dialog'} );    
//		 $.mobile.changePage("#login-page");   
//
//		
//	}
//	
//
//	
//	
//	
//});	



$(function() {

	


	
	$('#datanascita').datepicker( {
		beforeShow: changeZindex,
        changeMonth: true,
        changeYear: true,
        yearRange: 'c-80:c+0'
    });


	

	
//	var settings = {
//			url: "php/upload.php",
//			method: "POST",
//			allowedTypes:"jpg,png,gif,doc,pdf,zip",
//			formData: {file_name: "aaaaaaaaaaa.png"},
//			fileName: "myfile",
//			multiple: false,
//			onSuccess:function(files,data,xhr)
//			{		
//
//				var res = JSON.parse(data);
//				loged_user.img_path = res.url;
//				localStorage["loged_user"] = JSON.stringify(loged_user);
//				
//
//		         $('#img_avatar').attr("src", res.url+"?"+new Date().getTime());	
//	
//			      $.ajax({ 
//			      type: "POST",
//			      url: 'php/insert.php',               
//			      data: {sql_string: "UPDATE utenti SET img_path = '"+res.url+"' WHERE email = '"+loged_user.email+"'"},                       
//			      dataType: 'json',                   
//			      success: function(data)          
//			      {			    	 
//
//			      },
//				  error: function(error){	
//					 
//				  } 
//			    });		        
//		        
//		        
//		        
//
//			},
//			onChangeData:function(formData)
//			{				
//				return {file_name: $("#user_email").html()+".png"};
//			}			
//			
//			
//		}
//		$("#img_avatar").uploadFile(settings);	
//		//$(".img_avatar").uploadFile(settings);
	
	
	
});












//
////$.mobile.loading( 'show', {text: "Attendere..",textVisible: true});
////$.mobile.loading( 'hide');
//$(function () {
//    'use strict';
//    $('#fileupload').fileupload({	
//        url: 'php/',
//        dataType: 'json',
//        add: function (e, data) {
////        	data.fileInput[0].attr("value", "errosssssssr.gif");
//        	var asdasd = $(this);
//            //data.context = $('<p/>').text('Uploading...').appendTo(document.body);
////        	data.files[0].name = "minde.png"
//           data.submit();
//        },        
//        done: function (e, data) {
//        	
//        	var name = data.result.files[0].name
//        	$('#img_avatar').attr("src", "php/files/"+name);
//
//        },
//        progressall: function (e, data) {
//        
// //           var progress = parseInt(data.loaded / data.total * 100, 10);
//
//        }
//    }).prop('disabled', !$.support.fileInput)
//        .parent().addClass($.support.fileInput ? undefined : 'disabled');
//});
