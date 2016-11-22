<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Novaramedia_Shareables
 * @subpackage Novaramedia_Shareables/admin/partials
 */

$recent_posts = get_posts('posts_per_page=20');

if (!empty($_GET['shareable-post-url'])) {
  $post_id = $_GET['shareable-post-url'];
} else {
  $post_id = '';
}
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<div class="wrap shareable-container">
  <h2>General Post Shareable</h2>

  <table class="form-table">
  <h3>Load data</h3>
    <tbody>
      <tr>
        <th scope="row">
          <label for="shareable-post-latest-select" style="width: 100%;">Latest 10 Posts</label>
        </th>
        <td>
          <select name="shareable-post-latest-select" id="shareable-post-latest-select">
            <?php
              foreach($recent_posts as $recent_post) {
                echo '<option value="' . $recent_post->ID . '">' . $recent_post->post_title . '</option>';
              }
            ?>
          </select>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-post-id" style="width: 100%;">Post ID</label>
        </th>
        <td>
          <input type="text" style="" name="shareable-post-id" id="shareable-post-id" value="<?php echo $post_id; ?>"/>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="submit">
    <input id="get-post-data" type="submit" class="button button-primary" value="Get data">
  </p>

  <h3>Shareable settings</h3>
  <table class="form-table">
    <tbody>
      <tr>
        <th scope="row">
          <label for="shareable-post-title" style="width: 100%;">Title</label>
        </th>
        <td>
          <input type="text" name="shareable-post-title" id="shareable-post-title" value=""/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-post-image" style="width: 100%;">Image</label>
        </th>
        <td>
          <input type="text" name="shareable-post-image" id="shareable-post-image" value=""/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-post-text" style="width: 100%;">Text</label>
        </th>
        <td>
          <textarea name="shareable-post-text" id="shareable-post-text" class="large-text" rows="3"></textarea>
        </td>
      </tr>
      <input type="hidden" name="shareable-post-url" id="shareable-post-url" value=""/>
    </tbody>
  </table>
  <p class="submit">
    <input id="generate-shareable" type="submit" class="button button-primary" value="Generate">
  </p>

  <hr />

  <canvas id="canvas-container" width="1000" height="600"></canvas>
  <p>
    <a id="download-shareable" class="button button-primary">Download Shareable</a>
  </p>

</div>
