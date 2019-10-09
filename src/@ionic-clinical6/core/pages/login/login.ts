/* globals Clinical6 */
import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Alert, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
// import { AppService, StudyInfo, AppState, MobileUserInfo, SiteInfo } from '../../shared/ppd/';
// import { DashboardPage } from '../dashboard/dashboard';
import { PinPage } from '../pin/pin';
import { PlainPage } from '../plain/plain-page';
import { Flows } from '../../flow_process/flow-factory';

import { Modal, ModalController, TextInput } from 'ionic-angular';
import { clinical6, Flow, flowService } from 'clinical6';
import { AlertModalPage } from '../../modal/alert-modal';
import { LoginWithPinPage } from '../login-with-pin/login-with-pin';
import { Keyboard } from '@ionic-native/keyboard';
import { BasePage } from '../base/base-page';
import { AppState, AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';

// import { MOBILE_USER_DEMO } from '../../shared/mocks/';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePage {
  flow: Flow;
  apiBaseUrl: string;

  userId: string;
  siteId: string;

  _title: string = '';
  _body: string = '';
  _nextText: string = '';
  _helpText: string = '';

  privacy_page_link: string = 'privacy_page';
  terms_page_link: string = 'terms_page';
  loadingCtrl: any;
  isNavigating: boolean = false;
  showBackButton: boolean = false;

  inputs: any = [];

  // @ViewChildren(TextInput) inputItems: QueryList<TextInput>;

  ///////////////
  // Demo data

  demoUserStatus = 'new';  // ['active' | 'not_invited' | 'new' | 'invalid']
  //////////////

  owner: number;

  constructor(
    public platform: Platform,
    public elementRef: ElementRef,
    // public appService: AppService,
    public c6LibService: Clinical6Service,
    public loader: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public nav: NavController,
    public keyboard: Keyboard,
    public translator: TranslatorService,
    ) {

    super(platform, elementRef);
    this.apiBaseUrl = clinical6.apiBaseUrl;

    this.showBackButton = this.navParams.get('goBack') || false;
  }

  getInputs() {
    return this.inputs;
  }

  get title() {
    return this._title;
  }

  set title(text: string) {
    this._title = text;
  }

  get body() {
    return this._body;
  }

  set body(text: string) {
    this._body = text;
  }

  get helpText() {
    return this._helpText;
  }

  set helpText(text: string) {
    this._helpText = text;
  }

  get nextText() {
    return this._nextText;
  }

  set nextText(text: string) {
    this._nextText = text;
  }

  addInput(type: string, label: string) {
    this.inputs.push({ type: type, label: label, id: '' });
  }

  /*
    Remove an input from the inputs list with the provided label value.
  */
  removeInput(label: string) {
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

  goToInitialFlow(status: string) {
    var self = this;

    // based on status, go to different page
    switch (status) {
      case 'new': // 3. RETURNING USER (= USER ALREADY LOGGED IN AT LEAST ONCE) + PIN NOT CREATED YET
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
        this.showError(
          null,
          'Invalid',
          `The User ID or the Site ID is an invalid combination.
            Please contact the Passport Facilitator to setup a User ID
            and send an invite for the entered Site ID.`);
        break;
      case 'not_invited':
        this.isNavigating = false;
        this.showError(
          'Sorry No Access at this Time',
          'Please wait for Approval',
          '<br>Thank you for downloading the app, at this time we ask that \
          you wait for your Physician to approve your access to the PPD Trial Passport. \
          <br><br>Please try again later.');
        break;
      default:
        console.error('Received unrecognized status information: ' + status);
    }
  }

  showError(title: string = 'Error', errorSubTitle: string, errorText: string) {
    AlertModalPage.show(this, { type: 'type_error', title: title, body: errorText, subTitle: errorSubTitle, cancelCallback: () => { } });
  }

  showHelp() {
    const self = this;
    AlertModalPage.show(
      self, {
        type: 'type_info',
        body: `Providing your Site ID and User ID will help to confirm your identity.
              If you have any questions about your Site ID and User ID,
              please contact your Passport Facilitator.`,
        subTitle: 'Verification',
        title: 'Help',
        cancelCallback: () => { }
      });
  }
  showAlert(title: string, message: string) {
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

  goToPlainPage(target: string) {
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
              thisRef.showError(null, 'Unable to retrieve data from server',
                'Please contact PPD support for further information.');
            });
          console.log('Login: retrieveContent error (' + target + ' not found on server)');
        }

      }).catch(e => {
        thisRef.loadingCtrl.dismiss()
          .then(() => {
            thisRef.showError(null, 'Unable to retrieve data from server',
              'Please make sure you have a working network connection.');
          });
        console.log('Login: retrieveContent error (' + target + ')' + e.message);
      });
  }
  // isFooterVisible() {
  //   return !(this.appService.isKeyboardUp && this.platform.is('android'));
  // }

  handleKey(event: KeyboardEvent) {
    super.handleKey(event);
    if (event.keyCode === 13 && this.userId !== '' && this.siteId !== '') {
      this.doLogin();
    }
  }
}
