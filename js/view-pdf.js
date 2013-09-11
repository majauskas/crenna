$("#view-pdf-page").live("pageshow", function (event, data) {
		$(window).resize(function(){			
			$("#pdf-container").css('height',$(window).height() - 42);
		});	
      
		$("#pdf-container").css('height',$(window).height() - 42);
});	
