/* ------------------------
* FB to Maropost
* Author: Benedick Sahagun
* ----------------------*/

(function( $ ) {
 
    $.fn.FBtoMaropost = function( options ) {
 
	
		this.click(function(event){

			fms_start();
			event.preventDefault();

		});

		return this;
 
    };
 
}( jQuery ));

function fms_init(){
	
	fms_check_status();

	(function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}

function fms_check_status(){

	var app_id = jQuery('#fms-settings').data('fb-app-id');

	window.fbAsyncInit = function(){
		FB.init({
			appId  : app_id,
			status : true, 
			cookie : true,
			xfbml  : true,  
			version:  'v2.0',
		});


		FB.getLoginStatus(function(response) {

			if (response.status == 'connected') {
				jQuery('#fms-settings').attr('data-fb-logged','true');
			} 

			else{
				jQuery('#fms-settings').attr('data-fb-logged','false');
			}
		});
	};

	
}

function fms_start(){
	
	if(jQuery('#fms-settings').data('fb-logged') == false){
		FB.login(function(response) {
			if (response.authResponse){
			    fms_fb_auth();
			} 
			else {
		    	console.log('Auth cancelled.')
		  	}
		}, 
		{ scope: 'email' });
	}
	else{
		fms_fb_auth();
	}
}

function fms_fb_auth() {
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


		var request = window.location.origin + "/wp-content/plugins/facebook-maropost-subscription/includes/maropost-api.php";

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