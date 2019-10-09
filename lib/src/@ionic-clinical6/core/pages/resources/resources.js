var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, ModalController, NavParams } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
import { PlainPage } from '../plain/plain-page';
import { AboutPage } from '../about/about';
import { FAQsPage } from '../faq/faq';
import { GlossaryPage } from '../glossary/glossary';
import { AlertModalPage } from '../../modal/alert-modal';
import { AppConfig } from '../../config';
let ResourcesPage = class ResourcesPage {
    constructor(captiveReach, nav, loader, modalCtrl, viewCtrl, navParams) {
        this.captiveReach = captiveReach;
        this.nav = nav;
        this.loader = loader;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        if (this.navParams.get('menu') && this.navParams.get('menu')['subcategories']) {
            this.pages = this.navParams.get('menu')['subcategories'];
        }
    }
    ionViewDidLoad() {
        // shows a loading control while data is being gathered
        this.loadingCtrl = this.loader.create({ content: 'Loading...' });
        this.loadingCtrl.present();
        this.loadResources();
    }
    loadResources() {
        var thisRef = this;
        this.pages = [];
        this.captiveReach.getDynamicContent('resources')
            .then(result => {
            thisRef.pages.push.apply(thisRef.pages, Array.from(result, (v) => {
                var dest;
                var params;
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
                }
                ;
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
                AlertModalPage.show(thisRef, {
                    type: 'type_error',
                    body: 'Please make sure you have a working network connection.',
                    subTitle: 'Unable to retrieve data from server'
                });
            });
            console.log('get Resources error: ' + e);
        });
    }
    goToPage(res) {
        this.nav.push(res.destination, { page: res.item }, AppConfig.animationOpt);
    }
};
ResourcesPage = __decorate([
    Component({
        selector: 'resources-page',
        template: `
    <!--<ion-header>
      <ion-toolbar no-padding no-margin color="primary" class="header-toolbar">
        <ion-buttons left>
          <button ion-button no-padding (click)="goBack()" class="bar-button">
            <ion-icon name="arrow-back"></ion-icon>
            <span class="button-text">Home</span>
          </button>
        </ion-buttons>

        <ion-title>Resources</ion-title>
      </ion-toolbar>
    </ion-header>-->
    <ion-header>
      <app-toolbar [title]="'Resources'" [backLabel]="'Home'"
                  layout="plain"
                 ></app-toolbar>
    </ion-header>

    <ion-content no-padding (click)="return;">
      <ion-list>
        <button ion-button clear full *ngFor="let page of pages" (click)="goToPage(page)" class="list-button">
          <div class="text">{{page.title}}</div>
          <div class="action-label"><div class="app-p6-icon-chevron-right action-arrow"></div></div>
        </button>
      </ion-list>
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [Clinical6Service,
        NavController,
        LoadingController,
        ModalController,
        ViewController,
        NavParams])
], ResourcesPage);
export { ResourcesPage };

//# sourceMappingURL=resources.js.map
