<?php
/**
 * @package SmartCookieBar
 * @version 1.0.0
 */
/*
Plugin Name: SmartCookieBar
Plugin URI: http://github.com/faridmia/smartcookiebar
Description: SmartCookieBar is a customizable WordPress plugin for displaying elegant cookie banners, ensuring GDPR and CCPA compliance with easy consent        management and user-friendly settings.
Version: 1.0.0
Requires at least: 6.4
Requires PHP: 7.4
Author: faridmia
Author URI: https://profiles.wordpress.org/faridmia/
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: smartcookiebar
Domain Path: /i18n/languages
*/

if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
* Define Plugins Contants
*/
define( 'SMARTCB_VERSION', '1.0.0' );
define ( 'SMARTCB_COOKIE_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'SMARTCB_COOKIE_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );
define('SMARTCB_COOKIE_IMG', SMARTCB_COOKIE_URL );

add_action( "init", "smartcb_load_textdomain" );
function smartcb_load_textdomain()
{
    load_plugin_textdomain('smartcookiebar', false, dirname(plugin_basename(__FILE__)) . '/i18n/languages');
}

/**
 * Loading Necessary Scripts
 */
add_action( 'wp_enqueue_scripts', 'smartcb_wp_react_cookie_load_scripts' );
add_action( 'admin_enqueue_scripts', 'smartcb_wp_react_cookie_load_scripts' );

/**
 * Enqueues styles and scripts for the SmartCB Cookie Banner.
 *
 * Loads required CSS, JavaScript files, and localized data for the React app.
 *
 * @return void
 */
function smartcb_wp_react_cookie_load_scripts() {

    wp_enqueue_style( 'smartcb-bootstrap-css', SMARTCB_COOKIE_URL . '/assets/bootstrap/css/bootstrap.min.css', [], SMARTCB_VERSION );
    wp_enqueue_style( 'smartcb-main-css', SMARTCB_COOKIE_URL . '/assets/style.css', [], SMARTCB_VERSION );

    // Include Local Bootstrap JS
    wp_enqueue_script(
        'smartcb-bootstrap-js',
        SMARTCB_COOKIE_URL. '/assets/bootstrap/js/bootstrap.bundle.min.js',
        [ 'jquery' ],
        SMARTCB_VERSION,
        true
    );

    wp_enqueue_script(
        'smartcb-cookie-js',
        SMARTCB_COOKIE_URL. '/assets/js.cookie.min.js',
        [ 'jquery' ],
        SMARTCB_VERSION,
        true
    );

    wp_enqueue_script( 'smartcb-wp-react-bundle', SMARTCB_COOKIE_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], SMARTCB_VERSION, true );

    wp_localize_script( 'smartcb-wp-react-bundle', 'appCookie', [
        'apiUrl' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce( 'wp_rest'),
        'cookie_assets_url' => SMARTCB_COOKIE_IMG,
        'is_admin' => is_admin(),
    ] );
}

/**
 * Outputs the SmartCB cookie banner wrapper in the footer.
 *
 * Adds a container div for the cookie banner to be handled by React or JavaScript.
 *
 * @return void
 */
function smartcb_cookie_banner_mark_func() {
    ?>
    <div class="smartcb-react-cookie-banner-wrapper"></div>
    <?php
}

add_action('wp_footer', 'smartcb_cookie_banner_mark_func');


require_once SMARTCB_COOKIE_PATH . 'classes/class-create-admin-menu.php';
require_once SMARTCB_COOKIE_PATH . 'classes/class-create-settings-routes.php';