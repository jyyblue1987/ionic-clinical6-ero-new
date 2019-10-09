var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
let VerifyCardComponent = class VerifyCardComponent {
    constructor(nav, modalCtrl) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() {
        const self = this;
    }
    showError(errorSubTitle, errorText) {
        // const title = 'Error';
        // // using the Help Modal for the time being, later on to be reskinned
        // let modal = this.modalCtrl.create(HelpModalPage, {title: title, subTitle: errorSubTitle, helpText: errorText}, { showBackdrop: true });
        // modal.present();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], VerifyCardComponent.prototype, "verify", void 0);
VerifyCardComponent = __decorate([
    Component({
        selector: 'verify-card',
        template: `
      <ion-card class="verify-card">
        <ion-card-header class="verify-card-header">
          {{verify.itemHeader}}
        </ion-card-header>
          <ion-card-content class="verify-card-content">
            <div no-margin class="verify-card-title"><b>{{verify.itemTitle}}</b><br></div>
            <div no-margin [innerHTML]="verify.itemDescription"></div>
          </ion-card-content>
      </ion-card> 
  `
    }),
    __metadata("design:paramtypes", [NavController,
        ModalController])
], VerifyCardComponent);
export { VerifyCardComponent };

//# sourceMappingURL=verify-card.component.js.map
