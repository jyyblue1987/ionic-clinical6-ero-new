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
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { FlowStepPage } from '../flowstep';
import { FlowService } from '../../flow.service';
import { UtilsService } from '../../../utils.service';
class VerifyLabDirector {
    constructor(object) {
        this.first_name = object['first_name'] != null ? object['first_name'] : '';
        this.last_name = object['last_name'] != null ? object['last_name'] : '';
        this.license_number = object['license_number'] != null ? object['license_number'] : '';
        this.itemHeader = 'Lab Director';
        this.itemTitle = this.first_name + ' ' + this.last_name;
        this.itemDescription = 'Medical License Number: ' + this.license_number;
    }
}
class VerifyLab {
    constructor(object) {
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
class VerifyIRBContact {
    constructor(object) {
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
class VerifyIRBAddress {
    constructor(object) {
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
let FlowStepVerifyCardPage = class FlowStepVerifyCardPage extends FlowStepPage {
    constructor(utilsSvc, navParams, navController, flowCtlr, modalCtrl) {
        super(utilsSvc, navParams, navController, flowCtlr, modalCtrl);
        this.utilsSvc = utilsSvc;
        this.navParams = navParams;
        this.navController = navController;
        this.flowCtlr = flowCtlr;
        this.modalCtrl = modalCtrl;
        this.verifyInfoList = [];
        let studyId; // todo add request for study id
        let endpoint = this.step.endpoint;
        let parser;
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
};
FlowStepVerifyCardPage = __decorate([
    Component({
        selector: 'flowstep-verifycard',
        template: `
    <ion-header>
      <app-toolbar [title]="navbarTitle" [backLabel]="'Back'" [bgColor]="themeColor" layout="plain"></app-toolbar>
    </ion-header>

    <ion-content padding (click)="return;">

      <div class="title">{{step.title}}</div>
      <div class="helper" [innerHTML]="step.rich_description" *ngIf="step.rich_description"></div>

      <ion-row no-padding no-margin>
        <ion-col>
          <div class="form_container">
            <span *ngFor="let verify  of verifyInfoList">
              <verify-card [verify]="verify"></verify-card>
            </span>
          </div>
        </ion-col>
      </ion-row>

      <ion-row no-padding no-margin>
        <ion-col class="input-container" no-margin>
        <input-container [inputList]="inputs" (formStatusChanged)="updateForm($event)" (formValueChanged)="updateInputValues($event)" [fields]="fields"></input-container>
        </ion-col>
      </ion-row>
    </ion-content>

    <ion-footer class="survey-page" *ngIf="footerPrevNext">
      <ion-toolbar no-padding>
        <button ion-button class="button-left theme-primary-color" [style.background-color]="themeColor" *ngIf="showPrevButton()" (click)="goBack()">Prev
        </button>
        <button ion-button class="button-right theme-primary-color" [style.background-color]="themeColor" [disabled]="!isAnswerValid" (click)="gotoFlow(nextStep.button_name)">{{nextStep.button_name}}
        </button>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [UtilsService,
        NavParams,
        NavController,
        FlowService,
        ModalController])
], FlowStepVerifyCardPage);
export { FlowStepVerifyCardPage };

//# sourceMappingURL=flowstep-verifycard.js.map
