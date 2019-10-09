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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { AppConfig } from '../../../config/app.config';
import { UtilsService } from '../../../utils.service';
let FlowChoicePage = class FlowChoicePage extends FlowStepPage {
    constructor(utilsSvc, navParams, nav, flowCtlr, modalCtrl) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);
        this.utilsSvc = utilsSvc;
        this.navParams = navParams;
        this.nav = nav;
        this.flowCtlr = flowCtlr;
        this.modalCtrl = modalCtrl;
        this.themeColor = this.navParams.get('themeColor') || '#4F2683'; // primary color TODO, do we have a global variable for it?
        this.setupOrManage = 'setup';
        if (AppConfig.demoMode) {
            // add here code for demo mode
        }
    }
    ngOnInit() {
    }
    gotoFlow(button_name) {
        this.step.flow.reset();
        return super.gotoFlow(button_name);
    }
};
FlowChoicePage = __decorate([
    Component({
        selector: 'flow-choice',
        template: `
    <ion-header>
      <app-toolbar [title]="navbarTitle" [bgColor]="themeColor" layout="plain"></app-toolbar>
    </ion-header>

    <ion-content no-padding (click)="return;">
      <div class="title-section">
        <div class="title" [innerHTML]="step.title"></div>
        <div class="letter-text" [innerHTML]="step.rich_description" *ngIf="step.rich_description"></div>
      </div>

      <ion-list no-margin>
        <ng-template ngFor let-next [ngForOf]="step.paths">
        <ion-row no-margin no-padding>
          <button class="next-button" ion-button (click)="gotoFlow(next.button_name)">{{next.button_name}}</button>
        </ion-row>
        </ng-template>
      </ion-list>
    </ion-content>
  `,
    }),
    __metadata("design:paramtypes", [UtilsService,
        NavParams,
        NavController,
        FlowService,
        ModalController])
], FlowChoicePage);
export { FlowChoicePage };

//# sourceMappingURL=flow-choice.js.map
