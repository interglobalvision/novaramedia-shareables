/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */
/* global $, document, Modernizr */
class ShareableCanvas {
  // This is the Constructor
  // it run when an instance is created
  constructor(options) {
    this.initialized = true;
    this.changed = false;

    this.container = options.container;

    this.canvas = document.getElementById(options.container);

    this.fingers = [];
    this.stage = new createjs.Stage(this.container);

    //createjs.Ticker.addEventListener('tick', event =>  this.update(event));

    this.stage.addEventListener('mousedown', event =>  this.stageMouseDown(event));
    this.stage.addEventListener('pressmove', event =>  this.stagePressMove(event));
    this.stage.addEventListener('pressup', event =>  this.stagePressUp(event));

    createjs.Touch.enable(this.stage);
  }

  // store initial touchpoint-position
  stageMouseDown(event) {

    this.fingers[event.pointerID] = {
      start: {x: event.stageX, y: event.stageY},
      current: {x: event.stageX, y: event.stageY},
      old: {x: event.stageX, y: event.stageY}
    };

    this.calculateActiveFingers();

    this.stage.dispatchEvent('start');

  }

  // update touchpoint-positions
  stagePressMove(event) {
    let pointerID = event.pointerID;

    this.fingers[pointerID].current.x = event.stageX;
    this.fingers[pointerID].current.y = event.stageY;

    if( event.localX !== undefined ) {
      this.fingers[pointerID]['local'] = {
        x: null,
        y: null,
      };

      this.fingers[pointerID].local.x = event.localX;
      this.fingers[pointerID].local.y = event.localY;
    }

    this.calculateActiveFingers();

    this.changed = true;
    this.update();
  }

  stagePressUp(event) {

    if (this.fingers[event.pointerID]) {
      delete(this.fingers[event.pointerID]);
    }

    this.calculateActiveFingers();
    this.stage.dispatchEvent('complete');
    this.update();
  }

  enterFrame(event) {
    this.stage.dispatchEvent('update');
    if (this.changed) {
      this.changed = false;

      for (let pointerID in self.fingers) {
        if (self.fingers[pointerID].start) {
          self.fingers[pointerID].old.x = self.fingers[pointerID].current.x;
          self.fingers[pointerID].old.y = self.fingers[pointerID].current.y;
        }
      }
    }
  }

  calculateActiveFingers() {
    this.activeFingers = 0;

    for (let pointerID in this.fingers) {
      if (this.fingers[pointerID].start) {
        this.activeFingers++;
      }
    }
  }

  update(event) {
    this.stage.update();
  }

  transform(event) {
    if (this.activeFingers > 1) {
      let points = [];

      // extract touchpoints
      for (let k in this.fingers) {
        if (this.fingers[k].current) {
          points.push(this.fingers[k]);
          if (points.length >= 2) break;
        }
      }

      // ---------------------------------------- Rotation
      // calculate initial angle
      let point1 = points[0].old;
      let point2 = points[1].old;
      let startAngle = Math.atan2((point1.y - point2.y), (point1.x - point2.x)) * (180 / Math.PI);

      // calculate new angle
      point1 = points[0].current;
      point2 = points[1].current;
      let currentAngle = Math.atan2((point1.y - point2.y), (point1.x - point2.x)) * (180 / Math.PI);

      let angle = currentAngle - startAngle;

      // i was trying to make it rotate from the center of the fingers as origin
      /*
         if( points[0].local !== undefined && points[1].local !== undefined ) {
      // calculate center point
      point1 = points[0].local;
      point2 = points[1].local;
      console.log('point1', point1);
      let midPoint = this.getMidPoint(point1, point2);
      let bounds = event.currentTarget.getBounds();
      event.currentTarget.regX = bounds.width / 2;//midPoint.x;
      event.currentTarget.regY = bounds.height / 2;//midPoint.y;
      //console.log('Mid point', midPoint);
      }
      */

      // set rotation based on difference between the two angles
      event.currentTarget.rotation += angle * 0.02;

      this.stage.dispatchEvent('rotate');

      // ---------------------------------------- Scale
      let distance = this.getDistance(points[0].current, points[1].current) / this.getDistance(points[0].old, points[1].old);
      //console.log('Distance', distance);

      if( distance > 1.01 ||  distance < 0.9 ) {
        distance = 1 - distance;

        let scale = event.currentTarget.scaleX * distance * -0.02;

        //console.log('Scale', scale);
        //console.log('Current Scale', event.currentTarget.scaleX);

        event.currentTarget.scaleX += scale;

        //console.log('Scaling: ' + event.currentTarget.scaleX + '+ (' + (scale-1) + ') = ' + finalScale);

        event.currentTarget.scaleY = event.currentTarget.scaleX;

        this.stage.dispatchEvent('scale');
      }
    }

    // ---------------------------------------- Movement
    let average = {x: 0, y: 0};

    // caluclate average movement between all points
    let index = 0;
    for (let pointerID in this.fingers) {
      if (this.fingers[pointerID].start) {
        //console.log('pointerID', pointerID );
        //console.log('current x', this.fingers[pointerID].current.x );
        //console.log('old x', this.fingers[pointerID].old.x );
        average.x += (this.fingers[pointerID].current.x - this.fingers[pointerID].old.x);
        average.y += (this.fingers[pointerID].current.y - this.fingers[pointerID].old.y);
      }
    }

    average.x /= Math.max(1, this.activeFingers);
    average.y /= Math.max(1, this.activeFingers);

    // set new positions
    event.currentTarget.x = event.currentTarget.localX + average.x;
    event.currentTarget.y = event.currentTarget.localY + average.y;

    this.stage.dispatchEvent('move');
  }

  savePosition(event) {
    // Put current object position
    event.currentTarget.localX = event.currentTarget.x;
    event.currentTarget.localY = event.currentTarget.y;
  }

  drawCircle() {
    let circle = new createjs.Shape();

    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;

    this.stage.addChild(circle);
    this.update();

  }

  drawBackground() {
    let background = new createjs.Shape();

    background.graphics.beginFill("Black").drawRect(0,0, this.canvas.width, this.canvas.width);
    this.stage.addChild(background);
    this.update();
  }

  loadImage(path, fixSize) {
    let that = this;
    let image = new Image();
    image.src = path;

    image.onload = (event, fixSize) => {
      let loadedImage = event.target;
      this.addImage(loadedImage);
    }

  }

  addImage(image, alpha, fittingRatio) {
    let bitmap = new createjs.Bitmap(image);

    bitmap.alpha = alpha;

    let bounds = bitmap.getBounds();

    var ratio = bounds.height / bounds.width;

    // checking shape of source image to either fit height or width. based on 1200x627 px canvas
    if (ratio > fittingRatio) {
      var scale = this.canvas.width / bounds.width;
    } else {
      var scale = this.canvas.height / bounds.height;
    }

    bitmap.scaleY = scale;
    bitmap.scaleX = scale;

    bitmap.addEventListener('mousedown', event => this.savePosition(event));
    bitmap.addEventListener('pressmove', event => this.transform(event));

    this.stage.addChild(bitmap);

    this.update();
  }

  getDistance(p1, p2) {
    let x = p2.x - p1.x;
    let y = p2.y - p1.y;

    return Math.sqrt((x * x) + (y * y));
  }

  getMidPoint(p1,p2) {
    let midPoint = {
      x: null,
      y: null,
    };

    midPoint.x = p1.x + p2.x / 2;
    midPoint.y = p1.y + p2.y / 2;

    return midPoint;
  }

  addQuote(sourceText, fontSize, addQuotes) {
    let text;

    if (addQuotes) {
      text = '\t\t\t\t\t' + '“' + sourceText + '”';
    } else {
      text = '\t\t\t\t\t' + sourceText;
    }

    let quote = new createjs.Text(text, fontSize + 'px georgia', '#ffffff');

    quote.textBaseline = "alphabetic";
    quote.x = 50;
    quote.y = 100;
    quote.lineWidth = 1100;
    quote.lineHeight = fontSize * 1.7;

    this.stage.addChild(quote);
    this.update();
  }

  addTitle(titleText) {
    let title = new createjs.Text(titleText, "23px helvetica, sans-serif", "#ffffff");
    title.textBaseline = "alphabetic";
    title.x = 200;
    title.y = 627 - 85;
    title.lineWidth = 1000;
    title.lineHeight = 30;

    this.stage.addChild(title);
    this.update();
  }

  addUrl(urlLink) {
    let url = new createjs.Text(urlLink, "14px helvetica, sans-serif", "#ffffff");
    url.textBaseline = "alphabetic";
    url.x = 200;
    url.y = 627 - 55;
    url.lineWidth = 1000;
    url.lineHeight = 30;

    this.stage.addChild(url);
    this.update();
  }

  addCenteredText(sourceText, fontSize, addQuotes) {
    let rawtext;

    if (addQuotes) {
      rawtext = '“' + sourceText + '”';
    } else {
      rawtext = sourceText;
    }

    let text = new createjs.Text(rawtext, 'bold ' + fontSize + 'px helvetica, sans-serif', '#ffffff');

    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.lineWidth = this.canvas.width - 200;
    text.lineHeight = fontSize * 1.3;

    var bounds = text.getBounds();

    text.x = this.canvas.width / 2;
    text.y = (this.canvas.width / 2) - (bounds.height / 2);

    this.stage.addChild(text);
    this.update();
  }

  addNovaraDotMedia() {
    let tagUrl = new createjs.Text('NOVARA.MEDIA', 'bold ' + '40px helvetica, sans-serif', '#ffffff');

    tagUrl.textAlign = 'right';
    tagUrl.textBaseline = 'hanging';

    var bounds = tagUrl.getBounds();

    console.log(bounds);

    tagUrl.lineWidth = bounds.width;

    tagUrl.x = this.canvas.width - 40;
    tagUrl.y = 40;

    this.stage.addChild(tagUrl);
    this.update();
  }

  addLogo(scale) {
    let image = new Image();
    image.src = ShareableVars.pluginurl + '/admin/img/nm-white-logo.svg';

    image.onload = (event) => {
      let logo = new createjs.Bitmap(event.target);

      let bounds = logo.getBounds();

      logo.scaleX = scale;
      logo.scaleY = scale;

      logo.x = 50;
      logo.y = this.canvas.height - (bounds.height * scale + 50);

      logo.rotation = -3.15;

      this.stage.addChild(logo);

      this.update();
    }

  }


};
