import { LoadingController } from 'ionic-angular';
export declare class UtilsService {
    /**  @param {any} loader - pointer to the current instance of the LoadingController */
    loader: any;
    /**  @param {LoadingController} loadingController - Loading Controller instance */
    loadingController: LoadingController;
    constructor(loadingCtrl: LoadingController);
    /**
     * @function presentLoading - this creates a new Loading Controller and shows a the loading indicator
     *
     * @param content                         - The html content for the loading indicator.
     * @param {boolean} dismissOnPageChange   - Whether to dismiss the indicator when navigating to a new page. Default true.
     * @param {boolean} enableBackdropDismiss - Whether the loading indicator should be dismissed by tapping the backdrop. Default true.
     * @param {String} spinner                - The name of the SVG spinner for the loading indicator. Optional
     **/
    presentLoading(content?: string, dismissOnPageChange?: boolean, enableBackdropDismiss?: boolean, spinner?: string): void;
    /**
     * @function presentLoading - Makes sure to destroy the existing Loading Controller
    **/
    dismissLoader(): void;
}
