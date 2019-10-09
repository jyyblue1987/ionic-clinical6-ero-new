import { Renderer } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { FlowService } from '../../flow.service';
import { FlowStepPage } from '../flowstep';
import { UtilsService } from '../../../utils.service';
export declare class FlowIntroPage extends FlowStepPage {
    utilsSvc: UtilsService;
    navParams: NavParams;
    nav: NavController;
    flowCtlr: FlowService;
    modalCtrl: ModalController;
    private renderer;
    private _sanitizer;
    flow: any;
    step: any;
    navbarTitle: string;
    actionLabel: string;
    videoUrl: SafeResourceUrl;
    previewImgUrl: SafeResourceUrl;
    constructor(utilsSvc: UtilsService, navParams: NavParams, nav: NavController, flowCtlr: FlowService, modalCtrl: ModalController, renderer: Renderer, _sanitizer: DomSanitizer);
    readonly iframeUrl: SafeResourceUrl;
    readonly richText: SafeHtml;
    doBegin(): void;
    playVideo(): void;
}
