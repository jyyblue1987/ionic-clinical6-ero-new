import { Badge, likeInfo } from './badge-models';
/**
 * A Service for retrieving the badges.
 * This service use a matrix 3*m for storing and displaying the badges that is the one used in our projects.
 */
export declare class BadgesPluginService {
    /** @type {Array} badges - All the badges available on the platform. */
    badges: Array<any>;
    /** @type {Array} recentBadges - The recent badges. */
    recentBadges: Array<any>;
    /** @type {Array} awardedBadges - The awarded badges. */
    awardedBadges: Array<any>;
    /** @type {boolean} loaded - A boolean variable that can be used to know if the data has been loaded. */
    loaded: boolean;
    constructor();
    /**
     * Use the init() method for starting the badges service.
     * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
     * @param {!boolean} companion - True if you are a companion, otherwise false if study_patient.
     * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
     */
    init(likes?: boolean, companion?: boolean, companionProfileId?: string): Promise<void>;
    /**
     * The private method for retrieving all the badges informations.
     * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
     * @param {!boolean} companion - True if you are a companion, otherwise false if study_patient.
     * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
     */
    private fetchBadges(likes, companion, companionProfileId);
    fetchAwardedBadges(): Promise<any>;
    /**
     * @param aw_item - The awarded badge.
     * @param {!boolean} companion - True if you are a companion, otherwise false if study_patient.
     * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
     */
    fetchLikes(aw_item: any, companion: any, companionProfileId: any): Promise<void>;
    /**
     * @param allBadgesData - All the badges on the platform.
     * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
     */
    private fillBadges(allBadgesData, likes?);
    /**
     * @param badgesArray - All the badges on the platform.
     * @param badge - A single badge.
     * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
     */
    private fillArray(badgesArray, badge, likes?);
    /**
     * @param recentBadgesArray - The array of recent badges.
     * @param badge - A single badge.
     */
    private fillRecentArray(recentBadgesArray, badge);
    /**
     *  For adding informations on the awarded badges items
     * @param id - The id of the awarded badge.
     * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
     */
    private findAwardedInfo(id, likes?);
    get(type: any, i: any, j: any): any;
    checkDisabled(type: any, i: any, j: any, direction: any): boolean;
    next(type: any, i: any, j: any): {
        item: any;
        i: any;
        j: any;
    };
    prev(type: any, i: any, j: any): {
        item: any;
        i: any;
        j: any;
    };
    updateLike(id: any): void;
    /**
     * Methods for like, unlike and checking the like
     * @param {!Badge} currBadge - The selected badge.
     * @param {!boolean} companion - True if you are a Companion.
     * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
     */
    like(currBadge: Badge, companion?: any, companionProfileId?: string): Promise<void>;
    /**
     * Methods for like, unlike and checking the like
     * @param {!Badge} currBadge - The selected badge.
     * @param {!boolean} companion - True if you are a Companion.
     * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
     */
    checkLike(currBadge: Badge, companion?: boolean, companionProfileId?: string): Promise<likeInfo>;
}
