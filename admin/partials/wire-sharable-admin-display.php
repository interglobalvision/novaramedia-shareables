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
?>
<?php
$post_url = !empty($_GET['shareable-post-url']) ? $_GET['shareable-post-url'] : '';
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<div class="wrap shareable-container">
  <h2>Wire Shareable</h2>

  <table class="form-table">
    <tbody>
      <tr>
        <th scope="row">
          <label for="shareable-post-url" style="width: 100%;">Post URL</label>
        </th>
        <td>
          <input type="text" style="" name="shareable-post-url" id="shareable-post-url" value="<?php echo $post_url; ?>"/>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="submit">
    <input id="get-post-data" type="submit" class="button button-primary" value="Get data">
  </p>

  <h3>Post data</h3>
  <table class="form-table">
    <tbody>
      <tr>
        <th scope="row">
          <label for="shareable-post-title" style="width: 100%;">Title</label>
        </th>
        <td>
          <input type="text" style="" name="shareable-post-title" id="shareable-post-title" value=""/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-post-id" style="width: 100%;">Image</label>
        </th>
        <td>
          <input type="text" style="" name="shareable-post-image" id="shareable-post-image" value=""/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-post-id" style="width: 100%;">Text</label>
        </th>
        <td>
          <textarea name="shareable-post-text" id="shareable-post-text" class="large-text" rows="3"></textarea>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="submit">
    <input id="generate-shareable" type="submit" class="button button-primary" value="Generate">
  </p>

  <hr />

  <canvas id="canvas-container" width="1000" height="600"></canvas>
  
</div>
