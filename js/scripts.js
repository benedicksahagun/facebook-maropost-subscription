jQuery(document).ready(function($){

	if( typeof jQuery("#facebook-jssdk").attr('src') == 'undefined'){
		fms_init($('#fms-settings').data('fb-app-id'));
	}
	else{
		fms_check_status();
	}
	
	$('.fms').FBtoMaropost(); //add selectors that shows the optin
	
});
