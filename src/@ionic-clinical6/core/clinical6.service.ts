import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
// import { PROFILE_DEMO } from './mocks/';
import {
  clinical6,
  contentService,
  flowService,
  appMenuService,
  userService,

  Notification,
  Flow,
  Profile,
  systemService,
  AppMenu,
  Client,
  Content
} from 'clinical6';
import { AppConfig } from './config/app.config';

declare var fabric;

@Injectable()
export class Clinical6Service {

  supportContactInfo: any = {
    title: '',
    image: '',
    image_backup: '',
    description: '',
    phone_number: '',
    email_support: '',
  };
  userID: string;
  siteID: string;
  profile: any;
  xAuth_token: string;
  // mobile_user: any;

  /**
   * TODO: once V3 is integrated this won't be needed anymore
   */
  useDynContentV2: boolean = false;

  mobileMenus: any;
  menuBadges: any = {Surveys: 0, Notifications: 0, ManageSiteUpdates: 0 };
  notifications: Array<any>;
  flows: { [key: string]: Flow } = { };

  constructor(
    public events: Events,
    public appConfig: AppConfig,
  ) {
  }

  /**
   * Get Notifications
   *
   * @return {Promise<Notification[]>}
   */

  async getNotifications(): Promise<Notification[]> {
    try {
      const notifications = await userService.getNotifications(undefined, undefined);
        this.notifications = notifications;
        this.menuBadges.Notifications = notifications.filter(item => (item.status !== 'read')).length;
        return this.notifications;
      } catch (e) {
        throw('Notifications failed');
      }
  }

  /**
   * Get Dynamic Content
   * @param {String} className Name of class to be queries
   * @param {Number} page Page number currently on (0 is all)
   * @param {Number} itemCount Total number of items on a page
   * @return {Promise} Promise for use with Angularjs
   */
  async getDynamicContent(className: string, page: number = 0, itemCount: number = 0) {
      /**
       * TODO: once V3 is integrated this won't be needed anymore
       */
      if (this.useDynContentV2) {
        try {
          var httpQuery = '?page=0' + page + '&per_page=' + itemCount;
          const response = await Client.instance.fetch('/api/dynamic/' + className + httpQuery);
          var result;
          result = response.content.map(function (obj) {
            return new Content(obj);
          });
          return result;
        } catch (err) {
          throw(err);
        }
      }
      else {
        try {
          const data = await contentService.getContent(className);
          return data;
        } catch(e) {
          this.onError(e);
          throw('Dynamic Content Failed');
        }
      }
  }


  /**
   * Get Flow
   * @param {String} id The flow for a certain item
   */
  async getFlow(id: string) {
    try {
      const flow = await flowService.getFlow(id);
      return flow;
    } catch(reason) {
      this.onError(reason);
      throw(reason);
    }
  }

  /**
   * Get Menus (Mobile Menus)
   * @return {Promise} Promise for use with Angularjs
   */
  async getMenus(useOldApi?): Promise<AppMenu[]> {
      if (this.mobileMenus && this.mobileMenus.length > 0) {
        return this.mobileMenus;
      } else {
        try {
          let menus;
          if (useOldApi) {
            let response = await clinical6.fetch(`/api/v2/mobile_menus?include_subcategories=true`);
            menus = response.json.mobile_menus;
          } else {
            menus = await appMenuService.get();
          }
          this.mobileMenus = Object.keys(menus).map(key => menus[key]);
          if (!this.menuBadges) {
            this.menuBadges = {};
          }
          return this.mobileMenus;
        } catch (e) {
          this.onError(e);
          throw('Mobile Menus failed');
        }
      }
  }

  /**
   * Get Profile
   * @return {Promise} Promise for use with Angularjs
   */
  async getProfile(refresh?: boolean) {
    // if (AppConfig.demoMode) {
    //   return new Promise ( resolve => PROFILE_DEMO );
    // }
    if (this.profile && !refresh) {
      return this.profile;
    } else {
        try {
          const profile = await userService.getProfile();
            this.profile = profile as Profile;
            // sessionStorage.setItem('profile', angular.toJson(profile));
            return this.profile;
          }
          catch(reason) {
            this.onError(reason);
            throw(reason);
          }
      }
  }

  /**
   * Get Site
   * @param {string} permanent_link - Permanent Link for site (given by user at login)
   */
  async _getSite(permanent_link: string) { // not used for the time being, see AppService
    try {
      const data = await clinical6.fetch('/api/v2/site_start/sites');
        const site = data.sites.filter(obj => (obj.permanent_link === permanent_link))[0];
        if (site) {
          return site;
        } else {
          throw({ message: 'Could not find the site from server.', error_details: 'No match with the given site id' });
        }
      }
      catch(reason) {
        this.onError(reason);
        throw(reason);
      }
  }

  /**
   * Logs in the user
   * @param {string} username The username required for login
   * @param {string} password the password required for login
   * @return {Promise} Promise for use with Angularjs
   */
  async login(username: string, password: string) {
    try {
        const data = await clinical6.signIn(username, password);
        localStorage.setItem('authToken', data.auth_token);
        try {
          const profile = await this.getProfile(true);
          if (fabric && fabric.Crashlytics) {
            fabric.Crashlytics.setUserIdentifier(username);
          }
            return profile;
          }
          catch(reason) {
              throw({ message: reason.friendly, error_details: reason.details });
          }
      }
      catch(reason) {
          throw(reason);
      }
  }

  /**
   * Logs out the user
   * @return {Promise} Promise for use with Angularjs
   */
  async logout() {
    try {
      await clinical6.signOut();
      localStorage.clear();
      delete this.profile;
      this.events.publish('user:logout');
      return 'Successfully Logged Out';
    }
    catch(e) {
      localStorage.clear();
      delete this.profile;
      this.events.publish('user:logout');
      throw('Logout Failed');
    }
  }

  /**
   * Set the pin for a confirmation pin token
   * @param {string} pin a user input to set a pin
   * @param {string} pin_confirmation a token provided by the xauth to setup a pin.
   */
  async setPin(pin: string, pin_confirmation: string) {
    try {
      const params = { 'pin': pin, 'pin_confirmation': pin_confirmation, 'invitation_token': this.xAuth_token };
      // clinical6.fetch('/api/mobile_users/set_pin ', 'PUT', params ).then( data => {
      // clinical6.fetch('/api/mobile_users/accept_invitation ', 'PUT', params ).then( data => {
      const data = await userService.acceptInvitation(this.xAuth_token, pin);
      console.log('setPin, result: ', data);
      try {
          // login
          const data = await this.login(this.userID, pin);
          return 'PIN Successfully Entered and successfully logged in';
      } catch(reason) {
              console.log('Pin successsfully entered by login failed ' + reason.message + ' ' + reason.error_details);
              throw(reason);
      }
    }
    catch(reason) {
          console.log('Set Pin failed ' + reason.message + ' ' + reason.error_details);
          throw(reason);
    }
  }

  /**
   * On Error (Event)
   * @param  {Error} e Error object returned from server
   * @return {null} returns nothing
   */
  onError(e: any) {
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
}
