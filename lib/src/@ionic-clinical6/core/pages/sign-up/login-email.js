var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { TranslatorService } from '../../translator/translator.service';
import { Client } from 'clinical6';
import { VerifyCodePage } from './login-verify-code';
import { LoginWithPinPage } from './../login-with-pin/login-with-pin';
import { AppConfig } from '../../config';
import { AppLoginService } from '../../login.service';
let EnterEmailPage = class EnterEmailPage extends BasePage {
    constructor(loadingController, loginSvc, nav, translator, alertCtrl, params, platform, el, navCtrl) {
        super(platform, el, navCtrl);
        this.loadingController = loadingController;
        this.loginSvc = loginSvc;
        this.nav = nav;
        this.translator = translator;
        this.alertCtrl = alertCtrl;
        this.params = params;
        this.platform = platform;
        this.el = el;
        this.navCtrl = navCtrl;
        /** @type {string} - Email input model */
        this.email = '';
        /** @type {boolean} - Enables/disables the ion-spinner if the email-form is not ready */
        this.working = false;
        /** @type {boolean} - Prevents the function is called more times in case of multiple click events */
        this.isNavigating = false;
    }
    goBack() {
        this.nav.pop();
    }
    // add method instead of template function
    /**
     * This is called when the user clicks on "LOGIN" or equivalent action
     */
    doneCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isNavigating) {
                this.loader = this.loadingController.create({
                    content: '',
                    dismissOnPageChange: true
                });
                this.loader.present();
                this.isNavigating = true;
                var attributes = {};
                if (this.email.indexOf('@') > -1) {
                    attributes['email'] = this.email;
                }
                else {
                    attributes['account_name'] = this.email;
                }
                /**
                 * TODO: Using fetch until the SDK is updated to return the response object instead of a plain string
                 */
                try {
                    const response = yield Client.instance.fetch('/v3/mobile_users/registration_validation', 'post', {
                        data: { type: 'registration_validations', attributes: attributes }
                    });
                    // mobileUserService.getRegistrationStatus(attributes)
                    this.isNavigating = false;
                    console.log('getRegistrationStatus: success', response);
                    // prepare the alert message
                    let alert = this.alertCtrl.create({
                        title: 'App Registration Error',
                        message: 'Unable to register the application. Please get in touch with your support contact, and try again.',
                        cssClass: 'pin-alert',
                        buttons: []
                    });
                    let pageType = 'Verification';
                    // if (response === 'active') this.nav.push(VerifyCodePage,{ email: this.email });
                    // if (response !== 'new') this.nav.push(VerifyCodePage,{ email: this.email });
                    if (response.data.attributes.value === 'invalid') {
                        this.loader.dismiss();
                        this.showInvaliEmailError();
                    }
                    ;
                    if (response.data.attributes.value === 'disabled') {
                        this.loader.dismiss();
                        this.showDisabledUserError();
                    }
                    ;
                    if (response.data.attributes.value === 'active' || response.data.attributes.value === 'new') {
                        if (response.meta.password_set === true) {
                            /**
                             * TODO: change this once the platoform is configured. this case should never apply
                             * and in case it does destination should be this.goToCodeVerificationPage();
                             *
                             */
                            console.warn('User has set his password already but it results as "new". Moving to enter PIN');
                            pageType = 'PIN';
                        }
                        // resetting the device data - TODO, maybe not necessary
                        this.loginSvc.resetDeviceInfo();
                        // authenticating the device
                        try {
                            const _response = yield this.loginSvc.authenticateDevice();
                            console.log('Device Authentication Success ', response);
                            if (pageType === 'Verification')
                                this.goToCodeVerificationPage();
                            else
                                this.goToEnterPINPage();
                        }
                        catch (err) {
                            this.loader.dismiss();
                            console.error('Error Authenticating ', err);
                            alert.present();
                        }
                    }
                    // if (response === 'new') this.moveToNextFlow();
                }
                catch (error) {
                    this.isNavigating = false;
                    this.loader.dismiss();
                    console.error('getRegistrationStatus: failure', error);
                }
            }
        });
    }
    // moveToNextFlow() {
    //   // Determine whether a PIN code already exists
    //   this.loginSvc.verifyPinExists()
    //   .then((existingPIN) => {
    //       this.isNavigating = false;
    //       if (existingPIN) {
    //         this.goToEnterPINPage();
    //       }
    //       else {
    //         this.goToCodeVerificationPage();
    //       }
    //   })
    //   .catch( reason => {
    //       this.isNavigating = false;
    //       console.warn('Check if User PIN exists error: ', reason);
    //       this.showError('Error', 'Unexpected Response from Server');
    //   });
    // }
    goToCodeVerificationPage() {
        this.nav.push(VerifyCodePage, { email: this.email }, AppConfig.animationOpt);
    }
    goToEnterPINPage() {
        this.nav.push(LoginWithPinPage, { email: this.email }, AppConfig.animationOpt);
    }
    showInvaliEmailError() {
        let alert = this.alertCtrl.create({
            title: this.translator.getInnerHTML('POPUP_INVALID_EMAIL_TITLE') || 'Error',
            message: this.translator.get('POPUP_INVALID_EMAIL_MESSAGE') || 'The entered Email is not valid. Please verify and try again.',
            cssClass: 'email-alert',
            buttons: [
                {
                    text: this.translator.getInnerHTML('POPUP_OK') || 'OK',
                    handler: data => {
                    }
                }
            ]
        });
        alert.present();
    }
    showDisabledUserError() {
        let alert = this.alertCtrl.create({
            title: 'Account Disabled',
            message: 'Your account has been disabled. Please contact your System Administrator.',
            cssClass: 'email-alert',
            buttons: [
                {
                    text: this.translator.getInnerHTML('POPUP_OK') || 'OK',
                    handler: data => {
                    }
                }
            ]
        });
        alert.present();
    }
    handleKey(event) {
        if (event.keyCode === 13) {
            this.doneCallback();
        }
    }
    showError(title = 'Error', errorText) {
        let alert = this.alertCtrl.create({
            title: title,
            message: errorText,
            cssClass: 'email-alert',
            buttons: [
                {
                    text: this.translator.getInnerHTML('POPUP_OK') || 'OK',
                    handler: data => {
                    }
                }
            ]
        });
        alert.present();
    }
};
EnterEmailPage = __decorate([
    Component({
        selector: 'enter-email-page',
        template: `
    <ion-header>
      <app-toolbar [backLabel]="translator.getInnerHTML('BACK') || 'Back'"
      layout="app"
      (backClick)="goBack()"></app-toolbar>
    </ion-header>

    <ion-content no-padding>

        <div class="title intro-flow" [innerHTML]="translator.get('ENTER_ADDRESS_DESC') || 'Enter Email Address'" *ngIf="!working"></div>
        <div class="form-container" *ngIf="!working">
          <ion-item class="input-field alone">
            <ion-input class="text-input" type="email" value="" [(ngModel)]="email" required  (keyup)="handleKey($event)" 
                  [placeholder]="translator.getInnerHTML('ENTER_EMAIL_HINT') || 'Email Address'" autocorrect="off" autocapitalize="off" (focus)="focusOut=false" 
                  (blur)="focusOut=true"></ion-input>
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
            <button ion-button full color="std-button" (click)="doneCallback()" [innerHTML]="translator.getInnerHTML('BUTTON_NEXT') || 'Next'" [style.opacity]="working?0:1"></button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [LoadingController,
        AppLoginService,
        NavController,
        TranslatorService,
        AlertController,
        NavParams,
        Platform,
        ElementRef,
        NavController])
], EnterEmailPage);
export { EnterEmailPage };

//# sourceMappingURL=login-email.js.map
