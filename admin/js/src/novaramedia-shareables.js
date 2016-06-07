/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */

let $ = jQuery;
class Shareables {
  constructor() {
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

  bind() {
    var _this = this;

    $('#get-post-data').on('click', () => this.getPostData( $('#shareable-post-id').val() ) );

    $('#generate-shareable').on('click', () => this.generateShareable() );
  }

  getPostData() {
    let postId = $('#shareable-post-id').val();

    // Turn on Loading

    // Load data
    if( postId === undefined ) {
      return alert('Invalid post ID');
    }
     
    let data = {
      'action': 'get_post_data',
      'postId': postId
    };

    jQuery.ajax({
      url: ShareableVars.ajaxurl,
      type: 'get',
      data: data,
      success: response => this.ajaxSuccess(response, status)
    });


  }

  ajaxSuccess(response, status) {
    console.log('response', response);
    console.log('status', status);
    if( !response ) {
      console.error( response.error );
    } else if ( response.type !== 'success' ) {
      console.error( response.error );
    } else if ( response.type === 'success' ) {
      this.fillData(response.postData);
    }
  }

  fillData(data) {
    // Set title
    this.postTitleField.val( data.post_title );

    // Set image
    this.postImageField.val( data.post_image );

    // Set text
    this.postTextField.val( data.post_content );
  }

  generateShareable() {
    return true;
  }
};

jQuery(window).load(function () {
  let shareables = new Shareables;
});
