var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
let HelpModalPage = class HelpModalPage {
    constructor(params, viewCtrl) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.title = this.params.get('title');
        this.subTitle = this.params.get('subTitle');
        this.body = this.params.get('helpText');
        this.buttonName = this.params.get('buttonName') || 'Cancel';
        this.color = this.params.get('color') || 'Primary';
        this.iconColorClass = 'title-icon' + (this.params.get('color') || '');
    }
    dismiss(action) {
        this.viewCtrl.dismiss(action);
    }
};
HelpModalPage = __decorate([
    Component({
        selector: 'help-modal',
        template: `
    <ion-toolbar class="alert-top">  
        <a><div class="p6-icon-cross exit-icon" 
                (click)="dismiss()"></div></a>
    </ion-toolbar> 

    <ion-content padding>
        <div class="title-container">
          <span class="p6-icon-info {{iconColorClass}}"></span>
          <div class="title-big title">{{title}}</div>
        </div>
        <div class="subtitle" *ngIf="subTitle" [innerHTML]="subTitle"></div>
        <div class="body-text" [innerHTML]="body"></div>
    </ion-content>

    <ion-footer>
      <ion-row>
        <ion-col>
          <button ion-button full (click)="dismiss('contact')" style="border-bottom-left-radius: 0.9rem;"
            [color]="color">Contact Support</button>
        </ion-col>
        <ion-col>
          <button ion-button full (click)="dismiss('none')" style="border-bottom-right-radius: 0.9rem;"
            [color]="color">{{buttonName}}</button>
        </ion-col>
      </ion-row>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [NavParams,
        ViewController])
], HelpModalPage);
export { HelpModalPage };

//# sourceMappingURL=help-modal.js.map
