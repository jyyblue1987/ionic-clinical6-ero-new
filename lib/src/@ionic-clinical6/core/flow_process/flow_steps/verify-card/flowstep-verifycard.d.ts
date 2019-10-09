import { NavController, ModalController, NavParams } from 'ionic-angular';
import { VerifyItem } from '../../items/verify-card/verify-card.component';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { UtilsService } from '../../../utils.service';
export declare class FlowStepVerifyCardPage extends FlowStepPage {
    utilsSvc: UtilsService;
    navParams: NavParams;
    navController: NavController;
    flowCtlr: FlowService;
    modalCtrl: ModalController;
    verifyInfoList: VerifyItem[];
    constructor(utilsSvc: UtilsService, navParams: NavParams, navController: NavController, flowCtlr: FlowService, modalCtrl: ModalController);
}
