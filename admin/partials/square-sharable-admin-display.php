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

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<div class="wrap">
  <h1>Square Post Shareable</h1>

  <table class="form-table">
  <h3>Input data</h3>
    <tbody>
      <tr>
        <th scope="row">
          <label for="input-image" style="width: 100%;">Image</label>
        </th>
        <td>
          <input type="file" name="input-image" id="input-image" />
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="input-text" style="width: 100%;">Text</label>
        </th>
        <td>
          <textarea name="input-text" id="input-text" class="large-text" rows="3"></textarea>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-font-size" style="width: 100%;">Font Size</label>
        </th>
        <td>
          <input name="shareable-font-size" type="radio" value="40" /> Basic<br />
          <input name="shareable-font-size" type="radio" value="45" checked="checked" /> Large
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-checkbox-boolean" style="width: 100%;">Add Quotemarks?</label>
        </th>
        <td>
          <input name="shareable-checkbox-boolean" id="shareable-checkbox-boolean" type="checkbox">
        </td>
      </tr>
    </tbody>
  </table>
  <p class="submit">
    <input id="generate-shareable" type="submit" class="button button-primary" value="Generate">
  </p>

  <canvas id="canvas-container" width="1000" height="1000"></canvas>
  <p>
    <a id="download-shareable" class="button button-primary">Download Shareable</a>
  </p>

</div>
