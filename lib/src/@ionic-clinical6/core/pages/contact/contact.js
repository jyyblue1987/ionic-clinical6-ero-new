var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { mobileUserService } from 'clinical6';
import { TranslatorService } from '../..';
let ContactPage = class ContactPage {
    constructor(platform, translator, nav, navParams) {
        this.platform = platform;
        this.translator = translator;
        this.nav = nav;
        this.navParams = navParams;
        this.contactInformations = {};
        this.techInformations = {};
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.permLink = this.navParams.get('permanent_link') || 'contact_information';
            try {
                yield this.fetchTrialSite();
            }
            catch (error) {
                console.log('Error fetching trial site', error);
            }
        });
    }
    fetchTrialSite() {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            try {
                let siteData = yield mobileUserService.getSites();
                console.log('siteData:', siteData);
                yield self.fillInformations(siteData[0]);
            }
            catch (error) {
                console.log('Error fetching trial site info', error);
            }
        });
    }
    fillInformations(site) {
        return __awaiter(this, void 0, void 0, function* () {
            this.contactInformations = {
                'siteName': site.name ? site.name : 'no site name',
                'siteAddress1': site._location.addressLine1 ? site._location.addressLine1 : 'no address',
                'siteAddress2': site._location.addressLine2 ? site._location.addressLine2 : 'no address',
                'sitePhoneNumber': site.phoneNumber ? site.phoneNumber : 123456789,
                'siteEmail': site.email ? site.email : 'test@test.com'
            };
        });
    }
    drivingDirections() {
        let address = this.contactInformations['siteAddress1'] + ',' + this.contactInformations['siteAddress2'];
        address = encodeURI(address);
        // https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
        if (this.platform.is('ios')) {
            window.open('http://maps.apple.com/?address=' + address, '_system');
        }
        // android
        // https://developers.google.com/maps/documentation/android-api/intents?hl=en
        if (this.platform.is('android')) {
            window.open('geo://0,0?q=' + address, '_system');
        }
    }
    translate(string_key) {
        let s = this.translator.getInnerHTML(string_key);
        return s || string_key;
    }
};
ContactPage = __decorate([
    Component({
        selector: 'contact-page',
        template: `
      <ion-header>
          <app-toolbar [title]="'Contact'" [backLabel]="'Back'" ></app-toolbar>
      </ion-header>

      <ion-content>
          <img class="icon" src="http://placehold.it/256"/>
          <h1 class="address">{{contactInformations.siteName}}</h1>
          <p class="address-line-1">{{contactInformations.siteAddress1}}</p>
          <p class="address-line-2">{{contactInformations.siteAddress2}}</p>

          <div class="buttons">
              <a [href]="'tel:' + contactInformations.sitePhoneNumber">
              <button ion-button full color="std-button" class="large-button bottom-space">Call: {{contactInformations.sitePhoneNumber}}</button>
              </a>
              <a [href]="'mailto:' + contactInformations.siteEmail">
              <button ion-button full color="secondary-btn" class="large-button">{{contactInformations.siteEmail}}</button>
              </a>
          </div>
      </ion-content>
    `
    }),
    __metadata("design:paramtypes", [Platform,
        TranslatorService,
        NavController,
        NavParams])
], ContactPage);
export { ContactPage };

//# sourceMappingURL=contact.js.map
