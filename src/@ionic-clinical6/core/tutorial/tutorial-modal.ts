import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
    selector: 'tutorial-modal',
    templateUrl: 'tutorial-modal.html'
})

export class TutorialModalPage {

 constructor(public modalCtrl: ModalController, public viewCtrl: ViewController) {

 }
/*
 show() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }
*/
  dismiss(action: string) {
      this.viewCtrl.dismiss(action);
  }
}
