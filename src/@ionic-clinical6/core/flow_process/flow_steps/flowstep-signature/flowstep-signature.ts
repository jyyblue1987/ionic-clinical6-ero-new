/* globals Clinical6 */
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Modal, NavController, NavParams, ModalController, Loading, LoadingController, AlertController, Alert, Platform } from 'ionic-angular';
import { Clinical6Service } from '../../../clinical6.service';
import { HelpModalPage } from '../../../modal/help-modal';
import { FlowStepPage } from '../flowstep';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FlowService } from '../../flow.service';
import { clinical6, agreementService, Profile } from 'clinical6';

import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { UtilsService } from '../../../utils.service';

const STATUS_SIGNED: string = 'SIGNED';

@Component({
  selector: 'flowstep-signature',
  templateUrl: 'flowstep-signature.html'
})

export class FlowStepSignPage extends FlowStepPage {

  baseUrl: string = clinical6.apiBaseUrl;
  signatureUrl: string;
  redirectUrl: string;
  showHelpButton: boolean;
  browser: ThemeableBrowserObject;
  // browserObject: ThemeableBrowserObject;
  alertView: Alert;
  signatureStatus: string;
  goback: boolean;
  viewLeft: boolean;

  retries: number = 0;
  pinCode: string;
  options: object;

  errorTitle: string = 'Unable to retrieve signature document';
  errorMissingData: string = 'Missing required information';
  errorAlreadySigned: string = 'Your document has been already signed.';
  errorOkButton: string = 'OK';
  
  constructor(
    public navParams: NavParams,
    public nav: NavController,
    public flowCtlr: FlowService,
    public utilsSvc: UtilsService,
    public _alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public sanitizer: DomSanitizer,
    public elementRef: ElementRef,
    public renderer: Renderer,
    public platform: Platform) {

    super(utilsSvc, navParams, nav, flowCtlr, modalCtrl, sanitizer);

    this.createAlert();

    this.showHelpButton = this.step.help_subtitle || this.step.help_text;
    this.goback = true;

    this.themeColor = '#4f2683';
  }

  ionViewDidLoad() {
    // console.log('Signature: viewDidLoad()');

    // retrieve profile
    clinical6.getProfile()
      .then(profile => { this.requestSignature(profile); })
      .catch(reason => {
        console.log(reason);
      });
  }

  ionViewDidEnter() {
    // console.log('Signature: ionViewDidEnter()');

    if (this.viewLeft && this.signatureStatus === STATUS_SIGNED) {
      if (!this.alertView) {
        this.createAlert();
      }
      this.alertView.present();
    } else if (this.viewLeft) {
      this.launchUrl(this.signatureUrl);
    }
    this.viewLeft = false;
  }

  ionViewWillLeave() {
    // console.log('Signature: ionViewWillLeave()');
    if (this.alertView) {
      this.alertView.dismiss();
      this.alertView = undefined;
    }
    this.viewLeft = true;
  }

  createAlert() {
    // console.log('Signature: createAlert()');
    this.alertView = this._alertCtrl.create({
      message: this.errorAlreadySigned,
      enableBackdropDismiss: false,
      buttons: [{
        text: this.errorOkButton,
        handler: data => this.gotoNext(this)
      }]
    });
  }

  requestSignature(profile: Profile) {
    // console.log('Signature: requestSignature()');

    var thisRef = this;

    let userEmail = profile.email;
    let recipients = [
      { email: userEmail, role: 'SIGNER', 'signing_order': 1 }
    ];
    if (this.pinCode) recipients[0]['signing_password'] = this.pinCode;

    if (this.step.agreement_template_id && userEmail) {
      let options = this.setupOptions();
      agreementService.get(this.step.agreement_template_id, recipients, options)
        .then(response => thisRef.handleSignatureResponse(thisRef, response))
        .catch(reason => {
          console.log(reason);
          if (this.retries--) {
            this.requestSignature(profile);
          }
          else {
            let alert = this._alertCtrl.create ({
              title: this.errorTitle,
              message: reason.message,
              cssClass: 'alert',
              buttons: [
                {
                    text: this.errorOkButton,
                    handler: () => {
                      this.goBack();
                    }
                }
              ]
            });
            alert.present();
          }
        });
    } else {
      let alert = this._alertCtrl.create ({
        title: this.errorTitle,
        message: this.errorMissingData,
        cssClass: 'alert',
        buttons: [
          {
              text: this.errorOkButton,
              handler: () => {
                this.goBack();
              }
          }
        ]
      });
      alert.present();

      // this.goBack();
    }
  }

  handleSignatureResponse(ref: any, response: any) {
    ref.signatureUrl = response.signatures[0].signUrl;
    if (response.template && response.template.redirectUrl) // TODO is this API correct
       ref.redirectUrl = response.template.redirectUrl;
    else
      ref.redirectUrl = response.signatures[0].redirectUrl;
    ref.signatureStatus = response.status;

    // todo check the document status
    if (ref.signatureStatus === STATUS_SIGNED) {
      ref.alertView.present();
    } else {
      ref.launchUrl(ref.signatureUrl);
    }
  }


  setupOptions() {
    var options: any = {};

    if (this.step.flow_process_id) {
      options.flow_process_id = this.step.flow_process_id;
    }
    return options;
  }

  launchUrl(url: string) {

    console.log('Signature: launchUrl(): ', url);
    var thisRef = this;

    var target = '_blank';

    var optionsiOS = this.options || {
      statusbar: {
        color: this.themeColor
        // color: '#4f2683'
      },
      toolbar: {
        height: 44,
        color: this.themeColor
        // color: '#4f2683'
      },
      title: {
        color: '#ffffffff',
        staticText: ''
      },
      backButton: {
        wwwImage: 'assets/images/back_arrow100x100+15.png',
        wwwImageDensity: 4,
        align: 'left',
        event: 'backPressed'
      },
      closeButton: {
        image: 'close',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
      },
      backButtonCanClose: true
    };

    var optionsAndroid = this.options || {
      statusbar: {
        color: this.themeColor
        // color: '#4f2683'
      },
      toolbar: {
        height: 44,
        color: this.themeColor
        // color: '#4f2683'
      },
      title: {
        color: '#ffffffff',
        staticText: ''
      },
      backButton: {
        wwwImage: 'assets/images/back_arrow100x100+15.png',
        wwwImageDensity: 4,
        align: 'left',
        event: 'backPressed'
      },
      backButtonCanClose: true
    };

    if (this.platform.is('android')) {
      this.browser = new ThemeableBrowserObject(url, target, optionsAndroid);
    } else {
      this.browser = new ThemeableBrowserObject(url, target, optionsiOS);
    }

    this.browser.on('loadstart').subscribe(
      res => thisRef.loadStart(res, thisRef),
      error => console.log('InAppBrowser loadstart Event Error: ' + error)
    );

    this.browser.on('loadstop').subscribe(
      res => {
        thisRef.loadStop(res);
      },
      error => console.log('InAppBrowser loadstop Event Error: ' + error)
    );

    this.browser.on('loaderror').subscribe(
      res => thisRef.loadError(res),
      error => console.log('InAppBrowser loaderror Event Error: ' + error)
    );

    this.browser.on('exit').subscribe(
      res => thisRef.exit(res, thisRef),
      error => console.log('InAppBrowser exit Event Error: ' + error)
    );

    this.browser.on('closePressed').subscribe(
      res => thisRef.closePressed(thisRef),
      error => console.log('InAppBrowser exit Event Error: ' + error)
    );

    this.browser.on('backPressed').subscribe(
      res => thisRef.backPressed(thisRef),
      error => console.log('InAppBrowser exit Event Error: ' + error)
    );
  }

  loadStart(resource: any, ref: any) {
    // check redirect
    // console.log('FlowStepSignPage, loadStart', resource);
    if (ref.redirectUrl === resource.url.replace(/\/$/, '')) {
      this.signatureStatus = STATUS_SIGNED;

      ref.gotoNext(ref);
      ref.goback = false;
      setTimeout(() => ref.browser.close(), 200);
    }
  }

  loadStop(resource: any) {
    // Add code to be injected here
    console.warn('FlowStepSignPage, loadStop', resource);
    let code = ` `;
    this.browser.executeScript({ code: code });
  }

  loadError(resource: any) {
    console.warn('FlowStepSignPage, loadError', resource);
  }

  exit(resource: any, ref: any) {
    // console.log('InAppBrowser exit Event ' + resource);
    if (ref.goback) {
      ref.goBack();
    }
  }

  closePressed(ref: any) {
    // console.log('FlowStepSignPage, closePressed');
    setTimeout(() => ref.browser.close(), 200);
  }

  backPressed(ref: any) {
    // console.log('FlowStepSignPage, backPressed');
  }

  gotoNext(ref: any) {
    let stepName = ref.step.paths[0].button_name;
    // console.log('FlowStepSignPage, gotoNext');
    ref.gotoFlow(stepName);
  }

  goBack() {
    // console.log('FlowStepSignPage, goBack');
    this.nav.pop();
  }
}