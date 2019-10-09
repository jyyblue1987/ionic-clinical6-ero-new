import { Component } from '@angular/core';
import * as moment from 'moment';
import { NavController, ViewController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { TranslatorService } from '../..';
import { AlertModalPage } from '../../modal/alert-modal';
import { Notification } from 'clinical6';
import { AlertsService } from './alerts.service';





@Component({
    selector: 'alerts-page',
    templateUrl: 'alerts.html'
})
export class AlertsPage {

    /** @param {String} pageTitle The name of the Alert Page.  */
    pageTitle: string;
    /** @param {Array} alertGroups An array for all the alert groups.  */
    alertGroups: Array<AlertGroup>;
    /** @param iconsIDs An object with all the actions and the related images.  */
    static iconsIDs = {};
    /** @param {String} backText The back button label.  */
    backText: string;
    /** @param {Boolean} alertsLoaded A boolean variable for knowing when data has been fetched.  */
    alertsLoaded: boolean = false;
    /** @param {ViewInfo} viewInfo An object with theme informations.  */
    viewInfo: ViewInfo;
    moment = moment;
    /** @param {Boolean} showDate True or False to show or not the alert date.  */
    showDate: boolean = false;
    constructor(
        public navParams: NavParams,
        public loader: LoadingController,
        public modalCtrl: ModalController,
        public nav: NavController,
        public viewCtrl: ViewController,
        public translatorService: TranslatorService,
        public alertsSvc: AlertsService
    ) {
    }

    pageTitleTranslateKey(): string {
        return 'ALERTS_TITLE';
    }
    pageTitleTranslateFallback(): string {
        return 'Alerts';
    }

    ionViewDidLoad() {
        this.backText = this.translate('BACK', 'Back');
        this.pageTitle = this.translate(this.pageTitleTranslateKey(), this.pageTitleTranslateFallback());
        const self = this;
        this.viewInfo = DEMO_VIEW_INFO;
        this.viewInfo.themeColor = '';
        this.syncAlerts(this.alertsSvc.cachedAlerts());
    }

    /**
     * Use this method when initializing the app for associating an image to a platform action.
     * @param action Tha action name.
     * @param path The path of the image.
     */
    static setAlertIcons(action: string, path: string) {
        this.iconsIDs[action] = path;
    }

    /**
     * Used for refreshing the alerts list.
     * @param refresher 
     */
    doRefresh(refresher) {
        this.syncAlerts(this.alertsSvc.getAlerts())
            .then(() => (refresher.complete()))
            .catch(() => (refresher.complete()));
    }

    /**
     * Used for refreshing the alerts list.
     * @param getAlerts 
     */
    syncAlerts(getAlerts: Promise<any[]>) {
        // create View far all fetched Alerts
        return getAlerts.then(alerts => {
            this.groupAlerts(alerts);
        }).catch(reason => {
            this.alertsLoaded = true;
            console.log('AlertsPage getAlertMessages Error message: ' + reason.message);
            AlertModalPage.show(self, {
                type: 'type_error',
                subTitle: 'Please make sure you have a working network connection.',
                body: 'Unable to retrieve data from server. ' + reason.messageHTML
            });
        });
    }

    /**
     * Populate the alertGroups array.
     * @param alerts All the alerts.
     */
    groupAlerts(alerts) {
        this.alertGroups = [];
        alerts.forEach((item, index) => {
          if (item.status === 'read') {
            return; // skip read items
          }

          const groupName = this.getGroupName(item);
          let group = this.alertGroups.find((group) => (group.name === groupName));

          if (!group) {
              // create new group
              const groupTheme = this.getGroupTheme(item);
              group = new AlertGroup(groupName, groupTheme);
              this.alertGroups.push(group);
          }
          group.alerts.push(item);

        });
        this.alertsLoaded = true;
    }

    /**
     * To check if alerts exists.
     */
    hasAlerts() {
        let alertCount = 0;
        if (this.alertGroups) {
            alertCount = this.alertGroups.reduce((a, b) => b.alerts.length, 0);
        }
        return (this.alertsLoaded && alertCount !== 0);
    }

    /**
     * Returns the path icon.
     * @param type The name of the action for finding the image.
     */
    getIconId(type) {
        if (!AlertsPage.iconsIDs[type]) { // no_action
            return 'assets/icon/Alerts_Data_Collection.svg';
        } else {
            return AlertsPage.iconsIDs[type];
        }
    }

    /**
     * To get the group name.
     * @param item 
     */
    getGroupName(item: any) {
        // Only one group is available for this app so far
        return 'Only Group';
    }

    /**
     * To get the group theme.
     * @param item 
     */
    getGroupTheme(item: any) {
        // Only one group is available for this app so far
        return '';
    }

    /**
     * Used for the alert routing after the click.
     * @param item 
     */
    goTakeAction(item: Notification) {
      this.alertsSvc.goTakeAction(this.nav, item);
      this.dismissAlert(item);
    }

    /**
     * Delete the item from the list.
     * @param item The selected notification.
     * @param event The click event.
     */
    dismiss(item: Notification, event) {
        event.stopPropagation();
        this.dismissAlert(item);
    }

    /**
     * Set the alert as read.
     * @param {Notification} item The selected notification.
     */
    private dismissAlert(item: Notification) {
      console.log('dismiss', item);
      // remove item from local copy
      this.alertGroups.forEach(group => {
          group.alerts = group.alerts.filter(curr => {
              return (curr['id'] !== item['id']);
          });
      });
      // Remove item from Backend
      this.alertsSvc.removeAlert(item);
    }

    translate(translation_key, fallback): string {
        let result = this.translatorService.getInnerHTML(translation_key);
        if (result) {
            return result;
        }
        return fallback;
    }
}

/**
 * A class with theme informations.
 */
export class ViewInfo {
    themeColor: string;
}
var DEMO_VIEW_INFO: ViewInfo = {
    themeColor: '#4F2683'
};

/**
 * The model for the alert items in the alert section.
 */
export class AlertGroup {

    /** @param {String} name The name of the alert group.  */
    name: string;
    /** @param {Array} alerts An array for all the alerts.  */
    alerts: Array<Notification>;
    /** @param {String} themeColor The theme color.   */
    themeColor: string;
    constructor(name: string, theme: string) {
        this.name = name;
        this.themeColor = theme;
        this.alerts = new Array<Notification>();
    }
}