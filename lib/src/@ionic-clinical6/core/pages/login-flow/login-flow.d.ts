import { ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';
import { FlowStepPage } from '../../flow_process/flow_steps/flowstep';
import { DomSanitizer } from '@angular/platform-browser';
import { FlowService } from '../../flow_process/flow.service';
import { TranslatorService } from '../../translator/translator.service';
import { AppLoginService } from '../../login.service';
import { UtilsService } from '../../utils.service';
export declare class LoginFlowPage extends FlowStepPage {
    utilsSvc: UtilsService;
    loginSvc: AppLoginService;
    translator: TranslatorService;
    navParams: NavParams;
    nav: NavController;
    flowCtlr: FlowService;
    modalCtrl: ModalController;
    sanitizer: DomSanitizer;
    platform: Platform;
    elementRef: ElementRef;
    alertCtrl: AlertController;
    /** @type {boolean} showBackButton - shows the back button on the toolbar if it is true **/
    showBackButton: boolean;
    /** @type {any} loader - shows a spinner **/
    loader: any;
    /** @type {any} alert - variable to handle the Alert Controller **/
    alert: any;
    constructor(utilsSvc: UtilsService, loginSvc: AppLoginService, translator: TranslatorService, navParams: NavParams, nav: NavController, flowCtlr: FlowService, modalCtrl: ModalController, sanitizer: DomSanitizer, platform: Platform, elementRef: ElementRef, alertCtrl: AlertController);
    ionViewWillEnter(): Promise<void>;
    /**
     * @function goNext - Executes the callback function for the active path of the Flow Step and goes to the next Flow Step if it exists
     *
     * @param {String} input_id
    **/
    goNext(button: any, options?: any): Promise<boolean | void>;
    /**
     * helper method to retrieve the input value
     *
     * @param {String} input_id
    **/
    inputValue(input_id: string): any;
    /**
     * @param {any} event - button object passed from nested component in case of 'goToPage' event
     *
     * @example <caption> Example of link button </caption>
     * {
     *    // Flow Step attributes,
     *    'inputs': [
     *      {
     *        'id': 'pin',
     *        'storage_attribute': 'pin',
     *        // ...
     *        'attribute' : {
     *          'link_button': 'Forgot Pin', // it must be equal to the "button_name" attribute of the path
     *        }
     *      }
     *    ],
     *    'paths': [
     *       {
     *          'button_name': 'Forgot Pin', // it must be equal to the "attribute.link_button" attribute of the input
     *          'callback': null,
     *          'capture': false,
     *          'last': true,
     *          'is_link_button': true // it must be true
     *          'steps': [
     *             {
     *                'step': 'forgot-pin',
     *                'conditions': []
     *             }
     *          ]
     *       }
     *   ]
     * }
    **/
    goToPage(event: any): void;
    /**
     * @callback checkEmail       - Callback to check registration status of the user
     *
     * @return {Promise<boolean>} - Promise that returns false in case of success
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'checkEmail' callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'NEXT',
     *        'callback': 'checkEmail',
     *        'capture': false,
     *        'last': false,
     *        'is_link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    checkEmail(): Promise<boolean>;
    /**
     * @callback checkCode        - Callback to check the verification code and call the 'checkCodeSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the verification code is valid
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'checkCode' callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'UNLOCK APP',
     *        'callback': 'checkCode',
     *        'capture': false,
     *        'last': true,
     *        'link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    checkCode(): Promise<boolean>;
    /**
     * @callback checkPin         - Callback to start the login procedure and call the 'loginSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the New Pin has been reset succesfully
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'checkPin' callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'SEND',
     *        'callback': 'checkPin',
     *        'capture': false,
     *        'last': true,
     *        'is_link_button': null,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    checkPin(): Promise<any>;
    /**
     * @callback forgotPin        - Callback to start the pin/password reset procedure
     *
     * @return {Promise<boolean>} - Promise that returns false if the activation-code has been sent succesfully to the email provided
     * @throws {Error}            - If missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'forgotPin' Callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'SEND',
     *        'callback': 'forgotPin',
     *        'capture': false,
     *        'last': false,
     *        'is_link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    forgotPin(): Promise<boolean>;
    /**
     * @callback resetPin         - Callback to reset the pin/password and call the 'loginSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the New Pin has been reset succesfully
     * @throws {Error}            - If the pins mismatch or missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'resetPin' Callback example </caption>
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'UNLOCK APP',
     *        'callback': 'resetPin',
     *        'capture': false,
     *        'last': true,
     *        'is_link_button': false,
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    resetPin(): Promise<boolean>;
    /**
     * @callback createPin        - Callback to create a new Pin and call the 'createPinSuccess' callback in case of success
     *
     * @return {Promise<boolean>} - Promise that returns true if the new Pin has been created succesfully
     * @throws {Error}            - If the pins mismatch or missing/invalid required parameters
     *
     * @example <caption> Flow Step - 'createPin' callback example </caption>
     *
     * {
     *   // ...Flow Step attributes,
     *  'paths': [
     *      {
     *        'button_name': 'UNLOCK APP',
     *        'callback': 'createPin',
     *        'capture': false,
     *        'last': true,
     *        'is_link_button': false
     *        'steps': []
     *     }
     *   ]
     * }
    **/
    createPin(): Promise<boolean>;
    /**
     * @callback loginSuccess - Callback that needs to be overwritten from the child component after login success
    **/
    loginSuccess(): Promise<void>;
    /**
     * @callback checkCodeSuccess - Callback that needs to be overwritten from the child component after verification-code success
    **/
    checkCodeSuccess(): Promise<void>;
    /**
     * @callback createPinSuccess - Callback that needs to be overwritten from the child component after resetting pin/password success
    **/
    createPinSuccess(): Promise<void>;
    /**
     *  Shows a Popup Error with custom title, message and buttons and throws an error
     *
     * @param {string} type - Parameters used to get the alert type from the FlowStep alerts attribute
     * @throws {Error}      - If the Promise fails
     *
     * @example <caption> 'Invalid PIN' Alert example </caption>
     * 'alerts': {
     *   'invalid': {
     *      'title': 'Invalid PIN',
     *      'message': 'Please check your credentials and try again',
     *      'buttons': null
     *   },
     * }
    **/
    throwError(type: any): Promise<Error>;
    /**
     *  Shows a Popup with custom title, message and buttons
     *
     * @param {string} title  - Title to use in the Popup
     * @param {string} msg    - Message to use in the Popup
     * @param {Array} buttons - An array of optional buttons to use in the Popup
     * @return {Promise<any>} - Returns a Promise after the button is clicked. Defaults to 'false' for 'Cancel' button, 'true' otherwise
     *
     * @example <caption> 'Forgot Pin' Popup example </caption>
     * 'alerts': {
     *   'reset_pin': {
     *       'title': 'Reset Password',
     *       'message': 'Would you like to reset <br>your 6 digit Password?',
     *       'buttons': [
     *         {
     *           'text': 'Cancel',
     *           'handler': false
     *         },
     *         {
     *           'text': 'OK',
     *           'handler': true
     *         }
     *       ]
     *   },
     * }
    **/
    showPopup(title: string, msg: string, buttons?: Array<any>): Promise<any>;
    displayAsSpecialButton(path: any): boolean;
}
