import { NavController, NavParams } from 'ionic-angular';
import { ViewController, ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';
import { DomSanitizer } from '@angular/platform-browser';
export declare class GlossaryPage {
    nav: NavController;
    translator: TranslatorService;
    captiveReach: Clinical6Service;
    navParams: NavParams;
    loader: LoadingController;
    modalCtrl: ModalController;
    viewCtrl: ViewController;
    _sanitizer: DomSanitizer;
    loadingCtrl: any;
    image: string;
    title: string;
    glossary: Array<{
        title: string;
        position: number;
        details: string;
        expanded: boolean;
        detailsHeight: string;
    }>;
    filteredGlossary: Array<any>;
    permLink: string;
    constructor(nav: NavController, translator: TranslatorService, captiveReach: Clinical6Service, navParams: NavParams, loader: LoadingController, modalCtrl: ModalController, viewCtrl: ViewController, _sanitizer: DomSanitizer);
    resetFilter(): void;
    getItems(ev: any): void;
    toggleDetails(item: {
        title: string;
        position: number;
        details: string;
        expanded: boolean;
        detailsHeight: string;
    }): void;
}
