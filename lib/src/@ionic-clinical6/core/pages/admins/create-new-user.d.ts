import { ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
export declare class CreateNewUserPage extends BasePage {
    loginSvc: AppLoginService;
    nav: NavController;
    alertCtrl: AlertController;
    params: NavParams;
    platform: Platform;
    el: ElementRef;
    navCtrl: NavController;
    private translator;
    email: string;
    pin: string;
    account_name: string;
    working: boolean;
    isNavigating: boolean;
    constructor(loginSvc: AppLoginService, nav: NavController, alertCtrl: AlertController, params: NavParams, platform: Platform, el: ElementRef, navCtrl: NavController, translator: TranslatorService);
    /**
     * This is called when the user clicks on "LOGIN" or equivalent action
     */
    doneCallback(): void;
    showAlert(title: string, msg: string): void;
}
