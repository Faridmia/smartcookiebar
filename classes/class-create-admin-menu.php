<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly  
/**
 * This file will create admin menu page.
 */

class SMARTCB_Create_Admin_Page {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'smartcb_create_admin_menu' ] );
    }

    /**
     * Adds the SmartCookieBar menu page to the WordPress admin.
     *
     * Creates a menu item with the required capability and icon for plugin settings.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function smartcb_create_admin_menu() {
        $capability = 'manage_options';
        $slug = 'smartcb-settings';

        add_menu_page(
            __( 'SmartCookieBar', 'smartcookiebar' ),
            __( 'SmartCookieBar', 'smartcookiebar' ),
            $capability,
            $slug,
            [ $this, 'smartcb_menu_page_template' ],
            'dashicons-buddicons-replies'
        );
    }

    /**
     * Displays the SmartCookieBar settings page in the WordPress admin.
     *
     * Renders the HTML structure for the settings page, including a wrapper for the app.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function smartcb_menu_page_template() { ?>
        <div class="wrap smartcookiebar"><div class="smartcookiebar-admin-app"></div></div>
    <?php }

}


new SMARTCB_Create_Admin_Page();