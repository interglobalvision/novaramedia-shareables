'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */

var $ = jQuery;

var Shareables = function () {
  function Shareables() {
    _classCallCheck(this, Shareables);

    this.container = $('.shareable-container');

    this.$recentPostsSelect = $('#shareable-post-latest-select');
    this.$postIdInput = $('#shareable-post-id');

    this.$postTitleField = $('#shareable-post-title');
    this.$postImageField = $('#shareable-post-image');
    this.$postTextField = $('#shareable-post-text');
    this.$postUrlField = $('#shareable-post-url');

    this.canvas = new ShareableCanvas({
      'container': 'canvas-container'
    });

    // Bind stuff
    this.bind();

    if (!!this.$postIdInput.val()) {
      this.getPostData();
    } else {
      this.setUrlFromSelect();
    }
  }

  _createClass(Shareables, [{
    key: 'bind',
    value: function bind() {
      var _this = this;

      // Latest Posts dropdown
      this.$recentPostsSelect.on('change', function () {
        return _this.setUrlFromSelect();
      });

      // Get data button
      $('#get-post-data').on('click', function () {
        return _this.getPostData();
      });

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
    key: 'setUrlFromSelect',
    value: function setUrlFromSelect() {

      this.$postIdInput.val(this.$recentPostsSelect.val());
      this.getPostData();
    }
  }, {
    key: 'getPostData',
    value: function getPostData() {
      var _this2 = this;

      var postID = this.$postIdInput.val();

      if (postID === undefined) {
        return alert('Invalid post ID');
      }

      var data = {
        'action': 'get_post_data',
        'postId': postID
      };

      jQuery.ajax({
        url: ShareableVars.ajaxurl,
        type: 'get',
        data: data,
        success: function success(response) {
          return _this2.ajaxSuccess(response, status);
        }
      });
    }
  }, {
    key: 'ajaxSuccess',
    value: function ajaxSuccess(response, status) {
      if (!response) {

        console.error(response.error);
        alert(response.error);
      } else if (response.type !== 'success') {

        console.error(response.error);
        alert(response.error);
      } else if (response.type === 'success') {

        this.fillData(response.postData);
        this.generateShareable();
      }
    }
  }, {
    key: 'stripHTML',
    value: function stripHTML(text) {
      var tmp = document.createElement("DIV");

      tmp.innerHTML = text;

      return tmp.textContent || tmp.innerText || "";
    }
  }, {
    key: 'fillData',
    value: function fillData(data) {
      // Set title
      this.$postTitleField.val(data.post_title);

      // Set image
      this.$postImageField.val(data.post_image);

      // Set text
      this.$postTextField.val(this.stripHTML(data.post_content));

      console.log(data);

      // Set URL
      this.$postUrlField.val(data.post_permalink);
    }
  }, {
    key: 'generateShareable',
    value: function generateShareable() {
      var _this3 = this;

      // Clean the canvas
      this.canvas.stage.clear();
      this.canvas.update();

      // Get title
      var title = this.$postTitleField.val();

      // Get image
      var image = this.$postImageField.val();

      // Get text
      var text = this.$postTextField.val();

      // Get URL
      var link = this.$postUrlField.val();

      var loadedImage = new Image();
      loadedImage.src = image;

      loadedImage.onload = function (event) {

        _this3.canvas.drawBackground();

        _this3.canvas.addImage(image);

        _this3.canvas.addQuote(text);

        _this3.canvas.addTitle(title);

        _this3.canvas.addUrl(link);

        _this3.canvas.addLogo();
      };
    }
  }, {
    key: 'downloadShareable',
    value: function downloadShareable() {
      var filename = this.toSlug(this.$postTitleField.val()) + '-post-shareable.png';
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

  return Shareables;
}();

;

jQuery(window).load(function () {
  var shareables = new Shareables();
});