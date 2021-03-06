import { ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Alert, Platform } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { DomSanitizer } from '@angular/platform-browser';
import { FlowService } from '../../flow.service';
import { Profile } from 'clinical6';
import { ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { UtilsService } from '../../../utils.service';
export declare class FlowStepSignPage extends FlowStepPage {
    navParams: NavParams;
    nav: NavController;
    flowCtlr: FlowService;
    utilsSvc: UtilsService;
    _alertCtrl: AlertController;
    modalCtrl: ModalController;
    sanitizer: DomSanitizer;
    elementRef: ElementRef;
    renderer: Renderer;
    platform: Platform;
    baseUrl: string;
    signatureUrl: string;
    redirectUrl: string;
    showHelpButton: boolean;
    browser: ThemeableBrowserObject;
    alertView: Alert;
    signatureStatus: string;
    goback: boolean;
    viewLeft: boolean;
    retries: number;
    pinCode: string;
    options: object;
    errorTitle: string;
    errorMissingData: string;
    errorAlreadySigned: string;
    errorOkButton: string;
    constructor(navParams: NavParams, nav: NavController, flowCtlr: FlowService, utilsSvc: UtilsService, _alertCtrl: AlertController, modalCtrl: ModalController, sanitizer: DomSanitizer, elementRef: ElementRef, renderer: Renderer, platform: Platform);
    ionViewDidLoad(): void;
    ionViewDidEnter(): void;
    ionViewWillLeave(): void;
    createAlert(): void;
    requestSignature(profile: Profile): void;
    handleSignatureResponse(ref: any, response: any): void;
    setupOptions(): any;
    launchUrl(url: string): void;
    loadStart(resource: any, ref: any): void;
    loadStop(resource: any): void;
    loadError(resource: any): void;
    exit(resource: any, ref: any): void;
    closePressed(ref: any): void;
    backPressed(ref: any): void;
    gotoNext(ref: any): void;
    goBack(): void;
}
