import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, ModalController, NavParams } from 'ionic-angular';

import { Clinical6Service } from '../../clinical6.service';

import { PlainPage } from '../plain/plain-page';
import { AboutPage } from '../about/about';
import { FAQsPage } from '../faq/faq';
import { GlossaryPage } from '../glossary/glossary';

import { AlertModalPage } from '../../modal/alert-modal';
import { AppConfig } from '../../config';

@Component({
  selector: 'resources-page',
  templateUrl: 'resources.html'
})
export class ResourcesPage {
    pages: Array<{title: string, destination: any, item: any, position: any}>;
    loadingCtrl: any;

    constructor(private captiveReach: Clinical6Service,
                private nav: NavController,
                private loader: LoadingController,
                public modalCtrl: ModalController,
                private viewCtrl: ViewController,
                public navParams: NavParams) {

        if (this.navParams.get('menu') && this.navParams.get('menu')['subcategories']) {
            this.pages = this.navParams.get('menu')['subcategories'];
        }
    }
    ionViewDidLoad() {
        // shows a loading control while data is being gathered
        this.loadingCtrl = this.loader.create({content: 'Loading...'});
        this.loadingCtrl.present();

        this.loadResources();
    }

    loadResources() {
        var thisRef = this;
        this.pages = [];

        this.captiveReach.getDynamicContent('resources')
            .then(result => {
                thisRef.pages.push.apply( thisRef.pages, Array.from(result as Array<any>, (v) => {
                    var dest: any;
                    var params: any;
                    switch (v.api_key) {
                            case 'about_page':
                                dest = AboutPage;
                                break;
                            case 'glossary_page':
                                dest = GlossaryPage;
                                break;
                            case 'faqs_page':
                                dest = FAQsPage;
                                break;
                            default:
                                dest = PlainPage;
                                break;
                    };
                    return {
                                title: v.title,
                                destination: dest,
                                item: v,
                                position: parseInt(v.position)
                    };
                }));
                thisRef.pages.sort((a, b) => { return (a.position - b.position); });

                thisRef.loadingCtrl.dismiss();
            }).catch(e => {
                thisRef.loadingCtrl.dismiss()
                    .then(() => {
                         AlertModalPage.show(
                                thisRef, {
                                            type: 'type_error',
                                            body: 'Please make sure you have a working network connection.',
                                            subTitle: 'Unable to retrieve data from server' });
                    });
                console.log('get Resources error: ' + e);
            });
    }
    goToPage(res: any) {
        this.nav.push(res.destination, {page: res.item}, AppConfig.animationOpt);
    }
}