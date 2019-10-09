/* globals Clinical6 */
import { Component, ViewChild, } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Modal, ModalController } from 'ionic-angular';

// import { ContactPPDPage } from '../../pages/contact-PPD/contact-PPD';

@Component({
  selector: 'alert-modal',
  templateUrl: 'alert-modal.html'
})
export class AlertModalPage {  // differently from Help modal page this doesn't support html inputs. The two modals need to be merged anytime soon.
  type: string;
  title: string;
  subTitle: string;
  body: string;
  pageRef: any;
  dismissCallback: any;
  newRoot: any;
  buttons: Array<any>;
  self: AlertModalPage = this;
  static contactPage: any;  // Set this up on app

  iconClass = {
    'type_error': 'app-p6-icon-info',
    'type_info': 'app-p6-icon-info'
  };

  constructor(  public params: NavParams,
                public viewCtrl: ViewController) {
    this.pageRef          = this.params.get('ref');
    this.type             = this.params.get('type');
    this.title            = this.params.get('title');
    this.subTitle         = this.params.get('subTitle');
    this.body             = this.params.get('bodyText');
    this.dismissCallback  = this.params.get('callbackFunction');
    this.newRoot          = this.params.get('newRoot');
    this.buttons          = this.params.get('buttons') || [
      { title: 'Contact Us', action: (self) => { self.contact(); }},
      { title: 'Cancel', action: (self) => { self.dismiss(); }},
    ];

    switch (this.type) {
      case 'type_error':
        if (this.title === '')  { this.title = 'Error'; }
        break;
      default:
        this.type = 'type_info';
        if (this.title === '')  { this.title = 'Information'; }
        break;
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
    this.dismissCallback(this.pageRef);
  }
  contact() {
    if (this.newRoot) {
      this.pageRef.nav.setRoot(this.newRoot)
        .then ( () => {
          this.pageRef.nav.push(AlertModalPage.contactPage, {from: 'Alert'});
        });
    }
    else {
      this.pageRef.nav.push(AlertModalPage.contactPage, {from: 'Alert'});
    }

    // override this
    this.viewCtrl.dismiss();
  }

/**
 * Show a Modal alert popup
 * @param {string} type Defines default values for title, etc...
 *                      allowed values: 'type_error', 'type_info'
 * @param {string}    title
 * @param {string}    subTitle
 * @param {string}    body
 * @param {function}  cancelCallback
 * @param {any}       newRoot
 */
  static show(context: any, config?: {type?: string, title?: string, subTitle?: string, body?: string, cancelCallback?: any, newRoot?: any, buttons?: Array<any> } ) {

    var title           = config.title ? config.title : '';
    var subTitle        = config.subTitle ? config.subTitle : '';
    var body            = config.body ? config.body : '';
    var dismissCallback = config.cancelCallback ? config.cancelCallback : (r) => { r.nav.pop(); };
    var newRoot         = config.newRoot ? config.newRoot : null;
    const self = this;

    /* context.nav.present( Modal.create( AlertModalPage, {
                                                       ref: context,
                                                       type: config.type,
                                                       title: title,
                                                       subTitle: subTitle,
                                                       bodyText: body,
                                                       callbackFunction: dismissCallback,
                                                       newRoot: newRoot
                                                     })); */
    if (!context.modalCtrl) console.error('Please make sure current context has a modalCtrl: ModalController member');

    let newModal = context.modalCtrl.create( AlertModalPage, {
                                                      ref: context,
                                                      type: config.type,
                                                      title: title,
                                                      subTitle: subTitle,
                                                      bodyText: body,
                                                      callbackFunction: dismissCallback,
                                                      newRoot: newRoot,
                                                      buttons: config.buttons
                                                    });
    newModal.present();
  }
}