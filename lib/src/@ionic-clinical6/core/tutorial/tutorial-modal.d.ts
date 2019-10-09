import { ModalController, ViewController } from 'ionic-angular';
export declare class TutorialModalPage {
    modalCtrl: ModalController;
    viewCtrl: ViewController;
    constructor(modalCtrl: ModalController, viewCtrl: ViewController);
    dismiss(action: string): void;
}
