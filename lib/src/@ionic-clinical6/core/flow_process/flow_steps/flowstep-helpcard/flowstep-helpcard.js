var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* globals Clinical6 */
import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { HelpModalPage } from '../../../modal/help-modal';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { clinical6 } from 'clinical6';
import { AppConfig } from '../../../config/app.config';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../utils.service';
let FlowStepHelpCardPage = class FlowStepHelpCardPage extends FlowStepPage {
    constructor(utilsSvc, navParams, nav, flowCtlr, modalCtrl, platform, elementRef, sanitizer) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);
        this.utilsSvc = utilsSvc;
        this.navParams = navParams;
        this.nav = nav;
        this.flowCtlr = flowCtlr;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.elementRef = elementRef;
        this.sanitizer = sanitizer;
        this.baseUrl = clinical6.apiBaseUrl;
        this.showHelpButton = this.step.help_subtitle || this.step.help_text;
        // this.step.index = this.step.flow.steps.findIndex(step => step.id === this.step.id);
    }
    showHelp() {
        let modal = this.modalCtrl.create(HelpModalPage, {
            title: this.step.help_title || 'Help',
            subTitle: this.step.help_subtitle,
            helpText: this.step.help_text || `No help text exists for this element.`,
            color: 'help'
        }, { showBackdrop: true });
        modal.onDidDismiss(action => {
            if (action === 'contact') {
                this.goToContactPage();
            }
        });
        modal.present();
    }
    goToContactPage() {
        this.nav.push(this.helpPage, { from: '' }, AppConfig.animationOpt);
    }
    hasSingleTextarea() {
        return ((this.step.inputs.length === 1) &&
            (this.step.inputs[0].question_type === 'input') &&
            (this.step.inputs[0].style === 'text_area'));
    }
};
FlowStepHelpCardPage = __decorate([
    Component({
        selector: 'flowstep-helpcard',
        template: `
    <!--<ion-header>
      <ion-toolbar no-padding no-margin color="primary" class="header-toolbar">
        <ion-buttons left>
          <button ion-button no-padding (click)="goBack()" class="bar-button">
          <ion-icon name="arrow-back"></ion-icon>
          <span class="button-text">Back</span>
        </button>
        </ion-buttons>
        <ion-title><span class="app-p6-icon-PPD-logo app-logo"></span></ion-title>
      </ion-toolbar>
    </ion-header>-->
    <ion-header>
      <app-toolbar [backLabel]="'Back'"
                  layout="app"
                 ></app-toolbar>
    </ion-header>
    <ion-content padding (click)="return;">
      <div class="progress-bar">
        <div class="back"></div>
        <div class="swipe" [style.width]="((step.index+1) / step.flow.total * 100) + '%'" 
            [style.border-radius]="(step.index+1) == step.flow.total?'100px 100px 100px 100px':'100px 0px 0px 100px'"></div>
      </div>
      <ion-card class="full-size-card" [class.single-textarea-page]="hasSingleTextarea()">
        <div [innerHTML]="step.title" class="title"></div>
        <img class="icon-image" src="{{step.image.original}}" (error)="imgError($event)" [style.display]="(showImage?'':'none')" (load)="imgLoaded()"/>
        <div padding [innerHTML]="step.rich_description" *ngIf="step.rich_description" class="description"></div>

        <input-container [inputList]="inputs" (formStatusChanged)="updateForm($event)" (formValueChanged)="updateInputValues($event)" [fields]="fields"
        (keyup)="handleGoButton($event)"
        ></input-container>
      </ion-card>

    </ion-content>

    <ion-footer no-border>
      <ion-toolbar class="footer" >
        <ion-row class="footer-buttons">
          <ion-col *ngIf="showHelpButton">
            <button ion-button full color="secondary" (click)="showHelp()">Help</button>
          </ion-col>
          <ion-col *ngFor='let next of step.paths'>
            <button ion-button full (click)="gotoFlow(next.button_name)" [disabled]="!formValid">{{ next.button_name }}</button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [UtilsService,
        NavParams,
        NavController,
        FlowService,
        ModalController,
        Platform,
        ElementRef,
        DomSanitizer])
], FlowStepHelpCardPage);
export { FlowStepHelpCardPage };

//# sourceMappingURL=flowstep-helpcard.js.map
