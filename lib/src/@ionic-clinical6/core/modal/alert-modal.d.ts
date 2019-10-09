import { NavParams, ViewController } from 'ionic-angular';
export declare class AlertModalPage {
    params: NavParams;
    viewCtrl: ViewController;
    type: string;
    title: string;
    subTitle: string;
    body: string;
    pageRef: any;
    dismissCallback: any;
    newRoot: any;
    buttons: Array<any>;
    self: AlertModalPage;
    static contactPage: any;
    iconClass: {
        'type_error': string;
        'type_info': string;
    };
    constructor(params: NavParams, viewCtrl: ViewController);
    dismiss(): void;
    contact(): void;
    /**
     * Show a Modal alert popup
     * @param {string} type Defines default values for title, etc...
     *                      allowed values: 'type_error', 'type_info'
     * @param {string}    title
     * @param {string}    subTitle
     * @param {string}    body
     * @param {function}  cancelCallback
     * @param {any}       newRoot
     */
    static show(context: any, config?: {
        type?: string;
        title?: string;
        subTitle?: string;
        body?: string;
        cancelCallback?: any;
        newRoot?: any;
        buttons?: Array<any>;
    }): void;
}
