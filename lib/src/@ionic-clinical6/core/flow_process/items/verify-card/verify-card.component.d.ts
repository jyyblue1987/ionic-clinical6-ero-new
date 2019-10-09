import { NavController, ModalController } from 'ionic-angular';
export interface VerifyItem {
    itemHeader: string;
    itemTitle: string;
    itemDescription: string;
}
export declare class VerifyCardComponent {
    private nav;
    private modalCtrl;
    verify: VerifyItem;
    constructor(nav: NavController, modalCtrl: ModalController);
    ngOnInit(): void;
    showError(errorSubTitle: string, errorText: string): void;
}
