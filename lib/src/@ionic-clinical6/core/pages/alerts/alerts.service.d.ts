import { Notification } from 'clinical6';
import { NavController } from 'ionic-angular';
import { NgZone } from '@angular/core';
export declare class AlertsService {
    private ngZone;
    alerts: Notification[];
    animationOpt: any;
    constructor(ngZone: NgZone);
    private userId();
    /**
     * Retrieve all the alerts.
     */
    getAlerts(): Promise<Notification[]>;
    /**
     * Returns cached alerts instead of performing a new request.
     */
    cachedAlerts(): Promise<any[]>;
    /**
     * Remove the selected alert.
     * @param {Notification} message The selected Notification
     */
    removeAlert(message: Notification): Promise<Notification[]>;
    /**
     * Used for the alert routing. Opens the page associated to the action.
     * @param nav Navigation Controller.
     * @param data Callback data that comes from platform.
     */
    goTakeAction(nav: NavController, data: any): void;
    callback(): Promise<{}>;
}
