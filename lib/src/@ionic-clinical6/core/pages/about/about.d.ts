import { NavController, NavParams } from 'ionic-angular';
import { ViewController, AlertController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Clinical6Service } from '../../clinical6.service';
import { AppConfig } from '../../config';
import { PlainPage } from '../plain/plain-page';
import { TranslatorService } from '../../translator/translator.service';
export declare class AboutPage extends PlainPage {
    translator: TranslatorService;
    appConfig: AppConfig;
    c6Service: Clinical6Service;
    nav: NavController;
    navParams: NavParams;
    viewCtrl: ViewController;
    alertCtrl: AlertController;
    _sanitizer: DomSanitizer;
    image: any;
    title: string;
    _body: string;
    imageUrl: string;
    offlineContent: boolean;
    permLink: string;
    isLoading: boolean;
    imgLoaded: boolean;
    backgrImage: SafeUrl;
    constructor(translator: TranslatorService, appConfig: AppConfig, c6Service: Clinical6Service, nav: NavController, navParams: NavParams, viewCtrl: ViewController, alertCtrl: AlertController, _sanitizer: DomSanitizer);
    parseRemoteContents(): void;
    imageLoaded(): void;
}
