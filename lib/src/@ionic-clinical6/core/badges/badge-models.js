/**
 * Models used in the badges service
 */
/**
 * A Model for the standard Badge.
 * This includes informations on the likes and on the awarding.
 */
export class Badge {
    constructor(title, icon, description, id, awardedId, awardedStatus, awardedDate, awardedTap, likeNumber) {
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
    constructor(awardedId, badgeId, alreadyLiked, likeNumber, awardedDate) {
        this.awardedId = awardedId;
        this.badgeId = badgeId;
        this.alreadyLiked = alreadyLiked;
        this.likeNumber = likeNumber;
        this.awardedDate = awardedDate;
    }
}
/* A Model for the like's informations. */
export class likeInfo {
    constructor(alreadyLike, likeId) {
        this.alreadyLike = alreadyLike;
        this.likeId = likeId;
    }
}

//# sourceMappingURL=badge-models.js.map
