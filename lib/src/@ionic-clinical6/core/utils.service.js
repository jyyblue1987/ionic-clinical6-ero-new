var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
let UtilsService = class UtilsService {
    constructor(loadingCtrl) {
        this.loadingController = loadingCtrl;
    }
    /**
     * @function presentLoading - this creates a new Loading Controller and shows a the loading indicator
     *
     * @param content                         - The html content for the loading indicator.
     * @param {boolean} dismissOnPageChange   - Whether to dismiss the indicator when navigating to a new page. Default true.
     * @param {boolean} enableBackdropDismiss - Whether the loading indicator should be dismissed by tapping the backdrop. Default true.
     * @param {String} spinner                - The name of the SVG spinner for the loading indicator. Optional
     **/
    presentLoading(content = 'Please wait...', dismissOnPageChange = true, enableBackdropDismiss = true, spinner) {
        if (!this.loader) {
            this.loader = this.loadingController.create({
                content: content,
                dismissOnPageChange: dismissOnPageChange,
                enableBackdropDismiss: enableBackdropDismiss,
                spinner: spinner
            });
        }
        this.loader.present();
        this.loader.onDidDismiss(() => {
            this.loader = null;
            console.log('Dismissed loading');
        });
    }
    /**
     * @function presentLoading - Makes sure to destroy the existing Loading Controller
    **/
    dismissLoader() {
        if (this.loader) {
            this.loader.dismiss();
            this.loader = null;
        }
    }
};
UtilsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoadingController])
], UtilsService);
export { UtilsService };

//# sourceMappingURL=utils.service.js.map
