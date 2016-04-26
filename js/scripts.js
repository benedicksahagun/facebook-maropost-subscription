jQuery(document).ready(function($){

	if( typeof jQuery("#facebook-jssdk").attr('src') == 'undefined'){
		fms_init();
	}
	else{
		fms_check_status();
	}
	
	$('.fms').FBtoMaropost(); //add selectors for triggers
	
});
