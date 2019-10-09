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
import { ViewController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Clinical6Service } from '../../clinical6.service';
import { AppConfig } from '../../config';
import { PlainPage } from '../plain/plain-page';
import { TranslatorService } from '../../translator/translator.service';
let AboutPage = class AboutPage extends PlainPage {
    constructor(translator, appConfig, c6Service, nav, navParams, viewCtrl, alertCtrl, _sanitizer) {
        super(translator, appConfig, c6Service, nav, navParams, viewCtrl, alertCtrl, _sanitizer);
        this.translator = translator;
        this.appConfig = appConfig;
        this.c6Service = c6Service;
        this.nav = nav;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this._sanitizer = _sanitizer;
        this.imgLoaded = false;
        if (navParams.get('page')) {
            this.image = navParams.get('page').image;
        }
        if (this.image && this.image.url) {
            this.imageUrl = this.image.url;
        }
        else
            this.imageUrl = this.image && this.image.image && this.image.image.main && this.image.image.main.url;
    }
    parseRemoteContents() {
        super.parseRemoteContents();
        var contents = this.appConfig[this.permLink];
        if (contents['image'] && contents['image']['url']) {
            this.imageUrl = contents['image']['url'];
            this.backgrImage = this._sanitizer.bypassSecurityTrustStyle('url("' + this.imageUrl + '")');
        }
        else if (contents['imageUrl']) {
            this.imageUrl = contents['imageUrl'];
            this.backgrImage = this._sanitizer.bypassSecurityTrustStyle('url("' + this.imageUrl + '")');
        }
    }
    imageLoaded() {
        this.imgLoaded = true;
    }
};
AboutPage = __decorate([
    Component({
        selector: 'about-page',
        template: `
    <ion-header>
      <app-toolbar [title]="title" [backLabel]="translator.getInnerHTML('BACK') || 'Back'" layout="plain"></app-toolbar>

    </ion-header>
    <ion-content  no-padding >
        <div class="spinner-overlay" *ngIf="isLoading || !imgLoaded"><ion-spinner></ion-spinner></div>
        <div small-padding class="image-container" [style.background-image]="backgrImage">
            <img class="icon-image" [src]="imageUrl" (error)="imageLoaded()" (load)="imageLoaded();" style="opacity:0;position:absolute;height:0;"/>
        </div>
        <div small-padding *ngIf="!isLoading && imgLoaded">
            <div [innerHTML]="body" padding small-text></div>
        </div>
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [TranslatorService,
        AppConfig,
        Clinical6Service,
        NavController,
        NavParams,
        ViewController,
        AlertController,
        DomSanitizer])
], AboutPage);
export { AboutPage };

//# sourceMappingURL=about.js.map
