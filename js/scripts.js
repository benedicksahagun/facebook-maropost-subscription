jQuery(document).ready(function($){

	if( typeof jQuery("#facebook-jssdk").attr('src') !== 'undefined'){
		fms_init();
	}
	
	$('.fms').FBtoMaropost(); //add selectors that shows the optin
	
});
