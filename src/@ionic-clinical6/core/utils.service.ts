import { Injectable } from '@angular/core';
import { App, LoadingController, Config } from 'ionic-angular';

@Injectable()
export class UtilsService {
    /**  @param {any} loader - pointer to the current instance of the LoadingController */
    loader: any;
    /**  @param {LoadingController} loadingController - Loading Controller instance */
    loadingController: LoadingController;

    constructor(loadingCtrl: LoadingController) {
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
    presentLoading(content = 'Please wait...', dismissOnPageChange: boolean = true, enableBackdropDismiss: boolean = true, spinner?: string) {
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

}