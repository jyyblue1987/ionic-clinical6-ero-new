/** 
 * Models used in the badges service 
 */

/** 
 * A Model for the standard Badge.
 * This includes informations on the likes and on the awarding.
 */
export class Badge {
    /** @type {string} title - The title of the badge */
    public title: string;
    /** @type {string} icon - The icon url of the badge */
    public icon: string;
    /** @type {string} description - The description of the badge */
    public description: string;
    /** @type {string} id - The id of the badge */
    public id: string;
    /** @type {string} awardedId - The id of the correspondent awarded badge */
    public awardedId: string;
    /** @type {boolean} awardedStatus - The status of the badge, true if awarded */
    public awardedStatus: boolean;
    /** @type {string} awardedDate - The date of the awarding */
    public awardedDate: string;
    /** @type {boolean} awardedTap - True if the badge have the like */
    public awardedTap: boolean;
    /** @type {number} likeNumber - The number of likes on the badge */
    public likeNumber: number;
  
    constructor(
      title: string, 
      icon: string, 
      description: string, 
      id: string,
      awardedId: string, 
      awardedStatus: boolean, 
      awardedDate: string, 
      awardedTap: boolean, 
      likeNumber: number
    ) {
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.id = id;
        this.awardedId = awardedId;
        this.awardedStatus = awardedStatus;
        this.awardedDate = awardedDate;
        this.awardedTap = awardedTap;
        this.likeNumber = likeNumber;
      }
  }
  
  /**
  * A Model for the Awarded Badge.
  * This includes information on the likes.
  */
  export class AwardedBadge {
    /** @type {string} awardedId - The id of the awarded badge */
    public awardedId: string;
    /** @type {string} badgeId - The id of the correspondent badge */
    public badgeId: string;
    /** @type {boolean} alreadyLiked - True if the badge have the like */
    public alreadyLiked: boolean;
    /** @type {number} likeNumber - The number of likes */
    public likeNumber: number;
    /** @type {string} awardedDate - The date of awarding */
    public awardedDate: string;
  
    constructor(
      awardedId: string,
      badgeId: string,
      alreadyLiked: boolean,
      likeNumber: number,
      awardedDate: string
    ) {
        this.awardedId = awardedId;
        this.badgeId = badgeId;
        this.alreadyLiked = alreadyLiked;
        this.likeNumber = likeNumber;
        this.awardedDate = awardedDate;
      }
  }
  
  /* A Model for the like's informations. */
  export class likeInfo {
    /** @type {boolean} alreadyLike - True if there is the like */
    public alreadyLike: boolean;
    /** @type {string} likeId - The id of the like */
    public likeId: string;
  
    constructor(
      alreadyLike: boolean,
      likeId: string
    ) {
      this.alreadyLike = alreadyLike;
      this.likeId = likeId;
    }
  }