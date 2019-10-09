import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';

import { AlertModalPage } from '../../modal/alert-modal';
import { AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';

@Component({
  selector: 'faqs-page',
  templateUrl: 'faq.html'
})
export class FAQsPage {
  isLoading: boolean = true;
  image: string;
  title: string;
  faqs: Array<{title: string, position: number, details: string, expanded: boolean, detailsHeight: string}>;
  permLink: string;

  constructor(
    public nav: NavController,
    public translator: TranslatorService,
    public captiveReach: Clinical6Service,
    public navParams: NavParams,
    public loader: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {

    this.title = navParams.get('menu') !== undefined ? navParams.get('menu').title : 'FAQs';
    this.faqs = [];
    this.permLink = navParams.get('permanent_link') || 'faqs';  
  }
  ionViewDidLoad() {
    var thisRef = this;
    this.captiveReach.getDynamicContent(this.permLink)
    .then( result => {
      this.isLoading = false;
      let res = result as Array<any>;
      res.forEach( item => {
        let question = item.title;
        thisRef.faqs.push({
          title: question,
          position: parseInt(item.position),
          details: item.rich_description ? item.rich_description : item.description,
          expanded: false,
          detailsHeight: ''
        });
      });
      // sort results
      thisRef.faqs.sort((a, b) => { return (a.position - b.position); });
    }).catch(e => {
      this.isLoading = false;
      let alert = this.alertCtrl.create({
          title: 'Connection Error',
          subTitle: 'Unable to retrieve information from Server. Please check your network connection and try again later.',
          buttons: [
            {
              text: 'Ok',
              handler: data => {
              }
            }
            ]
        });
        alert.present();
        console.log('get Faqs error:', e);
        this.nav.pop();
        });
  }
  toggleDetails(item: {title: string, position: number, details: string, expanded: boolean, detailsHeight: string}) {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.faqs.forEach((i) => { i.expanded = false; });
      item.expanded = true;

      if (item.detailsHeight === '') {
        // Calculates the appropriate height of the item's DOM element
        // ... by doing some DOM tricks
        document.getElementById('item_' + item.position).style.height = 'auto';
        var height = document.getElementById('item_' + item.position).offsetHeight + 'px';
        document.getElementById('item_' + item.position).style.height = '0px';

        // needed to allow for the renderer to complete all previous commands
        // and render the wanted height properly
        setTimeout(() => { item.detailsHeight = height; }, 50);
      }
    }
  }
}