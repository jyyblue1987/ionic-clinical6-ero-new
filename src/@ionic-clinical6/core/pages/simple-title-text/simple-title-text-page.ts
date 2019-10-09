import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NavController, NavParams, Loading, ModalController, Platform } from 'ionic-angular';

import { BasePage } from '../../pages/base/base-page';

@Component({
  selector: 'simple-title-text-page',
  templateUrl: 'simple-title-text-page.html',
})
export class SimpleTitleTextPage extends BasePage {

  navbarTitle: string;
  backButtonText: string;
  themeColor: string;
  titleTextArray: any;

  constructor(
    public navParams: NavParams,
    public nav: NavController,
    public sanitizer?: DomSanitizer,
    public platform?: Platform,
    public elementRef?: ElementRef) {
    super(platform, elementRef);

    this.themeColor = this.navParams.get('themeColor') || '';

    this.navbarTitle = this.navParams.get('navbarTitle') || '';
    this.backButtonText = this.navParams.get('backButtonText') || '';
    this.titleTextArray = this.navParams.get('titleTextArray') || '';

  }

  getTrustedHTML(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
  onError(message: any) {

  }

  doneCallback() {

  }
}