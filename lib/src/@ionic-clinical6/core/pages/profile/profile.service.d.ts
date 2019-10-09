export declare class ProfileService {
    companionProfile: any;
    patientProfile: any;
    oldApi: boolean;
    constructor();
    /**
     * @async
     * @function getUserProfile - Get the profile of a user
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @param {any} user - Optional Parameter to retrieve info about a specific user
     * @return {Promise<any>}   - Promise object that returns one Profile
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    getUserProfile(useOldApi?: boolean, user?: any): Promise<any>;
    /**
     * @async
     * @function getCompanionsList - Get the Companions list associated to a user
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @return {Promise<any>}   - Promise object that returns the Companions list
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    getCompanionsList(useOldApi?: boolean): Promise<any>;
    /**
     * @async
     * @function saveUserProfile - Save the User profile
     * @param {boolean} useOldApi - Optional Parameter to use the sdk(v3 endpoint) or the fetch method(old api) to retrieve the profile info from the server
     * @param {any} data - Profile attributes to save
     * @throws {Clinical6Error}  - If the Promise fails
     **/
    saveUserProfile(useOldApi: boolean, data: any): Promise<any>;
    setUserMode(): Promise<any>;
}
/**
 * @class CompanionModel - Extends the Companion model of the sdk to work properly also with old endpoint
 **/
export declare class CompanionModel {
    /** @type {Number} - The RelatedUser ID value */
    id: Number;
    /** @type {String} - relationship value of RelatedUser */
    relationship: String;
    /** @type {String} - The type of the object */
    type: String;
    /** @type {Object} - Attributes of the RelatedUser */
    attributes: Object;
    constructor(response?: {});
}
