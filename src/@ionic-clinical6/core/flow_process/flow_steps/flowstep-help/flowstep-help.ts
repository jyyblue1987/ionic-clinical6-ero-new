/* globals Clinical6 */
import { Component, ViewChild } from '@angular/core';
import { Modal, NavController, ModalController, NavParams } from 'ionic-angular';
import { AlertModalPage } from '../../../modal/alert-modal';
import { HelpModalPage } from '../../../modal/help-modal';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { clinical6 } from 'clinical6';
import { AppConfig } from '../../../config/app.config';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../../../utils.service';

@Component({
  selector: 'flowstep-help',
  templateUrl: 'flowstep-help.html',
})

export class FlowStepHelpPage extends FlowStepPage {
  baseUrl: string = clinical6.apiBaseUrl;
  showHelpButton: boolean;
  additionalButtons: Array<number>;
  prevNextButtons: Array<number>;
  showInputs: boolean;
  helpPage: any;

  // item = { type: 'none', endPoint: ''};

  constructor(
    public utilsSvc: UtilsService,
    public navParams: NavParams,
    public nav: NavController,
    public flowCtlr: FlowService,
    public modalCtrl: ModalController,
    public sanitizer?: DomSanitizer
    ) {
    super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);
    this.showHelpButton = this.step.help_subtitle || this.step.help_text;

    this.showInputs = false;
    if (this.inputs.length > 0) {
      this.showInputs = true;
    }

    this.prevNextButtons = new Array();
    this.additionalButtons = new Array();

    // Go through step.paths and store the index values for previous / next buttons & additional buttons in their respective arrays
    for (var i = 0; i < this.step.paths.length; i++) {
      if (this.step.paths[i].button_name.toLowerCase() === 'next' || this.step.paths[i].button_name.toLowerCase() === 'prev'
        || this.step.paths[i].button_name.toLowerCase() === 'previous'
        || this.step.paths[i].button_name.toLowerCase() === 'continue' || this.step.paths[i].button_name.toLowerCase() === 'complete') {
        this.prevNextButtons.push(i);
      } else {
        this.additionalButtons.push(i);
      }
    }

    console.log('Additional Buttons len: ' + this.additionalButtons.length);

  }

  ionViewDidLoad() {
  }

  showHelp() {
    let modal = this.modalCtrl.create(HelpModalPage, {
      title: this.step.help_title || 'Information',
      subTitle: this.step.help_subtitle,
      helpText: this.step.help_text || `No help text exists for this element.`,
      color: 'help'
    }, { showBackdrop: true });

    modal.onDidDismiss(action => {
      if (action === 'contact') {
        this.goToContactPage();
      }
    });

    modal.present();
  }

  goToContactPage() {
    this.nav.push(this.helpPage, { from: '' }, AppConfig.animationOpt);
  }
}


const DEMOUSERINFO: any = {
  'title': 'Dr. (example)',
  'first_name': 'Pat (example)',
  'last_name': 'Cooper (example)',
  'phone': '619-323-3456 (example)',
  'email': 'pcooper@lojollaclinic.com (example)',
  'role': 'Physician (example)'
};