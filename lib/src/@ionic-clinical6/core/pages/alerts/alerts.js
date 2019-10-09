var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import * as moment from 'moment';
import { NavController, ViewController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { TranslatorService } from '../..';
import { AlertModalPage } from '../../modal/alert-modal';
import { AlertsService } from './alerts.service';
let AlertsPage = AlertsPage_1 = class AlertsPage {
    constructor(navParams, loader, modalCtrl, nav, viewCtrl, translatorService, alertsSvc) {
        this.navParams = navParams;
        this.loader = loader;
        this.modalCtrl = modalCtrl;
        this.nav = nav;
        this.viewCtrl = viewCtrl;
        this.translatorService = translatorService;
        this.alertsSvc = alertsSvc;
        /** @param {Boolean} alertsLoaded A boolean variable for knowing when data has been fetched.  */
        this.alertsLoaded = false;
        this.moment = moment;
        /** @param {Boolean} showDate True or False to show or not the alert date.  */
        this.showDate = false;
    }
    pageTitleTranslateKey() {
        return 'ALERTS_TITLE';
    }
    pageTitleTranslateFallback() {
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
    static setAlertIcons(action, path) {
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
    syncAlerts(getAlerts) {
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
        if (!AlertsPage_1.iconsIDs[type]) {
            return 'assets/icon/Alerts_Data_Collection.svg';
        }
        else {
            return AlertsPage_1.iconsIDs[type];
        }
    }
    /**
     * To get the group name.
     * @param item
     */
    getGroupName(item) {
        // Only one group is available for this app so far
        return 'Only Group';
    }
    /**
     * To get the group theme.
     * @param item
     */
    getGroupTheme(item) {
        // Only one group is available for this app so far
        return '';
    }
    /**
     * Used for the alert routing after the click.
     * @param item
     */
    goTakeAction(item) {
        this.alertsSvc.goTakeAction(this.nav, item);
        this.dismissAlert(item);
    }
    /**
     * Delete the item from the list.
     * @param item The selected notification.
     * @param event The click event.
     */
    dismiss(item, event) {
        event.stopPropagation();
        this.dismissAlert(item);
    }
    /**
     * Set the alert as read.
     * @param {Notification} item The selected notification.
     */
    dismissAlert(item) {
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
    translate(translation_key, fallback) {
        let result = this.translatorService.getInnerHTML(translation_key);
        if (result) {
            return result;
        }
        return fallback;
    }
};
/** @param iconsIDs An object with all the actions and the related images.  */
AlertsPage.iconsIDs = {};
AlertsPage = AlertsPage_1 = __decorate([
    Component({
        selector: 'alerts-page',
        template: `
      <ion-header>
          <app-toolbar    [title]="pageTitle" [backLabel]="backText" (backClick)="goBack()"></app-toolbar>
        </ion-header>
        <ion-content no-padding (click)="return;">
          <ion-refresher (ionRefresh)="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>
          <ion-list class="alerts-list">
            <ng-template ngFor let-group [ngForOf]="alertGroups">        
              <button ion-button no-margin clear full class="alert-item" *ngFor="let item of group.alerts" (click)="goTakeAction(item)">
                <ion-grid>
                  <ion-row>
                    <ion-col class="image-col">
                      <div class="item-icon-container" >
                        <img class="alert-image" src ="{{getIconId(item.action)}}"/>
                      </div>
                    </ion-col>
                <ion-col class="details-col">
                <div class="details">
                  <div class="title-content"> 
                    <ion-row>
                      <ion-col class="alert-title-col">
                          <div *ngIf="showDate" class="time">{{moment(item.created_at).format('DD MMM Y hh:mma')}}</div>  
                          <div class="title">{{item.title}}</div>                                
                      </ion-col>
                    </ion-row>            
                  </div>
                  <div class="description">{{item.message}}</div>
                </div>
              </ion-col>
                <a (click)="dismiss(item,$event)"><div class="dismiss-button app-p6-icon-exit-large"></div></a>
              </ion-row>
            </ion-grid>
              </button>
            </ng-template>
          </ion-list>
          <div class="no-alerts"  *ngIf="(!hasAlerts())">
            <ion-card>
              <ion-card-content>
                <div class="message">{{translate('ALERTS_PAGE_NO_ALERTS')}}</div>
              </ion-card-content>
            </ion-card>    
          </div>
        </ion-content>
    `
    }),
    __metadata("design:paramtypes", [NavParams,
        LoadingController,
        ModalController,
        NavController,
        ViewController,
        TranslatorService,
        AlertsService])
], AlertsPage);
export { AlertsPage };
/**
 * A class with theme informations.
 */
export class ViewInfo {
}
var DEMO_VIEW_INFO = {
    themeColor: '#4F2683'
};
/**
 * The model for the alert items in the alert section.
 */
export class AlertGroup {
    constructor(name, theme) {
        this.name = name;
        this.themeColor = theme;
        this.alerts = new Array();
    }
}
var AlertsPage_1;

//# sourceMappingURL=alerts.js.map
