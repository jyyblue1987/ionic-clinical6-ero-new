import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { Gesture, Platform } from 'ionic-angular';

import { ViewChild, ElementRef , Renderer} from '@angular/core';
import { ThemeableBrowser, ThemeableBrowserObject, ThemeableBrowserOptions } from '@ionic-native/themeable-browser';
import { AppConfig } from '../../config/app.config';
import { TranslatorService } from '../../translator/translator.service';

@Component({
  selector: 'pdf-view',
  templateUrl: './pdf-view.html'
})

export class PdfViewPage {
  title: string;
  pdfPath: string;
  themeColor: string;
  zoomLevel: number = 1;
  lastZoomLevel: number = 1;
  loadingSpinner: boolean = true;
  velocity: number = 20;

  @ViewChild('eventsContainer') elementParent;
  @ViewChild('scalingElement') elementChild;

  gesture: Gesture;
  container = null;
  viewer = null;
  transforms = [];
  initialScale = 0.1265;
  previousScale = 1;
  adjustDeltaX = 0;
  adjustDeltaY = 0;
  offsetX: number;
  offsetY: number;
  pixelDensity: number;

  currentScale = null;
  currentZoom = 1;
  currentDeltaX = null;
  currentDeltaY = null;

  browser: ThemeableBrowserObject;
  enableAndroidViewer: boolean = false;

  constructor(
    public translator: TranslatorService,
    public appConfig: AppConfig,
    public nav: NavController,
    public navParams: NavParams,
    public renderer: Renderer,
    public platform: Platform
    ) {
    this.title = navParams.get('title');
    this.pdfPath = navParams.get('filePath');
    this.themeColor = navParams.get('themeColor') || '';
  }

  ionViewDidLoad() {
    this.displayPDF();
  }

  displayPDF() {
    if (this.platform.is('android')) {
      this.enableAndroidViewer = true;
    // These are used to zoom/pan in android 
    // this.container = this.elementParent.nativeElement;
    // this.viewer = this.elementChild.element.nativeElement;
    // this.viewer.style.transform = 'scale(' + this.previousScale + ')';
    // this.init();
    }
    else {

      var color = this.themeColor[0] === '#' ? this.themeColor : this.rgb2hex(this.themeColor);
      var optionsiOS: ThemeableBrowserOptions = {
        statusbar: {
          color: color
          //  color: '#4f2683'
        },
        toolbar: {
          height: 44,
          color: color
          //  color: '#4f2683'
        },
        title: {
          color: '#ffffffff',
          staticText: this.title
        },
        backButton: {
          wwwImage: 'assets/images/back_arrow100x100+15.png',
          wwwImageDensity: 4,
          align: 'left',
          event: 'backPressed'
        },
        closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
        },
        backButtonCanClose: true
      };

     this.browser = (new ThemeableBrowser()).create(this.pdfPath, '_blank', optionsiOS);
     this.browser.on('loadstart').subscribe(
        res => this.loadStart(res, this),
       error => this.error(error, 'InAppBrowser loadstart Event Error: ' + error)
     );
     this.browser.on('loadstop').subscribe(
       res => this.loadStop(res),
       error => this.error(error, 'InAppBrowser loadstop Event Error: ' + error)
     );
     this.browser.on('loaderror').subscribe(
       res => this.loadError(res),
       error => this.error(error, 'InAppBrowser loaderror Event Error: ' + error)
     );
     this.browser.on('exit').subscribe(
       res => this.exit(res, this),
       error => this.error(error, 'InAppBrowser exit Event Error: ' + error)
     );

    }
  }


  rgb2hex(rgb: any) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }
  loadStart(resource: any, ref: any) {
    console.log('pdfView: loadStart.');
  }

  loadStop(resource: any) {
    console.log('pdfView: loadStop.');
  }

  loadError(resource: any) {
    console.log('pdfView: loadStop.');
  }

  exit(resource: any, ref: any) {
    console.log('pdfView: exit Event ' + resource);
    this.goBack();
  }

  error(error: any, logMsg: string) {
    console.error('pdfView: Error  ' + error);
  }

  goBack() {
    this.nav.pop(AppConfig.animationOptBack);
  }

  // loadComplete(ev) {
  loadComplete() {
    this.loadingSpinner = false;
    console.log('loadComplete:' );
  }

  init = () => {
  // this.gesture = new Gesture(this.container);
  // this.gesture.listen();
  // this.viewer.style.transform = 'scale(' + this.initialScale + ')';

  // this.gesture.on('doubletap', (ev) => {
  //   // this.transforms = [];
  //   // this.previousScale += 1;
  //   // if (this.previousScale >= 4) this.previousScale = 1;
  //   // this.transforms.push('scale(' + this.previousScale + ')');
  //   // this.container.style.transform = this.transforms.join(' ');
  // });

  // this.gesture.on('pinch', (ev) => {
  //   this.doZoom(ev);
  // });

  // this.gesture.on('pinchend', (ev) => {
  //   this.gestureEnd(ev);
  // });

  // this.gesture.on('panend', (ev) => {

  //   // // Saving the final transforms for adjustment next time the user interacts.
  //   // this.previousScale = this.currentScale;
  //   // this.adjustDeltaX = this.currentDeltaX;
  //   // this.adjustDeltaY = this.currentDeltaY;
  //   console.log('panend: previousScale:' + this.previousScale);
  // });
  }


  doZoom(ev: any) {
      // console.log('pinch: previousScale:' + this.previousScale, ev );

      // this.transforms = [];

      // // Initialize zoom settings in case it's needed
      // if (this.offsetY === undefined) {
      //   this.offsetY = this.container.getBoundingClientRect().top;
      //   this.offsetX = 0;
      //   console.log('offset: X: ' + this.offsetX + ', Y:' + this.offsetY );
      // }
      // if (this.pixelDensity === undefined) {
      //   this.pixelDensity = this.viewer.clientWidth / this.container.clientWidth;
      //   console.log('pixelDensity:' + this.pixelDensity );
      // }

      // // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      // this.currentScale = Math.min (this.previousScale * ev.scale, 6);

      // this.currentDeltaX = (ev.center.x - this.offsetX) / this.container.clientWidth * (this.currentScale - 1) / this.currentScale * this.viewer.clientWidth;
      // this.currentDeltaY = (ev.center.y - this.offsetY) / this.container.clientHeight * (this.currentScale - 1) / this.currentScale * this.viewer.clientHeight;

      // // In case zoomed image is too small, set it to fit the screen (width)
      // // this assume this.initialScale is such that it fits screen's width 
      // if (this.currentScale < 1) {
      //   this.currentScale = 1;
      //   this.currentDeltaX = this.currentDeltaY = 0;
      // }

      // this.transforms.push('scale(' + this.currentScale * this.initialScale + ')');
      // this.container.scrollTop = this.currentDeltaY / this.pixelDensity * this.currentScale;
      // this.container.scrollLeft = this.currentDeltaX / this.pixelDensity * this.currentScale;

      // // this.transforms.push('translate(' + (- this.currentDeltaX)  + 'px,' + ( - this.currentDeltaY) + 'px)');
      // // this.viewer.style.transform = this.transforms.join(' ');
      // this.viewer.style.transform = this.transforms.join(' ');

      // console.log('pinch: currentScale:' + this.currentScale + ', deltaX: ' + (- this.currentDeltaX) + ', deltaY: ' + ( - this.currentDeltaY)
      //             + ', scrollTop: ' + (- this.container.scrollTop) + ', scrollLeft: ' + ( - this.currentDeltaX / this.pixelDensity), ev);

      // if (ev.isFinal) this.gestureEnd(ev);

  }

  gestureEnd(ev: any) {
      // // Saving the final transforms for adjustment next time the user interacts.
      // this.transforms = [];

      // this.zoomLevel = this.zoomLevel / this.currentScale;

      // this.currentDeltaX = (ev.center.x - this.offsetX) / this.container.clientWidth * (this.currentScale - 1) / this.currentScale * this.viewer.clientWidth;
      // this.currentDeltaY = (ev.center.y - this.offsetY) / this.container.clientHeight * (this.currentScale - 1) / this.currentScale * this.viewer.clientHeight;

      // this.previousScale = this.currentScale;
      // this.adjustDeltaX = this.currentDeltaX;
      // this.adjustDeltaY = this.currentDeltaY;

      // this.transforms.push('scale(' + this.currentScale * this.initialScale + ')');
      // this.container.scrollTop = this.currentDeltaY / this.pixelDensity * this.currentScale;
      // this.container.scrollLeft = this.currentDeltaX / this.pixelDensity * this.currentScale;

      // // this.transforms.push('scale(' + this.currentScale + ')');
      // // this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
      // this.viewer.style.transform = this.transforms.join(' ');

      // console.log('pinchend: currentScale:' + this.currentScale + ', deltaX: ' + (- this.currentDeltaX) + ', deltaY: ' + ( - this.currentDeltaY) , ev);

    }


} 