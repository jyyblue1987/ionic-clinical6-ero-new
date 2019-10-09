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
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { HelpModalPage } from '../../../modal/help-modal';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { clinical6 } from 'clinical6';
import { AppConfig } from '../../../config/app.config';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../utils.service';
let FlowStepHelpPage = class FlowStepHelpPage extends FlowStepPage {
    // item = { type: 'none', endPoint: ''};
    constructor(utilsSvc, navParams, nav, flowCtlr, modalCtrl, sanitizer) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);
        this.utilsSvc = utilsSvc;
        this.navParams = navParams;
        this.nav = nav;
        this.flowCtlr = flowCtlr;
        this.modalCtrl = modalCtrl;
        this.sanitizer = sanitizer;
        this.baseUrl = clinical6.apiBaseUrl;
        this.showHelpButton = this.step.help_subtitle || this.step.help_text;
        this.showInputs = false;
        if (this.inputs.length > 0) {
            this.showInputs = true;
        }
        this.prevNextButtons = new Array();
        this.additionalButtons = new Array();
        // Go through step.paths and store the index values for previous / next buttons & additional buttons in their respective arrays
        for (var i = 0; i < this.step.paths.length; i++) {
            if (this.step.paths[i].button_name.toLowerCase() === 'next' || this.step.paths[i].button_name.toLowerCase() === 'prev'
                || this.step.paths[i].button_name.toLowerCase() === 'previous'
                || this.step.paths[i].button_name.toLowerCase() === 'continue' || this.step.paths[i].button_name.toLowerCase() === 'complete') {
                this.prevNextButtons.push(i);
            }
            else {
                this.additionalButtons.push(i);
            }
        }
        console.log('Additional Buttons len: ' + this.additionalButtons.length);
    }
    ionViewDidLoad() {
    }
    showHelp() {
        let modal = this.modalCtrl.create(HelpModalPage, {
            title: this.step.help_title || 'Information',
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
};
FlowStepHelpPage = __decorate([
    Component({
        selector: 'flowstep-help',
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

      <div class="title">{{step.title}}</div>
      <img class="icon-image" src="{{step.image.original}}" />
      <div class="helper" [innerHTML]="step.rich_description" *ngIf="step.rich_description"></div>

      <ion-row no-padding no-margin *ngIf="showInputs">
        <ion-col>
          <div class="form_container">
            <input-container [inputList]="inputs" (formStatusChanged)="updateForm($event)" (formValueChanged)="updateInputValues($event)" [fields]="fields"></input-container>
          </div>
        </ion-col>
      </ion-row>

        <ng-template ngFor let-index [ngForOf]="additionalButtons">
          <ion-row no-margin no-padding>
            <button ion-button full color="secondary" class="additional-button" (click)="gotoFlow(step.paths[index].button_name)">{{step.paths[index].button_name}}</button>
          </ion-row>
        </ng-template>


    </ion-content>

    <ion-footer nopadding no-border>
      <ion-toolbar class="footer">
        <ion-row class="footer-buttons">
          <ion-col *ngIf="showHelpButton">
            <button ion-button full color="secondary" (click)="showHelp()">Help</button>
          </ion-col>
          <!--
          <ion-col *ngFor='let next of step.paths'>
            <button ion-button full (click)="gotoFlow(next.button_name)">{{ next.button_name }}</button>
          </ion-col>-->
          <ion-col *ngFor='let index of prevNextButtons'>
            <button ion-button full (click)="gotoFlow(step.paths[index].button_name)">{{ step.paths[index].button_name }}</button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  `,
    }),
    __metadata("design:paramtypes", [UtilsService,
        NavParams,
        NavController,
        FlowService,
        ModalController,
        DomSanitizer])
], FlowStepHelpPage);
export { FlowStepHelpPage };
const DEMOUSERINFO = {
    'title': 'Dr. (example)',
    'first_name': 'Pat (example)',
    'last_name': 'Cooper (example)',
    'phone': '619-323-3456 (example)',
    'email': 'pcooper@lojollaclinic.com (example)',
    'role': 'Physician (example)'
};

//# sourceMappingURL=flowstep-help.js.map
