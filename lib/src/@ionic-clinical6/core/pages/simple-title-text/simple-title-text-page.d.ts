import { ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BasePage } from '../../pages/base/base-page';
export declare class SimpleTitleTextPage extends BasePage {
    navParams: NavParams;
    nav: NavController;
    sanitizer: DomSanitizer;
    platform: Platform;
    elementRef: ElementRef;
    navbarTitle: string;
    backButtonText: string;
    themeColor: string;
    titleTextArray: any;
    constructor(navParams: NavParams, nav: NavController, sanitizer?: DomSanitizer, platform?: Platform, elementRef?: ElementRef);
    getTrustedHTML(text: string): SafeHtml;
    onError(message: any): void;
    doneCallback(): void;
}
