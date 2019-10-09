var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ViewChild, Renderer } from '@angular/core';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { AppConfig } from '../../config/app.config';
import { TranslatorService } from '../../translator/translator.service';
let PdfViewPage = class PdfViewPage {
    constructor(translator, appConfig, nav, navParams, renderer, platform) {
        this.translator = translator;
        this.appConfig = appConfig;
        this.nav = nav;
        this.navParams = navParams;
        this.renderer = renderer;
        this.platform = platform;
        this.zoomLevel = 1;
        this.lastZoomLevel = 1;
        this.loadingSpinner = true;
        this.velocity = 20;
        this.container = null;
        this.viewer = null;
        this.transforms = [];
        this.initialScale = 0.1265;
        this.previousScale = 1;
        this.adjustDeltaX = 0;
        this.adjustDeltaY = 0;
        this.currentScale = null;
        this.currentZoom = 1;
        this.currentDeltaX = null;
        this.currentDeltaY = null;
        this.enableAndroidViewer = false;
        this.init = () => {
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
        };
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
            var optionsiOS = {
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
            this.browser.on('loadstart').subscribe(res => this.loadStart(res, this), error => this.error(error, 'InAppBrowser loadstart Event Error: ' + error));
            this.browser.on('loadstop').subscribe(res => this.loadStop(res), error => this.error(error, 'InAppBrowser loadstop Event Error: ' + error));
            this.browser.on('loaderror').subscribe(res => this.loadError(res), error => this.error(error, 'InAppBrowser loaderror Event Error: ' + error));
            this.browser.on('exit').subscribe(res => this.exit(res, this), error => this.error(error, 'InAppBrowser exit Event Error: ' + error));
        }
    }
    rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? '#' +
            ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }
    loadStart(resource, ref) {
        console.log('pdfView: loadStart.');
    }
    loadStop(resource) {
        console.log('pdfView: loadStop.');
    }
    loadError(resource) {
        console.log('pdfView: loadStop.');
    }
    exit(resource, ref) {
        console.log('pdfView: exit Event ' + resource);
        this.goBack();
    }
    error(error, logMsg) {
        console.error('pdfView: Error  ' + error);
    }
    goBack() {
        this.nav.pop(AppConfig.animationOptBack);
    }
    // loadComplete(ev) {
    loadComplete() {
        this.loadingSpinner = false;
        console.log('loadComplete:');
    }
    doZoom(ev) {
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
    gestureEnd(ev) {
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
};
__decorate([
    ViewChild('eventsContainer'),
    __metadata("design:type", Object)
], PdfViewPage.prototype, "elementParent", void 0);
__decorate([
    ViewChild('scalingElement'),
    __metadata("design:type", Object)
], PdfViewPage.prototype, "elementChild", void 0);
PdfViewPage = __decorate([
    Component({
        selector: 'pdf-view',
        template: `
    <ion-header>
      <app-toolbar [title]="title" [backLabel]="translator.getInnerHTML('BACK') || 'Back'"  [bgColor]="themeColor"
                  layout="plain"
                 ></app-toolbar>
    </ion-header>
    <ion-content no-padding class="pdf-view">
    	<ion-spinner *ngIf="loadingSpinner"> </ion-spinner>
    	<div class="zoom-container" #eventsContainer *ngIf="enableAndroidViewer">
    		<!--<pdf-viewer  [src]="pdfPath" [after-load-complete]="loadComplete" [show-all]="true" #scalingElement [zoom]="1.2">-->
    		<pdf-viewer  [src]="pdfPath" (after-load-complete)="loadComplete($event)" [show-all]="true" #scalingElement [zoom]="1.2">
    		</pdf-viewer>
    	</div>
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [TranslatorService,
        AppConfig,
        NavController,
        NavParams,
        Renderer,
        Platform])
], PdfViewPage);
export { PdfViewPage };

//# sourceMappingURL=pdf-view.js.map
