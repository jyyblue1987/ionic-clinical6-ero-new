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
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';
let FAQsPage = class FAQsPage {
    constructor(nav, translator, captiveReach, navParams, loader, alertCtrl, viewCtrl) {
        this.nav = nav;
        this.translator = translator;
        this.captiveReach = captiveReach;
        this.navParams = navParams;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.isLoading = true;
        this.title = navParams.get('menu') !== undefined ? navParams.get('menu').title : 'FAQs';
        this.faqs = [];
        this.permLink = navParams.get('permanent_link') || 'faqs';
    }
    ionViewDidLoad() {
        var thisRef = this;
        this.captiveReach.getDynamicContent(this.permLink)
            .then(result => {
            this.isLoading = false;
            let res = result;
            res.forEach(item => {
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
    toggleDetails(item) {
        if (item.expanded) {
            item.expanded = false;
        }
        else {
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
};
FAQsPage = __decorate([
    Component({
        selector: 'faqs-page',
        template: `
    <ion-header>
      <app-toolbar [title]="title" [backLabel]="translator.getInnerHTML('BACK') || 'Back'"
                  layout="plain"
                 ></app-toolbar>
    </ion-header>

    <ion-content no-padding >
        <div class="spinner-overlay" *ngIf="isLoading"><ion-spinner></ion-spinner></div>

        <ion-list>
            <div *ngFor="let item of faqs" >
                <button ion-button clear full 
                        (click)="toggleDetails(item)" 
                        class="list-button" [class.expanded]="item.expanded">
                    <div class="text">{{item.title}}</div>
                    <div class="action-label">
                        <div class="app-p6-icon-chevron-right action-arrow" 
                            [class.turned]="item.expanded"></div>
                        </div>
                </button>
                <div id="item_{{item.position}}" 
                    [style.height]="item.expanded?item.detailsHeight:'0px'"
                    class="details">
                    <div padding [innerHtml]="item.details">
                    </div>
                </div>
            </div>
        </ion-list>
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [NavController,
        TranslatorService,
        Clinical6Service,
        NavParams,
        LoadingController,
        AlertController,
        ViewController])
], FAQsPage);
export { FAQsPage };

//# sourceMappingURL=faq.js.map
