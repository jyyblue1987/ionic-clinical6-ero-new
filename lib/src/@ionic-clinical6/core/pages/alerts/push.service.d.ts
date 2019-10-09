import { Push, PushObject, NotificationEventResponse } from '@ionic-native/push';
import { AlertController, App } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
import { TranslatorService } from '../../translator/translator.service';
import { AlertsService } from './alerts.service';
export declare class PushService {
    alertCtrl: AlertController;
    push: Push;
    app: App;
    clinical6Service: Clinical6Service;
    translatorService: TranslatorService;
    alertsSvc: AlertsService;
    /** @param alerts Parameter to store the alerts  */
    alerts: any;
    /** @param {PushObject} pushObject Parameter to store the push notification  */
    pushObject: PushObject;
    /** @param animationOpt  */
    animationOpt: any;
    constructor(alertCtrl: AlertController, push: Push, app: App, clinical6Service: Clinical6Service, translatorService: TranslatorService, alertsSvc: AlertsService);
    /**
     * Returns the current user Id.
     */
    private userId();
    /**
     * Initialize the alert service and enable the push notifications.
     * @param {String} androidSenderId Sender ID is used by Android apps to register a physical device to be able to receive notifications from particular 3rd party server.
     * @param config
     */
    init(androidSenderId: any, config?: {
        android: any;
        ios: any;
        windows: any;
    }): void;
    /**
     * Dysplay the foreground alert.
     * @param data Callback data that comes from platform.
     */
    showForegroundAlert(data: any, callback: any): void;
    /**
     * Controls the background data for a push.
     * @param callback
     */
    showBackGroundData(callback: any): void;
    /**
     * Returns the ios/android callback id.
     * @param data Callback data that comes from platform.
     */
    getCallbackId(data: NotificationEventResponse): number;
    /**
     *
     * @param data Callback data that comes from platform.
     */
    getAndroidCallbackId(data: any): any;
    /**
     *
     * @param data Callback data that comes from platform.
     */
    getIosCallbackId(data: any): any;
    /**
     * Shows the alert popup.
     * @param notification Notification object with a title and a message.
     * @param action Action sent by platform.
     */
    showAlert(notification: {
        title?: string;
        message: string;
    }, action?: () => boolean | void): void;
    /**
     * Default text for the alert
     */
    defaultAlertText: {
        ignore: string;
        go: string;
        ok: string;
        defaultTitle: string;
        defaultMessage: string;
    };
    /**
     * Shows the text of the alert.
     */
    getAlertText(): {
        ignore: string;
        go: string;
        ok: string;
        defaultTitle: string;
    };
    /**
     * On Error - calls when an error occurs.  This is to be overwritten.
     *
     * @param {any} reason - Reason for error
     */
    onError(reason: any): void;
    /**
     * Refresh the app's alerts!
     * @param callback
     */
    onCallback(callback: any): Promise<{}>;
    /**
     * Used for managing the GO click on the alert popup.
     * @param callback Callback data sent by platform.
     */
    onGo(callback: any): void;
}
/**
 * A model for a standard PushNotification
 */
export declare class PushNotification {
    jsonData: any;
    data: any;
    title: 'Push Notification';
    message: 'New Notification';
    action: '';
    buttons: any[];
    constructor(data: any);
    getTitle(): any;
    getMessage(): any;
    getAction(): any;
}
