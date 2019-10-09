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
import { ViewController, ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
import { AlertModalPage } from '../../modal/alert-modal';
import { TranslatorService } from '../../translator/translator.service';
import { DomSanitizer } from '@angular/platform-browser';
let GlossaryPage = class GlossaryPage {
    constructor(nav, translator, captiveReach, navParams, loader, modalCtrl, viewCtrl, _sanitizer) {
        this.nav = nav;
        this.translator = translator;
        this.captiveReach = captiveReach;
        this.navParams = navParams;
        this.loader = loader;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this._sanitizer = _sanitizer;
        // shows a loading control while data is being gathered
        this.loadingCtrl = this.loader.create({ content: 'Loading...' });
        this.loadingCtrl.present();
        this.title = navParams.get('menu') && navParams.get('menu').title || 'glossary';
        this.glossary = [];
        this.permLink = navParams.get('permanent_link') || 'glossary';
        var thisRef = this;
        this.captiveReach.getDynamicContent(this.permLink)
            .then(result => {
            thisRef.loadingCtrl.dismiss();
            let res = result;
            res.forEach(item => {
                let maxDisplayedChars = 40;
                let label = (item.title.length > maxDisplayedChars) ?
                    item.title.substr(0, maxDisplayedChars) + '...' :
                    item.title;
                thisRef.glossary.push({
                    title: label,
                    position: parseInt(item.position),
                    details: item.description || item.rich_text,
                    expanded: false,
                    detailsHeight: ''
                });
            });
            thisRef.glossary.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
            this.resetFilter();
        }).catch(e => {
            thisRef.loadingCtrl.dismiss()
                .then(() => {
                AlertModalPage.show(thisRef, {
                    type: 'type_error',
                    body: 'Please make sure you have a working network connection.',
                    subTitle: 'Unable to retrieve data from server'
                });
            });
            console.log('get Glossary error: ', e);
        });
    }
    resetFilter() {
        this.filteredGlossary = this.glossary;
    }
    getItems(ev) {
        this.resetFilter();
        let searchKey = ev.target.value;
        // if the value is an empty string don't filter the items
        if (searchKey && searchKey.trim() !== '') {
            this.filteredGlossary = this.filteredGlossary.filter((item) => {
                return (item.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1);
            });
        }
    }
    toggleDetails(item) {
        if (item.expanded) {
            item.expanded = false;
        }
        else {
            this.glossary.forEach((i) => { i.expanded = false; });
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
GlossaryPage = __decorate([
    Component({
        selector: 'glossary-page',
        template: `
    <ion-header>
      <app-toolbar [title]="title" [backLabel]="translator.getInnerHTML('BACK') || 'Back'"
                  layout="plain"
                 ></app-toolbar>
    </ion-header>

    <ion-content no-padding (click)="return;">
      <ion-searchbar mode='ios' (ionInput)="getItems($event)" class="glossary-search"></ion-searchbar>
      <ion-list>
        <div *ngFor="let item of filteredGlossary">
          <button ion-button clear full (click)="toggleDetails(item)" class="glossary-list-button">
            <div class="text">{{item.title}}</div>
          </button>
          <div id="item_{{item.position}}" [style.height]="item.expanded?item.detailsHeight:'0px'" class="details">
            <div padding [innerHTML]="_sanitizer.bypassSecurityTrustHtml(item.details)">
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
        ModalController,
        ViewController,
        DomSanitizer])
], GlossaryPage);
export { GlossaryPage };

//# sourceMappingURL=glossary.js.map
