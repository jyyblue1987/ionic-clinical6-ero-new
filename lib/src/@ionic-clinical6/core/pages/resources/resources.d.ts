import { NavController, ViewController, LoadingController, ModalController, NavParams } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
export declare class ResourcesPage {
    private captiveReach;
    private nav;
    private loader;
    modalCtrl: ModalController;
    private viewCtrl;
    navParams: NavParams;
    pages: Array<{
        title: string;
        destination: any;
        item: any;
        position: any;
    }>;
    loadingCtrl: any;
    constructor(captiveReach: Clinical6Service, nav: NavController, loader: LoadingController, modalCtrl: ModalController, viewCtrl: ViewController, navParams: NavParams);
    ionViewDidLoad(): void;
    loadResources(): void;
    goToPage(res: any): void;
}
