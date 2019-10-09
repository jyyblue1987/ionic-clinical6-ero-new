import { ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../utils.service';
export declare class FlowStepHelpCardPage extends FlowStepPage {
    utilsSvc: UtilsService;
    navParams: NavParams;
    nav: NavController;
    flowCtlr: FlowService;
    modalCtrl: ModalController;
    platform: Platform;
    elementRef: ElementRef;
    sanitizer: DomSanitizer;
    baseUrl: string;
    showHelpButton: boolean;
    helpPage: any;
    constructor(utilsSvc: UtilsService, navParams: NavParams, nav: NavController, flowCtlr: FlowService, modalCtrl: ModalController, platform?: Platform, elementRef?: ElementRef, sanitizer?: DomSanitizer);
    showHelp(): void;
    goToContactPage(): void;
    hasSingleTextarea(): boolean;
}
