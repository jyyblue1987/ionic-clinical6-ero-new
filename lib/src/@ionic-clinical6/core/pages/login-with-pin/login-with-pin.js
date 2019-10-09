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
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, ModalController, AlertController, NavParams, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { clinical6, User, mobileUserService, Device } from 'clinical6';
import { Clinical6Service } from '../../clinical6.service';
import { ValidationService } from '../../flow_process/flow_inputs/validation.service';
import { HelpModalPage } from '../../modal/help-modal';
import { AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
let LoginWithPinPage = class LoginWithPinPage {
    constructor(appConfig, loginSvc, translatorService, nav, navParams, captiveReach, modalCtrl, alertCtrl, formBuilder, keyboard, platform, nativePageTransitions) {
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
        this.platform = platform;
        this.nativePageTransitions = nativePageTransitions;
        // variables for two-way data binding with NgModel
        this.pin = '';
        this.email = '';
        this.code = '';
        this.newPin = '';
        this.newPinConfirm = '';
        // conditional variables to pass on the following pages
        this.showPinPage = true;
        this.showEmailPage = false;
        this.showForgotPasswordPage = false;
        this.showActivationCodePage = false;
        this.showResetPinPage = false;
        // Prevents the function is called more times in case of multiple click events 
        this.isNavigating = false;
        this.focusOut = false;
        // shows the 'Reset passowrd pop-up after entering wrong PIN 3 times
        this.countAlert = 1;
        this.failedLogins = 0;
        // skips the Activation Code page
        this.skipActivationCode = false;
        this._title = '';
        this._resetPINText = '';
        // uses native hardware acceleration to animate your transitions between views
        this.backTransition = {
            direction: 'right',
        };
        this.authForm = formBuilder.group({
            'newPin': ['', Validators.compose([Validators.required])],
            'newPinConfirm': ['', Validators.compose([Validators.required])],
            'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])]
        }, { validator: ValidationService.matchPasswords('newPin', 'newPinConfirm') });
    }
    ngOnInit() {
        this.keyboard.hideKeyboardAccessoryBar(false);
        if (this.navParams.get('resetPin')) {
            this.showPinPage = false;
            this.showEmailPage = true;
            this.showActivationCodePage = false;
            this.showForgotPasswordPage = false;
            this.showResetPinPage = false;
            this.resetPin();
        }
        let conditionsValid = true;
        // set the device in case the device has not been already set  and if that is present in the localstorare
        if (localStorage.getItem('device'))
            clinical6.device = new Device(JSON.parse(localStorage.getItem('device')));
        else
            conditionsValid = false;
        if (localStorage.getItem('user'))
            clinical6.user = new User(JSON.parse(localStorage.getItem('user')));
        else
            conditionsValid = false;
        if (!conditionsValid) {
            console.error('Entering the PIN page without a valid device and user info');
            this.showAlert('Application error', 'Something went wrong, please reinstall your app.');
        }
    }
    ionWillEnter() {
        this.isNavigating = false;
    }
    // This can make the login to the fourth PIN (It replaces the button): Remember that the PIN is 6 digits!
    keyboardPin(event) {
        if (this.showPinPage && this.pin.length === 6 && event.keyCode !== 8) {
            // this.login();
            // this.keyboard.close();
        }
        else if (this.showActivationCodePage && this.code.length === 6 && event.keyCode !== 8) {
            // this.activation();
            // this.keyboard.close();
        }
    }
    get title() {
        return this._title;
    }
    set title(text) {
        this._title = text;
    }
    get resetPINText() {
        return this._resetPINText;
    }
    set resetPINText(text) {
        this._resetPINText = text;
    }
    goBackPop() {
        this.nav.pop();
    }
    // simulates the ios-next transition of the NavController
    goNext() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.nativePageTransitions.slide(this.nextTransition);
                return response;
            }
            catch (e) {
                console.log(e);
                return e;
            }
            // if (!this.platform.is('core')) {
            //   return await this.nativePageTransitions.slide(this.nextTransition)
            // } else 
            //   return;
        });
    }
    // uses the ionic NativePageTransitions component to simulate the ios-back transition of the NavController
    goBackTransition() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.nativePageTransitions.slide(this.backTransition);
            }
            catch (e) {
                console.log(e);
                return;
            }
        });
    }
    // uses the goBackTransition function to create navigation experience between views
    goBack() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.showPinPage) {
                if (this.nav.first().name === 'VerifyEmailPage') {
                    this.goBackPop();
                    this.loginSvc.clearAuthInfo();
                }
            }
            else {
                yield this.goBackTransition();
                if (this.showEmailPage) {
                    this.showEmailPage = false;
                    if (this.nav.first().name !== 'VerifyEmailPage')
                        this.showBackButton = false;
                    this.showPinPage = true;
                }
                else if (this.showForgotPasswordPage) {
                    this.email = '';
                    this.showForgotPasswordPage = false;
                    this.showEmailPage = true;
                }
                else if (this.showActivationCodePage) {
                    this.showActivationCodePage = false;
                    this.showForgotPasswordPage = true;
                }
                else if (this.showResetPinPage) {
                    this.showResetPinPage = false;
                    if (!this.skipActivationCode)
                        this.showActivationCodePage = true;
                    else
                        this.showForgotPasswordPage = true;
                }
            }
        });
    }
    // This checks the pin otherwise launches an alert
    // (to be overridden by derived class)
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isNavigating) {
                this.isNavigating = true;
                if (this.appConfig.useLegacyV2APIs) {
                    // ...
                }
                else {
                    if (!clinical6.user.email && !clinical6.user.accountName && localStorage.getItem('user')) {
                        clinical6.user = new User(JSON.parse(localStorage.getItem('user')));
                    }
                    localStorage.setItem('user', JSON.stringify(clinical6.user));
                    try {
                        let result = yield this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, this.pin);
                        console.log('User Login Success', result);
                        yield this.loginSuccess();
                        this.showBackButton = true;
                        this.isNavigating = false;
                        return true;
                    }
                    catch (failure) {
                        this.failedLogins++;
                        console.log('Sign in error: ' + failure);
                        this.isNavigating = false;
                        if (this.failedLogins >= 3)
                            this.resetPin();
                        else {
                            // TODO so far the reason has no human meaning
                            // this.showAlert('Login Error', reason._response.message);
                            this.showLoginError();
                            this.pin = '';
                        }
                        return false;
                    }
                }
            }
        });
    }
    showLoginError() {
        this.showAlert(this.translate('PIN_ENTER_INVALID_TITLE') || 'Invalid PIN', this.translate('PIN_ENTER_INVALID_MSG') || 'Please check your credentials and try again');
    }
    // This is to be overridden with the next page/flow after resetting pin/password
    passwordResetSuccess() {
    }
    // This is to be overridden with the next page/flow after resetting pin/password
    loginSuccess() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // This reset the pin after the third PIN error
    resetPin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isNavigating) {
                this.isNavigating = true;
                this.showBackButton = true;
                let alert = this.alertCtrl.create({
                    title: this.translate('IFORGOT_POPUP_TITLE') || 'Reset Password',
                    message: this.translate('IFORGOT_POPUP_MSG') || 'Would you like to reset <br>your 6 digit Password?',
                    cssClass: 'pin-alert',
                    buttons: [
                        {
                            text: this.translate('POPUP_CANCEL') || 'Cancel',
                            handler: data => {
                                // this.nav.pop();
                            }
                        },
                        {
                            text: this.translate('POPUP_YES') || 'Yes',
                            handler: data => {
                                this.countAlert = 1;
                                this.goNext();
                                this.showBackButton = true;
                                this.showPinPage = false;
                                this.showEmailPage = true;
                                this.showActivationCodePage = false;
                                this.showForgotPasswordPage = false;
                                this.showResetPinPage = false;
                            }
                        }
                    ]
                });
                alert.present();
                this.isNavigating = false;
            }
        });
    }
    // This sends the activation code to the email or throws an alert error if the email is not valid
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isNavigating) {
                this.isNavigating = true;
                const self = this;
                if (this.appConfig.useLegacyV2APIs) {
                    try {
                        let response = yield clinical6['emailPassword'].call(this, this.email);
                        console.log('Valid Email: ', response);
                        yield this.goNext();
                        this.showBackButton = true;
                        this.showEmailPage = false;
                        this.showForgotPasswordPage = true;
                        self.isNavigating = false;
                    }
                    catch (reason) {
                        self.isNavigating = false;
                        console.log('Invalid Email error: ' + reason.message);
                        this.showAlert(this.translate('IFORGOT_ERROR_INVALID_EMAIL_TITLE') || 'Invalid Email', this.translate('IFORGOT_ERROR_INVALID_EMAIL_MSG') || 'We cannot find your email address in the system. Please re-enter your email address.');
                        this.showEmailPage = true;
                        this.showBackButton = true;
                    }
                    // clinical6['emailPassword'].call(this, this.email)
                    //   .then( response => {
                    //     console.log('Valid Email: ', response);
                    //     await this.goNext();            
                    //     this.showEmailPage = false;
                    //     this.showForgotPasswordPage = true;
                    //     self.isNavigating = false;
                    //   })
                    //   .catch( reason => {
                    //     self.isNavigating = false;
                    //     console.log('Invalid Email error: ' + reason.message);
                    //     this.showAlert(
                    //       this.translate('IFORGOT_ERROR_INVALID_EMAIL_TITLE') || 'Invalid Email',
                    //       this.translate('IFORGOT_ERROR_INVALID_EMAIL_MSG') || 'We cannot find your email address in the system. Please re-enter your email address.'); 
                    //     this.showEmailPage = true;
                    // });
                }
                else {
                    try {
                        let response = yield mobileUserService.requestPasswordReset({ email: this.email });
                        // .then( response => {
                        console.log('Valid Email: ', response);
                        yield this.goNext();
                        this.showBackButton = true;
                        this.showEmailPage = false;
                        this.showForgotPasswordPage = true;
                        self.isNavigating = false;
                    }
                    catch (reason) {
                        self.isNavigating = false;
                        console.log('Invalid Email error: ' + reason.message);
                        this.showAlert(this.translate('IFORGOT_ERROR_INVALID_EMAIL_TITLE') || 'Invalid Email', this.translate('IFORGOT_ERROR_INVALID_EMAIL_MSG') || 'We cannot find your email address in the system. Please re-enter your email address.');
                        this.showEmailPage = true;
                        this.showBackButton = true;
                    }
                }
            }
        });
    }
    // This goes on the activation code page
    continue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goNext();
            this.showBackButton = true;
            this.showForgotPasswordPage = false;
            this.failedLogins = 0;
            this.isNavigating = false;
            if (!this.skipActivationCode) {
                this.showActivationCodePage = true;
            }
            else {
                this.showResetPinPage = true;
            }
        });
    }
    // This checks the activation code otherwise launches an alert
    activation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isNavigating) {
                this.isNavigating = true;
                if (this.appConfig.useLegacyV2APIs) {
                    if (this.code === '')
                        this.code = ' '; // Needed otherwise a guest sign in will be triggered
                    try {
                        let response = yield clinical6['signIn'].call(this, this.email, this.code);
                        // .then( response => {
                        console.log('Valid Activation Code: ', response);
                        yield this.goNext();
                        this.showActivationCodePage = false;
                        this.showResetPinPage = true;
                        this.isNavigating = false;
                        this.showBackButton = true;
                    }
                    catch (reason) {
                        this.isNavigating = false;
                        console.log('Invalid Activation Code: ' + reason.message);
                        this.showAlert(this.translate('IFORGOT_ERROR_ACTIVATION_CODE_TITLE') || 'Invalid Activation Code', this.translate('IFORGOT_ERROR_ACTIVATION_CODE_MSG') || 'An invalid activation code has been entered. Please try again.');
                        this.showActivationCodePage = true;
                        this.showBackButton = true;
                    }
                }
                else {
                    // just move to next screen
                    yield this.goNext();
                    this.showActivationCodePage = false;
                    this.showResetPinPage = true;
                    this.isNavigating = false;
                    this.showBackButton = true;
                }
            }
        });
    }
    // This inserts the new pin and goes on next page otherwise throws an alert error
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isNavigating) {
                this.isNavigating = true;
                const self = this;
                if (this.failedLogins < 2 || !this.skipActivationCode) {
                    if (this.appConfig.useLegacyV2APIs) {
                        try {
                            let response = yield clinical6['resetPassword'].call(this, this.newPin, this.newPinConfirm, this.code);
                            // .then (response => {
                            console.log('Reset Pin completed successfully: ', response);
                            yield this.goNext();
                            this.showResetPinPage = false;
                            this.passwordResetSuccess();
                            this.isNavigating = false;
                            this.showBackButton = true;
                        }
                        catch (reason) {
                            this.isNavigating = false;
                            let err_title = this.translate('IFORGOT_ERROR_RESET_PIN_TITLE') || 'Reset Failed';
                            console.log(err_title + ': ', reason.message);
                            this.showAlert(err_title, reason.message);
                            this.newPin = this.newPinConfirm = '';
                            this.showResetPinPage = true;
                            this.showBackButton = true;
                        }
                    }
                    else {
                        /**
                         * V3 APIS
                         */
                        if (this.authForm.hasError('mismatchedPasswords')) {
                            this.showAlert(this.translate('IFORGOT_ERROR_PASSWORDS_MISMATCH_TITLE') || 'PIN codes Mismatch', this.translate('IFORGOT_ERROR_PASSWORDS_MISMATCH_MSG') || 'PIN codes do not match, please verify your input.');
                            this.showBackButton = true;
                            this.showResetPinPage = true;
                            this.isNavigating = false;
                            this.failedLogins++;
                            return;
                        }
                        this.loginSvc.clearAuthInfo();
                        try {
                            let response = yield this.loginSvc.authenticateDevice();
                            // .then ( response => {
                            const attributes = {
                                reset_password_token: this.code,
                                password: this.newPin
                            };
                            try {
                                let user = yield mobileUserService.resetPassword(attributes);
                                // .then( user => {
                                console.log('Password Change Successful: ', user);
                                // this.showResetPinPage = false;
                                // Now only reset on email is possible
                                if (!clinical6.user.email || !clinical6.user.accountName)
                                    clinical6.user = user && (user.email || user.accountName) ? user : clinical6.user; // make sure that clinical6.user points the correct user instance
                                localStorage.setItem('user', JSON.stringify(clinical6.user));
                                let result = yield this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, this.newPin);
                                console.log('User Login Success', result);
                                this.loginSuccess();
                                this.isNavigating = false;
                                // })
                            }
                            catch (reason) {
                                this.isNavigating = false;
                                console.log('Password Change Failed: ' + reason.message);
                                this.showAlert(this.translate('IFORGOT_ERROR_ACTIVATION_CODE_TITLE') || 'Invalid Activation Code', this.translate('IFORGOT_ERROR_ACTIVATION_CODE_MSG') || 'An invalid activation code has been entered. Please try again.');
                                this.code = this.newPin = this.newPinConfirm = '';
                                // this.showResetPinPage = false;
                                if (!this.skipActivationCode) {
                                    yield this.goBackTransition();
                                    this.showResetPinPage = false;
                                    this.showActivationCodePage = true;
                                }
                            }
                        }
                        catch (err) {
                            this.isNavigating = false;
                            console.error('Error Authenticating ', err);
                            this.showAlert('Device Registration Error', 'Unable to Reset Password. Please get in touch with your support contact, and try again.');
                            this.code = this.newPin = this.newPinConfirm = '';
                            if (!this.skipActivationCode) {
                                yield this.goBackTransition();
                                this.showResetPinPage = false;
                                this.showActivationCodePage = true;
                            }
                        }
                    }
                }
                else {
                    let alert_data = {
                        title: this.translate('CREATE_PIN_ENTER_INVALID_TITLE') || 'Device Registration Error',
                        message: this.translate('CREATE_PIN_ENTER_INVALID_MSG') || 'Unable to Reset Password. Please get in touch with your support contact, and try again.',
                        case: 'no_email_page'
                    };
                    if (this.nav.first().name === 'VerifyEmailPage')
                        alert_data.case = 'email_page';
                    this.showCreatePinError(alert_data);
                }
            }
        });
    }
    showCreatePinError(data) {
        let alert = this.alertCtrl.create({
            title: data.title,
            message: data.message,
            cssClass: 'pin-alert',
            buttons: [
                {
                    text: this.translate('POPUP_OK') || 'OK',
                    handler: response => {
                        switch (data.case) {
                            case 'email_page':
                                this.loginSvc.clearAuthInfo();
                                this.nav.pop(AppConfig.animationOptBack);
                                break;
                            default:
                                this.goToEmailPage();
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    goToEmailPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goBackTransition();
            this.showActivationCodePage = false;
            this.showEmailPage = true;
            this.showResetPinPage = false;
            this.isNavigating = false;
            this.focusOut = false;
            this.failedLogins = 0;
            this.email = this.code = this.newPin = this.newPinConfirm = '';
        });
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
                            case 'Invalid PIN':
                                this.showPinPage = true;
                                break;
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    showError(errorSubTitle, errorText) {
        const title = 'Error';
        // using the Help Modal for the time being, later on to be reskinned
        let modal = this.modalCtrl.create(HelpModalPage, { title: title, subTitle: errorSubTitle, helpText: errorText }, { showBackdrop: true });
        modal.present();
    }
    translate(string_key) {
        let str = this.translatorService.getInnerHTML(string_key);
        if (str === '')
            str = null;
        return str;
    }
};
LoginWithPinPage = __decorate([
    Component({
        selector: 'login-with-pin-page',
        template: `
    <ion-header>
      <app-toolbar [backLabel]="'Back'"
                  layout="app"
                 ></app-toolbar>
    </ion-header>

    <ion-content padding class="scroll-content">
        <div class="form-container" *ngIf="showPinPage">
          <button class="icon-button" [hidden]="pin.length === 6" (click)="login()"><ion-icon name="arrow-forward" class="arrow-icon"></ion-icon></button>
          <div class="title">{{title}}</div>          
          <ion-item class="input-field" >
            <ion-input  class="text-input" type="tel" value="" [(ngModel)]="pin" required maxlength="6" autocorrect="off" autocapitalize="off" 
            (keyup)="keyboardPin($event)" (ngModelChange)="keyboardPin($event)"></ion-input>
          </ion-item>     
        </div>
        <div class="form-container" *ngIf="showEmailPage" [formGroup]="authForm" novalidate>
          <div class="info-title">We can send an activation code to your email to reset your PIN.<br><br>
              Please enter your email address and tap the Send button below.</div>        
          <ion-item class="input-field-label">
            <ion-label floating>Email Address</ion-label>
            <ion-input  class="text-input" type="email" value="" [(ngModel)]="email" formControlName="email" (focus)="focusOut = false" (blur) = "focusOut = true" autocorrect="off" autocapitalize="off">Email Address</ion-input>
          </ion-item>
          <p *ngIf="!authForm.controls.email.valid && focusOut" class="error-box">Invalid Email Address!</p>
        </div>
        <div class="form-container" *ngIf="showActivationCodePage">
          <div class="title">Enter Activation Code</div>        
          <ion-item class="input-field" >
            <ion-input  class="text-input" type="password" value="" required maxlength="6" [(ngModel)]="code" autocorrect="off" autocapitalize="off" 
            (keyup)="keyboardPin($event)" (ngModelChange)="keyboardPin($event)"></ion-input>
          </ion-item>
        </div>
        <div class="form-container" *ngIf="showForgotPasswordPage">
          <div class="info-title">Plese check your email. We sent you an email with an activation code.<br><br>
           We sent your PIN to<br>
            {{email}}</div>
        </div>
        <form *ngIf="showResetPinPage" class="form" [formGroup]="authForm" novalidate>
        <div class="form-container">
          <div class="info-title">Your activation code has been confirmed. Please create a new 6 digit PIN.</div>
          <br>
          <div class="helper">Please be sure to remember this information. You will be asked to enter your PIN next time you enter the app.</div>
          <div class="input-wrapper"> 
          <ion-item class="input-field-label">
            <ion-label floating>New 6 Digit PIN</ion-label>
            <ion-input class="text-input" type="tel" [(ngModel)]="newPin" formControlName="newPin" (focus)="focusOut = false" (blur) = "focusOut = true" required maxlength="6" autocorrect="off" autocapitalize="off"></ion-input>
          </ion-item>  
          <p *ngIf="focusOut && !authForm.controls.newPin.hasError('pattern') && authForm.controls.newPin.hasError('minlength')" class="error-box">PIN requires exactly 6 digits!</p>
          <p *ngIf="authForm.controls.newPin.hasError('pattern')" class="error-box">PIN requires only digits!</p>
          <ion-item class="input-field-label">
            <ion-label floating>Confirm New 6 Digit PIN</ion-label>
            <ion-input class="text-input" type="tel" [(ngModel)]="newPinConfirm" formControlName="newPinConfirm" required maxlength="6" autocorrect="off" autocapitalize="off"></ion-input>
          </ion-item> 
          </div>
        </div>
        </form>
    </ion-content>

    <ion-footer text-center no-border>
        <div *ngIf="showPinPage || showActivationCodePage" class="link"><a class="link-pin" (click)="resetPin()">{{resetPINText}}</a></div>
        <div  *ngIf="showEmailPage" class="row">
          <button [disabled]="!authForm.controls.email.valid" ion-button no-padding full color="secondary" (click)="send()" block>Send</button>
        </div> 
        <div *ngIf="showForgotPasswordPage" class="row">
          <button ion-button no-padding full color="secondary" (click)="continue()" block>Continue</button>
        </div> 
        <div *ngIf="showResetPinPage" class="row">
          <button [disabled]="!authForm.valid" ion-button no-padding full color="secondary" (click)="submit()" block>Submit</button>
        </div> 
    </ion-footer>
  `,
    }),
    __metadata("design:paramtypes", [AppConfig,
        AppLoginService,
        TranslatorService,
        NavController,
        NavParams,
        Clinical6Service,
        ModalController,
        AlertController,
        FormBuilder,
        Keyboard,
        Platform,
        NativePageTransitions])
], LoginWithPinPage);
export { LoginWithPinPage };

//# sourceMappingURL=login-with-pin.js.map
