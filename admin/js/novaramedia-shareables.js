'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */

var $ = jQuery;

var Shareables = function () {
  function Shareables() {
    _classCallCheck(this, Shareables);

    this.container = $('.shareable-container');

    this.postTitleField = $('#shareable-post-title');
    this.postImageField = $('#shareable-post-image');
    this.postTextField = $('#shareable-post-text');

    this.canvas = new ShareableCanvas({
      'container': 'canvas-container'
    });

    // Bind stuff
    this.bind();

    this.getPostData();
  }

  _createClass(Shareables, [{
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      var _this = this;

      $('#get-post-data').on('click', function () {
        return _this2.getPostData($('#shareable-post-id').val());
      });

      $('#generate-shareable').on('click', function () {
        return _this2.generateShareable();
      });
    }
  }, {
    key: 'getPostData',
    value: function getPostData() {
      var _this3 = this;

      var postId = $('#shareable-post-id').val();

      // Turn on Loading

      // Load data
      if (postId === undefined) {
        return alert('Invalid post ID');
      }

      var data = {
        'action': 'get_post_data',
        'postId': postId
      };

      jQuery.ajax({
        url: ShareableVars.ajaxurl,
        type: 'get',
        data: data,
        success: function success(response) {
          return _this3.ajaxSuccess(response, status);
        }
      });
    }
  }, {
    key: 'ajaxSuccess',
    value: function ajaxSuccess(response, status) {
      console.log('response', response);
      console.log('status', status);
      if (!response) {
        console.error(response.error);
      } else if (response.type !== 'success') {
        console.error(response.error);
      } else if (response.type === 'success') {
        this.fillData(response.postData);
      }
    }
  }, {
    key: 'fillData',
    value: function fillData(data) {
      // Set title
      this.postTitleField.val(data.post_title);

      // Set image
      this.postImageField.val(data.post_image);

      // Set text
      this.postTextField.val(data.post_content);
    }
  }, {
    key: 'generateShareable',
    value: function generateShareable() {
      return true;
    }
  }]);

  return Shareables;
}();

;

jQuery(window).load(function () {
  var shareables = new Shareables();
});