

function WebSalusService (options){
	options.destination = "webSalusDestination";
	iocRemoteCall(options);
}

function NicceService (options){
	options.destination = "nicceDestination";
	iocRemoteCall(options);	
}



function iocRemoteCall (options){

	
	options = options || {};
	options.data = options.data || [];
	options.dataTypes = options.dataTypes || [];
	options.init = options.init || function (){};
	

	var args, method, destination, argumentTypes, brokerUrlPattern, invokeListener, resultListener, faultListener;
	
	args = options.data;
	method = options.method;
	destination = options.destination;
	argumentTypes = options.dataTypes;
	brokerUrlPattern = "/salus/jsonBroker";
	invokeListener = options.init;
	resultListener = options.success;
	faultListener = options.error;
	
	try{
	
		var jsonMetadata = {"destination":destination, "method":method, "argumentTypes":argumentTypes};
		
		var jsonMetadataString = JSON.stringify(jsonMetadata);
		
		var requestString = "metadata=" + jsonMetadataString;
		var argString = "";
		if (args != null && args.length > 0){
			var p = null;
			var i = 0;
			for (i = 0; i < args.length; i++){
				if (argString.length > 0)
					argString += "&";
				argString += "jsonBusinessArg" + i + "=" + JSON.stringify(args[i]);
			}
		}
		if (argString.length > 0)
			requestString += "&" + argString;
		

		
		
		
		$.ajax({
			   type: 'POST',
			   url: brokerUrlPattern,
			   data: requestString,
			   beforeSend : function(xhr) {
		            xhr.overrideMimeType("text/plain; charset=iso-8859-1");
		           
		           
		       },
			   success: function(data, textStatus, jqXHR){
				  
					if (jqXHR.readyState != 4)
						return;
					if (jqXHR.status != 200 && jqXHR.status != 304) {
						var err = "HTTP error " + request.status;
						var error = {"error":{"codice":err , "descrizione":"Impossibile contattare la risorsa remota"}};
						faultListener({'error':error});
						return;
					}
					if (jqXHR.readyState == 4){
						
						var response = JSON.parse(data);
						if (response.error != null || response.error != undefined || response.exception != null || response.exception != undefined)
							faultListener(response);
						else
							resultListener(response);
						return;
					} 
				    
			   },
			   error: function(error, textStatus, errorThrown){	
				   var error = {"error":{"codice":"HTTP error 503", "descrizione":errorThrown}};
				   faultListener({'error':error});
			   }
			});		
		

		
//		var request = new XMLHttpRequest();
//		
//		request.open("POST",brokerUrlPattern,true);
//		request.setRequestHeader("User-Agent","XMLHTTP/1.0");
//		request.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
//		try {
//			request.overrideMimeType("text/plain; charset=iso-8859-1");
//		} catch (e) {}
//
//		request.onreadystatechange = function () {
//			if (request.readyState != 4)
//				return;
//			if (request.status != 200 && request.status != 304) {
//				var err = "HTTP error " + request.status;
//				var error = {"error":{"codice":err , "descrizione":"Impossibile contattare la risorsa remota"}};
//				faultListener({'error':error});
//				return;
//			}
//			if (request.readyState == 4){
//				var response = JSON.parse(request.responseText);
//				if (response.error != null || response.error != undefined || response.exception != null || response.exception != undefined)
//					faultListener(response);
//				else
//					resultListener(response);
//				return;
//			} 
//		}
//		request.send(requestString);
		invokeListener();
	}catch(e){
		alert("Errore sconosciuto! Contattare l'assistenza! " + e);
	}
}
