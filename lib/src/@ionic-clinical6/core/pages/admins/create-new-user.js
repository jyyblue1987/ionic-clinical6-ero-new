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
import { ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { TranslatorService } from '../../translator/translator.service';
import { mobileUserService, Client } from 'clinical6';
import { AppLoginService } from '../../login.service';
let CreateNewUserPage = class CreateNewUserPage extends BasePage {
    constructor(loginSvc, nav, alertCtrl, params, platform, el, navCtrl, translator) {
        super(platform, el, navCtrl);
        this.loginSvc = loginSvc;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.params = params;
        this.platform = platform;
        this.el = el;
        this.navCtrl = navCtrl;
        this.translator = translator;
        this.email = '';
        this.pin = '';
        this.account_name = '';
        this.working = false;
        this.isNavigating = false;
    }
    /**
     * This is called when the user clicks on "LOGIN" or equivalent action
     */
    doneCallback() {
        if (!this.isNavigating) {
            this.isNavigating = true;
            this.loginSvc.clearAuthInfo();
            this.loginSvc.authenticateDevice()
                .then(() => {
                var attrs = {};
                if (this.email)
                    attrs['email'] = this.email;
                if (this.pin)
                    attrs['password'] = this.pin;
                if (this.account_name)
                    attrs['account_name'] = this.account_name;
                const url = `/v3/mobile_users/registrations`;
                const data = {
                    'type': 'mobile_users',
                    'attributes': attrs,
                    'relationships': {
                        'devices': {
                            'data': {
                                'type': 'devices',
                                'id': Client.instance.device.id
                            }
                        }
                    }
                };
                mobileUserService.register(attrs, Client.instance.device)
                    .then((result) => {
                    this.isNavigating = false;
                    var buttons = [{
                            text: this.translator.getInnerHTML('POPUP_OK') || 'OK',
                            handler: data => {
                                this.nav.pop();
                            }
                        }
                    ];
                    if (!this.pin && this.email) {
                        buttons.push({
                            text: 'Send Confirmation Email',
                            handler: data => {
                                mobileUserService.sendConfirmation(this.email).then(() => {
                                    this.showAlert('Success', 'User Created and email sent');
                                }).catch((result) => {
                                    this.showAlert('Error', 'User Created but email not sent:' + result.message);
                                });
                            }
                        });
                    }
                    let alert = this.alertCtrl.create({
                        title: 'Success',
                        message: 'User Successfully created',
                        cssClass: 'code-alert',
                        buttons: buttons
                    });
                    alert.present();
                })
                    .catch((result) => {
                    this.isNavigating = false;
                    this.showAlert('Error', 'Error received from platform' + result.message);
                });
            });
        }
    }
    showAlert(title, msg) {
        let alert = this.alertCtrl.create({
            title: title,
            message: msg,
            cssClass: 'code-alert',
            buttons: [
                {
                    text: this.translator.getInnerHTML('POPUP_OK') || 'OK',
                    handler: data => {
                        this.nav.pop();
                    }
                }
            ]
        });
        alert.present();
    }
};
CreateNewUserPage = __decorate([
    Component({
        selector: 'create-new-user',
        template: `
    <ion-header>
      <app-toolbar [backLabel]="'Back'"
      layout="app"></app-toolbar>
    </ion-header>

    <ion-content no-padding>

        <div class="title intro-flow" [innerHTML]="'Create a New User'" *ngIf="!working"></div>
        <div class="form-container" *ngIf="!working">

          <div style="text-align:center">Enter an email or user Account</div>
          <ion-item class="input-field alone">
            <ion-input class="text-input" type="email" value="" [(ngModel)]="email" required  (keyup)="handleKey($event)" 
                  [placeholder]="'Email Address'" autocorrect="off" autocapitalize="off" (focus)="focusOut=false" 
                  (blur)="focusOut=true"></ion-input>
          </ion-item>
          <div style="text-align:center">or</div>
          <ion-item class="input-field alone">
            <ion-input class="text-input" type="email" value="" [(ngModel)]="account_name" required  (keyup)="handleKey($event)" 
                  [placeholder]="'Account ID'" autocorrect="off" autocapitalize="off" (focus)="focusOut=false" 
                  (blur)="focusOut=true"></ion-input>
          </ion-item>
          <div style="text-align:center"><br/>Set a password (or leave it blank) </div>

          <ion-item class="input-field alone">
            <ion-input [placeholder]="'Enter PIN'"
            class="text-input" type="tel"  
            value="" [(ngModel)]="pin" required maxlength="6" autocorrect="off" autocapitalize="off" 
            (keyup)="keyboardPin($event)" (ngModelChange)="keyboardPin($event)"></ion-input>
          </ion-item>     


        </div>
        <ion-spinner *ngIf="working"></ion-spinner>
        <!--<p *ngIf="focusOut && authForm.controls.pin.hasError('minlength') && !authForm.controls.pin.hasError('pattern')" class="error-box">PIN requires exactly 6 digits!</p>-->
        <!--<p [hidden]="!authForm.controls.pin.hasError('pattern')" class="error-box">PIN requires only digits!</p>-->
    </ion-content>
      
    <ion-footer no-border>
      <ion-toolbar no-border >
        <ion-row class="footer-buttons">
          <ion-col no-padding>
            <button ion-button full color="std-button" (click)="doneCallback()" [innerHTML]=" 'Create'" [style.opacity]="working?0:1"></button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [AppLoginService,
        NavController,
        AlertController,
        NavParams,
        Platform,
        ElementRef,
        NavController,
        TranslatorService])
], CreateNewUserPage);
export { CreateNewUserPage };

//# sourceMappingURL=create-new-user.js.map
