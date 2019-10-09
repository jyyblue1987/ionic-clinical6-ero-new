import { NavController, ViewController, LoadingController, ModalController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../clinical6.service';
import { MenuService } from './menu.service';
import { AppMenu, Flow } from 'clinical6';
export declare class SlidingMenuSubCategoryPage {
    captiveReach: Clinical6Service;
    nav: NavController;
    loader: LoadingController;
    modalCtrl: ModalController;
    viewCtrl: ViewController;
    navParams: NavParams;
    menuService: MenuService;
    menuCtrl: MenuController;
    alertCtrl: AlertController;
    pages: Array<AppMenu>;
    menuItem: AppMenu;
    loadingCtrl: any;
    loadAsDynamicContent: boolean;
    loadingProcess: boolean;
    loadFlowProcessAction: string;
    constructor(captiveReach: Clinical6Service, nav: NavController, loader: LoadingController, modalCtrl: ModalController, viewCtrl: ViewController, navParams: NavParams, menuService: MenuService, menuCtrl?: MenuController, alertCtrl?: AlertController);
    openPage(menuItem: AppMenu): void;
    /**
     * This is called in case a flow is completed
     * it should be overridden whenever needed
     * @param flow
     */
    flowCompleteCallback(flow: Flow): void;
    goToFlow(menuItem: any): void;
    showError(title: string, errorText: string): void;
    getImage(page: any): string;
}
