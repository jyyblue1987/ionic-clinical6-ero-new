import { ElementRef } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
export declare abstract class BasePage {
    platform: Platform;
    elementRef: ElementRef;
    navCtrl: NavController;
    inputItems: any[];
    abstract doneCallback(): any;
    constructor(platform?: Platform, elementRef?: ElementRef, navCtrl?: NavController);
    ngOnInit(): void;
    handleKey(event: KeyboardEvent): void;
    goBack(): void;
}
