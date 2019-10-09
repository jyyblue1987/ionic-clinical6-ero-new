import { ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, Platform, Loading, LoadingController } from 'ionic-angular';
import { BasePage } from '../base/base-page';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
export declare class EnterEmailPage extends BasePage {
    loadingController: LoadingController;
    loginSvc: AppLoginService;
    nav: NavController;
    translator: TranslatorService;
    alertCtrl: AlertController;
    params: NavParams;
    platform: Platform;
    el: ElementRef;
    navCtrl: NavController;
    /** @type {string} - Email input model */
    email: string;
    /** @type {boolean} - Enables/disables the ion-spinner if the email-form is not ready */
    working: boolean;
    /** @type {boolean} - Prevents the function is called more times in case of multiple click events */
    isNavigating: boolean;
    /** @type {Loading} - Shows a loading indicator  */
    loader: Loading;
    constructor(loadingController: LoadingController, loginSvc: AppLoginService, nav: NavController, translator: TranslatorService, alertCtrl: AlertController, params: NavParams, platform: Platform, el: ElementRef, navCtrl: NavController);
    goBack(): void;
    /**
     * This is called when the user clicks on "LOGIN" or equivalent action
     */
    doneCallback(): Promise<void>;
    goToCodeVerificationPage(): void;
    goToEnterPINPage(): void;
    showInvaliEmailError(): void;
    showDisabledUserError(): void;
    handleKey(event: KeyboardEvent): void;
    showError(title: string, errorText: string): void;
}
