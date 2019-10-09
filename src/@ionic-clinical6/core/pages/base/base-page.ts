import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { TextInput, Platform, NavController, AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'base-page',
  template: ``
})
export abstract class BasePage {
  inputItems: any[] = [];
  abstract doneCallback(): any;

  constructor(
    public platform?: Platform,
    public elementRef?: ElementRef,
    public navCtrl?: NavController
    ) { }

  ngOnInit() {
    if (this.platform) {
      if (this.platform.is('android')) {
        this.inputItems = this.elementRef.nativeElement.getElementsByTagName('input');
      }
      if (this.platform.is('ios')) {
        this.inputItems = this.elementRef.nativeElement.getElementsByTagName('input');
      }
    }
  }

  handleKey(event: KeyboardEvent) {
    if (!this.platform) return;

    if (this.platform.is('android')) {
      if (event.keyCode === 13) {
        for (let i = 0; i < this.inputItems.length; i++) {
          if (this.inputItems[i] === document.activeElement) {
            console.log('found item, index: ', i);
            if (i >= this.inputItems.length - 2) {
              this.doneCallback();
            } else {
              let auxItem = this.inputItems[(i + 2) % this.inputItems.length];
              auxItem.focus();
            }
            break;
          }
        }
      }
    }
  }
  goBack() {
    this.navCtrl.pop();
  }
}