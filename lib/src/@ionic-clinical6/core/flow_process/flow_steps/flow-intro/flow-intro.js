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
import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AppConfig } from '../../../config/app.config';
import { DomSanitizer } from '@angular/platform-browser';
import { FlowService } from '../../flow.service';
import { Flows } from '../../flow-factory';
import { FlowStepPage } from '../flowstep';
import { UtilsService } from '../../../utils.service';
let FlowIntroPage = class FlowIntroPage extends FlowStepPage {
    constructor(utilsSvc, navParams, nav, flowCtlr, modalCtrl, renderer, _sanitizer) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);
        this.utilsSvc = utilsSvc;
        this.navParams = navParams;
        this.nav = nav;
        this.flowCtlr = flowCtlr;
        this.modalCtrl = modalCtrl;
        this.renderer = renderer;
        this._sanitizer = _sanitizer;
        this.step = this.navParams.get('step');
        this.navbarTitle = this.navParams.get('navbarTitle') || 'PPD';
        this.actionLabel = this.step.paths[0].button_name; // takes the first button item
        this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.step.video_link);
        this.previewImgUrl = this._sanitizer.bypassSecurityTrustStyle('url(' + this.step.image.original + ')');
    }
    get iframeUrl() {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.step.video_link);
    }
    get richText() {
        return this._sanitizer.bypassSecurityTrustHtml(this.step.rich_description);
    }
    doBegin() {
        this.step.go(this.actionLabel).then((nextStep) => {
            this.nav.push(Flows.Factory(nextStep), { step: nextStep, navbarTitle: this.navbarTitle, backButtonText: 'Home' }, AppConfig.animationOpt);
        });
    }
    playVideo() {
    }
};
FlowIntroPage = __decorate([
    Component({
        selector: 'flow-intro',
        template: `
      <ion-header>
        <app-toolbar [title]="navbarTitle"
                    layout="plain"
                   ></app-toolbar>
      </ion-header>

      <ion-content no-padding (click)="return;">
        <div class="video-button" [style.background-image]="previewImgUrl">
          <iframe #iframeArea heigth="100%" width="100%" [src]="videoUrl" frameborder="0"></iframe>
        </div>
        <div class="rich_text_container" [innerHTML]="richText"></div>

        <button ion-button class="begin_button" (click)="doBegin()">{{actionLabel}}</button>
      </ion-content>
    `
    }),
    __metadata("design:paramtypes", [UtilsService,
        NavParams,
        NavController,
        FlowService,
        ModalController,
        Renderer,
        DomSanitizer])
], FlowIntroPage);
export { FlowIntroPage };

//# sourceMappingURL=flow-intro.js.map
