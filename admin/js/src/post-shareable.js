
/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */

let $ = jQuery;
class Shareables {
  constructor() {
    this.container = $('.shareable-container');

    this.$recentPostsSelect = $('#shareable-post-latest-select')
    this.$postIdInput = $('#shareable-post-id')

    this.$postTitleField = $('#shareable-post-title');
    this.$postImageField = $('#shareable-post-image');
    this.$postTextField = $('#shareable-post-text');
    this.$postUrlField = $('#shareable-post-url');

    this.canvas = new ShareableCanvas({
      'container': 'canvas-container'
    });

    // Bind stuff
    this.bind();


    if ( !!this.$postIdInput.val() ) {
      this.getPostData();
    } else {
      this.setUrlFromSelect();
    }
  }

  bind() {
    // Latest Posts dropdown
    this.$recentPostsSelect.on('change', () => this.setUrlFromSelect() );

    // Get data button
    $('#get-post-data').on('click', () => this.getPostData() );

    // Generate shareable button
    $('#generate-shareable').on('click', () => this.generateShareable() );

    // Download button
    $('#download-shareable').on('click', () => this.downloadShareable() );
  }

  setUrlFromSelect() {

    this.$postIdInput.val(this.$recentPostsSelect.val());
    this.getPostData();

  }

  getPostData() {
    let postID = this.$postIdInput.val();

    if ( postID === undefined ) {
      return alert('Invalid post ID');
    }

    let data = {
      'action': 'get_post_data',
      'postId': postID
    };

    jQuery.ajax({
      url: ShareableVars.ajaxurl,
      type: 'get',
      data: data,
      success: response => this.ajaxSuccess(response, status)
    });

  }

  ajaxSuccess(response, status) {
    if ( !response ) {

      console.error( response.error );
      alert( response.error );

    } else if ( response.type !== 'success' ) {

      console.error( response.error );
      alert( response.error );

    } else if ( response.type === 'success' ) {

      this.fillData(response.postData);
      this.generateShareable();
    }
  }

  stripHTML(text) {
    var tmp = document.createElement("DIV");

    tmp.innerHTML = text;

    return tmp.textContent || tmp.innerText || "";
  }

  fillData(data) {
    // Set title
    this.$postTitleField.val( data.post_title );

    // Set image
    this.$postImageField.val( data.post_image );

    // Set text
    this.$postTextField.val( this.stripHTML(data.post_content) );

    // Set URL
    this.$postUrlField.val(data.post_permalink);
  }

  generateShareable() {

    // Clean the canvas
    this.canvas.stage.clear();
    this.canvas.update();

    // Get title
    let title = this.$postTitleField.val();

    // Get image
    let image = this.$postImageField.val();

    // Get text
    let text = this.$postTextField.val();

    // Get font size
    let fontSize = $('input[name=shareable-font-size]:checked').val();

    // Add quotes?
    let addQuotes = false;

    if ($('#shareable-checkbox-boolean').is(':checked')) {
      addQuotes = true;
    }

    // Get URL
    let link = this.$postUrlField.val();

    let loadedImage = new Image();
    loadedImage.src = image;
    loadedImage.crossOrigin = 'Anonymous';

    loadedImage.onload = (event) => {

      this.canvas.drawBackground();

      this.canvas.addImage(loadedImage, .3, .5225);

      this.canvas.addQuote(text, fontSize, addQuotes);

      this.canvas.addTitle(title);

      this.canvas.addUrl(link);

      this.canvas.addLogo(.11);
    }
  }

  downloadShareable() {
    let filename = this.toSlug( this.$postTitleField.val() ) + '-post-shareable.png';
    let link = document.getElementById('download-shareable');
    link.href = this.canvas.canvas.toDataURL();
    link.download = filename;
  }

  toSlug(text) {
    return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
  }

};

jQuery(window).load(function () {
  let shareables = new Shareables;
});
