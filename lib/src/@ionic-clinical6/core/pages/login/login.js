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
import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
// import { AppService, StudyInfo, AppState, MobileUserInfo, SiteInfo } from '../../shared/ppd/';
// import { DashboardPage } from '../dashboard/dashboard';
import { PinPage } from '../pin/pin';
import { PlainPage } from '../plain/plain-page';
import { Flows } from '../../flow_process/flow-factory';
import { ModalController } from 'ionic-angular';
import { clinical6, flowService } from 'clinical6';
import { AlertModalPage } from '../../modal/alert-modal';
import { LoginWithPinPage } from '../login-with-pin/login-with-pin';
import { Keyboard } from '@ionic-native/keyboard';
import { BasePage } from '../base/base-page';
import { AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';
// import { MOBILE_USER_DEMO } from '../../shared/mocks/';
let LoginPage = class LoginPage extends BasePage {
    constructor(platform, elementRef, 
        // public appService: AppService,
        c6LibService, loader, alertCtrl, modalCtrl, navParams, nav, keyboard, translator) {
        super(platform, elementRef);
        this.platform = platform;
        this.elementRef = elementRef;
        this.c6LibService = c6LibService;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.keyboard = keyboard;
        this.translator = translator;
        this._title = '';
        this._body = '';
        this._nextText = '';
        this._helpText = '';
        this.privacy_page_link = 'privacy_page';
        this.terms_page_link = 'terms_page';
        this.isNavigating = false;
        this.showBackButton = false;
        this.inputs = [];
        // @ViewChildren(TextInput) inputItems: QueryList<TextInput>;
        ///////////////
        // Demo data
        this.demoUserStatus = 'new'; // ['active' | 'not_invited' | 'new' | 'invalid']
        this.apiBaseUrl = clinical6.apiBaseUrl;
        this.showBackButton = this.navParams.get('goBack') || false;
    }
    getInputs() {
        return this.inputs;
    }
    get title() {
        return this._title;
    }
    set title(text) {
        this._title = text;
    }
    get body() {
        return this._body;
    }
    set body(text) {
        this._body = text;
    }
    get helpText() {
        return this._helpText;
    }
    set helpText(text) {
        this._helpText = text;
    }
    get nextText() {
        return this._nextText;
    }
    set nextText(text) {
        this._nextText = text;
    }
    addInput(type, label) {
        this.inputs.push({ type: type, label: label, id: '' });
    }
    /*
      Remove an input from the inputs list with the provided label value.
    */
    removeInput(label) {
        let index = this.inputs.map((input) => input.label).indexOf(label);
        if (index > -1) {
            this.inputs.splice(index, 1);
        }
    }
    ngOnInit() {
        super.ngOnInit();
        // this.keyboard.hideKeyboardAccessoryBar(false);
    }
    ionViewDidLoad() {
        // for speed reason, load the flow when loading this page
        this.loadInitFlow();
    }
    ionViewWillEnter() {
        this.isNavigating = false;
        // if (this.siteId !== '') this.doLogin();
    }
    loadInitFlow() {
        /* if (this.appService.demoMode) { // TODO we should move this to the ppd service
          this.flow = INITFLOW();
          return;
        } */
        flowService.getFlow('verify_information')
            .then(flow => this.flow = flow)
            .catch(reason => this.showError(null, 'Server error', 'Details: ' + reason));
    }
    // add method instead of template function
    doneCallback() {
        this.doLogin();
    }
    /**
     * This is a placeholder doLogin function to be overridden by the extending app
     */
    doLogin() {
        if (!this.isNavigating) {
            this.isNavigating = true;
            // implement systemService.xAuth();
            this.isNavigating = false;
        }
    }
    goToInitialFlow(status) {
        var self = this;
        // based on status, go to different page
        switch (status) {
            case 'new':// 3. RETURNING USER (= USER ALREADY LOGGED IN AT LEAST ONCE) + PIN NOT CREATED YET
                if (self.flow.first) {
                    self.flow.end = (step) => {
                        // Setup new PIN
                        self.nav.push(PinPage, AppConfig.animationOpt); // , {'authToken' : result.token});
                    };
                    self.nav.push(Flows.Factory(self.flow.first.content_type), { step: self.flow.first }, AppConfig.animationOpt);
                }
                else {
                    self.showError(null, 'Server error', 'Details: received flow is inconsistent.');
                }
                break;
            case 'active':
                this.nav.push(LoginWithPinPage, AppConfig.animationOpt);
                break;
            case 'invalid':
                this.isNavigating = false;
                this.showError(null, 'Invalid', `The User ID or the Site ID is an invalid combination.
            Please contact the Passport Facilitator to setup a User ID
            and send an invite for the entered Site ID.`);
                break;
            case 'not_invited':
                this.isNavigating = false;
                this.showError('Sorry No Access at this Time', 'Please wait for Approval', '<br>Thank you for downloading the app, at this time we ask that \
          you wait for your Physician to approve your access to the PPD Trial Passport. \
          <br><br>Please try again later.');
                break;
            default:
                console.error('Received unrecognized status information: ' + status);
        }
    }
    showError(title = 'Error', errorSubTitle, errorText) {
        AlertModalPage.show(this, { type: 'type_error', title: title, body: errorText, subTitle: errorSubTitle, cancelCallback: () => { } });
    }
    showHelp() {
        const self = this;
        AlertModalPage.show(self, {
            type: 'type_info',
            body: `Providing your Site ID and User ID will help to confirm your identity.
              If you have any questions about your Site ID and User ID,
              please contact your Passport Facilitator.`,
            subTitle: 'Verification',
            title: 'Help',
            cancelCallback: () => { }
        });
    }
    showAlert(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            cssClass: 'pin-alert',
            buttons: [
                {
                    text: this.translator.getInnerHTML('POPUP_OK') || 'OK',
                }
            ]
        });
        alert.present();
    }
    goToTerms() {
        if (!this.isNavigating) {
            this.isNavigating = true;
            this.goToPlainPage(this.terms_page_link);
        }
    }
    goToPrivacyPolicy() {
        if (!this.isNavigating) {
            this.isNavigating = true;
            this.goToPlainPage(this.privacy_page_link);
        }
    }
    goToPlainPage(target) {
        // shows a loading control while data is being gathered
        this.loadingCtrl = this.loader.create({ content: 'Loading...' });
        this.loadingCtrl.present();
        var thisRef = this;
        this.c6LibService.getDynamicContent('resources')
            .then(response => {
            var content = response['content'].find((resource) => { return resource.api_key === target; });
            if (content) {
                thisRef.loadingCtrl.dismiss();
                thisRef.nav.push(PlainPage, { page: content }, AppConfig.animationOpt);
            }
            else {
                thisRef.loadingCtrl.dismiss()
                    .then(() => {
                    thisRef.showError(null, 'Unable to retrieve data from server', 'Please contact PPD support for further information.');
                });
                console.log('Login: retrieveContent error (' + target + ' not found on server)');
            }
        }).catch(e => {
            thisRef.loadingCtrl.dismiss()
                .then(() => {
                thisRef.showError(null, 'Unable to retrieve data from server', 'Please make sure you have a working network connection.');
            });
            console.log('Login: retrieveContent error (' + target + ')' + e.message);
        });
    }
    // isFooterVisible() {
    //   return !(this.appService.isKeyboardUp && this.platform.is('android'));
    // }
    handleKey(event) {
        super.handleKey(event);
        if (event.keyCode === 13 && this.userId !== '' && this.siteId !== '') {
            this.doLogin();
        }
    }
};
LoginPage = __decorate([
    Component({
        selector: 'login-page',
        template: `

    <ion-header>
      <app-toolbar [backLabel]="'Back'"
                  layout="app"
                 ></app-toolbar>
    </ion-header>
    <ion-content padding >

      <div class="title">{{title}}</div>
      <div class="app-p6-icon-survey icon-image"></div>
      <!--<div class="helper">Text...</div>-->
      <div class="helper">{{body}}</div>

      <form class="form-container" >
        <!--
        <div *ngFor="let x of test">
            <span>
                <input title="{{x.label}}" type="x.type"  />
                {{x.label}}
            </span>
        </div> 
      -->

        <div *ngFor="let input of inputs">
        <ion-item class="input-field">
          <ion-label floating>{{input.label}}</ion-label>
          <ion-input name="input.id" type="input.type" [(ngModel)]="input.id" autocorrect="off" autocapitalize="off" (keyup)="handleKey($event)"></ion-input>
        </ion-item>

        </div> 

      </form>
    </ion-content>

    <ion-footer no-border>
      <ion-toolbar no-border>
        <ion-row class="footer-buttons">
          <ion-col>
            <button ion-button full color="secondary" (click)="showHelp()">{{helpText}}</button>
          </ion-col>
          <ion-col>
            <button ion-button full (click)="doLogin()">{{nextText}}</button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="help-footer">By tapping {{nextText}} you agree to the <a (click)="goToTerms()"><b>Terms of Use</b></a> and <a (click)="goToPrivacyPolicy()"><b>Privacy Policy</b></a></div>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [Platform,
        ElementRef,
        Clinical6Service,
        LoadingController,
        AlertController,
        ModalController,
        NavParams,
        NavController,
        Keyboard,
        TranslatorService])
], LoginPage);
export { LoginPage };

//# sourceMappingURL=login.js.map
