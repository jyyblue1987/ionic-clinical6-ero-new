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
import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';
import { clinical6, Device, User, mobileUserService, Client } from 'clinical6';
import { FlowStepPage } from '../../flow_process/flow_steps/flowstep';
import { DomSanitizer } from '@angular/platform-browser';
import { FlowService } from '../../flow_process/flow.service';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
import { StepInputFactory } from '../../flow_process/flow_inputs/stepinput.factory';
import { CustomStepInputLoginComponent } from './custom-login-input/stepinput-login';
import { UtilsService } from '../../utils.service';
let LoginFlowPage = class LoginFlowPage extends FlowStepPage {
    constructor(utilsSvc, loginSvc, translator, navParams, nav, flowCtlr, modalCtrl, sanitizer, platform, elementRef, alertCtrl) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl, sanitizer, platform, elementRef, alertCtrl);
        this.utilsSvc = utilsSvc;
        this.loginSvc = loginSvc;
        this.translator = translator;
        this.navParams = navParams;
        this.nav = nav;
        this.flowCtlr = flowCtlr;
        this.modalCtrl = modalCtrl;
        this.sanitizer = sanitizer;
        this.platform = platform;
        this.elementRef = elementRef;
        this.alertCtrl = alertCtrl;
        this.showBackButton = this.navParams.get('showBackButton') == false ? false : true;
        if (this.step.id === 'check-pin') {
            this.step.flow.set('failed_logins', 0);
        }
        // this extends the input container dynamically 
        StepInputFactory.setMap({
            code: CustomStepInputLoginComponent,
            pin: CustomStepInputLoginComponent,
            email: CustomStepInputLoginComponent
        });
    }
    ionViewWillEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.step.id === this.step.flow.first.id) {
                this.flowCtlr.resetStack(this.step);
            }
        });
    }
    /**
     * @function goNext - Executes the callback function for the active path of the Flow Step and goes to the next Flow Step if it exists
     *
     * @param {String} input_id
    **/
    goNext(button, options = {}) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.utilsSvc.presentLoading();
                /** @type {any} last - check if the active Flow Step is the last  **/
                let last;
                if (button.callback)
                    last = yield this[`${button.callback}`]();
                const response = yield _super("gotoFlow").call(this, button.button_name, options); // ignoreRequiredFields
                this.isNavigating = false;
                return response;
            }
            catch (err) {
                this.utilsSvc.dismissLoader();
                this.isNavigating = false;
                console.error(err);
            }
        });
    }
    /**
     * helper method to retrieve the input value
     *
     * @param {String} input_id
    **/
    inputValue(input_id) {
        return this.inputvalues[input_id] ? this.inputvalues[input_id] : '';
    }
    /**
     * @param {any} event - button object passed from nested component in case of 'goToPage' event
     *
     * @example <caption> Example of link button </caption>
     * {
     *    // Flow Step attributes,
     *    'inputs': [
     *      {
     *        'id': 'pin',
     *        'storage_attribute': 'pin',
     *        // ...
     *        'attribute' : {
     *          'link_button': 'Forgot Pin', // it must be equal to the "button_name" attribute of the path
     *        }
     *      }
     *    ],
     *    'paths': [
     *       {
     *          'button_name': 'Forgot Pin', // it must be equal to the "attribute.link_button" attribute of the input
     *          'callback': null,
     *          'capture': false,
     *          'last': true,
     *          'is_link_button': true // it must be true
     *          'steps': [
     *             {
     *                'step': 'forgot-pin',
     *                'conditions': []
     *             }
     *          ]
     *       }
     *   ]
     * }
    **/
    goToPage(event) {
        if (event && event.value) {
            let button = event.value;
            this.goNext(button);
        }
    }
    /**
     * @callback checkEmail       - Callback to check registration status of the user
     *
     * @return {Promise<boolean>} - Promise that returns false in case of success
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'checkEmail' callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'NEXT',
     *        'callback': 'checkEmail',
     *        'capture': false,
     *        'last': false,
     *        'is_link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    checkEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {String} email - get the 'email' input for the active Flow Step  **/
            const email = this.inputValue('email');
            let attributes = {};
            if (email.indexOf('@') > -1) {
                attributes['email'] = email;
            }
            else {
                attributes['account_name'] = email;
            }
            try {
                // this methods requires a token or throws an error
                if (!clinical6.authToken)
                    clinical6.authToken = 'dummy';
                const value = yield mobileUserService.getRegistrationStatus(attributes);
                if (value === 'invalid' || value === 'disabled') {
                    yield this.throwError(value);
                }
                if (value === 'active' || value === 'new') {
                    // this enables the condition to load the check-pin FlowStep
                    if (value === 'active')
                        this.step.flow.set(this.step.id, 'pin');
                    // this enables the condition to load the check-pin FlowStep
                    if (value === 'new')
                        this.step.flow.set(this.step.id, 'code');
                    // resetting the device data - TODO, maybe not necessary
                    this.loginSvc.resetDeviceInfo();
                    // authenticating the device
                    try {
                        const _response = yield this.loginSvc.authenticateDevice();
                        console.log('Device Authentication Success ', _response);
                        clinical6.user = new User(attributes);
                        // localStorage.setItem('user', JSON.stringify(clinical6.user));
                        return false;
                    }
                    catch (err) {
                        console.error('Error Authenticating ', err);
                        yield this.throwError('registration');
                    }
                }
            }
            catch (e) {
                console.error('getRegistrationStatus: failure', e);
                throw (e);
            }
        });
    }
    /**
     * @callback checkCode        - Callback to check the verification code and call the 'checkCodeSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the verification code is valid
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'checkCode' callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'UNLOCK APP',
     *        'callback': 'checkCode',
     *        'capture': false,
     *        'last': true,
     *        'link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    checkCode() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {String} code  - get the 'code' input for the active Flow Step  */
            const code = this.inputValue('code');
            let alert;
            try {
                let newUser = yield mobileUserService.acceptInvitation(code, { email: clinical6.user.email, device: clinical6.device });
                clinical6.user = newUser;
                localStorage.setItem('currentUser', JSON.stringify(clinical6.user.toJSON()));
                localStorage.setItem('confirmedUserID', clinical6.user.id.toString());
                this.loginSvc.currToken = code;
                this.checkCodeSuccess();
                return true;
            }
            catch (err) {
                console.error('Unable to Accept invitation', err);
                if (err.message.indexOf('already confirmed') > -1) {
                    // email  already confirmed, call the checkCodeSuccess callback
                    this.checkCodeSuccess();
                    return true;
                }
                yield this.throwError('invalid');
            }
        });
    }
    /**
     * @callback checkPin         - Callback to start the login procedure and call the 'loginSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the New Pin has been reset succesfully
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'checkPin' callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'SEND',
     *        'callback': 'checkPin',
     *        'capture': false,
     *        'last': true,
     *        'is_link_button': null,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    checkPin() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {String} code - get the 'pin' input for the active Flow Step  **/
            const pin = this.inputValue('pin');
            /** @type {String} failed_logins - count the failed logins  **/
            let failed_logins = this.step.flow.get('failed_logins') || 0;
            let err = this.step.alerts && this.step.alerts['reset_pin'];
            if (!err) {
                err = {
                    title: 'Reset Password',
                    message: 'Would you like to reset <br>your 6 digit Password?',
                    buttons: [
                        {
                            'text': 'Cancel',
                            'handler': true
                        },
                        {
                            'text': this.translator.getInnerHTML('POPUP_OK') || 'OK',
                            'handler': false
                        }
                    ]
                };
            }
            if (failed_logins >= 3) {
                const data = yield this.showPopup(err.title, err.message, err.buttons);
                if (!data)
                    throw ('Alert Dismiss');
                else
                    return data;
            }
            try {
                // set the device in case the device has not been already set  and if that is present in the localstorage
                if (localStorage.getItem('device'))
                    clinical6.device = new Device(JSON.parse(localStorage.getItem('device')));
                else {
                    // resetting the device data - TODO, maybe not necessary
                    this.loginSvc.resetDeviceInfo();
                    // authenticating the device
                    const _response = yield this.loginSvc.authenticateDevice();
                }
            }
            catch (e) {
                throw (e);
            }
            try {
                if (!clinical6.user.email && !clinical6.user.accountName && localStorage.getItem('user')) {
                    clinical6.user = new User(JSON.parse(localStorage.getItem('user')));
                }
                let result = yield this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, pin);
                console.log('User Login Success', result);
                localStorage.setItem('user', JSON.stringify(clinical6.user));
                yield this.loginSuccess();
                return true;
            }
            catch (failure) {
                failed_logins++;
                this.step.flow.set('failed_logins', failed_logins);
                console.log('Sign in error: ' + failure);
                if (failed_logins < 3) {
                    yield this.throwError('invalid');
                }
                else {
                    const data = yield this.showPopup(err.title, err.message, err.buttons);
                    if (!data)
                        throw (failure);
                    else
                        return data;
                }
            }
        });
    }
    /**
     * @callback forgotPin        - Callback to start the pin/password reset procedure
     *
     * @return {Promise<boolean>} - Promise that returns false if the activation-code has been sent succesfully to the email provided
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'forgotPin' Callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'SEND',
     *        'callback': 'forgotPin',
     *        'capture': false,
     *        'last': false,
     *        'is_link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    forgotPin() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {String} email - get the 'email_sent' input for the active Flow Step  **/
            const email = this.inputValue('email_sent');
            try {
                let response = yield mobileUserService.requestPasswordReset({ email: email });
                console.log('Valid Email: ', response);
                return false;
            }
            catch (reason) {
                console.log('Invalid Email error: ' + reason.message);
                yield this.throwError('invalid');
            }
        });
    }
    /**
     * @callback resetPin         - Callback to reset the pin/password and call the 'loginSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the New Pin has been reset succesfully
     * @throws {Error}            - If the pins mismatch or missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'resetPin' Callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'UNLOCK APP',
     *        'callback': 'resetPin',
     *        'capture': false,
     *        'last': true,
     *        'is_link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    resetPin() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * @type {String} code           - get the 'activation_code' input for the active Flow Step
             * @type {String} newPin         - get the 'reset_pin' input for the active Flow Step
             * @type {String} newPinConfirm  - get the 'confirm_reset_pin' input for the active Flow Step
            **/
            const code = this.inputValue('activation_code');
            const newPin = this.inputValue('reset_pin');
            const newPinConfirm = this.inputValue('confirm_reset_pin');
            let alerts = this.step.alerts || {};
            // do pins match?
            if (newPin !== newPinConfirm) {
                yield this.throwError('pins_mismatch');
            }
            this.loginSvc.clearAuthInfo();
            try {
                let response = yield this.loginSvc.authenticateDevice();
                try {
                    let user = yield mobileUserService.resetPassword({
                        reset_password_token: code,
                        password: newPin
                    });
                    console.log('Password Change Successful: ', user);
                    // Now only reset on email is possible
                    if (!clinical6.user.email || !clinical6.user.accountName)
                        clinical6.user = user && (user.email || user.accountName) ? user : clinical6.user; // make sure that clinical6.user points the correct user instance
                    localStorage.setItem('user', JSON.stringify(clinical6.user));
                    let result = yield this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, newPin);
                    console.log('User Login Success', result);
                    yield this.loginSuccess();
                    return true;
                }
                catch (reason) {
                    console.log('Password Change Failed: ' + reason.message);
                    yield this.throwError('invalid');
                }
            }
            catch (err) {
                console.error('Error Authenticating ', err);
                if (err !== 'invalid') {
                    yield this.throwError('registration');
                }
                throw (err);
            }
        });
    }
    /**
     * @callback createPin        - Callback to create a new Pin and call the 'createPinSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the new Pin has been created succesfully
     * @throws {Error}            - If the pins mismatch or missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'createPin' callback example </caption>
     *
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'UNLOCK APP',
     *        'callback': 'createPin',
     *        'capture': false,
     *        'last': true,
     *        'is_link_button': false
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    createPin() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * @type {String} newPin         - get the 'new_pin' input for the active Flow Step
             * @type {String} newPinConfirm  - get the 'confirm_new_pin' input for the active Flow Step
            **/
            const newPin = this.inputValue('new_pin');
            const newPinConfirm = this.inputValue('confirm_new_pin');
            // do pins match?
            if (newPin !== newPinConfirm) {
                yield this.throwError('pins_mismatch');
            }
            try {
                const newUser = yield mobileUserService.acceptInvitation(this.loginSvc.currToken, { password: newPin, device: Client.instance.device });
                // Make sure that you store the Mobile User that is returned by this endpoint (done by clinical6)
                // Updating the localstorage
                localStorage.setItem('currentUser', JSON.stringify(clinical6.user.toJSON()));
                localStorage.setItem('user', JSON.stringify(clinical6.user));
                try {
                    // Once the invitation has been completed, the status of the mobile user should be transition to Active
                    const result = yield this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, newPin);
                    this.createPinSuccess();
                    return true;
                }
                catch (reason) {
                    yield this.throwError('invalid');
                }
                ;
            }
            catch (reason) {
                console.error('create-pin: set PIN failed: ', reason);
                if (reason !== 'invalid')
                    this.showError('Set Pin Failed', reason.message || 'Try Again Later');
                throw (reason);
            }
        });
    }
    /**
     * @callback loginSuccess - Callback that needs to be overwritten from the child component after login success
    **/
    loginSuccess() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * @callback checkCodeSuccess - Callback that needs to be overwritten from the child component after verification-code success
    **/
    checkCodeSuccess() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * @callback createPinSuccess - Callback that needs to be overwritten from the child component after resetting pin/password success
    **/
    createPinSuccess() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     *  Shows a Popup Error with custom title, message and buttons and throws an error
     *
     * @param {string} type - Parameters used to get the alert type from the FlowStep alerts attribute
     * @throws {Error}      - If the Promise fails
     *
     * @example <caption> 'Invalid PIN' Alert example </caption>
     * 'alerts': {
     *   'invalid': {
     *      'title': 'Invalid PIN',
     *      'message': 'Please check your credentials and try again',
     *      'buttons': null
     *   },
     * }
    **/
    throwError(type) {
        return __awaiter(this, void 0, void 0, function* () {
            let alerts = this.step.alerts || {};
            if (alerts[type])
                this.showPopup(alerts[type].title, alerts[type].message, alerts[type].buttons);
            throw (type || 'Error');
        });
    }
    /**
     *  Shows a Popup with custom title, message and buttons
     *
     * @param {string} title  - Title to use in the Popup
     * @param {string} msg    - Message to use in the Popup
     * @param {Array} buttons - An array of optional buttons to use in the Popup
     * @return {Promise<any>} - Returns a Promise after the button is clicked. Defaults to 'false' for 'Cancel' button, 'true' otherwise
     *
     * @example <caption> 'Forgot Pin' Popup example </caption>
     * 'alerts': {
     *   'reset_pin': {
     *       'title': 'Reset Password',
     *       'message': 'Would you like to reset <br>your 6 digit Password?',
     *       'buttons': [
     *         {
     *           'text': 'Cancel',
     *           'handler': false
     *         },
     *         {
     *           'text': 'OK',
     *           'handler': true
     *         }
     *       ]
     *   },
     * }
    **/
    showPopup(title, msg, buttons = []) {
        this.utilsSvc.dismissLoader();
        return new Promise((resolve) => {
            let btns = [];
            if (buttons && buttons.length > 0) {
                for (let button of buttons) {
                    let handler = button.handler != null ? button.handler : (button.text && button.text === 'Cancel') ? false : true;
                    let btn = {
                        text: this.translator.getInnerHTML(`${button.text}`) || button.text || 'OK',
                        handler: data => { resolve(handler); },
                        role: 'backdrop'
                    };
                    btns.push(btn);
                }
            }
            else {
                let btn = {
                    text: 'OK',
                    handler: data => { }
                };
                btns.push(btn);
            }
            this.alert = this.alertCtrl.create({
                title: this.translator.getInnerHTML(`${title}`) || title,
                message: this.translator.getInnerHTML(`${msg}`) || msg,
                cssClass: 'email-alert',
                buttons: btns
            });
            // this avoids the multiple click of the alert buttons
            setTimeout(() => {
                if (!this.alert.ionViewDidEnter)
                    this.alert.ionViewDidEnter = () => { };
                this.alert.ionViewDidEnter();
            }, 400);
            this.alert.present();
        });
    }
    // overwrites the parent function to add new buttons should be placed in the footer
    displayAsSpecialButton(path) {
        // Filter out some redundant or unneeded buttons/paths
        // that will break the page layout
        // in particular all buttons that are not to be displayed as
        // special buttons (ie. light blue wide buttons above the footer)
        // those include:
        //  - buttons to be placed in the footer (eg. )Next/Prev, etc..)
        //  - Buttons to be placed in the toolbar (eg. Plus, Done, ...)
        //  - buttons managed by some other component (eg. buttons related to file upload fields: medical_board, certificate, ...)
        //  - leftover/errored buttons (eg. with empty/null button_names )
        return !(([null,
            '',
            'prev',
            'next',
            'continue',
            'complete',
            'done',
            'agree',
            'i agree',
            'log in',
            'send',
            'unlock app']
            .indexOf(path.button_name.toLowerCase()) >= 0) ||
            (path.button_name && (path.button_name.indexOf('tag_') > -1)));
    }
};
LoginFlowPage = __decorate([
    Component({
        selector: 'login-flow-page',
        template: `
    <ion-header class="{{step.id}} {{step.flow?.permanentLink}}">
        <!-- show toolbar with title if the toolbar.title property is a string and toolbar.logo property is set to false or null -->
        <app-toolbar *ngIf="step.toolbar?.title" [title]="step.toolbar.title || navbarTitle" [leftBtnLabel]="showBackButton?'Back':''" 
                (leftBtnClick)="goBack()" [bgColor]="themeColor" [actionHidden]="true"></app-toolbar>

        <!-- show toolbar with title if the toolbar.logo property is set to true and toolbar.title propert is set to false or null -->
        <app-toolbar *ngIf="step.toolbar?.logo" [leftBtnLabel]="showBackButton?'Back':''" (leftBtnClick)="goBack()" layout="app"
             [ngClass]="showBackButton?'toolbar-logo':''" [bgColor]="themeColor"></app-toolbar>  
    </ion-header>
    <ion-content padding class="bg-content {{step.id}} {{step.flow?.permanentLink}}" text-center>

        <div *ngIf="step.title" class="content-title {{step.id}}">
            <div class="title" [innerHTML]="step.title"></div>
        </div>

        <div *ngIf="step.image" class="content-img {{step.id}}">
            <img class="icon-img" src="{{step.image.original}}" [style.display]="(showImage?'':'none')" (error)="imgError($event)"
            (load)="imgLoaded()" />        
        </div>

        <div *ngIf="step.separator" [ngClass]="step.separator==='line'?'line-separator':'space-separator'"></div>

        <div *ngIf="step.description" class="content-desc {{step.id}}">
            <div class="desc" [innerHTML]="step.description"></div>
        </div>

        <div *ngIf="step.rich_description" class="content-desc {{step.id}}">
            <div class="desc" [innerHTML]="step.rich_description"></div>
        </div>

        <input-container [inputList]="inputs" [fields]="fields" [filter]="filter"
            (formStatusChanged)="updateFormStatus($event)" (formValueChanged)="updateControlValue($event)"
            (keyup)="handleGoButton($event)" (goToPage)="goToPage($event)" labelStyle="stacked">
        </input-container> 

        <!-- Display of Additional Special Buttons -->
        <ng-template ngFor let-path [ngForOf]="step.paths">
            <ion-row no-margin no-padding *ngIf="displayAsSpecialButton(path) && !path.is_link_button" class="additional-button">
            <button ion-button (click)="goNext(path)">{{path.button_name}}</button>
            </ion-row>
        </ng-template>

    </ion-content>
  
    <ion-footer *ngIf="step.paths.length > 0" class="full-footer {{step.id}} {{step.flow?.permanentLink}}"  no-border>
        <ion-toolbar no-border padding>
          <ion-row class="footer-buttons">
            <ng-template ngFor let-next [ngForOf]="step.paths">
                <ion-col *ngIf="!displayAsSpecialButton(next)">
                    <button ion-button full class="footer-btn" (click)="goNext(next)" [disabled]="!formValid">{{ next.button_name }}</button>
                </ion-col>
            </ng-template>
          </ion-row>
        </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [UtilsService,
        AppLoginService,
        TranslatorService,
        NavParams,
        NavController,
        FlowService,
        ModalController,
        DomSanitizer,
        Platform,
        ElementRef,
        AlertController])
], LoginFlowPage);
export { LoginFlowPage };

//# sourceMappingURL=login-flow.js.map
