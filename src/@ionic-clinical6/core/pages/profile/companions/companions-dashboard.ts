import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from 'clinical6';
import { COMPANION_PROFILE_FORM } from '../profile.mock';
import { UserProfilePage } from '../user-profile/user-profile';
import { ProfileService, CompanionModel } from '../profile.service';
import { UtilsService } from '../../../utils.service';

@Component({
  selector: 'companions-dashboard-page',
  templateUrl: 'companions-dashboard.html'
})
export class CompanionsDashboardPage {
    /** @param  {Array<CompanionModel>} companions - Parameter used to save/store Companions  */
    companions: Array<CompanionModel>;
    /** @param  {boolean} useOldApi  - Enables the fetch methods in order to use old v1/v2 apis */
    useOldApi: boolean;
    /** @param  {Object} page  - Default values for the page */
    page = {
        toolbar: 'Companions',
        title: 'Companions List',
        image: null,
        description: 'Tap to see your companion info'
    };
    constructor(
        public utilsSvc: UtilsService,
        public profileSvc: ProfileService,
        public loadingController: LoadingController,
        public navParams: NavParams,
        public nav: NavController) {
            this.useOldApi = this.navParams.get('useOldApi') || false;
            this.getCompanionsList();
    }

    /**
     * @async 
     * @function getCompanionsList - Get the Companions List
    **/
    async getCompanionsList() {
        this.utilsSvc.presentLoading('');
        try {
            this.companions = [];
            this.companions = await this.profileSvc.getCompanionsList(this.useOldApi)
            console.log('companions list', this.companions);
        } catch (e) {
            console.error(e);
        }
        this.utilsSvc.dismissLoader();
    }

    /**
     * @async 
     * @function showCompanionProfile - Shows the companion profile
    **/
    async showCompanionProfile(companion: any) {
        this.utilsSvc.presentLoading('');
        try {
            let user = new User({id: companion.id, type: companion.type});
            const profile = await this.profileSvc.getUserProfile(false, user);
            let step = this.navParams.get('step') || COMPANION_PROFILE_FORM;
            this.nav.push(UserProfilePage, { step: step, profile: profile, useOldApi: false, user: user });
        } catch (e) {
          console.error(e);
        }
        this.utilsSvc.dismissLoader();
      }

    /**
     * @type {string} - Returns the Companion info about the first and the last name
     **/
    getTitle(companion) {
        return companion.attributes.first_name ? (companion.attributes.first_name + ' ' +
            (companion.attributes.last_name ? companion.attributes.last_name : '')) : null;
    }

    /**
     * @type {string} - Returns the Companion info about the first and the last name
     **/
    getSubtitle(companion) {
        return companion.attributes.first_name ? (companion.attributes.first_name + ' ' +
            (companion.attributes.last_name ? companion.attributes.last_name : '')) : null;
    }

    /**
     * @type {string} - Returns the Companion info about the relationship
     **/
    getInfo(companion) {
        return companion.relationship ? companion.relationship : null;
    }
}