/* ------------------------
* FB to Maropost
* Author: Benedick Sahagun
* ----------------------*/

(function( $ ) {
 
    $.fn.FBtoMaropost = function( options ) {
 
		var settings = $.extend({

			popup: "#fms-popup",
			authButton : ".fms-auth"

		}, options );

		this.click(function(){
			$(settings.popup).toggleClass('active');
		});

		$(settings.popup).find(settings.authButton).click(function(){

			var credentials = $(settings.popup).find('#fms-settings');
			fms_start($(credentials).data('fb-app-id'), settings);

		});

		return this;
 
    };
 
}( jQuery ));

function fms_init(){

	var body_append = '<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js"></script>';
	jQuery('body').prepend(body_append);

}

function fms_start(app_id, settings){
	FB.init({
		appId  : app_id,
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml  : true,  // parse XFBML
		version:  'v2.0',
	});


	FB.getLoginStatus(function(response) {

		if (response.status == 'connected') {
			fms_fb_auth(response, settings);
		} 
		else {
			FB.login(function(response) {
				if (response.authResponse){
				    fms_fb_auth(response, settings);
				} 
				else {
			    	console.log('Auth cancelled.')
			  	}
			}, 
			{ scope: 'email' });
		}

	});
}

function fms_fb_auth(response, settings) {
	FB.api('/me',  { locale: 'en_US', fields: 'name, email' }, function(userInfo) {
		if(userInfo){
			fms_maropost_request(userInfo, settings);
		}
	});
}


function fms_maropost_request(userInfo, settings){
	if(userInfo){
		console.log(userInfo);

		var credentials = jQuery(settings.popup).find('#fms-settings');
		
		var data = { 'maropost_acc_num' : jQuery(credentials).data('mp-acc-id'),
					 'maropost_auth_key' : jQuery(credentials).data('mp-auth-key'),
					 'maropost_list_id' : jQuery(credentials).data('mp-list-id'),
					 'contact_fields_first_name' : userInfo.name,
					 'contact_fields_email' : userInfo.email };


		var request = window.location.origin + "/wp-content/plugins/facebook-maropost-subscription-1.0.0/includes/maropost-api.php";

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