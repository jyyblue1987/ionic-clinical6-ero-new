import { NavParams, ViewController } from 'ionic-angular';
export declare class HelpModalPage {
    params: NavParams;
    viewCtrl: ViewController;
    title: any;
    subTitle: any;
    body: any;
    buttonName: any;
    color: string;
    iconColorClass: string;
    constructor(params: NavParams, viewCtrl: ViewController);
    dismiss(action: string): void;
}
