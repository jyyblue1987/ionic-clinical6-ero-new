/* globals Clinical6 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Modal, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { HelpModalPage } from '../../../modal/help-modal';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { clinical6 } from 'clinical6';
import { AppConfig } from '../../../config/app.config';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../../../utils.service';

@Component({
  selector: 'flowstep-helpcard',
  templateUrl: 'flowstep-helpcard.html'
})
export class FlowStepHelpCardPage extends FlowStepPage {
  baseUrl: string = clinical6.apiBaseUrl;
  showHelpButton: boolean;
  helpPage: any;


  constructor(
    public utilsSvc: UtilsService,
    public navParams: NavParams,
    public nav: NavController,
    public flowCtlr: FlowService,
    public modalCtrl: ModalController,
    public platform?: Platform,
    public elementRef?: ElementRef,
    public sanitizer?: DomSanitizer) {

    super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);
    this.showHelpButton = this.step.help_subtitle || this.step.help_text;
    // this.step.index = this.step.flow.steps.findIndex(step => step.id === this.step.id);
  }

  showHelp() {
    let modal = this.modalCtrl.create(HelpModalPage, {
      title: this.step.help_title || 'Help',
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
  hasSingleTextarea() {
    return ((this.step.inputs.length === 1) &&
            (this.step.inputs[0].question_type === 'input') &&
            (this.step.inputs[0].style === 'text_area'));
  }
}