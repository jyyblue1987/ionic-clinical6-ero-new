import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Modal, NavController, ModalController, AlertController, NavParams, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { clinical6, flowService, User, userService, mobileUserService, Device } from 'clinical6';
import { Clinical6Service } from '../../clinical6.service';
import { ValidationService } from '../../flow_process/flow_inputs/validation.service';
import { Flows } from '../../flow_process/flow-factory';
import { HelpModalPage } from '../../modal/help-modal';
import { AppConfig, AppState } from '../../config';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AlertModalPage } from '../../modal/alert-modal';


@Component({
  selector: 'login-with-pin-page',
  templateUrl: 'login-with-pin.html',
})
export class LoginWithPinPage {

  authForm: FormGroup;
  // variables for two-way data binding with NgModel
  pin = '';
  email = '';
  code = '';
  newPin = '';
  newPinConfirm = '';
  // conditional variables to pass on the following pages
  showPinPage = true;
  showEmailPage = false;
  showForgotPasswordPage = false;
  showActivationCodePage = false;
  showResetPinPage = false;
  // Prevents the function is called more times in case of multiple click events 
  isNavigating = false;
  focusOut = false;
  // shows the 'Reset passowrd pop-up after entering wrong PIN 3 times
  countAlert = 1;
  failedLogins: number = 0;
  // skips the Activation Code page
  skipActivationCode = false;
  _title: string = '';
  _resetPINText: string = '';
  // uses native hardware acceleration to animate your transitions between views
  backTransition: NativeTransitionOptions = {
    direction: 'right',
    // duration: 500,
    // slowdownfactor: 3,
    // slidePixels: 20,
    // iosdelay: 100,
    // androiddelay: 150,
    // fixedPixelsTop: 0,
    // fixedPixelsBottom: 60
   };
   nextTransition: NativeTransitionOptions;
   // enables/disables the back button in the toolbar
   showBackButton: boolean;
   
  constructor(
    public appConfig: AppConfig,
    public loginSvc: AppLoginService,
    public translatorService: TranslatorService,
    public nav: NavController,
    public navParams: NavParams,
    public captiveReach: Clinical6Service,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public keyboard: Keyboard,
    public platform: Platform,
    public nativePageTransitions: NativePageTransitions) {

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
      this.showAlert('Application error', 'Something went wrong, please reinstall your app.')
    }
  }

  ionWillEnter() {
    this.isNavigating = false;
  }

  // This can make the login to the fourth PIN (It replaces the button): Remember that the PIN is 6 digits!
  keyboardPin(event: KeyboardEvent) {
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

  set title(text: string) {
    this._title = text;
  }

  get resetPINText() {
    return this._resetPINText;
  }

  set resetPINText(text: string) {
    this._resetPINText = text;
  }

  goBackPop() {
      this.nav.pop();
  }

  // simulates the ios-next transition of the NavController
  async goNext() {
    try {
      let response = await this.nativePageTransitions.slide(this.nextTransition);
      return response;     
    } catch (e) {
      console.log(e);
      return e;
    }
    // if (!this.platform.is('core')) {
    //   return await this.nativePageTransitions.slide(this.nextTransition)
    // } else 
    //   return;
  }

  // uses the ionic NativePageTransitions component to simulate the ios-back transition of the NavController
  async goBackTransition() {
    try {
      return await this.nativePageTransitions.slide(this.backTransition)      
    } catch (e) {
      console.log(e);
      return;
    }
  }

  // uses the goBackTransition function to create navigation experience between views
  async goBack() {   
    if (this.showPinPage) {
      if (this.nav.first().name === 'VerifyEmailPage') {
        this.goBackPop();
        this.loginSvc.clearAuthInfo();      
      }
    } else {
      await this.goBackTransition();
      if (this.showEmailPage) {
        this.showEmailPage = false;
        if (this.nav.first().name !== 'VerifyEmailPage')
          this.showBackButton = false;
        this.showPinPage = true;
      } else if (this.showForgotPasswordPage) {
        this.email = '';
        this.showForgotPasswordPage = false;
        this.showEmailPage = true;      
      }
      else if (this.showActivationCodePage) {
        this.showActivationCodePage = false;
        this.showForgotPasswordPage = true;
      } else if (this.showResetPinPage) {
        this.showResetPinPage = false;      
        if (!this.skipActivationCode) 
          this.showActivationCodePage = true;
        else 
          this.showForgotPasswordPage = true;
      }
    }
  }

  // This checks the pin otherwise launches an alert
  // (to be overridden by derived class)
  async login() {
    if (!this.isNavigating) {
      this.isNavigating = true;

      if (this.appConfig.useLegacyV2APIs) {
        // ...
      }
      else {
        if ( !clinical6.user.email && !clinical6.user.accountName && localStorage.getItem('user') ) {
          clinical6.user = new User(JSON.parse(localStorage.getItem('user')));
        }
        localStorage.setItem('user', JSON.stringify(clinical6.user));
        try {
          let result = await this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, this.pin);
          console.log('User Login Success', result);
          await this.loginSuccess();
          this.showBackButton = true;          
          this.isNavigating = false;
          return true;
        }
        catch (failure) {
          this.failedLogins++;
          console.log('Sign in error: ' + failure);
          this.isNavigating = false;
          if (this.failedLogins >= 3) this.resetPin();
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
  }

  showLoginError() {
    this.showAlert(
      this.translate('PIN_ENTER_INVALID_TITLE') || 'Invalid PIN',
      this.translate('PIN_ENTER_INVALID_MSG') || 'Please check your credentials and try again'
    );
  }

  // This is to be overridden with the next page/flow after resetting pin/password
  passwordResetSuccess() {

  }

  // This is to be overridden with the next page/flow after resetting pin/password
  async loginSuccess() {
  }

  // This reset the pin after the third PIN error
  async resetPin() {
    if (!this.isNavigating) {
      this.isNavigating = true;
      this.showBackButton = true;
      let alert = this.alertCtrl.create ({
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
  }

  // This sends the activation code to the email or throws an alert error if the email is not valid
  async send() {
    if (!this.isNavigating) {
      this.isNavigating = true;
      const self = this;
      if (this.appConfig.useLegacyV2APIs) {
        try {
          let response = await clinical6['emailPassword'].call(this, this.email)          
          console.log('Valid Email: ', response);
          await this.goNext();     
          this.showBackButton = true;          
          this.showEmailPage = false;
          this.showForgotPasswordPage = true;
          self.isNavigating = false;
        } catch (reason) {
          self.isNavigating = false;
          console.log('Invalid Email error: ' + reason.message);
          this.showAlert(
            this.translate('IFORGOT_ERROR_INVALID_EMAIL_TITLE') || 'Invalid Email',
            this.translate('IFORGOT_ERROR_INVALID_EMAIL_MSG') || 'We cannot find your email address in the system. Please re-enter your email address.'); 
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
          let response = await mobileUserService.requestPasswordReset({ email: this.email })
          // .then( response => {
          console.log('Valid Email: ', response);
          await this.goNext();
          this.showBackButton = true;          
          this.showEmailPage = false;
          this.showForgotPasswordPage = true;
          self.isNavigating = false;

        } catch(reason) {
            self.isNavigating = false;
            console.log('Invalid Email error: ' + reason.message);
            this.showAlert(
              this.translate('IFORGOT_ERROR_INVALID_EMAIL_TITLE') || 'Invalid Email',
              this.translate('IFORGOT_ERROR_INVALID_EMAIL_MSG') || 'We cannot find your email address in the system. Please re-enter your email address.');
            this.showEmailPage = true;
            this.showBackButton = true;            
        }
      }
    }
  }

    // This goes on the activation code page
  async continue() {
    await this.goNext();    
    this.showBackButton = true;    
    this.showForgotPasswordPage = false;    
    this.failedLogins = 0;   
    this.isNavigating = false;  
    if (!this.skipActivationCode) {
      this.showActivationCodePage = true;
    } else {
      this.showResetPinPage = true;
    }  
  }

  // This checks the activation code otherwise launches an alert
  async activation() {
    if (!this.isNavigating) {
    this.isNavigating = true;
    if (this.appConfig.useLegacyV2APIs) {

      if (this.code === '') this.code = ' '; // Needed otherwise a guest sign in will be triggered
      try {
        let response = await clinical6['signIn'].call(this, this.email, this.code)
        // .then( response => {
        console.log('Valid Activation Code: ', response);
        await this.goNext();              
        this.showActivationCodePage = false;
        this.showResetPinPage = true;
        this.isNavigating = false;
        this.showBackButton = true;        
      } catch (reason) {
          this.isNavigating = false;
          console.log('Invalid Activation Code: ' + reason.message);
          this.showAlert(
              this.translate('IFORGOT_ERROR_ACTIVATION_CODE_TITLE') || 'Invalid Activation Code',
              this.translate('IFORGOT_ERROR_ACTIVATION_CODE_MSG') || 'An invalid activation code has been entered. Please try again.');
          this.showActivationCodePage = true;
          this.showBackButton = true;          
      }
    } else {
        // just move to next screen
        await this.goNext();            
        this.showActivationCodePage = false;
        this.showResetPinPage = true;
        this.isNavigating = false;
        this.showBackButton = true;        
      }
    }
  }

  // This inserts the new pin and goes on next page otherwise throws an alert error
  async submit() {
    if (!this.isNavigating) {
      this.isNavigating = true;
      const self = this;
      if (this.failedLogins < 2 || !this.skipActivationCode) {
          
        if (this.appConfig.useLegacyV2APIs) {
          try {
            let response = await clinical6['resetPassword'].call(this, this.newPin, this.newPinConfirm, this.code)
            // .then (response => {
            console.log('Reset Pin completed successfully: ', response);
            await this.goNext();                  
            this.showResetPinPage = false;
            this.passwordResetSuccess();
            this.isNavigating = false;
            this.showBackButton = true;
            
          } catch (reason) {
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
            this.showAlert(
              this.translate('IFORGOT_ERROR_PASSWORDS_MISMATCH_TITLE') || 'PIN codes Mismatch',
              this.translate('IFORGOT_ERROR_PASSWORDS_MISMATCH_MSG') || 'PIN codes do not match, please verify your input.');
                  this.showBackButton = true;
            this.showResetPinPage = true;
            this.isNavigating = false;
            this.failedLogins++;
            return;
          }
          this.loginSvc.clearAuthInfo();
          try {

            let response = await this.loginSvc.authenticateDevice()
            // .then ( response => {
            const attributes = { 
              reset_password_token: this.code, 
              password: this.newPin
            };
            try {
              let user = await mobileUserService.resetPassword(attributes)
              // .then( user => {
              console.log('Password Change Successful: ', user);
              // this.showResetPinPage = false;
              // Now only reset on email is possible
              if (!clinical6.user.email || !clinical6.user.accountName)
                clinical6.user = user && (user.email || user.accountName) ? user : clinical6.user; // make sure that clinical6.user points the correct user instance
              localStorage.setItem('user', JSON.stringify(clinical6.user));
              let result = await this.loginSvc.authenticateUser(clinical6.user.email || clinical6.user.accountName, this.newPin);
              console.log('User Login Success', result);
              this.loginSuccess();
              this.isNavigating = false;
          // })
            } catch (reason) {
              this.isNavigating = false;
              console.log('Password Change Failed: ' + reason.message);
              this.showAlert(
                  this.translate('IFORGOT_ERROR_ACTIVATION_CODE_TITLE') || 'Invalid Activation Code',
                  this.translate('IFORGOT_ERROR_ACTIVATION_CODE_MSG') || 'An invalid activation code has been entered. Please try again.');
              this.code = this.newPin = this.newPinConfirm = '';
              // this.showResetPinPage = false;
              if (!this.skipActivationCode) {
                await this.goBackTransition();
                this.showResetPinPage = false;
                this.showActivationCodePage = true;
              }
            }
          } catch(err) {
            this.isNavigating = false;
            console.error('Error Authenticating ', err);
            this.showAlert(
                'Device Registration Error',
                'Unable to Reset Password. Please get in touch with your support contact, and try again.');
            this.code = this.newPin = this.newPinConfirm = '';
            if (!this.skipActivationCode) {
              await this.goBackTransition();                
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
                      this.nav.pop(AppConfig.animationOptBack)
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

  async goToEmailPage() {   // return to the EmailPage in case the access code is not received
    await this.goBackTransition();    
    this.showActivationCodePage = false;
    this.showEmailPage = true;
    this.showResetPinPage = false;
    this.isNavigating = false;
    this.focusOut = false;
    this.failedLogins = 0;
    this.email = this.code = this.newPin = this.newPinConfirm = '';
  }

  showAlert(title: string, message: string) {
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

  showError(errorSubTitle: string, errorText: string) {
    const title = 'Error';
    // using the Help Modal for the time being, later on to be reskinned
    let modal = this.modalCtrl.create(HelpModalPage, { title: title, subTitle: errorSubTitle, helpText: errorText }, { showBackdrop: true });
    modal.present();
  }

  translate(string_key: any) {
    let str = this.translatorService.getInnerHTML(string_key);
    if (str === '') str = null;
    return str;
  }
}
