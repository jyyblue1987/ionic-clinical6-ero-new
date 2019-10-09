import { Injectable } from '@angular/core';
import { clinical6, mobileUserService } from 'clinical6';
import { Deserializer } from 'jsonapi-serializer';

@Injectable()
export class ProfileService {

    companionProfile;
    patientProfile;
    oldApi: boolean = true;

    constructor(
      ) {
      }

    /**
     * @async 
     * @function getUserProfile - Get the profile of a user
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @param {any} user - Optional Parameter to retrieve info about a specific user
     * @return {Promise<any>}   - Promise object that returns one Profile
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    async getUserProfile(useOldApi: boolean = false, user: any = clinical6.user): Promise<any> {
        try {
            let profile;
            if (useOldApi && this.oldApi) {
                const response = await clinical6.fetch('/api/profile');
                console.log('get user profile using "/api/profile": ', response.content);
                profile = response.content;
            } else {
                const response = await mobileUserService.getProfile(user);
                let data = JSON.parse(JSON.stringify(response));
                console.log('get user profile using "v3/mobile_users/{user_id}/profile": ', data);
                profile = data.attributes;
            }
            return profile;
        } catch (e) {
            throw(e);
        }
    }

    /**
     * @async 
     * @function getCompanionsList - Get the Companions list associated to a user
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @return {Promise<any>}   - Promise object that returns the Companions list
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    async getCompanionsList(useOldApi: boolean = false): Promise<any> {
        try {
            let companions = [];
            let response;
            let temp;
            if (useOldApi && this.oldApi) {
                response = await clinical6.fetch('/api/related_mobile_users', 'GET');
                temp = response.followers;
                console.log('fetch Companion list using "api/related_mobile_users": ', response);
            } else {
                response = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/related_users?filter=followers`);
                temp = await  new Deserializer().deserialize(response);
                console.log('fetch Companion list using "v3/mobile_users/{user.id}/related_users?filter=followers": ', companions);
            }
            for (let comp of temp) {
                companions.push(new CompanionModel(comp));
            }
            return companions;
        } catch (e) {
            throw(e);
        }
    }
    
    /**
     * @async 
     * @function saveUserProfile - Save the User profile
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @param {any} data - Profile attributes to save 
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    async saveUserProfile(useOldApi: boolean = false, data: any) {
        try {
        let arrToObj = Object.assign({}, data.profileData)
          if (useOldApi && this.oldApi) {
            let response = await clinical6.fetch('/api/profile', 'PUT', arrToObj);
            return Object.assign({}, data.profile, arrToObj);
          } else {
            const response = await mobileUserService.updateProfile({profile: arrToObj, user: data.user}); // v3 don't work
            let parse = JSON.parse(JSON.stringify(response));
            return parse.attributes;
          }
        } catch (e) {
          throw(e);
        }
      }

    async setUserMode() { // currently badges works correctly only on pompe platform
        const loggedUser = clinical6.user;
        const env = clinical6.apiBaseUrl;
        try {
            const role = await clinical6.fetch(`/api/user_role`);
            if (role.user_role.permanent_link === 'companion') {
                this.oldApi = false;
                const tempId = clinical6.user.id;
                let data = await clinical6.fetch('/v3/mobile_users/' + tempId + '/related_users?filter=following', 'GET');
                console.log('fetchCompanions, data', data);
                if (data.data[0].attributes.relationship) {
                    const profile = await clinical6.user.getProfile()
                    this.companionProfile = profile; // saving companion profile
                    clinical6.user.id = data.data[0].attributes.followed_user_id;
                    const _profile = await clinical6.user.getProfile()
                    this.patientProfile = _profile; // saving patient profile
                    return data.data[0].attributes.followed_user_id;
                    }
                else {
                    const profile = await clinical6.user.getProfile()
                    this.companionProfile = profile; // saving companion profile
                    clinical6.user.id = data.data[1].attributes.followed_user_id;
                    const _profile = await clinical6.user.getProfile()
                    this.patientProfile = _profile; // saving patient profile
                    return data.data[1].attributes.followed_user_id;
                }
            }
            else {
                this.companionProfile = null;
                return;
            }
        
        } catch (error) {
            console.log('error setting user mode', error);
        }
    }
}

/**
 * @class CompanionModel - Extends the Companion model of the sdk to work properly also with old endpoint
 **/
export class CompanionModel {
    /** @type {Number} - The RelatedUser ID value */
    id: Number;
    /** @type {String} - relationship value of RelatedUser */
    relationship: String;
    /** @type {String} - The type of the object */
    type: String;
    /** @type {Object} - Attributes of the RelatedUser */
    attributes: Object;

    constructor(response = {}) {
        const _response = response['data'] || response; // if json api is passed in directly
        const _attributes = _response['follower-user'] || _response; // if json api is passed in directly
        const _type = _response['follower_user_type'] || 'mobile_users';
        if (_attributes.id) {
            /** @type {Number} */
            this.id = parseInt(_attributes.id, 10);
        }
        if (_response.relationship) {
            /** @type {String} */
            this.relationship = _response.relationship;
        }
        if (_type) {
            /** @type {String} */
            this.type = _type === 'MobileUser' ? 'mobile_users' : _type;
        }
        /** @type {Object} */
        this.attributes = _attributes;

    }
};
