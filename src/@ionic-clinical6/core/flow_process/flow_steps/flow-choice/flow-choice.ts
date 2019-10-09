import { Component } from '@angular/core';
import { Modal, NavController, NavParams, ModalController } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { AppConfig } from '../../../config/app.config';
import { UtilsService } from '../../../utils.service';

@Component({
  selector: 'flow-choice',
  templateUrl: 'flow-choice.html',
})
export class FlowChoicePage extends FlowStepPage {
  themeColor: string;

  constructor(public utilsSvc: UtilsService,
              public navParams: NavParams,
              public nav: NavController,
              public flowCtlr: FlowService,
              public modalCtrl: ModalController) {
    super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);
    this.themeColor = this.navParams.get('themeColor') || '#4F2683'; // primary color TODO, do we have a global variable for it?
    this.setupOrManage = 'setup';
    if (AppConfig.demoMode) {
      // add here code for demo mode
    }
  }

  ngOnInit() {
  }

  gotoFlow(button_name: any) {
    this.step.flow.reset();
    return super.gotoFlow(button_name);
  }

}
