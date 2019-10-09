import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController, AlertController } from 'ionic-angular';

import { DomSanitizer, SafeHtml, SafeUrl} from '@angular/platform-browser';
import { Clinical6Service } from '../../clinical6.service';
import { AppConfig } from '../../config';
import { PlainPage }  from '../plain/plain-page';
import { TranslatorService } from '../../translator/translator.service';

@Component({
  selector: 'about-page',
  templateUrl: 'about.html'
})
export class AboutPage extends PlainPage {
    image: any;
    title: string;
    _body: string;
    imageUrl: string;
    offlineContent: boolean;
    permLink: string;
    isLoading: boolean;
    imgLoaded: boolean = false;
    backgrImage: SafeUrl;

    constructor(
      public translator: TranslatorService,
      public appConfig: AppConfig,
      public c6Service: Clinical6Service,
      public nav: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public alertCtrl: AlertController,
      public _sanitizer: DomSanitizer) {
        super (translator, appConfig, c6Service, nav, navParams, viewCtrl, alertCtrl, _sanitizer);

        if (navParams.get('page')) {
          this.image = navParams.get('page').image;
        }

        if (this.image && this.image.url) {
          this.imageUrl = this.image.url;
        }
        else
          this.imageUrl = this.image && this.image.image && this.image.image.main && this.image.image.main.url;
    }

    parseRemoteContents() {
      super.parseRemoteContents();
      var contents = this.appConfig[this.permLink];

      if (contents['image'] && contents['image']['url']) {
        this.imageUrl = contents['image']['url'];
        this.backgrImage = this._sanitizer.bypassSecurityTrustStyle('url("' + this.imageUrl + '")');        
      }
      else if(contents['imageUrl']) {
        this.imageUrl = contents['imageUrl'];
        this.backgrImage = this._sanitizer.bypassSecurityTrustStyle('url("' + this.imageUrl + '")');                
      }

    }

    imageLoaded() {
      this.imgLoaded = true;
    }
}