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
import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { DomSanitizer } from '@angular/platform-browser';
import { FlowService } from '../../flow.service';
import { clinical6, agreementService } from 'clinical6';
import { ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { UtilsService } from '../../../utils.service';
const STATUS_SIGNED = 'SIGNED';
let FlowStepSignPage = class FlowStepSignPage extends FlowStepPage {
    constructor(navParams, nav, flowCtlr, utilsSvc, _alertCtrl, modalCtrl, sanitizer, elementRef, renderer, platform) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl, sanitizer);
        this.navParams = navParams;
        this.nav = nav;
        this.flowCtlr = flowCtlr;
        this.utilsSvc = utilsSvc;
        this._alertCtrl = _alertCtrl;
        this.modalCtrl = modalCtrl;
        this.sanitizer = sanitizer;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.platform = platform;
        this.baseUrl = clinical6.apiBaseUrl;
        this.retries = 0;
        this.errorTitle = 'Unable to retrieve signature document';
        this.errorMissingData = 'Missing required information';
        this.errorAlreadySigned = 'Your document has been already signed.';
        this.errorOkButton = 'OK';
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
        }
        else if (this.viewLeft) {
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
    requestSignature(profile) {
        // console.log('Signature: requestSignature()');
        var thisRef = this;
        let userEmail = profile.email;
        let recipients = [
            { email: userEmail, role: 'SIGNER', 'signing_order': 1 }
        ];
        if (this.pinCode)
            recipients[0]['signing_password'] = this.pinCode;
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
                    let alert = this._alertCtrl.create({
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
        }
        else {
            let alert = this._alertCtrl.create({
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
    handleSignatureResponse(ref, response) {
        ref.signatureUrl = response.signatures[0].signUrl;
        if (response.template && response.template.redirectUrl)
            ref.redirectUrl = response.template.redirectUrl;
        else
            ref.redirectUrl = response.signatures[0].redirectUrl;
        ref.signatureStatus = response.status;
        // todo check the document status
        if (ref.signatureStatus === STATUS_SIGNED) {
            ref.alertView.present();
        }
        else {
            ref.launchUrl(ref.signatureUrl);
        }
    }
    setupOptions() {
        var options = {};
        if (this.step.flow_process_id) {
            options.flow_process_id = this.step.flow_process_id;
        }
        return options;
    }
    launchUrl(url) {
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
        }
        else {
            this.browser = new ThemeableBrowserObject(url, target, optionsiOS);
        }
        this.browser.on('loadstart').subscribe(res => thisRef.loadStart(res, thisRef), error => console.log('InAppBrowser loadstart Event Error: ' + error));
        this.browser.on('loadstop').subscribe(res => {
            thisRef.loadStop(res);
        }, error => console.log('InAppBrowser loadstop Event Error: ' + error));
        this.browser.on('loaderror').subscribe(res => thisRef.loadError(res), error => console.log('InAppBrowser loaderror Event Error: ' + error));
        this.browser.on('exit').subscribe(res => thisRef.exit(res, thisRef), error => console.log('InAppBrowser exit Event Error: ' + error));
        this.browser.on('closePressed').subscribe(res => thisRef.closePressed(thisRef), error => console.log('InAppBrowser exit Event Error: ' + error));
        this.browser.on('backPressed').subscribe(res => thisRef.backPressed(thisRef), error => console.log('InAppBrowser exit Event Error: ' + error));
    }
    loadStart(resource, ref) {
        // check redirect
        // console.log('FlowStepSignPage, loadStart', resource);
        if (ref.redirectUrl === resource.url.replace(/\/$/, '')) {
            this.signatureStatus = STATUS_SIGNED;
            ref.gotoNext(ref);
            ref.goback = false;
            setTimeout(() => ref.browser.close(), 200);
        }
    }
    loadStop(resource) {
        // Add code to be injected here
        console.warn('FlowStepSignPage, loadStop', resource);
        let code = ` `;
        this.browser.executeScript({ code: code });
    }
    loadError(resource) {
        console.warn('FlowStepSignPage, loadError', resource);
    }
    exit(resource, ref) {
        // console.log('InAppBrowser exit Event ' + resource);
        if (ref.goback) {
            ref.goBack();
        }
    }
    closePressed(ref) {
        // console.log('FlowStepSignPage, closePressed');
        setTimeout(() => ref.browser.close(), 200);
    }
    backPressed(ref) {
        // console.log('FlowStepSignPage, backPressed');
    }
    gotoNext(ref) {
        let stepName = ref.step.paths[0].button_name;
        // console.log('FlowStepSignPage, gotoNext');
        ref.gotoFlow(stepName);
    }
    goBack() {
        // console.log('FlowStepSignPage, goBack');
        this.nav.pop();
    }
};
FlowStepSignPage = __decorate([
    Component({
        selector: 'flowstep-signature',
        template: `
    <ion-header>
      <app-toolbar [backLabel]="'Back'"
                  layout="app"
                 ></app-toolbar>
    </ion-header>
    <ion-content padding (click)="return;">

      <!-- <script type='text/javascript' language='JavaScript' src='pdfUrl()' (message)="handleMessage($event)"></script> -->
      <script>
        if (!window.addEventListener) {
          window.attachEvent('onmessage', eventHandler);
        } else {
          window.addEventListener('message', eventHandler, false);
        }

        function eventHandler(e) {
          if (e.origin == "https://secure.echosign.com") {
            console.log("Event from EchoSign!", JSON.parse(e.data));
          } else {
            console.log("Do not process this!");
          }
        }
      </script>

    <ion-spinner> </ion-spinner>

    <!-- <iframe (message)="handleMessage($event)" [src]='pdfUrl()' width="100%" height="100%" frameborder="0" style="border: 0; overflow: hidden; min-height: 100%; min-width: 100%;"></iframe>
     <iframe id="frame" [src]='pdfUrl()' width="100%" height="100%" frameborder="0" style="border: 0; overflow: hidden; min-height: 100%; min-width: 100%;"></iframe>-->
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [NavParams,
        NavController,
        FlowService,
        UtilsService,
        AlertController,
        ModalController,
        DomSanitizer,
        ElementRef,
        Renderer,
        Platform])
], FlowStepSignPage);
export { FlowStepSignPage };

//# sourceMappingURL=flowstep-signature.js.map
