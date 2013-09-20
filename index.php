<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" class="no-js">

<head>
<link rel="shortcut icon" href="images/logo.png" />

	<title>salus</title>
<!-- 	<meta charset="iso-8859-1"> -->
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="default">
<!-- 	<link rel="apple-touch-icon" href="images/logo.png"> -->
	
<!-- 	<link rel="apple-touch-startup-image" href="images/logo.png" /> -->
<!-- 	<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"> -->
<!-- 	<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"> -->
    <!-- add this in your <head> section with your other meta tags-->  
 
<!--        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />   -->
<!-- <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />  -->
 
 
 	<meta name="viewport" content="initial-scale=1">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-touch-fullscreen" content="yes" />
 
       
	<link rel="stylesheet" href="css/plugin/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" href="css/plugin/siss.css" />
	<link rel="stylesheet" href="css/plugin/jquery.mobile-1.3.1.min.css" />
	<link rel="stylesheet" href="css/plugin/jqm-icon-pack-2.0-original.css" />
	<link rel="stylesheet" type="text/css" href="css/plugin/jquery-bubble-popup-v3.css" />
	<link rel="stylesheet" type="text/css" href="css/plugin/add2home.css" />
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" type="text/css" href="css/jqm-demos.css" />

<!-- 	<link rel="stylesheet" type="text/css" href="css/plugin/bordered.css" /> -->
<!-- <link rel="stylesheet" type="text/css" href="css/plugin/jquery.mobile.splitview.css" /> -->
<!-- <link rel="stylesheet" type="text/css" href="css/plugin/jquery.mobile.grids.collapsible.css" /> -->

	<script type="text/javascript" src="js/plugin/jquery-1.10.2.min.js" charset="iso-8859-1"></script>
	<script type="text/javascript" src="js/plugin/jquery-migrate-1.2.1.min.js"></script>
	<script type="text/javascript" src="js/plugin/jquery.mobile-1.3.1.min.js" charset="iso-8859-1"></script>
	<script type="text/javascript" src="js/plugin/jquery.validate.js"></script>
	<script type="text/javascript" src="js/plugin/jquery-ui-1.10.3.custom.min.js" charset="iso-8859-1"></script>
	<script type="text/javascript" src="js/plugin/ui.datepicker-it.js"></script>
	<script type="text/javascript" src="js/plugin/jquery-bubble-popup-v3.min.js"></script>
	<script type="text/javascript" src="js/plugin/date.js"></script>
	<script type="text/javascript" src="js/plugin/json2.js"></script>
	<script type="text/javascript" src="js/plugin/jquery.xml2json.js"></script>
<!-- 	<script type="text/Javascript" src="js/plugin/add2home.js"></script> -->
	<script type="text/javascript" src="js/plugin/jquery.base64.min.js"></script>
<!-- 	<script type="text/javascript" src="js/plugin/jquery.jqprint-0.3.js"></script> -->
	<script type="text/javascript" src="js/plugin/modernizr-2.6.2.js"></script>
	<script type="text/javascript" src="js/plugin/helper.js"></script>



<script type="text/javascript" src="js/plugin/jquery.uploadfile.js"></script>




	<script type="text/javascript" src="js/main.js" charset="iso-8859-1"></script>	
	<script type="text/javascript" src="js/home-page.js" charset="iso-8859-1"></script> 


	<script type="text/javascript">
	var isMobileDevice = ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent)));

// 	MBP.hideUrlBarOnLoad();


	    /iPhone/.test(MBP.ua) && !location.hash && setTimeout(function () {	    	
		   window.scrollTo(0, 1);
		}, 1000);

// 	    
	
// 	    setTimeout(function () { window.scrollTo(0, 0); }, 1000);

		$.mobile.defaultPageTransition = 'none';
// 		$.mobile.page.prototype.options.domCache = false;
		
		if (Modernizr.localstorage) {
		
		} else {
			alert("Devi aggiornare il tuo browser");
		}
		
//   		MBP.hideUrlBarOnLoad();
		
	</script>
	
</head>

<body class="ui-mobile-viewport ui-overlay-d">

<div data-url="main-page" id="main-page" data-role="page" class="ui-page-active">
</div>








	<!--	 *********************************************************************************************************
	 			HOME-PAGE style="min-height: 100%;"  ui-page-active 
		 ********************************************************************************************************* -->
		 
	<div data-url="home-page" id="home-page" data-role="page" data-theme="c" panel-menu="true" class="ui-responsive-panel">
		
		<div data-role="header" data-position="fixed" data-tap-toggle="false" data-theme="b">
			<a id="bt-menu-toggle" data-icon="arrow-l" class="ui-btn-left" data-iconpos="notext"></a>			
			<h1>Home</h1>

		</div>
		

		<div data-role="content" class="jqm-content">
	
			<h2>Introduction</h2>

			<p class="jqm-intro">jQuery Mobile is a touch-friendly UI framework built on jQuery Core that works across all popular mobile, tablet and desktop platforms.</p>

			<h2>Introduction</h2>

			<p>jQuery Mobile is a user interface framework based on jQuery that works across all popular phones, tablet, e-reader, and desktop platforms. Built with accessibility and universal access in mind, we follow progressive enhancement and <a href="rwd.html">responsive web design (RWD)</a> principles. HTML5 Markup-driven configuration makes it easy to learn, but a powerful <a href="http://api.jquerymobile.com/">API</a> makes it easy to deeply customize the library.</p>

			<h2>Pages & Dialogs</h2>

		</div> 
		



	</div>












	<!--	 *********************************************************************************************************
	 			DOCUMENTI-PAGE
		 ********************************************************************************************************* -->
	<div data-url="documenti-page" id="documenti-page" data-role="page" panel-menu="true" class="ui-responsive-panel">
		
		<div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false"  data-theme="b">
			<a id="bt-menu-toggle" data-icon="arrow-l" class="ui-btn-left" data-iconpos="notext"></a>	
			<h1>Documenti</h1>			
		</div>

		<div data-role="content" class="jqm-content">

			<h2>Introduction</h2>

			<p class="jqm-intro">jQuery Mobile is a touch-friendly UI framework built on jQuery Core that works across all popular mobile, tablet and desktop platforms.</p>

			<h2>Introduction</h2>

			<p>jQuery Mobile is a user interface framework based on jQuery that works across all popular phones, tablet, e-reader, and desktop platforms. Built with accessibility and universal access in mind, we follow progressive enhancement and <a href="rwd.html">responsive web design (RWD)</a> principles. HTML5 Markup-driven configuration makes it easy to learn, but a powerful <a href="http://api.jquerymobile.com/">API</a> makes it easy to deeply customize the library.</p>

			<h2>Pages & Dialogs</h2>

			<p>A <a href="../widgets/pages/">page</a> in jQuery Mobile consists of an element with a <code> data-role="page"</code> attribute. Within the "page" container, any valid HTML markup can be used, but for typical pages in jQuery Mobile, the immediate children of a "page" are divs with data-roles of <code>"header"</code>, <code>"content"</code>, and <code>"footer"</code>. The baseline requirement for a page is only the page wrapper to support the navigation system, the rest is optional. </p>

			<p>A page can be styled as a <a href="../widgets/dialog/">dialog</a> that makes the page look like it's a modal style overlay. To give a standard page the appearance of a modal dialog, add the <strong>data-rel="dialog"</strong> attribute to the link. Transitions can also be set on dialog links.</p>

			<h2>AJAX Navigation & Transitions</h2>

			<p>jQuery Mobile includes an <a href="../widgets/navigation/" data-ajax="false">AJAX navigation system</a> to support a rich set of animated page <a href="../widgets/transitions/" data-ajax="false">transitions</a> by automatically 'hijacking' standard links and form submissions and turning them into an AJAX request. The back button is fully supported and there are features to prefetch &amp; cache, dynamically inject, and script pages for advanced use cases.</p>

			<p>Whenever a link is clicked or a form is submitted, that event is automatically intercepted by the AJAX nav system and is used to issue an AJAX request based on the <code>href</code> or form action instead of reloading the page. While the framework waits for the AJAX response, a loader overlay is displayed.</p>

			<p>When the requested page loads, jQuery Mobile parses the document for an element with the <code> data-role="page"</code> attribute and inserts that code into the DOM of the original page. Next, any widgets in the incoming page are enhanced to apply all the styles and behavior. The rest of the incoming page is discarded so any scripts, stylesheets or other information will not be included. The framework will also note the title of the incoming page to update the title when the new page is transitioned into view.</p>

			<p>Now that the requested page is in the DOM and enhanced, it is animated into view with a <a href="../widgets/transitions/" data-ajax="false">transition</a>. By default, the framework applies a <strong>fade</strong> transition. To set a custom transition effect, add the <code>data-transition</code> attribute to the link. </p>

			<h2>Content & Widgets</h2>

			<p>Inside your content container, you can add any standard HTML elements - headings, lists, paragraphs, etc. You can write your own custom styles to create custom layouts by adding an additional stylesheet to the <code>head</code> after the jQuery Mobile stylesheet.</p>
		


		</div> 

	</div> 

	
	
	
	<!--*********************************************************************************************************
 			LOGIN-PAGE
	 ********************************************************************************************************* -->
	<div url="login-page" id="login-page" data-role="page" data-close-btn="none">
		
			<div data-role="header" data-theme="b">
				<a data-icon="lock" class="ui-btn-left" data-iconpos="notext"></a>
				<h1>Login</h1>
			</div>
	
			<div data-role="content">
	  			<div class="ui-body" style="max-width: 400px; text-align: center; align:center; margin:0 auto; ">	
	  			<p>Accedi con tua username e password o registrati.</p>
	  			
				<input type="email" id="username" value="" data-mini="true" placeholder="E-mail" />
				<input type="password" id="userpassword" data-mini="true" placeholder="Password" />
				<a id="bt-accedi" data-role="button" data-mini="true">Accedi</a>
				<a id="bt-registrati" data-role="button" data-mini="true">Registrati</a>		
	
	
				</div>	
	  			
			</div>
		</div>




	<div url="registrazione-page" id="registrazione-page" data-role="page" data-close-btn="none">
	
		<div data-role="header" data-theme="b">
			<a data-icon="arrow-l" data-rel="back" class="ui-btn-left" data-iconpos="notext"></a>
			<h1>Registrazione</h1>
		</div>

		<div data-role="content">
  			<div class="ui-body" style="max-width: 400px; text-align: center; align:center; margin:0 auto; ">	
	
					<input type="text" id="nome" value="" data-mini="true" placeholder="Nome" />
					<input type="text" id="cognome" value="" data-mini="true" placeholder="Cognome" />					
					<select data-mini="true" id="sesso" placeholder="Sesso" data-native-menu="true"  >
						<option value="" data-placeholder="true">sesso</option>
						<option value="F">Donna</option>
						<option value="M">Uomo</option>
					</select>
					<select data-mini="true" id="scala" placeholder="scala" data-native-menu="true"  >
						<option value="" data-placeholder="true">scegli la scala:</option>
						<option value="B">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="D">D</option>
						<option value="E">E</option>
						<option value="F">F</option>
						<option value="G">G</option>
						<option value="H">H</option>
						<option value="I">I</option>	
						<option value="L">L</option>											
					</select>					
					<input readonly="readonly" id="datanascita" value="" data-mini="true" placeholder="Data di nascita" />	
					
					<input type="email" id="email" value="" data-mini="true" placeholder="E-mail" />
					<input type="tel" id="telefono" value="" data-mini="true" placeholder="Telefono" />
					<input type="password" id="password1" data-mini="true" placeholder="Nuova Password" />
					<input type="password" id="password2" data-mini="true" placeholder="Ripeti Password" />
					<a id="bt-registrazione2" data-role="button" data-mini="true">Registrazione</a>


			</div>	
  			
		</div>
	</div>




	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
<div id="slidemenu-panel-content" style="display: none;">

			<div id="profile">
				<img class="img_avatar" id="img_avatar" src="images/avatar.png" width="55px" height="55px" style="cursor: pointer;" alt="modifica immagine" />
				<div class="profile_info"><strong class="user_nome_cognome"></strong><br><small class="user_email"></small></div>
				<a id="bt-logout" data-role="button" class="profile_bt" data-mini="true" data-icon="power" data-iconpos="notext" data-theme="b">Esci</a>
			</div>
	
	
			
			<ul data-role="listview" style="margin-top:-16px;" data-theme="a" data-divider-theme="a">						
				<li><a href="#home-page"><img src="images/32x32/newspaper.png" class="ui-li-icon">Home</a></li>
				<li><a href="#documenti-page"><img src="images/32x32/report.png" class="ui-li-icon">Documenti</a></li>
				<li><a href="#"><img src="images/32x32/calendar.png" class="ui-li-icon">Eventi</a></li>
				<li><a href="#"><img src="images/32x32/image.png" class="ui-li-icon">Foto</a></li>
				<li><a href="#"><img src="images/32x32/film.png" class="ui-li-icon">Video</a></li>
				<li><a href="#"><img src="images/32x32/email.png" class="ui-li-icon">Messaggi<span class="ui-li-count">12</span></a></li>	
				<li><a href="#"><img src="images/32x32/comments.png" class="ui-li-icon">Forum</a></li>					
	
			</ul>

</div>


	<input id="fileupload" type="file" name="files[]" style="display: none;">

</body>

</html>
