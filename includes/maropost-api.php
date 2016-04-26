<?php
	$accid = $_POST['maropost_acc_num'];
	$auth = $_POST['maropost_auth_key'];
	$listid = $_POST['maropost_list_id'];
	$name = $_POST['contact_fields_first_name'];
	$email = $_POST['contact_fields_email'];

	$api_url = "http://api.maropost.com/accounts/".$accid."/"; // 263 is the account number for FPA in maropost for example
	$authorization = ".json?auth_token=" . $auth;

	$curl_api_url = $api_url . "lists/" . $listid . "/contacts".$authorization;

	$ch = curl_init();


	curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );
	curl_setopt( $ch, CURLOPT_URL, $curl_api_url );

	//initialize data
	$dataArray = array();
	$dataArray['contact'] = array(
		"first_name" => $name,
		"email" => $email
	);
	$dataArray['subscribe'] = true;

	$json = json_encode( $dataArray );

	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $json);


	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json','Accept: application/json'));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);

	$output = curl_exec($ch);
	curl_close($ch);

	$decoded = json_decode($output);
	var_dump( $decoded );
?>
