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
import { Component, } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
// import { ContactPPDPage } from '../../pages/contact-PPD/contact-PPD';
let AlertModalPage = AlertModalPage_1 = class AlertModalPage {
    constructor(params, viewCtrl) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.self = this;
        this.iconClass = {
            'type_error': 'app-p6-icon-info',
            'type_info': 'app-p6-icon-info'
        };
        this.pageRef = this.params.get('ref');
        this.type = this.params.get('type');
        this.title = this.params.get('title');
        this.subTitle = this.params.get('subTitle');
        this.body = this.params.get('bodyText');
        this.dismissCallback = this.params.get('callbackFunction');
        this.newRoot = this.params.get('newRoot');
        this.buttons = this.params.get('buttons') || [
            { title: 'Contact Us', action: (self) => { self.contact(); } },
            { title: 'Cancel', action: (self) => { self.dismiss(); } },
        ];
        switch (this.type) {
            case 'type_error':
                if (this.title === '') {
                    this.title = 'Error';
                }
                break;
            default:
                this.type = 'type_info';
                if (this.title === '') {
                    this.title = 'Information';
                }
                break;
        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
        this.dismissCallback(this.pageRef);
    }
    contact() {
        if (this.newRoot) {
            this.pageRef.nav.setRoot(this.newRoot)
                .then(() => {
                this.pageRef.nav.push(AlertModalPage_1.contactPage, { from: 'Alert' });
            });
        }
        else {
            this.pageRef.nav.push(AlertModalPage_1.contactPage, { from: 'Alert' });
        }
        // override this
        this.viewCtrl.dismiss();
    }
    /**
     * Show a Modal alert popup
     * @param {string} type Defines default values for title, etc...
     *                      allowed values: 'type_error', 'type_info'
     * @param {string}    title
     * @param {string}    subTitle
     * @param {string}    body
     * @param {function}  cancelCallback
     * @param {any}       newRoot
     */
    static show(context, config) {
        var title = config.title ? config.title : '';
        var subTitle = config.subTitle ? config.subTitle : '';
        var body = config.body ? config.body : '';
        var dismissCallback = config.cancelCallback ? config.cancelCallback : (r) => { r.nav.pop(); };
        var newRoot = config.newRoot ? config.newRoot : null;
        const self = this;
        /* context.nav.present( Modal.create( AlertModalPage, {
                                                           ref: context,
                                                           type: config.type,
                                                           title: title,
                                                           subTitle: subTitle,
                                                           bodyText: body,
                                                           callbackFunction: dismissCallback,
                                                           newRoot: newRoot
                                                         })); */
        if (!context.modalCtrl)
            console.error('Please make sure current context has a modalCtrl: ModalController member');
        let newModal = context.modalCtrl.create(AlertModalPage_1, {
            ref: context,
            type: config.type,
            title: title,
            subTitle: subTitle,
            bodyText: body,
            callbackFunction: dismissCallback,
            newRoot: newRoot,
            buttons: config.buttons
        });
        newModal.present();
    }
};
AlertModalPage = AlertModalPage_1 = __decorate([
    Component({
        selector: 'alert-modal',
        template: `
    <ion-toolbar class="alert-top">  
        <a><div class="app-p6-icon-cross exit-icon" 
                (click)="dismiss()"></div></a>
    </ion-toolbar> 

    <ion-content padding>
        <div class="title-container">
            <span class="{{iconClass[type]}} title-icon"></span>
            <div class="title-big title">{{title}}</div>
        </div>

        <div class="subtitle" *ngIf="subTitle" [innerHTML]="subTitle"></div>
        <div class="body-text" [innerHTML]="body"></div>
    </ion-content>

    <ion-footer>
      <ion-row>
        <ion-col *ngFor='let button of buttons'>
          <button ion-button full (click)="button.action(self)">{{button.title}}</button>
        </ion-col>
      </ion-row>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [NavParams,
        ViewController])
], AlertModalPage);
export { AlertModalPage };
var AlertModalPage_1;

//# sourceMappingURL=alert-modal.js.map
