/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */
/* global $, document, jQuery */

class Shareables {
  constructor() {
    this.canvas = new ShareableCanvas({
      'container': 'canvas-container',
    });
  }
}

$( window ).load(function() {
  new ShareableCanvas;
});
