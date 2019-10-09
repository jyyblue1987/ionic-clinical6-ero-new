import { Component } from '@angular/core';

import { ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { TranslatorService } from '../../translator/translator.service';
import { mobileUserService, flowService, userService, clinical6, Client } from 'clinical6';
import { AppConfig } from '../../config';
import { AppLoginService } from '../../login.service';

@Component({
  selector: 'create-new-user',
  templateUrl: 'create-new-user.html'
})
export class CreateNewUserPage extends BasePage {

  email: string = '';
  pin: string = '';
  account_name: string = '';
  working: boolean = false;
  isNavigating: boolean = false;
  constructor(
          public loginSvc: AppLoginService,
          public nav: NavController,
          public alertCtrl: AlertController,
          public params: NavParams,
          public platform: Platform,
          public el: ElementRef,
          public navCtrl: NavController,
          private translator: TranslatorService,
          ) {
      super(platform, el, navCtrl);
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
        if (this.email) attrs['email'] = this.email;
        if (this.pin) attrs['password'] = this.pin;
        if (this.account_name) attrs['account_name'] = this.account_name;

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
                    }).catch ((result) => {
                        this.showAlert('Error', 'User Created but email not sent:' + result.message);
                    });
                  }
            });
          }

          let alert = this.alertCtrl.create ({
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
  showAlert (title: string, msg: string) {

    let alert = this.alertCtrl.create ({
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

}