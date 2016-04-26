<?php

/*-------------------------------------
* Plugin Name: Facebook to Maropost Subscription
* Author: Benedick Sahagun
* Version: 1.0.0
* Description: Add Facebook Optin to your site for maropost Subscription
* --------------------------------------- */

require_once( plugin_dir_path( __FILE__ ) . 'includes/frontend.php');
require_once( plugin_dir_path( __FILE__ ) . 'includes/admin.php');

function fms_setup(){
	wp_enqueue_script('jquery');
	wp_enqueue_style( 'fms-css', plugins_url('css/style.css', __FILE__));

	wp_enqueue_script( 'fms-extension-js', plugins_url('js/jquery.FBtoMaropost.js', __FILE__));
	wp_enqueue_script( 'fms-js', plugins_url('js/scripts.js', __FILE__));


}

add_action('wp_enqueue_scripts','fms_setup');

function fms_admin_setup() {
    add_menu_page('FB to Maropost Subscription', 'FMS Settings', 'administrator','fms-options', 'fms_settings_page',  plugins_url('img/icon.png', __FILE__));
}

add_action("admin_menu", "fms_admin_setup");