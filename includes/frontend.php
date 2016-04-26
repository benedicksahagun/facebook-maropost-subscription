<?php


function fms_popup_html() { ?>
	<div id="fms-settings" data-fb-app-id="<?php echo get_option('fms_fb_app_id');?>" data-mp-acc-id="<?php echo get_option('fms_mp_acc_id');?>" data-mp-auth-key="<?php echo get_option('fms_mp_auth_key');?>" data-mp-list-id="<?php echo get_option('fms_mp_list_id');?>"></div>	
<?php }

add_action('wp_footer', 'fms_popup_html');
