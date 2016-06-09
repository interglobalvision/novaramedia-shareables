/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */

let $ = jQuery;
class Shareables {
  constructor() {

    this.postTitleField = $('#shareable-post-title');
    this.postImageField = $('#shareable-post-image');
    this.postTextField = $('#shareable-post-text');
    this.postUrlField = $('#shareable-post-url');

    this.canvas = new ShareableCanvas({
      'container': 'canvas-container'
    });

    // Bind stuff
    this.bind();


    if( !!this.postUrlField.val() ) {
      this.getPostData();
    }
  }

  bind() {
    var _this = this;

    $('#shareable-latest-posts').on('change', () => this.selectSetData( $('#shareable-latest-posts').val() ) );

    $('#get-post-data').on('click', () => this.getPostData( $('#shareable-post-url').val() ) );

    $('#generate-shareable').on('click', () => this.generateShareable() );
  }

  selectSetData(url) {

    this.postUrlField.val(url);
    this.getPostData(url);
  }

  getPostData() {
    let postUrl = $('#shareable-post-url').val();

    // Turn on Loading

    // Load data
    if( postUrl === undefined ) {
      return alert('Invalid post ID');
    }
     
    let data = {
      'action': 'get_post_data',
      'postUrl': postUrl
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
      alert( response.error );
    } else if ( response.type !== 'success' ) {
      console.error( response.error );
      alert( response.error );
    } else if ( response.type === 'success' ) {
      this.fillData(response.postData);
    }
  }

  stripHTML(text) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = text;
    return tmp.textContent || tmp.innerText || "";
  }

  fillData(data) {
    // Set title
    this.postTitleField.val( data.post_title );

    // Set image
    this.postImageField.val( data.post_image );

    // Set text
    this.postTextField.val( this.stripHTML(data.post_content) );
  }

  generateShareable() {

    // Clean the canvas
    this.canvas.stage.clear();
    this.canvas.update();

    // Get title
    let title = this.postTitleField.val();

    // Get image
    let image = this.postImageField.val();

    // Get text
    let text = this.postTextField.val();

    if( text.length > 454 ) {
      return alert('Text is too long');
    }

    // Get URL
    let link = this.postUrlField.val();

    let loadedImage = new Image();
    loadedImage.src = image;

    loadedImage.onload = (event) => {

      this.canvas.drawBackground();

      this.canvas.addImage(image);

      this.canvas.addQuote(text);

      this.canvas.addTitle(title);

      this.canvas.addUrl(link);

      this.canvas.addLogo();
    }
  }
};

jQuery(window).load(function () {
  let shareables = new Shareables;
});
