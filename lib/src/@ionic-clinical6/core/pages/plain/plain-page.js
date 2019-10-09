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
import { AppConfig } from '../../config';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';
let PlainPage = class PlainPage {
    constructor(translator, appConfig, c6Service, nav, navParams, viewCtrl, alertCtrl, _sanitizer) {
        this.translator = translator;
        this.appConfig = appConfig;
        this.c6Service = c6Service;
        this.nav = nav;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this._sanitizer = _sanitizer;
        this.title = "";
        this._body = "";
        this.isLoading = true;
        if (navParams.get('page')) {
            this.title = navParams.get('page').title || "";
            this._body = navParams.get('page').body_content || "";
        }
        this.permLink = navParams.get('permanent_link');
    }
    get body() {
        return this._sanitizer.bypassSecurityTrustHtml(this._body);
    }
    ngOnInit() {
        if (this.permLink)
            this.getContents();
    }
    getContents() {
        if (this.appConfig[this.permLink]) {
            this.isLoading = false;
            this.parseRemoteContents();
            return;
        }
        this.isLoading = true;
        this.c6Service.getDynamicContent(this.permLink)
            .then(result => {
            this.retrievedContentCallback(result);
            this.isLoading = false;
            this.parseRemoteContents();
        }).catch(e => {
            this.isLoading = false;
            console.error('get Plain page error:', e);
            let alert = this.alertCtrl.create({
                title: 'Connection Error',
                subTitle: 'Unable to retrieve information from Server. Please check your connection and try again later.',
                buttons: [
                    {
                        text: 'Ok',
                        handler: data => {
                            this.nav.pop();
                        }
                    }
                ]
            });
            alert.present();
        });
    }
    /**
     * This Callback is called when the dynamic content is retrieved.
     * Override this in case you need to customize data retrieval/storage
     * @param result
     */
    retrievedContentCallback(result) {
        this.appConfig[this.permLink] = result[0];
    }
    ;
    parseRemoteContents() {
        var contents = this.appConfig[this.permLink];
        this.title = contents.title;
        if (contents['description'])
            this._body = contents['description'];
        if (contents['richText'])
            this._body = contents['richText'];
        if (contents['rich_text'])
            this._body = contents['rich_text'];
        if (contents['rich_description'])
            this._body = contents['rich_description'];
        if (contents['richDescription'])
            this._body = contents['richDescription'];
    }
};
PlainPage = __decorate([
    Component({
        selector: 'plain-page',
        template: `
    <ion-header>
      <app-toolbar [title]="title" [backLabel]="translator.getInnerHTML('BACK') || 'Back'" layout="plain"></app-toolbar>
    </ion-header>

    <ion-content small-padding (click)="return;">
        <div class="spinner-overlay" *ngIf="isLoading"><ion-spinner></ion-spinner></div>
      <div [innerHTML]="body" small-text class="content-body" *ngIf="!isLoading"></div>
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
], PlainPage);
export { PlainPage };

//# sourceMappingURL=plain-page.js.map
