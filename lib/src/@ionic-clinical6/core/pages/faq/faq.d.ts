import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';
export declare class FAQsPage {
    nav: NavController;
    translator: TranslatorService;
    captiveReach: Clinical6Service;
    navParams: NavParams;
    loader: LoadingController;
    alertCtrl: AlertController;
    viewCtrl: ViewController;
    isLoading: boolean;
    image: string;
    title: string;
    faqs: Array<{
        title: string;
        position: number;
        details: string;
        expanded: boolean;
        detailsHeight: string;
    }>;
    permLink: string;
    constructor(nav: NavController, translator: TranslatorService, captiveReach: Clinical6Service, navParams: NavParams, loader: LoadingController, alertCtrl: AlertController, viewCtrl: ViewController);
    ionViewDidLoad(): void;
    toggleDetails(item: {
        title: string;
        position: number;
        details: string;
        expanded: boolean;
        detailsHeight: string;
    }): void;
}
