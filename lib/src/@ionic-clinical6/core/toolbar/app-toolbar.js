var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Input, Output, EventEmitter, Optional } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { AppConfig } from '../config';
let AppToolbar = AppToolbar_1 = class AppToolbar {
    constructor(platform, navCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.backClick = new EventEmitter(); // Action associated to the 'Back' button click
        this.leftBtnClick = new EventEmitter(); // Action associated to the 'left' button click
        this.actionHidden = false; // Hide or show action buttons on right
        this.actionDisabled = false; // If true sets the top right button as disabled
        this.actionClick = new EventEmitter(); // Action associated to the top right button
        this.currentPlatform = this.platform.is('android') ? 'Android' : 'iOS';
        this.layout = this.layout || 'plain';
        this.infoIconClass = this.infoIconClass || 'app-p6-icon-info';
        this.alertsIconClass = this.alertsIconClass || 'app-p6-icon-cup';
        this.backLabel = this.backLabel || AppToolbar_1.defaultBackLabel;
    }
    ngOnChanges() { }
    backButtonClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.navCtrl && this.navCtrl.pop(AppConfig.animationOptBack);
        this.backClick.emit();
    }
    leftButtonClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.leftBtnClick.emit();
    }
    onRightActionClick() {
        this.actionClick.emit();
    }
    displayTextTitle() {
        return ['plain', 'plain-info', 'plain-action', 'plain-plus'].indexOf(this.layout) > -1 || (this.title && this.title !== '');
    }
    displayLogoTitle() {
        return ['app', 'app-menu', 'app-alerts', 'app-only', 'app-back'].indexOf(this.layout) > -1;
    }
    displayLeftButton() {
        return (this.leftBtnLabel && ['app-menu', 'app-only'].indexOf(this.layout) === -1);
    }
    displayBackButton() {
        return (this.backLabel && ['app-menu', 'app-only'].indexOf(this.layout) === -1);
    }
    displayAlerts() {
        return ['app-back', 'app-menu'].indexOf(this.layout) > -1;
    }
    displayAction() {
        return !this.actionHidden && (this.displayTextTitle() || this.displayAlerts());
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "layout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "bgColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "backLabel", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "backClick", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "leftBtnLabel", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "leftBtnClick", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "actionHidden", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "actionDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "rightLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "infoIconClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "alertsIconClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "alert", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AppToolbar.prototype, "actionClick", void 0);
AppToolbar = AppToolbar_1 = __decorate([
    Component({
        selector: 'app-toolbar',
        template: `
    <ion-toolbar *ngIf="currentPlatform === 'iOS'" no-padding no-margin class="c6-toolbar ios" 
    [style.background-color]="bgColor">
      <ion-buttons id="left-button" left>
        <button *ngIf="displayLeftButton()" ion-button no-padding (click)="leftButtonClick($event)" class="bar-button">
          <ion-icon name="ios-arrow-back"></ion-icon>
          <span class="button-text">{{leftBtnLabel}}</span>
        </button>
        <button *ngIf="displayBackButton()" ion-button no-padding (click)="backButtonClick($event)" class="bar-button">
          <ion-icon name="ios-arrow-back"></ion-icon>
          <span class="button-text">{{backLabel}}</span>
        </button>
        <button *ngIf="layout === 'app-menu'" ion-button no-padding menuToggle left class="menu-button">
          <div name="menu" class="menu-icon app-p6-icon-hamburger-straigth"></div>
        </button>
      </ion-buttons>

      <ion-title *ngIf="displayTextTitle()"><span [innerHTML]="title"></span></ion-title>
      <ion-title *ngIf="displayLogoTitle()"><span class="app-p6-icon-logo app-logo"></span></ion-title>

      <ion-buttons id="right-button" right *ngIf="displayAction()">
        <button ion-button  no-padding (click)="onRightActionClick()" [disabled]="actionDisabled">
          <span *ngIf="layout === 'plain-info'" [class]="infoIconClass + ' info-icon'"></span>
          <span *ngIf="layout === 'plain-action'" class="button-text">{{rightLabel}}</span>
          <span *ngIf="layout === 'plain-plus'" class="app-p6-icon-add plus-icon"></span>
          <div *ngIf="displayAlerts()" id="alerts-text">{{alert}}</div>
          <div *ngIf="displayAlerts()" id="alerts-icon" [class]="alertsIconClass"></div>
        </button>
      </ion-buttons>
      <ng-content select="ion-buttons[end]"></ng-content>
    </ion-toolbar>

    <ion-toolbar *ngIf="currentPlatform === 'Android'" no-padding no-margin class="c6-toolbar android" 
    [style.background-color]="bgColor">
      <ion-buttons id="left-button" left>
        <button *ngIf="displayLeftButton()" ion-button no-padding (click)="leftButtonClick($event)" class="bar-button">
          <ion-icon name="ios-arrow-back"></ion-icon>
          <span class="button-text">{{leftBtnLabel}}</span>
        </button>
        <button *ngIf="displayBackButton()" ion-button no-padding (click)="backButtonClick($event)" class="bar-button">
          <ion-icon name="ios-arrow-back"></ion-icon>
          <span class="button-text">{{backLabel}}</span>
        </button>
        <button *ngIf="layout === 'app-menu'" ion-button no-padding menuToggle left class="menu-button">
          <div name="menu" class="menu-icon app-p6-icon-hamburger-straigth"></div>
        </button>
      </ion-buttons>
  
        <ion-title *ngIf="displayTextTitle()"><span [innerHTML]="title"></span></ion-title>
        <ion-title *ngIf="displayLogoTitle()"><span class="app-p6-icon-logo app-logo"></span></ion-title>

      <ion-buttons id="right-button" right *ngIf="displayAction()">
        <button ion-button  no-padding (click)="onRightActionClick()" [disabled]="actionDisabled">
          <span *ngIf="layout === 'plain-info'" [class]="infoIconClass + ' info-icon'"></span>
          <span *ngIf="layout === 'plain-action'" class="button-text">{{rightLabel}}</span>
          <span *ngIf="layout === 'plain-plus'" class="app-p6-icon-add plus-icon"></span>

          <div *ngIf="displayAlerts()" id="alerts-text">{{alert}}</div>
          <div *ngIf="displayAlerts()" id="alerts-icon" [class]="alertsIconClass"></div>
        </button>
      </ion-buttons>
      <ng-content select="ion-buttons[end]"></ng-content>
    </ion-toolbar>
  `,
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [Platform,
        NavController])
], AppToolbar);
export { AppToolbar };
var AppToolbar_1;
/*
Supported Toolbar layouts

<!-- Layout E2/X1: Center Text Title + Back Arrow  + Back Label + Info right icon -->
  <app-toolbar [title]="'Step 1: Site Information'" [backLabel]="'Study'"  [bgColor]="themeColor"
              layout="plain-info"
              (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>

<!-- Layout Q4 -->
  <app-toolbar [title]="'About Study'" [backLabel]="buttonText"  [bgColor]="themeColor"
              layout="plain"
             ></app-toolbar>


<!-- Layout E11.1/T6/K1/T18.2 -->
  <app-toolbar [title]="'Secure Storage Area'" [backLabel]="buttonText"  [bgColor]="themeColor"
              layout="plain-action" [rightLabel]="'Edit'"
              (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>

<!-- Layout V6 -->
  <app-toolbar [title]="'Investigator Brochure'"
              layout="plain"
             ></app-toolbar>

<!-- Layout U10/E11/T14 -->
  <app-toolbar [title]="'Site Addresses'" [backLabel]="'Home'"  [bgColor]="themeColor"
              layout="plain-plus"
              (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>


<!-- Layout A2: Company Logo centered + back arrow + back Label -->
To change app logo on the toolbar, please create a .scss mapping between
.app-p6-icon-logo:before and the new icon.
eg. by putting:
        app-toolbar .app-logo:before {
            font-family: 'new-app-icons' !important;
            font-size: 3.6rem;
            line-height: 1.1;
            @extend .new-app-icon-logo:before
        }
inside app.scss
//
    <app-toolbar [backLabel]="'Back'"  [bgColor]="'aqua'"
                layout="app"
               ></app-toolbar>

<!-- Layout A8: Company Logo centered only -->
    <app-toolbar [bgColor]="'green'"
                layout="app-only"></app-toolbar>

<!-- Layout W2 -->
    <app-toolbar [backLabel]="'Home'"  [bgColor]="'orange'" [alert]="'1000'" alertsIconClass="icon-alert"
                layout="app-back"
                (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>

<!-- Layout E1 (eg. Dashboard)-->
    <app-toolbar [bgColor]="'blue'" [alert]="'1000'" alertsIconClass="alert-icon"
                layout="app-menu"
                (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>


*/

//# sourceMappingURL=app-toolbar.js.map
