import { Component, ViewChild, } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'help-modal',
  templateUrl: 'help-modal.html'
})
export class HelpModalPage {
  title;
  subTitle;
  body;
  buttonName;
  color: string;
  iconColorClass: string;

  constructor(
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    this.title = this.params.get('title');
    this.subTitle = this.params.get('subTitle');
    this.body = this.params.get('helpText');
    this.buttonName = this.params.get('buttonName') || 'Cancel';
    this.color = this.params.get('color') || 'Primary';
    this.iconColorClass = 'title-icon' + (this.params.get('color') || '');
  }

  dismiss(action: string) {
    this.viewCtrl.dismiss(action);
  }
}