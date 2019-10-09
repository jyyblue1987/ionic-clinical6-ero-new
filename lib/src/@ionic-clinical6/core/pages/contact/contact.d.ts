import { NavController, NavParams, Platform } from 'ionic-angular';
import { TranslatorService } from '../..';
export declare class ContactPage {
    platform: Platform;
    translator: TranslatorService;
    nav: NavController;
    navParams: NavParams;
    permLink: string;
    contactInformations: {};
    techInformations: {};
    constructor(platform: Platform, translator: TranslatorService, nav: NavController, navParams: NavParams);
    ngOnInit(): Promise<void>;
    fetchTrialSite(): Promise<void>;
    fillInformations(site: any): Promise<void>;
    drivingDirections(): void;
    translate(string_key: any): any;
}
