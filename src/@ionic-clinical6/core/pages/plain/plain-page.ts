import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController, AlertController } from 'ionic-angular';

import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { AppConfig } from '../../config';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';

@Component({
  selector: 'plain-page',
  templateUrl: 'plain-page.html'
})
export class PlainPage {
    title: string = "";
    _body: string = "";
    permLink: string;
    isLoading: boolean = true;
    constructor(
      public translator: TranslatorService,
      public appConfig: AppConfig,
      public c6Service: Clinical6Service,
      public nav: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public alertCtrl: AlertController,
      public _sanitizer: DomSanitizer) {

      if (navParams.get('page')) {
        this.title = navParams.get('page').title || "";
        this._body = navParams.get('page').body_content || "";
      }
      this.permLink = navParams.get('permanent_link');

    }
    public get body(): SafeHtml {
       return this._sanitizer.bypassSecurityTrustHtml(this._body);
    }

    ngOnInit() {
        if (this.permLink) this.getContents();
    }
    getContents() {
      if (this.appConfig[this.permLink]) {
        this.isLoading = false;
        this.parseRemoteContents();
        return;
      }
      
      this.isLoading = true;
      this.c6Service.getDynamicContent(this.permLink)
      .then( result => {
        this.retrievedContentCallback(result);

        this.isLoading = false;
        this.parseRemoteContents();


        }).catch(e => {
        this.isLoading = false;
        console.error('get Plain page error:', e);
        let alert = this.alertCtrl.create({
            title: 'Connection Error',
            subTitle: 'Unable to retrieve information from Server. Please check your connection and try again later.',
            buttons: [
            {
                text: 'Ok',
                handler: data => {
                this.nav.pop();
                }
            }
            ]
        });
        alert.present();
        });
    }
    /**
     * This Callback is called when the dynamic content is retrieved.
     * Override this in case you need to customize data retrieval/storage
     * @param result
     */
    retrievedContentCallback(result: any) {
      this.appConfig[this.permLink] = result[0];      
    };
    
    parseRemoteContents() {
      var contents = this.appConfig[this.permLink];

      this.title = contents.title;


      if (contents['description']) this._body = contents['description'];
      if (contents['richText']) this._body = contents['richText'];
      if (contents['rich_text']) this._body = contents['rich_text'];
      if (contents['rich_description']) this._body = contents['rich_description'];
      if (contents['richDescription']) this._body = contents['richDescription'];
    }
}