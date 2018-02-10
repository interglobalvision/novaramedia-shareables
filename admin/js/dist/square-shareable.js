'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */

var $ = jQuery;

var SquareShareables = function () {
  function SquareShareables() {
    _classCallCheck(this, SquareShareables);

    this.container = $('.shareable-container');

    this.$inputImageField = $('#input-image');
    this.$inputTextField = $('#input-text');

    this.canvas = new ShareableCanvas({
      'container': 'canvas-container'
    });

    // Bind stuff
    this.bind();
  }

  _createClass(SquareShareables, [{
    key: 'bind',
    value: function bind() {
      var _this = this;

      // Generate shareable button
      $('#generate-shareable').on('click', function () {
        return _this.generateShareable();
      });

      // Download button
      $('#download-shareable').on('click', function () {
        return _this.downloadShareable();
      });
    }
  }, {
    key: 'generateShareable',
    value: function generateShareable() {
      var _this2 = this;

      // Clean the canvas
      this.canvas.stage.clear();
      this.canvas.update();

      // Get image
      var imageInput = this.$inputImageField;

      if (imageInput[0].files.length === 0) {
        alert('no image!');
      }

      // Get text
      var text = this.$inputTextField.val();

      // Get font size
      var fontSize = $('input[name=shareable-font-size]:checked').val();

      // #NovaraFM text
      var isNovaraFM = $('#shareable-checkbox-fm').is(':checked');

      // Font
      var isSerif = $('#shareable-checkbox-serif').is(':checked');

      // Quote?
      var isQuote = $('#shareable-checkbox-boolean').is(':checked');
      var quoteAttribution = $('#shareable-quote-attribution').val();

      if (isQuote) {
        text = '“' + text + '”';
      }

      var reader = new FileReader();

      reader.onload = function (file) {
        var loadedImage = new Image();

        loadedImage.crossOrigin = 'Anonymous';
        loadedImage.onload = function (event) {

          _this2.canvas.drawBackground();

          _this2.canvas.addImage(loadedImage, 1, 1);

          _this2.canvas.addCenteredText(text, fontSize, isSerif);

          if (isNovaraFM) {
            _this2.canvas.addTopText('#NovaraFM');
            _this2.canvas.addFooterText('Friday 1pm\nResonance 104.4 FM');
          }

          if (isQuote) {
            _this2.canvas.addQuoteAttribution(quoteAttribution);
          }

          _this2.canvas.addLogo(.125);

          _this2.canvas.addNovaraDotMedia();
        };

        loadedImage.src = file.target.result;
      };

      reader.readAsDataURL(imageInput[0].files[0]);
    }
  }, {
    key: 'downloadShareable',
    value: function downloadShareable() {
      var filename = 'novaramedia-square-shareable.png';
      var link = document.getElementById('download-shareable');
      link.href = this.canvas.canvas.toDataURL();
      link.download = filename;
    }
  }, {
    key: 'toSlug',
    value: function toSlug(text) {
      return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
  }]);

  return SquareShareables;
}();

;

jQuery(window).load(function () {
  var squareShareables = new SquareShareables();
});