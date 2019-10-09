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
import { Push } from '@ionic-native/push';
import { AlertController, App } from 'ionic-angular';
import { clinical6, callbackService } from 'clinical6';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';
import { AppConfig } from '../../config/app.config';
import { AlertsService } from './alerts.service';
import { AlertsFactory } from './alert.factory';
let PushService = class PushService {
    constructor(alertCtrl, push, app, clinical6Service, translatorService, alertsSvc) {
        this.alertCtrl = alertCtrl;
        this.push = push;
        this.app = app;
        this.clinical6Service = clinical6Service;
        this.translatorService = translatorService;
        this.alertsSvc = alertsSvc;
        /**
         * Default text for the alert
         */
        this.defaultAlertText = {
            ignore: 'Dismiss',
            go: 'Begin Now',
            ok: 'Begin Now',
            defaultTitle: 'Push Notification',
            defaultMessage: 'New Notification'
        };
        this.animationOpt = AppConfig.animationOpt;
    }
    /**
     * Returns the current user Id.
     */
    userId() {
        return clinical6.user.id;
    }
    /**
     * Initialize the alert service and enable the push notifications.
     * @param {String} androidSenderId Sender ID is used by Android apps to register a physical device to be able to receive notifications from particular 3rd party server.
     * @param config
     */
    init(androidSenderId, config = null) {
        const defaults = {
            android: {
                senderID: androidSenderId,
                icon: 'icon'
            },
            ios: {
                alert: 'true',
                badge: false,
                sound: 'true'
            },
            windows: {}
        };
        config = Object.assign({}, defaults, config);
        this.pushObject = this.push.init(config);
        this.pushObject.on('registration').subscribe((data) => {
            let device = clinical6.device;
            device.pushId = data.registrationId;
            localStorage.setItem('device', JSON.stringify(clinical6.device));
            console.log('device.pushId:', device.pushId);
            if (device.accessToken && !clinical6.authToken)
                clinical6.authToken = device.accessToken;
            device.save().catch((e) => { });
        });
        this.pushObject.on('notification').subscribe((data) => {
            try {
                let storage = localStorage.getItem('push') ? JSON.parse(localStorage.getItem('push')) : [];
                storage.push(data);
                localStorage.setItem('push', JSON.stringify(storage));
                console.log('test push notifications: ', localStorage.getItem('push'));
            }
            catch (e) {
                console.log('test failed');
            }
            try {
                let pushData = new PushNotification(data);
                let callback;
                if (pushData.title && pushData.message && pushData.action) {
                    callback = {
                        content: {
                            title: pushData.title,
                            message: pushData.message,
                            action: pushData.action,
                            action_object: pushData.jsonData.callback_id || pushData.jsonData.callback.action_object
                        }
                    };
                }
                let callbackId = this.getCallbackId(data.additionalData);
                callbackService.getCallback(callbackId)
                    .then(callback => {
                    if (data.additionalData.foreground) {
                        this.showForegroundAlert(data, callback);
                    }
                    else {
                        this.showBackGroundData(callback);
                    }
                })
                    .catch(err => {
                    console.log(err);
                });
            }
            catch (err) {
                // Failing to catch errors here seems to cause the plugin to stop receiving foreground notifications
                console.error('Error processing push notification', err);
            }
        });
        this.pushObject.on('error').subscribe((reason) => this.onError(reason));
    }
    /**
     * Dysplay the foreground alert.
     * @param data Callback data that comes from platform.
     */
    showForegroundAlert(data, callback) {
        this.onCallback(callback)
            .then(alerts => this.showAlert(data, () => this.onGo(callback)))
            .catch(e => alert(e));
        ;
    }
    /**
     * Controls the background data for a push.
     * @param callback
     */
    showBackGroundData(callback) {
        const self = this;
        let nav = this.app.getActiveNav();
        let currview = nav && nav.getViews()[0] && nav.getViews()[0].name;
        if (currview === AlertsFactory.DashboardPageName) {
            this.onGo(callback);
        }
        else {
            nav.viewDidEnter.subscribe((view) => {
                if (view.component.name === AlertsFactory.DashboardPageName) {
                    self.onGo(callback);
                    nav.viewDidEnter.unsubscribe();
                }
            });
        }
    }
    /**
     * Returns the ios/android callback id.
     * @param data Callback data that comes from platform.
     */
    getCallbackId(data) {
        // Android and iOS push notifications from the platform have different data structures
        return this.getIosCallbackId(data) || this.getAndroidCallbackId(data);
    }
    /**
     *
     * @param data Callback data that comes from platform.
     */
    getAndroidCallbackId(data) {
        return data && data.json && data.json.callback && data.json.callback.callback_id;
    }
    /**
     *
     * @param data Callback data that comes from platform.
     */
    getIosCallbackId(data) {
        return data && data.json && data.json.callback_id;
    }
    /**
     * Shows the alert popup.
     * @param notification Notification object with a title and a message.
     * @param action Action sent by platform.
     */
    showAlert(notification, action = null) {
        let alertText = this.getAlertText();
        let buttons = action
            ? [{ text: alertText.ignore, role: 'cancel' }, { text: alertText.go, handler: action }]
            : [{ text: alertText.ok, role: 'cancel' }];
        let confirmAlert = this.alertCtrl.create({
            title: notification.title || alertText.defaultTitle,
            message: notification.message,
            buttons: buttons
        });
        confirmAlert.present();
    }
    /**
     * Shows the text of the alert.
     */
    getAlertText() {
        return {
            ignore: this.translatorService.getInnerHTML('ALERT_IGNORE') || this.defaultAlertText.ignore,
            go: this.translatorService.getInnerHTML('ALERT_GO') || this.defaultAlertText.go,
            ok: this.translatorService.getInnerHTML('ALERT_OK') || this.defaultAlertText.ok,
            defaultTitle: this.translatorService.getInnerHTML('ALERT_TITLE') || this.defaultAlertText.defaultTitle
        };
    }
    /**
     * On Error - calls when an error occurs.  This is to be overwritten.
     *
     * @param {any} reason - Reason for error
     */
    onError(reason) { }
    /**
     * Refresh the app's alerts!
     * @param callback
     */
    onCallback(callback) {
        return this.alertsSvc.getAlerts();
    }
    /**
     * Used for managing the GO click on the alert popup.
     * @param callback Callback data sent by platform.
     */
    onGo(callback) {
        // TODO: Somehow be aware of whether the user is past the PIN entry!
        if (!clinical6.authToken)
            return;
        let nav = this.app.getActiveNav();
        if (!nav)
            return; // <-- Defensive!  Can this happen?
        this.alertsSvc.goTakeAction(nav, callback.content);
    }
};
PushService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AlertController,
        Push,
        App,
        Clinical6Service,
        TranslatorService,
        AlertsService])
], PushService);
export { PushService };
/**
 * A model for a standard PushNotification
 */
export class PushNotification {
    constructor(data) {
        this.buttons = [];
        this.data = data || {};
        this.jsonData = (data.additionalData && data.additionalData.json) || {};
        this.title = this.getTitle();
        this.message = this.getMessage();
        this.action = this.getAction();
    }
    getTitle() {
        return this.jsonData.title || this.data.title || this.title;
    }
    getMessage() {
        return this.jsonData.message || this.jsonData.body || this.data.message || this.message;
    }
    getAction() {
        return this.jsonData.action || (this.jsonData.callback && this.jsonData.callback.action);
    }
}

//# sourceMappingURL=push.service.js.map
