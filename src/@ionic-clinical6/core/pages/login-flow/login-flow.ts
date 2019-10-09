import { Component, ViewChild, ElementRef } from '@angular/core';
import { Modal, NavController, NavParams, ModalController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { clinical6, Device, User, mobileUserService, Client } from 'clinical6';
import { InputStyleUtil } from '../../flow_process/flow_inputs/input.model';
import { Flows} from '../../flow_process/flow-factory';
import { FlowStepPage } from '../../flow_process/flow_steps/flowstep';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FlowService } from '../../flow_process/flow.service';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
import { StepInputFactory } from '../../flow_process/flow_inputs/stepinput.factory';
import { CustomStepInputLoginComponent } from './custom-login-input/stepinput-login';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'login-flow-page',
  templateUrl: 'login-flow.html'
})
export class LoginFlowPage extends FlowStepPage {
    /** @type {boolean} showBackButton - shows the back button on the toolbar if it is true **/
    showBackButton: boolean;
    /** @type {any} loader - shows a spinner **/
    loader: any;
    /** @type {any} alert - variable to handle the Alert Controller **/
    alert: any
    constructor(
      public utilsSvc: UtilsService,
      public loginSvc: AppLoginService,
      public translator: TranslatorService,
      public navParams: NavParams,
      public nav: NavController,
      public flowCtlr: FlowService,
      public modalCtrl: ModalController,
      public sanitizer: DomSanitizer,
      public platform: Platform,
      public elementRef: ElementRef,
      public alertCtrl: AlertController) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl, sanitizer, platform, elementRef, alertCtrl);
        this.showBackButton = this.navParams.get('showBackButton') == false ? false: true;
        if (this.step.id === 'check-pin') {
          this.step.flow.set('failed_logins', 0);
        }
        // this extends the input container dynamically 
        StepInputFactory.setMap( {
          code:  CustomStepInputLoginComponent,
          pin: CustomStepInputLoginComponent,
          email: CustomStepInputLoginComponent
        });
    }

  async ionViewWillEnter() {
    if (this.step.id === this.step.flow.first.id) {
      this.flowCtlr.resetStack(this.step);
    }
  }

  /** 
   * @function goNext - Executes the callback function for the active path of the Flow Step and goes to the next Flow Step if it exists
   * 
   * @param {String} input_id
  **/
  async goNext(button, options: any = {}) {
    try {
      this.utilsSvc.presentLoading();
      /** @type {any} last - check if the active Flow Step is the last  **/
      let last;
      if (button.callback)
         last = await this[`${button.callback}`]();
        const response = await super.gotoFlow(button.button_name, options); // ignoreRequiredFields
      this.isNavigating = false;
      return response;
    } catch(err) {
      this.utilsSvc.dismissLoader();
      this.isNavigating = false;
      console.error(err);
    }
  }

  /** 
   * helper method to retrieve the input value
   * 
   * @param {String} input_id
  **/
  inputValue(input_id: string) {
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
  goToPage(event: any) {
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
  async checkEmail(): Promise<boolean> {

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
        const value = await mobileUserService.getRegistrationStatus(attributes);
        if (value === 'invalid' || value === 'disabled') {
          await this.throwError(value);
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
            const _response = await this.loginSvc.authenticateDevice();
            console.log('Device Authentication Success ', _response);
            clinical6.user = new User(attributes);
            // localStorage.setItem('user', JSON.stringify(clinical6.user));
            return false;
          }
          catch (err) {
            console.error('Error Authenticating ', err);
            await this.throwError('registration');
          }
        }
      }
      catch (e) {
        console.error('getRegistrationStatus: failure', e);
        throw (e);
      }
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
  async checkCode(): Promise<boolean> {

      /** @type {String} code  - get the 'code' input for the active Flow Step  */
      const code: string = this.inputValue('code');

      let alert;
      try {
        let newUser = await mobileUserService.acceptInvitation(code, { email: clinical6.user.email, device: clinical6.device });
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
        await this.throwError('invalid');
      }
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
  async checkPin() {
    
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
        }
      }
      if (failed_logins >=3) {
        const data = await this.showPopup(err.title, err.message, err.buttons);
        if (!data)
          throw('Alert Dismiss');
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
          const _response = await this.loginSvc.authenticateDevice();
        }  
      } catch (e) {
        throw(e);
      }

      try {
        if ( !clinical6.user.email && !clinical6.user.accountName && localStorage.getItem('user') ) {
          clinical6.user = new User(JSON.parse(localStorage.getItem('user')));
        }
        let result = await this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, pin);
        console.log('User Login Success', result);
        localStorage.setItem('user', JSON.stringify(clinical6.user));
        await this.loginSuccess();
        return true;
      } catch (failure) {

        failed_logins++; 
        this.step.flow.set('failed_logins', failed_logins);
        console.log('Sign in error: ' + failure);
        if (failed_logins < 3) {
          await this.throwError('invalid');
        } else {
          const data = await this.showPopup(err.title, err.message, err.buttons);
          if (!data)
            throw(failure);
          else
            return data;
        }
      }
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
  async forgotPin(): Promise<boolean> {

      /** @type {String} email - get the 'email_sent' input for the active Flow Step  **/
      const email = this.inputValue('email_sent');

      try {
        let response = await mobileUserService.requestPasswordReset({ email: email });
        console.log('Valid Email: ', response);
        return false;
      }
      catch (reason) {
        console.log('Invalid Email error: ' + reason.message);
        await this.throwError('invalid');
      }
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
  async resetPin():  Promise<boolean> {

      /**  
       * @type {String} code           - get the 'activation_code' input for the active Flow Step 
       * @type {String} newPin         - get the 'reset_pin' input for the active Flow Step
       * @type {String} newPinConfirm  - get the 'confirm_reset_pin' input for the active Flow Step
      **/    
      const code: string = this.inputValue('activation_code');
      const newPin: string = this.inputValue('reset_pin');
      const newPinConfirm: string = this.inputValue('confirm_reset_pin');

      let alerts = this.step.alerts || {};
      // do pins match?
      if (newPin !== newPinConfirm) {
        await this.throwError('pins_mismatch');
      }
      this.loginSvc.clearAuthInfo();
      try {
        let response = await this.loginSvc.authenticateDevice();
        try {
          let user = await mobileUserService.resetPassword({
            reset_password_token: code,
            password: newPin
          });
          console.log('Password Change Successful: ', user);
          // Now only reset on email is possible
          if (!clinical6.user.email || !clinical6.user.accountName)
            clinical6.user = user && (user.email || user.accountName) ? user : clinical6.user; // make sure that clinical6.user points the correct user instance
          localStorage.setItem('user', JSON.stringify(clinical6.user));
          let result = await this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, newPin);
          console.log('User Login Success', result);
          await this.loginSuccess();
          return true;
        } catch (reason) {
          console.log('Password Change Failed: ' + reason.message);
          await this.throwError('invalid');
        }
      } catch (err) {
        console.error('Error Authenticating ', err);
        if (err !== 'invalid') {
          await this.throwError('registration');
        }
        throw (err);
      }
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
  async createPin(): Promise<boolean> {

      /**  
       * @type {String} newPin         - get the 'new_pin' input for the active Flow Step
       * @type {String} newPinConfirm  - get the 'confirm_new_pin' input for the active Flow Step
      **/    
      const newPin = this.inputValue('new_pin');
      const newPinConfirm = this.inputValue('confirm_new_pin');

      // do pins match?
      if (newPin !== newPinConfirm) {
        await this.throwError('pins_mismatch');
      } 
      try {
        const newUser = await mobileUserService.acceptInvitation(this.loginSvc.currToken, { password: newPin, device: Client.instance.device })
        // Make sure that you store the Mobile User that is returned by this endpoint (done by clinical6)
        // Updating the localstorage
        localStorage.setItem('currentUser', JSON.stringify(clinical6.user.toJSON()));
        localStorage.setItem('user', JSON.stringify(clinical6.user));
        try {
            // Once the invitation has been completed, the status of the mobile user should be transition to Active
            const result = await this.loginSvc.authenticateUser(clinical6.user.email  || clinical6.user.accountName, newPin);
            this.createPinSuccess();
            return true;
        } catch (reason) {
            await this.throwError('invalid');
        };
      } catch(reason) {
        console.error('create-pin: set PIN failed: ', reason);
        if(reason!=='invalid')
          this.showError('Set Pin Failed', reason.message || 'Try Again Later');
        throw(reason);
      }
  }

  /**
   * @callback loginSuccess - Callback that needs to be overwritten from the child component after login success
  **/
  async loginSuccess() {}

  /**
   * @callback checkCodeSuccess - Callback that needs to be overwritten from the child component after verification-code success
  **/
  async checkCodeSuccess() {}

  /**
   * @callback createPinSuccess - Callback that needs to be overwritten from the child component after resetting pin/password success
  **/
  async createPinSuccess() {}

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
  async throwError(type): Promise<Error> {
    let alerts = this.step.alerts || {};
    if (alerts[type])
      this.showPopup(alerts[type].title, alerts[type].message, alerts[type].buttons);
    throw(type || 'Error');
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
  showPopup(title: string , msg: string, buttons: Array<any> = []): Promise<any> {
      this.utilsSvc.dismissLoader();
      return new Promise((resolve) => {
        let btns = [];
        if (buttons && buttons.length > 0) {
          for (let button of buttons) {
            let handler = button.handler != null? button.handler: (button.text && button.text === 'Cancel') ? false: true;
            let btn = {
              text: this.translator.getInnerHTML(`${button.text}`) || button.text || 'OK',
              handler: data => { resolve(handler); },
              role: 'backdrop'
            }
            btns.push(btn);
          }
        } else {
          let btn = {
            text: 'OK',
            handler: data => { }
          };
          btns.push(btn);
        }
        this.alert = this.alertCtrl.create({
          title: this.translator.getInnerHTML(`${title}`) || title,
          message:  this.translator.getInnerHTML(`${msg}`) || msg,
          cssClass: 'email-alert',
          buttons: btns
        });
        // this avoids the multiple click of the alert buttons
        setTimeout(() => {
          if (!this.alert.ionViewDidEnter)
            this.alert.ionViewDidEnter = () => {};
          this.alert.ionViewDidEnter()
        }, 400);
        this.alert.present();
      });
  }

  // overwrites the parent function to add new buttons should be placed in the footer
  displayAsSpecialButton(path: any) {

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
}
