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

  public function add_admin_menu() {

    // Add top level menu
    add_menu_page(
      null,
      'Shareables',
      'manage_options',
      'novaramedia-shareables',
      array( $this, 'shareables_settings_page' )
    );

    // Add Wire Shareable page
    $wire_page = add_submenu_page(
      'novaramedia-shareables',
      'Wire Shareable',
      'Wire',
      'manage_options',
      'wire-sharable',
      array( $this, 'wire_shareable_page' )
    );

    // Enqueue files for Wire Page
		add_action( 'load-' . $wire_page, array( $this, 'enqueue_shareable_scripts') );


  }

  public function enqueue_shareable_scripts() {
    // Main Script

    // EaselJS library
		wp_enqueue_script( $this->novaramedia_shareables, plugin_dir_url( __FILE__ ) . 'js/easeljs.min.js', array( 'jquery' ), $this->version );

    // Class in charge of managing the canvas
		wp_enqueue_script( $this->novaramedia_shareables, plugin_dir_url( __FILE__ ) . 'js/shareable-canvas.js', array(), $this->version );

    // Shareable main script
		wp_enqueue_script( $this->novaramedia_shareables, plugin_dir_url( __FILE__ ) . 'js/novaramedia-shareables.js', array(), $this->version );
  }

  public function shareables_settings_page() {
    include_once( plugin_dir_path( __FILE__ ) . 'partials/shareables-settings-admin-display.php' );
  }

  public function wire_shareable_page() {
    include_once( plugin_dir_path( __FILE__ ) . 'partials/wire-sharable-admin-display.php' );
  }


}
