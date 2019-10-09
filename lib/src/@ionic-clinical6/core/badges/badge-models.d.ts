/**
 * Models used in the badges service
 */
/**
 * A Model for the standard Badge.
 * This includes informations on the likes and on the awarding.
 */
export declare class Badge {
    /** @type {string} title - The title of the badge */
    title: string;
    /** @type {string} icon - The icon url of the badge */
    icon: string;
    /** @type {string} description - The description of the badge */
    description: string;
    /** @type {string} id - The id of the badge */
    id: string;
    /** @type {string} awardedId - The id of the correspondent awarded badge */
    awardedId: string;
    /** @type {boolean} awardedStatus - The status of the badge, true if awarded */
    awardedStatus: boolean;
    /** @type {string} awardedDate - The date of the awarding */
    awardedDate: string;
    /** @type {boolean} awardedTap - True if the badge have the like */
    awardedTap: boolean;
    /** @type {number} likeNumber - The number of likes on the badge */
    likeNumber: number;
    constructor(title: string, icon: string, description: string, id: string, awardedId: string, awardedStatus: boolean, awardedDate: string, awardedTap: boolean, likeNumber: number);
}
/**
* A Model for the Awarded Badge.
* This includes information on the likes.
*/
export declare class AwardedBadge {
    /** @type {string} awardedId - The id of the awarded badge */
    awardedId: string;
    /** @type {string} badgeId - The id of the correspondent badge */
    badgeId: string;
    /** @type {boolean} alreadyLiked - True if the badge have the like */
    alreadyLiked: boolean;
    /** @type {number} likeNumber - The number of likes */
    likeNumber: number;
    /** @type {string} awardedDate - The date of awarding */
    awardedDate: string;
    constructor(awardedId: string, badgeId: string, alreadyLiked: boolean, likeNumber: number, awardedDate: string);
}
export declare class likeInfo {
    /** @type {boolean} alreadyLike - True if there is the like */
    alreadyLike: boolean;
    /** @type {string} likeId - The id of the like */
    likeId: string;
    constructor(alreadyLike: boolean, likeId: string);
}
