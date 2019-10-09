
import { Component, Input } from '@angular/core';
import { Modal, NavController, ModalController } from 'ionic-angular';

export interface VerifyItem {
  itemHeader: string;
  itemTitle: string;
  itemDescription: string;
}

@Component({
  selector: 'verify-card',
  templateUrl: 'verify-card.component.html'
})

export class VerifyCardComponent {
  @Input() verify: VerifyItem;

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController) {}

  ngOnInit() {
    const self = this;
  }

  showError(errorSubTitle: string, errorText: string) {
    // const title = 'Error';
    // // using the Help Modal for the time being, later on to be reskinned
    // let modal = this.modalCtrl.create(HelpModalPage, {title: title, subTitle: errorSubTitle, helpText: errorText}, { showBackdrop: true });
    // modal.present();
  }
}



