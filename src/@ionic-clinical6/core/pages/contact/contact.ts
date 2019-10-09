import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { clinical6, mobileUserService } from 'clinical6';
import { TranslatorService } from '../..';

@Component({
    selector: 'contact-page',
    templateUrl: 'contact.html'
})
export class ContactPage {
  permLink: string;
  contactInformations = {};
  techInformations = {};


  constructor(
      public platform: Platform,
      public translator: TranslatorService,
      public nav: NavController,
      public navParams: NavParams) {
      }

  async ngOnInit() {
    this.permLink = this.navParams.get('permanent_link') || 'contact_information';
    try {
      await this.fetchTrialSite();
    } catch (error) {
      console.log('Error fetching trial site', error);
    }
  }

  async fetchTrialSite() {
    const self = this;
    try {
      let siteData = await mobileUserService.getSites();
      console.log('siteData:', siteData);
      await self.fillInformations(siteData[0]);
    } catch (error) {
      console.log('Error fetching trial site info', error);
    }
    
  }

  async fillInformations(site) {
    this.contactInformations = {
      'siteName': site.name? site.name : 'no site name',
      'siteAddress1': site._location.addressLine1? site._location.addressLine1 : 'no address',
      'siteAddress2': site._location.addressLine2? site._location.addressLine2 : 'no address',
      'sitePhoneNumber': site.phoneNumber? site.phoneNumber : 123456789,
      'siteEmail': site.email? site.email: 'test@test.com'
    };
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

}