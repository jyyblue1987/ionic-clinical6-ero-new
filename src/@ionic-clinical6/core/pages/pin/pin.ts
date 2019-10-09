import { Component } from '@angular/core';
import { Modal, NavController, ModalController, AlertController, Alert, NavParams, Loading, LoadingController } from 'ionic-angular';
import { clinical6, flowService, mobileUserService, Client } from 'clinical6';
import { Clinical6Service } from '../../clinical6.service';
import { FlowsModule } from '../../';
import { HelpModalPage } from '../../modal/help-modal';
import { Flows } from '../../flow_process/flow-factory';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginWithPinPage } from '../login-with-pin/login-with-pin';
import { Keyboard } from '@ionic-native/keyboard';
import { AppConfig } from '../../config/app.config';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';

@Component({
  selector: 'pin-page',
  templateUrl: 'pin.html'
})
export class PinPage {
  apiBaseUrl: string;
  authForm: FormGroup;
  pin: string;
  pinConfirm: string;
  isNavigating: boolean = false;
  nextFlow: boolean;
  focusOut: boolean;
  loading: Loading;

  _title: string = '';
  _pinLabel: string = '';
  _pinConfirmationLabel: string = '';
  _helpText = '';
  _pinError = '';
  _unlockMessage = '';

  constructor(
    public loadingController: LoadingController,
    public appConfig: AppConfig,
    public loginSvc: AppLoginService,
    public translatorService: TranslatorService,
    public nav: NavController,
    public navParams: NavParams,
    public captiveReach: Clinical6Service,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public keyboard: Keyboard
  ) {
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
    else this.nextFlow = false;
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
      } else {

        const id = localStorage.getItem('confirmedUserID');

        mobileUserService.acceptInvitation(this.loginSvc.currToken, { password: this.pin, device: Client.instance.device })
        .then( newUser  => {
            // Make sure that you store the Mobile User that is returned by this endpoint (done by clinical6)
            // Make sure that you update the access token with the one that is sent back in the response (done by clinical6)

            // Updating the localstorage
            localStorage.setItem('currentUser', JSON.stringify(clinical6.user.toJSON()));
            localStorage.setItem('user', JSON.stringify(clinical6.user));

            // Once the invitation has been completed, the status of the mobile user should be transition to Active
            this.loginSvc.authenticateUser(
              clinical6.user.email,
              this.pin
            )
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

  showError(errorSubTitle: string, errorText: string) {
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

  set title(text: string) {
    this._title = text;
  }

  get pinLabel() {
    return this._pinLabel;
  }

  set pinLabel(text: string) {
    this._pinLabel = text;
  }

  get pinConfirmationLabel() {
    return this._pinConfirmationLabel;
  }

  set pinConfirmationLabel(text: string) {
    this._pinConfirmationLabel = text;
  }

  get helpText() {
    return this._helpText;
  }

  set helpText(text: string) {
    this._helpText = text;
  }

  get pinError() {
    return this._pinError;
  }

  set pinError(text: string) {
    this._pinError = text;
  }

  get unlockMessage() {
    return this._unlockMessage;
  }

  set unlockMessage(text: string) {
    this._unlockMessage = text;
  }

  translate(string_key: string) {
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
}
