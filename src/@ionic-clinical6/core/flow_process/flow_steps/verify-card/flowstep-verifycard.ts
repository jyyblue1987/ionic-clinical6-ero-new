import { Component, ViewChild } from '@angular/core';
import { Modal, NavController, ModalController, NavParams } from 'ionic-angular';

import { VerifyCardComponent, VerifyItem } from '../../items/verify-card/verify-card.component';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { UtilsService } from '../../../utils.service';

class VerifyLabDirector implements VerifyItem {

  first_name: string;
  last_name: string;
  license_number: string;

  constructor(object: any) {
    this.first_name = object['first_name'] != null ? object['first_name'] : '';
    this.last_name = object['last_name'] != null ? object['last_name'] : '';
    this.license_number = object['license_number'] != null ? object['license_number'] : '';

    this.itemHeader = 'Lab Director';
    this.itemTitle = this.first_name + ' ' + this.last_name;
    this.itemDescription = 'Medical License Number: ' + this.license_number;
  }

    itemHeader: string;
    itemTitle: string;
    itemDescription: string;

}

class VerifyLab implements VerifyItem {
  id: string;
  name: string;

  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;

  itemHeader: string;
  itemTitle: string;
  itemDescription: string;

  constructor(object: any) {
    this.id = object['id'];
    this.name = object['name'] != null ? object['name'] : '';

    // this.address1 = object['address_line_1'];
    this.address1 = object['address_line_1'] != null ? object['address_line_1'] : '';
    this.address2 = object['address_line_2'] != null ? object['address_line_2'] : '';
    this.address3 = object['address_line_3'] != null ? object['address_line_3'] : '';
    this.city = object['city'] != null ? object['city'] : '';
    this.state = object['state'] != null ? object['state'] : '';
    this.country = object['country'] != null ? object['country'] : '';
    this.zip_code = object['zip_code'] != null ? object['zip_code'] : '';

    this.itemHeader = 'Primary Address';
    this.itemTitle = this.name;

    let comma1 = (this.city.length > 0 && this.state.length > 0) ? ', ' : '';
    let comma2 = (this.zip_code != null && this.country.length > 0) ? ', ' : '';
    let comma3 = (this.address1.length > 0 && this.address2.length > 0) ? ', ' : '';
    let comma4 = (this.address2.length > 0 && this.address3.length > 0) ? ', ' : '';

    this.itemDescription = this.address1 + comma3 + this.address2 + comma4 + this.address3 + '<br>'
      + this.city + comma1 + this.state + ' '
      + this.zip_code + comma2 + this.country;

  }
}

class VerifyIRBContact implements VerifyItem {

  phone: string;
  fax: string;
  email: string;

  itemHeader: string;
  itemTitle: string;
  itemDescription: string;

  constructor(object: any) {
    this.phone = object['phone_number'] != null ? object['phone_number'] : '703-123-4567';
    this.fax = object['fax_number'] != null ? object['fax_number'] : '555-555-5555';
    this.email = object['email'] != null ? object['email'] : 'email@parallel6.com';

    this.itemHeader = 'IRB Contact';
    this.itemTitle = object['contact_first_name'] != null ? object['contact_first_name'] + ' ' + object['contact_last_name'] : '';
    this.itemDescription = 'Phone: ' + this.phone + '<br>'
      + 'Fax: ' + this.fax + '<br>'
      + 'Email: ' + this.email;
  }

}

class VerifyIRBAddress implements VerifyItem {
  id: string;
  name: string;

  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;

  itemHeader: string;
  itemTitle: string;
  itemDescription: string;

  constructor(object: any) {
    this.id = object['id'];
    this.name = object['name'];

    // this.address1 = object['address_line_1'];
    this.address1 = object['address_line_1'] != null ? object['address_line_1'] : '';
    this.address2 = object['address_line_2'] != null ? object['address_line_2'] : '';
    this.address3 = object['address_line_3'] != null ? object['address_line_3'] : '';
    this.city = object['city'] != null ? object['city'] : '';
    this.state = object['state'] != null ? object['state'] : '';
    this.country = object['country'] != null ? object['country'] : '';
    this.zip_code = object['zip_code'] != null ? object['zip_code'] : '';

    this.itemHeader = 'IRB Address';
    this.itemTitle = object['title'] != null ? object['title'] : '';

    // Logic still tbd - contingent on validation of IRB fields during entry
    /*
    let comma1 = (this.city.length > 0 && this.state.length > 0) ? ', ' : '';
    let comma2 = (this.zip_code.length > 0 && this.country.length > 0) ? ', ' : '';

    this.itemDescription = this.address1 + '<br>'
      + this.city + comma1 + this.state + ' '
      + this.zip_code + comma2 + this.country;*/

    let comma1 = (this.city.length > 0 && this.state.length > 0) ? ', ' : '';
    let comma2 = (this.zip_code != null && this.country.length > 0) ? ', ' : '';
    let comma3 = (this.address1.length > 0 && this.address2.length > 0) ? ', ' : '';
    let comma4 = (this.address2.length > 0 && this.address3.length > 0) ? ', ' : '';

    this.itemDescription = this.address1 + comma3 + this.address2 + comma4 + this.address3 + '<br>'
      + this.city + comma1 + this.state + ' '
      + this.zip_code + comma2 + this.country;
  }
}

@Component({
  selector: 'flowstep-verifycard',
  templateUrl: 'flowstep-verifycard.html'
})

export class FlowStepVerifyCardPage extends FlowStepPage {
  verifyInfoList: VerifyItem[] = [];

  constructor(
    public utilsSvc: UtilsService,
    public navParams: NavParams,
    public navController: NavController,
    public flowCtlr: FlowService,
    public modalCtrl: ModalController,
  ) {
    super(utilsSvc, navParams, navController, flowCtlr, modalCtrl);
    let studyId: string;  // todo add request for study id

    let endpoint = this.step.endpoint;
    let parser: (info: any) => void;

    let self = this;

    switch (this.step.flow.id) {
      case 'study_verify_lab':
        parser = function (info) {
          if (info['lab'])
            self.verifyInfoList.push(new VerifyLab(info['lab']));

          if (info['lab_director'])
            self.verifyInfoList.push(new VerifyLabDirector(info['lab_director']));
        };
        break;
      case 'verify_lab':
        parser = function (info) {
          if (info['lab_director'])
            self.verifyInfoList.push(new VerifyLabDirector(info['lab_director']));

          if (info['lab'])
            self.verifyInfoList.push(new VerifyLab(info['lab']));
        };
        break;

      case 'verify_irb':
        parser = function (info) {
          self.verifyInfoList.push(new VerifyIRBAddress(info));
          self.verifyInfoList.push(new VerifyIRBContact(info));
        };
        break;
    }

    // if (parser) {
    //   this.AppService.getVerifyInfo(this.step.endpoint, this.step.flow.owner)
    //     .then(info => parser(info))
    //     .catch(reason => console.log(reason));
    // }
  }
} 