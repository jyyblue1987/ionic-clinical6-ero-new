import { NavController, NavParams } from 'ionic-angular';
import { ViewController, AlertController } from 'ionic-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppConfig } from '../../config';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';
export declare class PlainPage {
    translator: TranslatorService;
    appConfig: AppConfig;
    c6Service: Clinical6Service;
    nav: NavController;
    navParams: NavParams;
    viewCtrl: ViewController;
    alertCtrl: AlertController;
    _sanitizer: DomSanitizer;
    title: string;
    _body: string;
    permLink: string;
    isLoading: boolean;
    constructor(translator: TranslatorService, appConfig: AppConfig, c6Service: Clinical6Service, nav: NavController, navParams: NavParams, viewCtrl: ViewController, alertCtrl: AlertController, _sanitizer: DomSanitizer);
    readonly body: SafeHtml;
    ngOnInit(): void;
    getContents(): void;
    /**
     * This Callback is called when the dynamic content is retrieved.
     * Override this in case you need to customize data retrieval/storage
     * @param result
     */
    retrievedContentCallback(result: any): void;
    parseRemoteContents(): void;
}
