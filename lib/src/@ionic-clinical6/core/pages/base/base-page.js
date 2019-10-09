var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
let BasePage = class BasePage {
    constructor(platform, elementRef, navCtrl) {
        this.platform = platform;
        this.elementRef = elementRef;
        this.navCtrl = navCtrl;
        this.inputItems = [];
    }
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
    handleKey(event) {
        if (!this.platform)
            return;
        if (this.platform.is('android')) {
            if (event.keyCode === 13) {
                for (let i = 0; i < this.inputItems.length; i++) {
                    if (this.inputItems[i] === document.activeElement) {
                        console.log('found item, index: ', i);
                        if (i >= this.inputItems.length - 2) {
                            this.doneCallback();
                        }
                        else {
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
};
BasePage = __decorate([
    Component({
        selector: 'base-page',
        template: ``
    }),
    __metadata("design:paramtypes", [Platform,
        ElementRef,
        NavController])
], BasePage);
export { BasePage };

//# sourceMappingURL=base-page.js.map
