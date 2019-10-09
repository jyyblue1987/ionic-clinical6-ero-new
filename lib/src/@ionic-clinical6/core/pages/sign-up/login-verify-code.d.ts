import { ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { TranslatorService } from '../../translator/translator.service';
import { Clinical6Service } from '../../clinical6.service';
import { Keyboard } from '@ionic-native/keyboard';
import { AppLoginService } from '../../login.service';
export declare class VerifyCodePage extends BasePage {
    loadingController: LoadingController;
    loginSvc: AppLoginService;
    translator: TranslatorService;
    platform: Platform;
    elementRef: ElementRef;
    c6LibService: Clinical6Service;
    alertCtrl: AlertController;
    modalCtrl: ModalController;
    params: NavParams;
    nav: NavController;
    keyboard: Keyboard;
    isNavigating: boolean;
    PIN_CODE_DIGITS: number;
    userId: string;
    userCode: string;
    doValidatePIN: boolean;
    needConfirmation: boolean;
    loader: Loading;
    constructor(loadingController: LoadingController, loginSvc: AppLoginService, translator: TranslatorService, platform: Platform, elementRef: ElementRef, c6LibService: Clinical6Service, alertCtrl: AlertController, modalCtrl: ModalController, params: NavParams, nav: NavController, keyboard: Keyboard);
    ngOnInit(): void;
    ionViewDidLoad(): void;
    doneCallback(): Promise<void>;
    /**
     * This is to be overridden by derived classes
     * put all code in case of confirmation success here
     */
    confirmationSuccess(): void;
    canContinue(): boolean;
    validateAlertPIN(): boolean;
    handleKey(event: any): void;
    goBack(): void;
    showWelcomeAlert(): void;
}
