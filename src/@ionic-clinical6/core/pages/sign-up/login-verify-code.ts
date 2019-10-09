import { ElementRef, Component } from '@angular/core';
import { NavController, NavParams, ModalController,  Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { BasePage } from '../base/base-page';

import { flowService, clinical6, userService } from 'clinical6';
import { Flows } from '../../flow_process/flow-factory';
import { TranslatorService } from '../../translator/translator.service';

import { Clinical6Service } from '../../clinical6.service';
import { Keyboard } from '@ionic-native/keyboard';
import { Device, deviceService, mobileUserService, Client } from 'clinical6';
import { AppLoginService } from '../../login.service';

@Component({
  selector: 'login-verify-code',
  templateUrl: 'login-verify-code.html'
})
export class VerifyCodePage extends BasePage {

  isNavigating: boolean = false;

  PIN_CODE_DIGITS = 6;

  userId: string = '';
  userCode: string = '';

  doValidatePIN = false;
  needConfirmation = false;
  loader: Loading;
  
  constructor(
    public loadingController: LoadingController,    
    public loginSvc: AppLoginService,
    public translator: TranslatorService,
    public platform: Platform,
    public elementRef: ElementRef,
    public c6LibService: Clinical6Service,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public params: NavParams,
    public nav: NavController,
    public keyboard: Keyboard) {

    super(platform,
      elementRef);
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

  async doneCallback() {
    var thisRef = this;
    let alert;
    if (!this.isNavigating) {
      this.loader = this.loadingController.create();
      this.loader.present();
      this.isNavigating = true;
      try {
        let newUser = await mobileUserService.acceptInvitation(this.userCode.toString(), { email: this.userId, device: clinical6.device })      
        // .then((newUser) => {
        //userService['type'] = 'users';
        clinical6.user = newUser;
        this.isNavigating = false;
        // storing the current user on the localStorage
        localStorage.setItem('currentUser', JSON.stringify(clinical6.user.toJSON()));
        localStorage.setItem('confirmedUserID', clinical6.user.id.toString());

        // storing the current token, which could be used later on during a mobile_user invitation pro ess
        this.loginSvc.currToken = this.userCode.toString();
        this.loader.dismiss()
        
        this.confirmationSuccess();
      } catch (err) {
        userService['type'] = 'users';
        this.isNavigating = false;
        console.error('Unable to Accept invitation', err);

        this.loader.dismiss()
        
        if (err.message.indexOf('already confirmed') > -1) {
          // email  already confirmed, move to login
          this.confirmationSuccess();
          return;
        }
        
        alert = this.alertCtrl.create ({
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

  handleKey(event: any) {
    // super.handleKey(event);
    if (this.userCode.length >= this.PIN_CODE_DIGITS) this.doValidatePIN = true;
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
}
