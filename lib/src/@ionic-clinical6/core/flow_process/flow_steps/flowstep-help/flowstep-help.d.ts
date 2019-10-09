import { NavController, ModalController, NavParams } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../utils.service';
export declare class FlowStepHelpPage extends FlowStepPage {
    utilsSvc: UtilsService;
    navParams: NavParams;
    nav: NavController;
    flowCtlr: FlowService;
    modalCtrl: ModalController;
    sanitizer: DomSanitizer;
    baseUrl: string;
    showHelpButton: boolean;
    additionalButtons: Array<number>;
    prevNextButtons: Array<number>;
    showInputs: boolean;
    helpPage: any;
    constructor(utilsSvc: UtilsService, navParams: NavParams, nav: NavController, flowCtlr: FlowService, modalCtrl: ModalController, sanitizer?: DomSanitizer);
    ionViewDidLoad(): void;
    showHelp(): void;
    goToContactPage(): void;
}
