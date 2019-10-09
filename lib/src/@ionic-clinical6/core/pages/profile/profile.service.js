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
import { clinical6, mobileUserService } from 'clinical6';
import { Deserializer } from 'jsonapi-serializer';
let ProfileService = class ProfileService {
    constructor() {
        this.oldApi = true;
    }
    /**
     * @async
     * @function getUserProfile - Get the profile of a user
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @param {any} user - Optional Parameter to retrieve info about a specific user
     * @return {Promise<any>}   - Promise object that returns one Profile
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    getUserProfile(useOldApi = false, user = clinical6.user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let profile;
                if (useOldApi && this.oldApi) {
                    const response = yield clinical6.fetch('/api/profile');
                    console.log('get user profile using "/api/profile": ', response.content);
                    profile = response.content;
                }
                else {
                    const response = yield mobileUserService.getProfile(user);
                    let data = JSON.parse(JSON.stringify(response));
                    console.log('get user profile using "v3/mobile_users/{user_id}/profile": ', data);
                    profile = data.attributes;
                }
                return profile;
            }
            catch (e) {
                throw (e);
            }
        });
    }
    /**
     * @async
     * @function getCompanionsList - Get the Companions list associated to a user
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @return {Promise<any>}   - Promise object that returns the Companions list
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    getCompanionsList(useOldApi = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let companions = [];
                let response;
                let temp;
                if (useOldApi && this.oldApi) {
                    response = yield clinical6.fetch('/api/related_mobile_users', 'GET');
                    temp = response.followers;
                    console.log('fetch Companion list using "api/related_mobile_users": ', response);
                }
                else {
                    response = yield clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/related_users?filter=followers`);
                    temp = yield new Deserializer().deserialize(response);
                    console.log('fetch Companion list using "v3/mobile_users/{user.id}/related_users?filter=followers": ', companions);
                }
                for (let comp of temp) {
                    companions.push(new CompanionModel(comp));
                }
                return companions;
            }
            catch (e) {
                throw (e);
            }
        });
    }
    /**
     * @async
     * @function saveUserProfile - Save the User profile
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @param {any} data - Profile attributes to save
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    saveUserProfile(useOldApi = false, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let arrToObj = Object.assign({}, data.profileData);
                if (useOldApi && this.oldApi) {
                    let response = yield clinical6.fetch('/api/profile', 'PUT', arrToObj);
                    return Object.assign({}, data.profile, arrToObj);
                }
                else {
                    const response = yield mobileUserService.updateProfile({ profile: arrToObj, user: data.user }); // v3 don't work
                    let parse = JSON.parse(JSON.stringify(response));
                    return parse.attributes;
                }
            }
            catch (e) {
                throw (e);
            }
        });
    }
    setUserMode() {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = clinical6.user;
            const env = clinical6.apiBaseUrl;
            try {
                const role = yield clinical6.fetch(`/api/user_role`);
                if (role.user_role.permanent_link === 'companion') {
                    this.oldApi = false;
                    const tempId = clinical6.user.id;
                    let data = yield clinical6.fetch('/v3/mobile_users/' + tempId + '/related_users?filter=following', 'GET');
                    console.log('fetchCompanions, data', data);
                    if (data.data[0].attributes.relationship) {
                        const profile = yield clinical6.user.getProfile();
                        this.companionProfile = profile; // saving companion profile
                        clinical6.user.id = data.data[0].attributes.followed_user_id;
                        const _profile = yield clinical6.user.getProfile();
                        this.patientProfile = _profile; // saving patient profile
                        return data.data[0].attributes.followed_user_id;
                    }
                    else {
                        const profile = yield clinical6.user.getProfile();
                        this.companionProfile = profile; // saving companion profile
                        clinical6.user.id = data.data[1].attributes.followed_user_id;
                        const _profile = yield clinical6.user.getProfile();
                        this.patientProfile = _profile; // saving patient profile
                        return data.data[1].attributes.followed_user_id;
                    }
                }
                else {
                    this.companionProfile = null;
                    return;
                }
            }
            catch (error) {
                console.log('error setting user mode', error);
            }
        });
    }
};
ProfileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ProfileService);
export { ProfileService };
/**
 * @class CompanionModel - Extends the Companion model of the sdk to work properly also with old endpoint
 **/
export class CompanionModel {
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
}
;

//# sourceMappingURL=profile.service.js.map
