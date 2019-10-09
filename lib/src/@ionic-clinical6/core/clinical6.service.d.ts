import { Events } from 'ionic-angular';
import { Notification, Flow, AppMenu } from 'clinical6';
import { AppConfig } from './config/app.config';
export declare class Clinical6Service {
    events: Events;
    appConfig: AppConfig;
    supportContactInfo: any;
    userID: string;
    siteID: string;
    profile: any;
    xAuth_token: string;
    /**
     * TODO: once V3 is integrated this won't be needed anymore
     */
    useDynContentV2: boolean;
    mobileMenus: any;
    menuBadges: any;
    notifications: Array<any>;
    flows: {
        [key: string]: Flow;
    };
    constructor(events: Events, appConfig: AppConfig);
    /**
     * Get Notifications
     *
     * @return {Promise<Notification[]>}
     */
    getNotifications(): Promise<Notification[]>;
    /**
     * Get Dynamic Content
     * @param {String} className Name of class to be queries
     * @param {Number} page Page number currently on (0 is all)
     * @param {Number} itemCount Total number of items on a page
     * @return {Promise} Promise for use with Angularjs
     */
    getDynamicContent(className: string, page?: number, itemCount?: number): Promise<any>;
    /**
     * Get Flow
     * @param {String} id The flow for a certain item
     */
    getFlow(id: string): Promise<Flow>;
    /**
     * Get Menus (Mobile Menus)
     * @return {Promise} Promise for use with Angularjs
     */
    getMenus(useOldApi?: any): Promise<AppMenu[]>;
    /**
     * Get Profile
     * @return {Promise} Promise for use with Angularjs
     */
    getProfile(refresh?: boolean): Promise<any>;
    /**
     * Get Site
     * @param {string} permanent_link - Permanent Link for site (given by user at login)
     */
    _getSite(permanent_link: string): Promise<any>;
    /**
     * Logs in the user
     * @param {string} username The username required for login
     * @param {string} password the password required for login
     * @return {Promise} Promise for use with Angularjs
     */
    login(username: string, password: string): Promise<any>;
    /**
     * Logs out the user
     * @return {Promise} Promise for use with Angularjs
     */
    logout(): Promise<string>;
    /**
     * Set the pin for a confirmation pin token
     * @param {string} pin a user input to set a pin
     * @param {string} pin_confirmation a token provided by the xauth to setup a pin.
     */
    setPin(pin: string, pin_confirmation: string): Promise<string>;
    /**
     * On Error (Event)
     * @param  {Error} e Error object returned from server
     * @return {null} returns nothing
     */
    onError(e: any): void;
    /**
     * silentSignIn()
     * sets the Clinical6 auth-token from the local storage
     * @return {boolean} returns true if successfull, false otherwise
     */
    silentSignIn(): boolean;
}
