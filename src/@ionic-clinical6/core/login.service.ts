import { Injectable } from '@angular/core';
import { clinical6, Device, deviceService, userService, mobileUserService, User, Client } from 'clinical6';

@Injectable()
export class AppLoginService {
  loginState: any;
  MAXATTEMPTS: number = 1;
  remainingAttempts: number;

  /**
   * Used to reset values
   */
  uuid: string;
  technology: string;
  appVersion: string;
  currToken: string;
  MOBILE_APP_KEY: string = 'dummy';

  constructor() {
  }

  reset() {
    this.remainingAttempts = 1;
    this.loginState = AUTHSTATE.STARTING_UP;
    // UUID does remain always the same, no need to reset
  }
  /**
   * Authentication steps:
   *  1. Device Registration
   *  2. Mobile User Registration
   *  3. Session Registration
   *
   * Let's move from 1 to 3 depending on available information
   */

  async authenticateDevice() {
    this.remainingAttempts = this.MAXATTEMPTS;
    return await this._authenticateDevice();
  }

  async _authenticateDevice() {
    // return new Promise( (resolve, reject) => {

      // It looks like here I can't use Client directly (getting transpile error)
      var deviceTokenValid = false;
      console.log('_authenticateDevice Client.config', clinical6.config);

      let successLoginState;
      if (localStorage.getItem('device')) {
        // TODO: double check whether the deviceToken is still up to date
        // TODO: ....
        deviceTokenValid = true;
        clinical6.device = new Device(JSON.parse(localStorage.getItem('device')));
        successLoginState = AUTHSTATE.DEVICE_AUTHORIZED;
      }
      else {
        // Register new Device
        clinical6.mobileApplicationKey = this.MOBILE_APP_KEY;
        const storedDevice = new Device(JSON.parse(localStorage.getItem('device') || '{}'));
        if (clinical6.device.pushId === 'FAKE_ID' && storedDevice.pushId !== 'FAKE_ID') {
          clinical6.device.pushId = storedDevice.pushId;
        }
        successLoginState = AUTHSTATE.NEW_INSTALL;        
      }
      console.log('_authenticateDevice, before save', clinical6.device);
      try {
        const response = await clinical6.device.save();
        console.log('_authenticateDevice clinical6.device.save() case ' + successLoginState, response);
        clinical6.device.id = response.id;
        clinical6.authToken = clinical6.device.accessToken;

        localStorage.setItem('device', JSON.stringify(clinical6.device));
        this.loginState = successLoginState;
        return (response);
      }
      catch (err) { console.log(err); }
      // The following catch mainly to make sure pushId and other information is saved
      // .catch( err => console.warn ('_authenticateDevice clinical6.device.save() error' , err)); 
  }

  async authenticateUser(username, password) {
    this.remainingAttempts = this.MAXATTEMPTS;
    return this._authenticateUser(username, password);
  }

  async _authenticateUser(username, password) {
    // return new Promise((resolve, reject) => {
    //   clinical6.signIn(username, password).then((user) => {
    try {
      let user = await clinical6.signIn(username, password);
      user = user.type && user.type === 'user_sessions' ? user.user: user; // to fix error about 'user_sessions' type
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', clinical6.authToken);
      this.loginState = AUTHSTATE.USER_AUTHENTICATED;
      // resolve(this.loginState);
      console.log('Login Service User signIn', user);
      // return (this.loginState);
      console.log('_authenticateUser before device save', clinical6.device);
      try {
        await clinical6.device.save();
      } catch( error ) {
        console.warn('_authenticateUser, clinical6.device.save error', error);
      }
    }
    catch( err ) {
      console.error('_authenticateUser Unable to Register the User', err);
      if (
        (this.remainingAttempts-- > 0) && 
        err && 
        err.message && 
        err.message.errors && 
        err.message.errors.find( er => ((er.status === '422') && (er.detail === 'Device already in use.')) )
      ) {
        // OK reset auth info and register from scratch
        this.clearAuthInfo();
        return this._authenticateDevice()
               .then( result => this._authenticateUser(username, password) );
        //   .then((result) => resolve(result))
        //   .catch((err) => reject(err));
        // })
        // .catch((err) => reject(err));
      }
      else {
        throw (err);
      }
    }
  }

  async guestSignIn() {
    this.remainingAttempts = this.MAXATTEMPTS;
    return await this._guestSignIn();
  }

  async _guestSignIn() {
      try {
        const response = await clinical6.signInGuest();
        this.loginState = AUTHSTATE.SIGNED_IN_AS_GUEST;
        localStorage.setItem('authToken', clinical6.authToken);
        return this.loginState;
      }
      catch(err) {
        console.error('_authenticateUser Unable to Register the User', err);
        if ((this.remainingAttempts-- > 0) && err && err.message && err.message.errors && err.message.errors.find((er) => {
          return ((er.status === '422') && (er.detail === 'Device already in use.'));
        })) {
          // OK reset auth info and register from scratch
          console.warn('Retry guest sign in, attempts: ', this.remainingAttempts);
          this.clearAuthInfo();
          try {
            const result = await this._authenticateDevice();
            const _result = await this._guestSignIn();
            return _result;
          } catch(err) { throw(err); }
        }
        else {
          throw(err);
        }
      }
  }

  async verifyPinExists() {
    try {
      const result = await userService.setPin({
          pin: 'dummy',
          pin_confirmation: 'dummy'
      });
      console.warn('verifyPinExists Check if User PIN exists error: ', result);
      throw(result);
      }
      catch( reason ) {
          console.warn('verifyPinExists Check if User PIN exists respone: ', reason);
          if (reason.details.indexOf('already exists') > -1) {
            throw(true);
          }
          else {
            return false;
          }
      }
  }

  clearAuthInfo() {
    this.resetDeviceInfo();
    this.clearUserInfo();
  }

  resetDeviceInfo() {
    const storedDevice = new Device(JSON.parse(localStorage.getItem('device') || '{}'));
    if (clinical6.device.pushId === 'FAKE_ID' && storedDevice.pushId !== 'FAKE_ID') {
      clinical6.device.pushId = storedDevice.pushId;
    }
    const pushId = clinical6.device.pushId;
    localStorage.removeItem('device');
    Client.instance.storageUtility.clear('device');
    clinical6.device = new Device({
      udid: this.uuid,
      technology: this.technology,
      appVersion: this.appVersion,
      push_id: pushId
    });
    clinical6.authToken = null;
    localStorage.removeItem('authToken');
  }
  clearUserInfo() {
    localStorage.removeItem('user');
    clinical6.user = new User();
  }

  async registerAccount(input) {
    var attributes = {};
    if (input.indexOf('@') > -1) {
      attributes['email'] = input;
    } else {
      attributes['account_name'] = input;
    }

    /**
     * TODO: Using fetch until the SDK is updated to return the response object instead of a plain string
     */
    try {
      const response = await Client.instance.fetch('/v3/mobile_users/registration_validation', 'post', {
        data: { type: 'registration_validations', attributes: attributes }
      });
      return response;
    } catch(err) {
      throw(err);
    }
  }

  postLoginInits() {
  }
}

export const AUTHSTATE = {
  STARTING_UP: 1,
  RESTARTING_UP: 2,
  NEW_INSTALL: 3,
  DEVICE_AUTHORIZED: 4,
  DEVICE_NOT_AUTHORIZED: 5,
  USER_AUTHENTICATED: 6,
  SIGNED_IN_AS_GUEST: 7,

};