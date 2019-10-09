var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
// import { PROFILE_DEMO } from './mocks/';
import { clinical6, contentService, flowService, appMenuService, userService, Client, Content } from 'clinical6';
import { AppConfig } from './config/app.config';
let Clinical6Service = class Clinical6Service {
    constructor(events, appConfig) {
        this.events = events;
        this.appConfig = appConfig;
        this.supportContactInfo = {
            title: '',
            image: '',
            image_backup: '',
            description: '',
            phone_number: '',
            email_support: '',
        };
        // mobile_user: any;
        /**
         * TODO: once V3 is integrated this won't be needed anymore
         */
        this.useDynContentV2 = false;
        this.menuBadges = { Surveys: 0, Notifications: 0, ManageSiteUpdates: 0 };
        this.flows = {};
    }
    /**
     * Get Notifications
     *
     * @return {Promise<Notification[]>}
     */
    getNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield userService.getNotifications(undefined, undefined);
                this.notifications = notifications;
                this.menuBadges.Notifications = notifications.filter(item => (item.status !== 'read')).length;
                return this.notifications;
            }
            catch (e) {
                throw ('Notifications failed');
            }
        });
    }
    /**
     * Get Dynamic Content
     * @param {String} className Name of class to be queries
     * @param {Number} page Page number currently on (0 is all)
     * @param {Number} itemCount Total number of items on a page
     * @return {Promise} Promise for use with Angularjs
     */
    getDynamicContent(className, page = 0, itemCount = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * TODO: once V3 is integrated this won't be needed anymore
             */
            if (this.useDynContentV2) {
                try {
                    var httpQuery = '?page=0' + page + '&per_page=' + itemCount;
                    const response = yield Client.instance.fetch('/api/dynamic/' + className + httpQuery);
                    var result;
                    result = response.content.map(function (obj) {
                        return new Content(obj);
                    });
                    return result;
                }
                catch (err) {
                    throw (err);
                }
            }
            else {
                try {
                    const data = yield contentService.getContent(className);
                    return data;
                }
                catch (e) {
                    this.onError(e);
                    throw ('Dynamic Content Failed');
                }
            }
        });
    }
    /**
     * Get Flow
     * @param {String} id The flow for a certain item
     */
    getFlow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flow = yield flowService.getFlow(id);
                return flow;
            }
            catch (reason) {
                this.onError(reason);
                throw (reason);
            }
        });
    }
    /**
     * Get Menus (Mobile Menus)
     * @return {Promise} Promise for use with Angularjs
     */
    getMenus(useOldApi) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mobileMenus && this.mobileMenus.length > 0) {
                return this.mobileMenus;
            }
            else {
                try {
                    let menus;
                    if (useOldApi) {
                        let response = yield clinical6.fetch(`/api/v2/mobile_menus?include_subcategories=true`);
                        menus = response.json.mobile_menus;
                    }
                    else {
                        menus = yield appMenuService.get();
                    }
                    this.mobileMenus = Object.keys(menus).map(key => menus[key]);
                    if (!this.menuBadges) {
                        this.menuBadges = {};
                    }
                    return this.mobileMenus;
                }
                catch (e) {
                    this.onError(e);
                    throw ('Mobile Menus failed');
                }
            }
        });
    }
    /**
     * Get Profile
     * @return {Promise} Promise for use with Angularjs
     */
    getProfile(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (AppConfig.demoMode) {
            //   return new Promise ( resolve => PROFILE_DEMO );
            // }
            if (this.profile && !refresh) {
                return this.profile;
            }
            else {
                try {
                    const profile = yield userService.getProfile();
                    this.profile = profile;
                    // sessionStorage.setItem('profile', angular.toJson(profile));
                    return this.profile;
                }
                catch (reason) {
                    this.onError(reason);
                    throw (reason);
                }
            }
        });
    }
    /**
     * Get Site
     * @param {string} permanent_link - Permanent Link for site (given by user at login)
     */
    _getSite(permanent_link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield clinical6.fetch('/api/v2/site_start/sites');
                const site = data.sites.filter(obj => (obj.permanent_link === permanent_link))[0];
                if (site) {
                    return site;
                }
                else {
                    throw ({ message: 'Could not find the site from server.', error_details: 'No match with the given site id' });
                }
            }
            catch (reason) {
                this.onError(reason);
                throw (reason);
            }
        });
    }
    /**
     * Logs in the user
     * @param {string} username The username required for login
     * @param {string} password the password required for login
     * @return {Promise} Promise for use with Angularjs
     */
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield clinical6.signIn(username, password);
                localStorage.setItem('authToken', data.auth_token);
                try {
                    const profile = yield this.getProfile(true);
                    if (fabric && fabric.Crashlytics) {
                        fabric.Crashlytics.setUserIdentifier(username);
                    }
                    return profile;
                }
                catch (reason) {
                    throw ({ message: reason.friendly, error_details: reason.details });
                }
            }
            catch (reason) {
                throw (reason);
            }
        });
    }
    /**
     * Logs out the user
     * @return {Promise} Promise for use with Angularjs
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield clinical6.signOut();
                localStorage.clear();
                delete this.profile;
                this.events.publish('user:logout');
                return 'Successfully Logged Out';
            }
            catch (e) {
                localStorage.clear();
                delete this.profile;
                this.events.publish('user:logout');
                throw ('Logout Failed');
            }
        });
    }
    /**
     * Set the pin for a confirmation pin token
     * @param {string} pin a user input to set a pin
     * @param {string} pin_confirmation a token provided by the xauth to setup a pin.
     */
    setPin(pin, pin_confirmation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { 'pin': pin, 'pin_confirmation': pin_confirmation, 'invitation_token': this.xAuth_token };
                // clinical6.fetch('/api/mobile_users/set_pin ', 'PUT', params ).then( data => {
                // clinical6.fetch('/api/mobile_users/accept_invitation ', 'PUT', params ).then( data => {
                const data = yield userService.acceptInvitation(this.xAuth_token, pin);
                console.log('setPin, result: ', data);
                try {
                    // login
                    const data = yield this.login(this.userID, pin);
                    return 'PIN Successfully Entered and successfully logged in';
                }
                catch (reason) {
                    console.log('Pin successsfully entered by login failed ' + reason.message + ' ' + reason.error_details);
                    throw (reason);
                }
            }
            catch (reason) {
                console.log('Set Pin failed ' + reason.message + ' ' + reason.error_details);
                throw (reason);
            }
        });
    }
    /**
     * On Error (Event)
     * @param  {Error} e Error object returned from server
     * @return {null} returns nothing
     */
    onError(e) {
        const self = this;
        const code = {
            INVALID_AUTHTOKEN: 50361
        };
        if (fabric && fabric.Crashlytics) {
            fabric.Crashlytics.addLog('ERROR: ' + JSON.stringify(e));
            fabric.Crashlytics.sendNonFatalCrash('ERROR: ' + JSON.stringify(e));
        }
        if (e.internal_code) {
            switch (e.internal_code) {
                case code.INVALID_AUTHTOKEN:
                    console.log('API error, case of invalid token, logging out.');
                    self.logout();
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * silentSignIn()
     * sets the Clinical6 auth-token from the local storage
     * @return {boolean} returns true if successfull, false otherwise
     */
    silentSignIn() {
        if (localStorage.getItem('authToken')) {
            clinical6.authToken = localStorage.getItem('authToken');
            return true;
        }
        else {
            console.log('silentSignIn failed, the authToken was not stored');
            return false;
        }
    }
};
Clinical6Service = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Events,
        AppConfig])
], Clinical6Service);
export { Clinical6Service };

//# sourceMappingURL=clinical6.service.js.map
