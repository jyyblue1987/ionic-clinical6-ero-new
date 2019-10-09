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
import { ElementRef, Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { clinical6, userService } from 'clinical6';
import { TranslatorService } from '../../translator/translator.service';
import { Clinical6Service } from '../../clinical6.service';
import { Keyboard } from '@ionic-native/keyboard';
import { mobileUserService } from 'clinical6';
import { AppLoginService } from '../../login.service';
let VerifyCodePage = class VerifyCodePage extends BasePage {
    constructor(loadingController, loginSvc, translator, platform, elementRef, c6LibService, alertCtrl, modalCtrl, params, nav, keyboard) {
        super(platform, elementRef);
        this.loadingController = loadingController;
        this.loginSvc = loginSvc;
        this.translator = translator;
        this.platform = platform;
        this.elementRef = elementRef;
        this.c6LibService = c6LibService;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.nav = nav;
        this.keyboard = keyboard;
        this.isNavigating = false;
        this.PIN_CODE_DIGITS = 6;
        this.userId = '';
        this.userCode = '';
        this.doValidatePIN = false;
        this.needConfirmation = false;
    }
    ngOnInit() {
        if (this.params.get('invitation_token')) {
            this.userCode = this.params.get('invitation_token');
            this.doneCallback();
        }
        else
            this.showWelcomeAlert();
        this.userId = this.params.get('email');
    }
    ionViewDidLoad() {
        // overwriting the super class method
    }
    doneCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            var thisRef = this;
            let alert;
            if (!this.isNavigating) {
                this.loader = this.loadingController.create();
                this.loader.present();
                this.isNavigating = true;
                try {
                    let newUser = yield mobileUserService.acceptInvitation(this.userCode.toString(), { email: this.userId, device: clinical6.device });
                    // .then((newUser) => {
                    //userService['type'] = 'users';
                    clinical6.user = newUser;
                    this.isNavigating = false;
                    // storing the current user on the localStorage
                    localStorage.setItem('currentUser', JSON.stringify(clinical6.user.toJSON()));
                    localStorage.setItem('confirmedUserID', clinical6.user.id.toString());
                    // storing the current token, which could be used later on during a mobile_user invitation pro ess
                    this.loginSvc.currToken = this.userCode.toString();
                    this.loader.dismiss();
                    this.confirmationSuccess();
                }
                catch (err) {
                    userService['type'] = 'users';
                    this.isNavigating = false;
                    console.error('Unable to Accept invitation', err);
                    this.loader.dismiss();
                    if (err.message.indexOf('already confirmed') > -1) {
                        // email  already confirmed, move to login
                        this.confirmationSuccess();
                        return;
                    }
                    alert = this.alertCtrl.create({
                        title: this.translator.getInnerHTML('VERIFY_CODE_ERROR_TITLE') || 'Error',
                        message: this.translator.get('VERIFY_CODE_ERROR_MESSAGE') || 'Please Verify Your Code and try again.',
                        cssClass: 'code-alert',
                        buttons: [
                            {
                                text: this.translator.getInnerHTML('POPUP_OK') || 'OK',
                                handler: data => {
                                    alert.dismiss();
                                }
                            }
                        ]
                    });
                    alert.present();
                }
            }
        });
    }
    /**
     * This is to be overridden by derived classes
     * put all code in case of confirmation success here
     */
    confirmationSuccess() {
    }
    canContinue() {
        return true;
    }
    validateAlertPIN() {
        if (this.doValidatePIN) {
            return (this.userCode.length !== this.PIN_CODE_DIGITS);
        }
        else {
            return false;
        }
    }
    handleKey(event) {
        // super.handleKey(event);
        if (this.userCode.length >= this.PIN_CODE_DIGITS)
            this.doValidatePIN = true;
    }
    goBack() {
        this.nav.pop();
        localStorage.clear();
    }
    // translate(string_key) {
    //     let s = this.translator.get(string_key);
    //     return s;
    // }
    // translateClean(string_key) {
    //     let s = this.translator.getInnerHTML(string_key);
    //     return s;
    // }
    showWelcomeAlert() {
        let alert = this.alertCtrl.create({
            title: this.translator.getInnerHTML('VERIFY_CODE_ALERT_TITLE') || 'Verification Code',
            message: this.translator.get('VERIFY_CODE_ALERT_MESSAGE') || 'Enter your Verification Code',
            cssClass: 'code-alert',
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
VerifyCodePage = __decorate([
    Component({
        selector: 'login-verify-code',
        template: `
    <ion-header>
      <app-toolbar [backLabel]="params.get('invitation_token') ? '' : translator.getInnerHTML('BACK') || 'Back'"
      layout="app"></app-toolbar>
    </ion-header>

    <ion-content no-padding style="background-image: url('assets/images/Hero@3x.png');">

      <div class="title intro-flow" [innerHTML]="translator.get('VERIFY_CODE_TITLE') || 'Verification Code'"></div>
      <hr class="separator" />
      <div class="helper" [innerHTML]="translator.get('VERIFY_CODE_HELPER') || 'Enter Verification Code'"></div>
      <form class="form-container" >
        <ion-item class="input-field alone" [class.alert]="validateAlertPIN()">
          <ion-input [placeholder]="translator.getInnerHTML('VERIFY_CODE_HINT') || 'Verification Code'" name="userCode" type="tel" 
          [(ngModel)]="userCode" autocorrect="off" autocapitalize="off" (keyup)="handleKey($event)" maxlength="6" pattern="[0-9]+" 
          (blur)="focusOut=true" style="-webkit-text-security:disc;" ></ion-input>
        </ion-item>
      </form>
    </ion-content>
      
    <ion-footer no-border>
      <ion-toolbar no-border >
        <ion-row class="footer-buttons">
          <ion-col no-padding>
            <button ion-button full color="std-button" (click)="doneCallback()" [disabled]="!canContinue()" [innerHTML]="translator.getInnerHTML('BUTTON_CONTINUE') || 'Continue'"></button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [LoadingController,
        AppLoginService,
        TranslatorService,
        Platform,
        ElementRef,
        Clinical6Service,
        AlertController,
        ModalController,
        NavParams,
        NavController,
        Keyboard])
], VerifyCodePage);
export { VerifyCodePage };

//# sourceMappingURL=login-verify-code.js.map
