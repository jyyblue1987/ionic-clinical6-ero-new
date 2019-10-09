import { Component } from '@angular/core';

import { ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, Platform, Loading, LoadingController } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { TranslatorService } from '../../translator/translator.service';
import { mobileUserService, flowService, userService, Client } from 'clinical6';
import { VerifyCodePage } from './login-verify-code';
import { LoginWithPinPage } from './../login-with-pin/login-with-pin';
import { Flows } from '../../flow_process/flow-factory';
import { AppConfig } from '../../config';
import { AppLoginService } from '../../login.service';

@Component({
  selector: 'enter-email-page',
  templateUrl: 'login-email.html'
})
export class EnterEmailPage extends BasePage {

  /** @type {string} - Email input model */
  email: string = '';

  /** @type {boolean} - Enables/disables the ion-spinner if the email-form is not ready */
  working: boolean = false;

  /** @type {boolean} - Prevents the function is called more times in case of multiple click events */
  isNavigating: boolean = false;

  /** @type {Loading} - Shows a loading indicator  */
  loader: Loading;

  constructor(
          public loadingController: LoadingController,
          public loginSvc: AppLoginService,
          public nav: NavController,
          public translator: TranslatorService,
          public alertCtrl: AlertController,
          public params: NavParams,
          public platform: Platform,
          public el: ElementRef,
          public navCtrl: NavController
          ) {
      super(platform, el, navCtrl);
  }
  goBack() {
    this.nav.pop();
  }
  // add method instead of template function

  /**
   * This is called when the user clicks on "LOGIN" or equivalent action
   */
  async doneCallback() {

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
      } else {
        attributes['account_name'] = this.email;
      }

      /**
       * TODO: Using fetch until the SDK is updated to return the response object instead of a plain string
       */
      try {
        const response = await Client.instance.fetch('/v3/mobile_users/registration_validation', 'post', {
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
            buttons: [
              // {
              //     text: 'OK',
              //     handler: data => {
              //       this.platform.exitApp();
              //     }
              // }
            ]
          });

        let pageType = 'Verification';

        // if (response === 'active') this.nav.push(VerifyCodePage,{ email: this.email });
        // if (response !== 'new') this.nav.push(VerifyCodePage,{ email: this.email });
        if (response.data.attributes.value === 'invalid') {
          this.loader.dismiss(); 
          this.showInvaliEmailError();
        };
        if (response.data.attributes.value === 'disabled') {
          this.loader.dismiss(); 
          this.showDisabledUserError();
        };
        if (response.data.attributes.value === 'active' || response.data.attributes.value === 'new')  {
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
              const _response = await this.loginSvc.authenticateDevice();
                console.log('Device Authentication Success ', response);

                if (pageType === 'Verification')
                  this.goToCodeVerificationPage();
                else // i.e. if (pageType === 'PIN')
                  this.goToEnterPINPage();
            }
            catch(err) {
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
    let alert = this.alertCtrl.create ({
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

  handleKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.doneCallback();
    }
  }
  showError(title: string = 'Error', errorText: string) {
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
}