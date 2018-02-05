
/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */

let $ = jQuery;
class SquareShareables {
  constructor() {
    this.container = $('.shareable-container');

    this.$inputImageField = $('#input-image');
    this.$inputTextField = $('#input-text');

    this.canvas = new ShareableCanvas({
      'container': 'canvas-container'
    });

    // Bind stuff
    this.bind();

  }

  bind() {
    // Generate shareable button
    $('#generate-shareable').on('click', () => this.generateShareable() );

    // Download button
    $('#download-shareable').on('click', () => this.downloadShareable() );
  }

  generateShareable() {

    // Clean the canvas
    this.canvas.stage.clear();
    this.canvas.update();

    // Get image
    let imageInput = this.$inputImageField;

    if (imageInput[0].files.length === 0) {
      alert('no image!');
    }

    // Get text
    let text = this.$inputTextField.val();

    // Get font size
    let fontSize = $('input[name=shareable-font-size]:checked').val();

    // Quote?
    let isQuote = $('#shareable-checkbox-boolean').is(':checked');
    let quoteAttribution = $('#shareable-quote-attribution').val();

    if (isQuote) {
      text = '“' + text + '”';
    }

    let reader = new FileReader();

    reader.onload = (file) => {
      let loadedImage = new Image();

      loadedImage.crossOrigin = 'Anonymous';
      loadedImage.onload = (event) => {

        this.canvas.drawBackground();

        this.canvas.addImage(loadedImage, 1, 1);

        this.canvas.addCenteredText(text, fontSize);

        if (isQuote) {
          this.canvas.addQuoteAttribution(quoteAttribution);
        }

        this.canvas.addLogo(.125);

        this.canvas.addNovaraDotMedia();
      }

      loadedImage.src = file.target.result;

    };

    reader.readAsDataURL(imageInput[0].files[0]);

  }

  downloadShareable() {
    let filename = 'novaramedia-square-shareable.png';
    let link = document.getElementById('download-shareable');
    link.href = this.canvas.canvas.toDataURL();
    link.download = filename;
  }

  toSlug(text) {
    return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
  }

};

jQuery(window).load(function () {
  let squareShareables = new SquareShareables;
});
