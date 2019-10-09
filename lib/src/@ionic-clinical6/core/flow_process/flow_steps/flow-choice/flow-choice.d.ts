import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { UtilsService } from '../../../utils.service';
export declare class FlowChoicePage extends FlowStepPage {
    utilsSvc: UtilsService;
    navParams: NavParams;
    nav: NavController;
    flowCtlr: FlowService;
    modalCtrl: ModalController;
    themeColor: string;
    constructor(utilsSvc: UtilsService, navParams: NavParams, nav: NavController, flowCtlr: FlowService, modalCtrl: ModalController);
    ngOnInit(): void;
    gotoFlow(button_name: any): Promise<boolean | void>;
}
