import * as moment from 'moment';
import { NavController, ViewController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { TranslatorService } from '../..';
import { Notification } from 'clinical6';
import { AlertsService } from './alerts.service';
export declare class AlertsPage {
    navParams: NavParams;
    loader: LoadingController;
    modalCtrl: ModalController;
    nav: NavController;
    viewCtrl: ViewController;
    translatorService: TranslatorService;
    alertsSvc: AlertsService;
    /** @param {String} pageTitle The name of the Alert Page.  */
    pageTitle: string;
    /** @param {Array} alertGroups An array for all the alert groups.  */
    alertGroups: Array<AlertGroup>;
    /** @param iconsIDs An object with all the actions and the related images.  */
    static iconsIDs: {};
    /** @param {String} backText The back button label.  */
    backText: string;
    /** @param {Boolean} alertsLoaded A boolean variable for knowing when data has been fetched.  */
    alertsLoaded: boolean;
    /** @param {ViewInfo} viewInfo An object with theme informations.  */
    viewInfo: ViewInfo;
    moment: typeof moment;
    /** @param {Boolean} showDate True or False to show or not the alert date.  */
    showDate: boolean;
    constructor(navParams: NavParams, loader: LoadingController, modalCtrl: ModalController, nav: NavController, viewCtrl: ViewController, translatorService: TranslatorService, alertsSvc: AlertsService);
    pageTitleTranslateKey(): string;
    pageTitleTranslateFallback(): string;
    ionViewDidLoad(): void;
    /**
     * Use this method when initializing the app for associating an image to a platform action.
     * @param action Tha action name.
     * @param path The path of the image.
     */
    static setAlertIcons(action: string, path: string): void;
    /**
     * Used for refreshing the alerts list.
     * @param refresher
     */
    doRefresh(refresher: any): void;
    /**
     * Used for refreshing the alerts list.
     * @param getAlerts
     */
    syncAlerts(getAlerts: Promise<any[]>): Promise<void>;
    /**
     * Populate the alertGroups array.
     * @param alerts All the alerts.
     */
    groupAlerts(alerts: any): void;
    /**
     * To check if alerts exists.
     */
    hasAlerts(): boolean;
    /**
     * Returns the path icon.
     * @param type The name of the action for finding the image.
     */
    getIconId(type: any): any;
    /**
     * To get the group name.
     * @param item
     */
    getGroupName(item: any): string;
    /**
     * To get the group theme.
     * @param item
     */
    getGroupTheme(item: any): string;
    /**
     * Used for the alert routing after the click.
     * @param item
     */
    goTakeAction(item: Notification): void;
    /**
     * Delete the item from the list.
     * @param item The selected notification.
     * @param event The click event.
     */
    dismiss(item: Notification, event: any): void;
    /**
     * Set the alert as read.
     * @param {Notification} item The selected notification.
     */
    private dismissAlert(item);
    translate(translation_key: any, fallback: any): string;
}
/**
 * A class with theme informations.
 */
export declare class ViewInfo {
    themeColor: string;
}
/**
 * The model for the alert items in the alert section.
 */
export declare class AlertGroup {
    /** @param {String} name The name of the alert group.  */
    name: string;
    /** @param {Array} alerts An array for all the alerts.  */
    alerts: Array<Notification>;
    /** @param {String} themeColor The theme color.   */
    themeColor: string;
    constructor(name: string, theme: string);
}
