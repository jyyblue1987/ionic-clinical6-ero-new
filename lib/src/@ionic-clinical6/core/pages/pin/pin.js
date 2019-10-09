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
import { NavController, ModalController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { clinical6, mobileUserService, Client } from 'clinical6';
import { Clinical6Service } from '../../clinical6.service';
import { HelpModalPage } from '../../modal/help-modal';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginWithPinPage } from '../login-with-pin/login-with-pin';
import { Keyboard } from '@ionic-native/keyboard';
import { AppConfig } from '../../config/app.config';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
let PinPage = class PinPage {
    constructor(loadingController, appConfig, loginSvc, translatorService, nav, navParams, captiveReach, modalCtrl, alertCtrl, formBuilder, keyboard) {
        this.loadingController = loadingController;
        this.appConfig = appConfig;
        this.loginSvc = loginSvc;
        this.translatorService = translatorService;
        this.nav = nav;
        this.navParams = navParams;
        this.captiveReach = captiveReach;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.isNavigating = false;
        this._title = '';
        this._pinLabel = '';
        this._pinConfirmationLabel = '';
        this._helpText = '';
        this._pinError = '';
        this._unlockMessage = '';
        this.apiBaseUrl = clinical6.apiBaseUrl;
        // this.authToken = this.navParams.get('authToken');
        this.authForm = formBuilder.group({
            'pin': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[0-9]+')])],
            'pinConfirm': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[0-9]+')])]
        });
    }
    ngOnInit() {
        this.keyboard.hideKeyboardAccessoryBar(false);
    }
    ionViewWillEnter() {
        this.isNavigating = false;
        if (AppConfig.demoMode)
            this.nextFlow = true;
        else
            this.nextFlow = false;
    }
    // this avoid a return to the PinPage if the pin has already been created and if the next button is pushed
    ionViewDidLeave() {
        console.log('LoginWithPinPage, ionViewDidLeave');
        if (this.nextFlow) {
            this.nav.remove(0, this.nav.length() - 1);
            this.nav.insert(0, LoginWithPinPage);
        }
    }
    unlock() {
        if (!this.isNavigating) {
            this.presentLoading();
            this.isNavigating = true;
            console.log('unlock App with PIN');
            // do pins match?
            if (this.pin !== this.pinConfirm) {
                this.loading.dismiss().then(() => {
                    this.showAlert('Error', 'PIN values do not match');
                    this.isNavigating = false;
                });
            }
            else {
                const id = localStorage.getItem('confirmedUserID');
                mobileUserService.acceptInvitation(this.loginSvc.currToken, { password: this.pin, device: Client.instance.device })
                    .then(newUser => {
                    // Make sure that you store the Mobile User that is returned by this endpoint (done by clinical6)
                    // Make sure that you update the access token with the one that is sent back in the response (done by clinical6)
                    // Updating the localstorage
                    localStorage.setItem('currentUser', JSON.stringify(clinical6.user.toJSON()));
                    localStorage.setItem('user', JSON.stringify(clinical6.user));
                    // Once the invitation has been completed, the status of the mobile user should be transition to Active
                    this.loginSvc.authenticateUser(clinical6.user.email, this.pin)
                        .then(result => {
                        this.loading.dismiss().then(() => {
                            this.isNavigating = false;
                            this.moveToNextFlow();
                        });
                    })
                        .catch((reason) => {
                        this.loading.dismiss().then(() => {
                            this.isNavigating = false;
                            console.error('create-pin: authenticateUser failed: ', reason);
                            this.showAlert('Error Signing in', reason.message ? reason.message : 'Try Again Later');
                        });
                    });
                })
                    .catch(reason => {
                    this.loading.dismiss().then(() => {
                        this.isNavigating = false;
                        console.error('create-pin: set PIN failed: ', reason);
                        this.showAlert('Error', reason.message ? reason.message : 'Try Again Later');
                    });
                });
            }
        }
    }
    unlockOld() {
        if (!this.isNavigating) {
            this.isNavigating = true;
            console.log('unlock Passport with PIN');
            if (AppConfig.demoMode) {
                this.moveToNextFlow();
                return;
            }
            // TODO: need to do dynamic data validation
            const self = this;
            this.captiveReach.setPin(this.pin, this.pinConfirm)
                .then(result => {
                this.nextFlow = true;
                // setPin completed successfully, now we need to login
                // self.captiveReach.login(self.user.name, self.pin)
                // After setup new PIN, attach authtoken to local storage go to DashboardPage
                // localStorage.setItem('authToken', this.authToken );
                // if (this.appService.mobile_user.role.toLowerCase() === ROLESMAP.studyCoordinator.value) {
                //  self.appService.setState(AppState.registered);
                //  self.nav.push(DashboardPage, AppConfig.animationOpt);
                // } else {
                //   self.appService.setState(AppState.eagreement);
                self.moveToNextFlow();
                // }
            })
                .catch(reason => {
                self.isNavigating = false;
                self.showAlert('Error', reason.message + '<br>Try again later.');
            });
        }
    }
    goBack() {
        this.nextFlow = false;
    }
    moveToNextFlow() {
        /**
         * This has to be overridden by the App
         */
    }
    showError(errorSubTitle, errorText) {
        const title = 'Error';
        // using the Help Modal for the time being, later on to be reskinned
        let modal = this.modalCtrl.create(HelpModalPage, { title: title, subTitle: errorSubTitle, helpText: errorText }, { showBackdrop: true });
        modal.onDidDismiss(action => {
            if (action === 'contact') {
                // this.nav.push(ContactPPDPage, { from: '' }, AppConfig.animationOpt);
            }
        });
        modal.present();
    }
    showAlert(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            cssClass: 'pin-alert',
            buttons: [
                {
                    text: this.translate('POPUP_OK') || 'OK',
                    handler: data => {
                        switch (title) {
                            case '...':
                                break;
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    get title() {
        return this._title;
    }
    set title(text) {
        this._title = text;
    }
    get pinLabel() {
        return this._pinLabel;
    }
    set pinLabel(text) {
        this._pinLabel = text;
    }
    get pinConfirmationLabel() {
        return this._pinConfirmationLabel;
    }
    set pinConfirmationLabel(text) {
        this._pinConfirmationLabel = text;
    }
    get helpText() {
        return this._helpText;
    }
    set helpText(text) {
        this._helpText = text;
    }
    get pinError() {
        return this._pinError;
    }
    set pinError(text) {
        this._pinError = text;
    }
    get unlockMessage() {
        return this._unlockMessage;
    }
    set unlockMessage(text) {
        this._unlockMessage = text;
    }
    translate(string_key) {
        let str = this.translatorService.getInnerHTML(string_key);
        return str;
    }
    presentLoading() {
        this.loading = this.loadingController.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }
};
PinPage = __decorate([
    Component({
        selector: 'pin-page',
        template: `
    <ion-header>
      <app-toolbar [backLabel]="'Back'"
                  layout="ppd"
                  (backClick)="goBack()"></app-toolbar>
    </ion-header>

    <ion-content padding class="pin-page" (click)="return;">
        <div class="title">{{title}}</div>
        <img class="icon-image" src="assets/images/Pin Icon.svg" />
          <div class="helper">{{helpText}}</div>
       <form [formGroup]="authForm" novalidate>
          <div class="form-container">
            <ion-item class="input-field">
              <ion-label floating>{{pinLabel}}</ion-label>
              <ion-input class="text-input" type="tel" value="" [(ngModel)]="pin" formControlName="pin" required maxlength="6" pattern="[0-9]+" 
                   autocorrect="off" autocapitalize="off" (focus)="focusOut=false" (blur)="focusOut=true"></ion-input>
            </ion-item> 
            <p *ngIf="focusOut && authForm.controls.pin.hasError('minlength') && !authForm.controls.pin.hasError('pattern')" class="error-box">{{pinError}}</p>
            <p [hidden]="!authForm.controls.pin.hasError('pattern')" class="error-box">{{pinError}}</p>
            <ion-item class="input-field">
              <ion-label floating>{{pinConfirmationLabel}}</ion-label>
              <ion-input class="text-input" type="tel" value="" [(ngModel)]="pinConfirm" formControlName="pinConfirm" required maxlength="6" pattern="[0-9]+" autocorrect="off" autocapitalize="off"></ion-input>
            </ion-item>
          </div>
      </form>
    </ion-content>

    <ion-footer no-border class="pin-page">
      <ion-toolbar class="footer">
        <ion-row class="footer-buttons">
          <ion-col>
            <button ion-button no-padding full color="secondary" (click)="unlock()" [disabled]="!(authForm.valid || nextFlow)">{{unlockMessage}}</button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [LoadingController,
        AppConfig,
        AppLoginService,
        TranslatorService,
        NavController,
        NavParams,
        Clinical6Service,
        ModalController,
        AlertController,
        FormBuilder,
        Keyboard])
], PinPage);
export { PinPage };

//# sourceMappingURL=pin.js.map
