<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Novaramedia_Shareables
 * @subpackage Novaramedia_Shareables/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the novaramedia shareables, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Novaramedia_Shareables
 * @subpackage Novaramedia_Shareables/admin
 * @author     Your Name <email@example.com>
 */
class Novaramedia_Shareables_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $novaramedia_shareables    The ID of this plugin.
	 */
	private $novaramedia_shareables;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $novaramedia_shareables       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $novaramedia_shareables, $version ) {

		$this->novaramedia_shareables = $novaramedia_shareables;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Novaramedia_Shareables_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Novaramedia_Shareables_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->novaramedia_shareables, plugin_dir_url( __FILE__ ) . 'css/novaramedia-shareables-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Novaramedia_Shareables_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Novaramedia_Shareables_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->novaramedia_shareables, plugin_dir_url( __FILE__ ) . 'js/novaramedia-shareables-admin.js', array( 'jquery' ), $this->version, false );

	}

}
