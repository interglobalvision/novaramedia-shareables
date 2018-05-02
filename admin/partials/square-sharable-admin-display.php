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

<div class="wrap shareable-container">
  <h1>Square Post Shareable</h1>

  <p>This generator is a multipurpose square image generator. It can be used to create NM style branded images quickly and easily. It requires an image and some basic text.</p>

  <h3>How to use this generator</h3>

  <ul>
    <li>Like all images used for NM images should be good quality and not contain any watermarks.</li>
    <li>In general images should be photographs either in full colour or monochrome</li>
    <li>Text should follow the NM styleguide (<a href="http://wiki.novaramedia.com/index.php?title=Articles#Style_guide">http://wiki.novaramedia.com/index.php?title=Articles#Style_guide</a>)</li>
    <li>Text should never end with a single word on the last line. In this case use the return key to manually format the text so there are at least 2 words on the last line</li>
  </ul>

  <h4>Quote image type</h4>

  <ul>
    <li>Where possible an attribution should be added with the `Quote Attribution` parameter</li>
    <li>Quote marks are options and toggled with the `Quote?` checkbox</li>
  </ul>

  <h4>#NovaraFM image type</h4>

  <p>The `#NovaraFM Text?` option adds default text relating to #NovaraFM on Resonance FM</p>

  <table class="form-table">
  <h2>Input data</h2>
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
          <input name="shareable-font-size" type="radio" value="60" /> Basic<br />
          <input name="shareable-font-size" type="radio" value="70" /> Medium<br />
          <input name="shareable-font-size" type="radio" value="85" checked="checked" /> Large
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-checkbox-fm" style="width: 100%;">#NovaraFM Text?</label>
        </th>
        <td>
          <input name="shareable-checkbox-fm" id="shareable-checkbox-fm" type="checkbox">
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-checkbox-serif" style="width: 100%;">Serif Text?</label>
        </th>
        <td>
          <input name="shareable-checkbox-serif" id="shareable-checkbox-serif" type="checkbox">
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-checkbox-boolean" style="width: 100%;">Quote?</label>
        </th>
        <td>
          <input name="shareable-checkbox-boolean" id="shareable-checkbox-boolean" type="checkbox">
        </td>
      </tr>
      <tr>
        <th scope="row">
          <label for="shareable-quote-attribution" style="width: 100%;">Quote Attribution</label>
        </th>
        <td>
          <input name="shareable-quote-attribution" id="shareable-quote-attribution" type="text">
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
