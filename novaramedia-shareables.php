<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           Novaramedia_Shareables
 *
 * @wordpress-plugin
 * Plugin Name:       Novaramedia Shareable
 * Plugin URI:        http://example.com/novaramedia-shareables-uri/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Your Name or Your Company
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       novaramedia-shareables
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-novaramedia-shareables-activator.php
 */
function activate_novaramedia_shareables() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-novaramedia-shareables-activator.php';
	Novaramedia_Shareables_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-novaramedia-shareables-deactivator.php
 */
function deactivate_novaramedia_shareables() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-novaramedia-shareables-deactivator.php';
	Novaramedia_Shareables_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_novaramedia_shareables' );
register_deactivation_hook( __FILE__, 'deactivate_novaramedia_shareables' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-novaramedia-shareables.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_novaramedia_shareables() {

	$plugin = new Novaramedia_Shareables();
	$plugin->run();

}
run_novaramedia_shareables();
