import { ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavController, NavParams, Loading, ModalController, Platform, AlertController } from 'ionic-angular';
import { AppFlowInput } from '../flow_inputs/flow-input.model';
import { FlowService } from '../flow.service';
import { BasePage } from '../../pages/base/base-page';
import { UtilsService } from '../../utils.service';
export declare class FlowStepPage extends BasePage {
    utilsSvc: UtilsService;
    navParams: NavParams;
    nav: NavController;
    flowCtlr: FlowService;
    modalCtrl: ModalController;
    sanitizer: DomSanitizer;
    platform: Platform;
    elementRef: ElementRef;
    alertCtrl: AlertController;
    nextButtonNames: Array<string>;
    prevButtonNames: Array<string>;
    prevButtonName: string;
    nextButtonName: string;
    navbarTitle: string;
    backButtonText: string;
    themeColor: string;
    isAnswerValid: boolean;
    footerPrevNext: boolean;
    showImage: boolean;
    isNavigating: boolean;
    flow: any;
    step: any;
    nextStep: any;
    inputs: AppFlowInput[];
    fields: any;
    inputvalues: any;
    existingId: any;
    setupOrManage: string;
    editing: boolean;
    noDelete: boolean;
    comment: {
        present: boolean;
        body: any;
        custom: boolean;
    };
    loadingCtrl: Loading;
    formValid: boolean;
    previousResponse: any;
    filter: any;
    constructor(utilsSvc: UtilsService, navParams: NavParams, nav: NavController, flowCtlr: FlowService, modalCtrl: ModalController, sanitizer?: DomSanitizer, platform?: Platform, elementRef?: ElementRef, alertCtrl?: AlertController);
    /**
     * This method can be overridden to add additional/different button names
     * that help identifying the Prev-Next layout
     */
    setButtonNames(): void;
    ngOnInit(): void;
    /**
     * Returns the step to go to when clicking on "Next" button
     * Tipically a flow page can have many buttons and possible
     * corresponding next steps. In case of a Prev / Next footer page there
     * is no strict way to determine which one is the 'Prev' step and which the 'Next'.
     * This method can be overridden and it's used to determine the 'Next' step.
     * (The Prev step would presumably be a 'Back' button)
     */
    selectNextStep(): any;
    isThisAPrevNextFooterPage(): boolean;
    ionViewDidLoad(): void;
    checkComments(): Promise<void>;
    handleComment(): void;
    ionViewWillEnter(): Promise<void>;
    goToPage(event: any): void;
    updateControlValue(event: any): void;
    updateFormStatus(valid: any): void;
    doneCallback(): void;
    hasUploadButton(): boolean;
    isThisAManageStep(): any;
    displayAsSpecialButton(path: any): boolean;
    enterEditMode(): void;
    doneEditing(): void;
    doneEditingCallback(): void;
    isThisASingleStep(): boolean;
    getDoneEditLabel(): "Done" | "Next" | "Edit";
    actionDoneEdit(): void;
    isActionBtnDisabled(): boolean;
    getRelatedConditionalSteps(nextPathName: string): any;
    gotoFlowLegacy(name: string, options?: any): void;
    gotoFlow(name: string, options?: any): Promise<boolean | void>;
    showPrevButton(): boolean;
    imgLoaded(): void;
    imgError(event: any): void;
    trustHTML(text: string): SafeHtml;
    onError(message: any): void;
    showError(subtitle: string, body: any): void;
    deleteItem(id?: string): void;
    /**
     * This is to Handle the 'Go' button on the device Keyboard for iOS
     * @param event
     */
    handleGoButton(event: KeyboardEvent): void;
    goBack(): void;
    popStack(): void;
    getIndexByBFS(): void;
}
