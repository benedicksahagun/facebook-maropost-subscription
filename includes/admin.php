<?php


function fms_settings_page(){

	$fb_app_id = get_option('fms_fb_app_id');
	$mp_acc_id = get_option('fms_mp_acc_id');
	$mp_auth_key = get_option('fms_mp_auth_key');
	$mp_list_id = get_option('fms_mp_list_id');

    ob_start(); ?>
		<form action="options.php" method="post" id="<?php echo $plugin_id; ?>_options_form" name="<?php echo $plugin_id; ?>_options_form">
			<h2>FMS Settings v1.3.0</h2>
			<?php echo wp_nonce_field('update-options'); ?>
			<div class="panel">
				<table class="form-table" width="100%" cellpadding="10">
					<tbody>
						<tr>
							<td scope="row" align="left" width="200">
								<label><strong>Facebook App ID :</strong></label>
							</td>
							<td>
								<input style="width:400px" type="text" name="fms_fb_app_id" value="<?php echo $fb_app_id; ?>" placeholder="146008815802057">
							</td>
						</tr>
						<tr>
							<td scope="row" align="left" width="200">
								<label><strong>Maropost Account ID :</strong></label>
							</td>
							<td>
								<input style="width:400px" type="text" name="fms_mp_acc_id" value="<?php echo $mp_acc_id; ?>" placeholder="296">
							</td>
						</tr>
						<tr>
							<td scope="row" align="left" width="200">
								<label><strong>Maropost Auth Key :</strong></label>
							</td>
							<td>
								<input style="width:400px" type="text" name="fms_mp_auth_key" value="<?php echo $mp_auth_key; ?>" placeholder="e611046e5659b22274481b5d75a17007d3c2b3ae">
							</td>
						</tr>
						<tr>
							<td scope="row" align="left" width="200">
								<label><strong>Maropost List ID :</strong></label>
							</td>
							<td>
								<input style="width:400px" type="text" name="fms_mp_list_id" value="<?php echo $mp_list_id; ?>" placeholder="45596">
							</td>
						</tr>
						<tr>
							<td><input type="submit" name="Submit" value="Update" class="button button-primary button-large" /></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<input type="hidden" name="action" value="update" />
			<input type="hidden" name="page_options" value="fms_fb_app_id,fms_mp_acc_id,fms_mp_auth_key,fms_mp_list_id" />

		</form>

	<?php $html = ob_get_clean(); echo $html;
}

