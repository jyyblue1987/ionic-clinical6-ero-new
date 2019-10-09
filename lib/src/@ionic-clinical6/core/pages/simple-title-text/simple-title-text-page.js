var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BasePage } from '../../pages/base/base-page';
let SimpleTitleTextPage = class SimpleTitleTextPage extends BasePage {
    constructor(navParams, nav, sanitizer, platform, elementRef) {
        super(platform, elementRef);
        this.navParams = navParams;
        this.nav = nav;
        this.sanitizer = sanitizer;
        this.platform = platform;
        this.elementRef = elementRef;
        this.themeColor = this.navParams.get('themeColor') || '';
        this.navbarTitle = this.navParams.get('navbarTitle') || '';
        this.backButtonText = this.navParams.get('backButtonText') || '';
        this.titleTextArray = this.navParams.get('titleTextArray') || '';
    }
    getTrustedHTML(text) {
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }
    onError(message) {
    }
    doneCallback() {
    }
};
SimpleTitleTextPage = __decorate([
    Component({
        selector: 'simple-title-text-page',
        template: `
    <ion-header>
      <app-toolbar [title]="navbarTitle" [backLabel]="backButtonText" [bgColor]="themeColor" layout="plain"></app-toolbar>
    </ion-header>

    <ion-content no-padding (click)="return;">
      <ng-template ngFor let-item [ngForOf]="titleTextArray">
        <div class="heading-container" *ngIf="item.title">
          <div class="title" [innerHTML]="item.title" *ngIf="item.title"></div>
        </div>
        <div class="helper" [innerHTML]="getTrustedHTML(item.text)" *ngIf="item.text"></div>
        <img class="icon-image" src="{{item.image}}" *ngIf="item.image"/>
      </ng-template>

      <div class="footer-spacer"></div>
    </ion-content>

    <ion-footer no-padding no-margin>
        <ion-toolbar class="footer">

        </ion-toolbar>
    </ion-footer>
  `,
    }),
    __metadata("design:paramtypes", [NavParams,
        NavController,
        DomSanitizer,
        Platform,
        ElementRef])
], SimpleTitleTextPage);
export { SimpleTitleTextPage };

//# sourceMappingURL=simple-title-text-page.js.map
