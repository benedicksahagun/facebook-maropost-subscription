/* ------------------------
* FB to Maropost
* Author: Benedick Sahagun
* ----------------------*/

(function( $ ) {
 
    $.fn.FBtoMaropost = function( options ) {
 
	
		this.click(function(event){

			fms_start($('#fms-settings').data('fb-app-id'));
			event.preventDefault();

		});

		return this;
 
    };
 
}( jQuery ));

function fms_init(){

	var body_append = '<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js"></script>';
	jQuery('body').prepend(body_append);

}

function fms_start(app_id){
	FB.init({
		appId  : app_id,
		status : true, 
		cookie : true,
		xfbml  : true,  
		version:  'v2.0',
	});


	FB.getLoginStatus(function(response) {

		if (response.status == 'connected') {
			fms_fb_auth(response);
		} 
		else {
			FB.login(function(response) {
				if (response.authResponse){
				    fms_fb_auth(response);
				} 
				else {
			    	console.log('Auth cancelled.')
			  	}
			}, 
			{ scope: 'email' });
		}

	});
}

function fms_fb_auth(response) {
	FB.api('/me',  { locale: 'en_US', fields: 'name, email' }, function(userInfo) {
		if(userInfo){
			fms_maropost_request(userInfo);
		}
	});
}


function fms_maropost_request(userInfo){
	if(userInfo){
		console.log(userInfo);

		var credentials = jQuery('#fms-settings');
		
		var data = { 'maropost_acc_num' : jQuery(credentials).data('mp-acc-id'),
					 'maropost_auth_key' : jQuery(credentials).data('mp-auth-key'),
					 'maropost_list_id' : jQuery(credentials).data('mp-list-id'),
					 'contact_fields_first_name' : userInfo.name,
					 'contact_fields_email' : userInfo.email };


		var request = window.location.origin + "/wp-content/plugins/facebook-maropost-subscription-1.0.1/includes/maropost-api.php";

		jQuery.ajax({
			url: request,
			type: "POST",
			data: data,
			success: function(response){
				alert("Thank you for subscribing!");
			}
		});

	}
	else{
		console.log('No info gathered.');
	}
}