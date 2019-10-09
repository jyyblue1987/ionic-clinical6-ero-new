import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProfileService, CompanionModel } from '../profile.service';
import { UtilsService } from '../../../utils.service';
export declare class CompanionsDashboardPage {
    utilsSvc: UtilsService;
    profileSvc: ProfileService;
    loadingController: LoadingController;
    navParams: NavParams;
    nav: NavController;
    /** @param  {Array<CompanionModel>} companions - Parameter used to save/store Companions  */
    companions: Array<CompanionModel>;
    /** @param  {boolean} useOldApi  - Enables the fetch methods in order to use old v1/v2 apis */
    useOldApi: boolean;
    /** @param  {Object} page  - Default values for the page */
    page: {
        toolbar: string;
        title: string;
        image: any;
        description: string;
    };
    constructor(utilsSvc: UtilsService, profileSvc: ProfileService, loadingController: LoadingController, navParams: NavParams, nav: NavController);
    /**
     * @async
     * @function getCompanionsList - Get the Companions List
    **/
    getCompanionsList(): Promise<void>;
    /**
     * @async
     * @function showCompanionProfile - Shows the companion profile
    **/
    showCompanionProfile(companion: any): Promise<void>;
    /**
     * @type {string} - Returns the Companion info about the first and the last name
     **/
    getTitle(companion: any): string;
    /**
     * @type {string} - Returns the Companion info about the first and the last name
     **/
    getSubtitle(companion: any): string;
    /**
     * @type {string} - Returns the Companion info about the relationship
     **/
    getInfo(companion: any): any;
}
