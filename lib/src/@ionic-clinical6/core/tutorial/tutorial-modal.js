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
import { ModalController, ViewController } from 'ionic-angular';
let TutorialModalPage = class TutorialModalPage {
    constructor(modalCtrl, viewCtrl) {
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
    }
    /*
     show() {
        let modal = this.modalCtrl.create(ModalPage);
        modal.present();
      }
    */
    dismiss(action) {
        this.viewCtrl.dismiss(action);
    }
};
TutorialModalPage = __decorate([
    Component({
        selector: 'tutorial-modal',
        template: `

      <ion-content>
         <h3>View Tutorials</h3>
         <p>Pick from the options below to procede</p>
         <div class="inline-buttons">
           <button ion-button id="yesButton" (click)="dismiss('yes')">Yes</button>
           <button ion-button id="laterButton" (click)="dismiss('later')">Later</button>
           <button ion-button id="neverButton" (click)="dismiss('never')">Never Again</button>
         </div>
         <div class="block-button">
           <button ion-button id="watchButton" (click)="dismiss('watch')">Watch Video</button>
         </div>
      </ion-content>
    `
    }),
    __metadata("design:paramtypes", [ModalController, ViewController])
], TutorialModalPage);
export { TutorialModalPage };

//# sourceMappingURL=tutorial-modal.js.map
