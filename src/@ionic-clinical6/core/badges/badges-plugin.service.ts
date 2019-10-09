import { Injectable } from '@angular/core';
import { clinical6 } from 'clinical6';
import { Deserializer } from 'jsonapi-serializer';
import { Badge, AwardedBadge, likeInfo} from './badge-models';

/**
 * A Service for retrieving the badges.
 * This service use a matrix 3*m for storing and displaying the badges that is the one used in our projects.
 */
@Injectable()
export class BadgesPluginService {
  
  /** @type {Array} badges - All the badges available on the platform. */
  badges: Array<any>;
  /** @type {Array} recentBadges - The recent badges. */
  recentBadges: Array<any>;
  /** @type {Array} awardedBadges - The awarded badges. */
  awardedBadges: Array<any>;
  /** @type {boolean} loaded - A boolean variable that can be used to know if the data has been loaded. */
  loaded: boolean;

  constructor() {
  }

  /**
   * Use the init() method for starting the badges service.
   * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
   * @param {!boolean} companion - True if you are a companion, otherwise false if study_patient.
   * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
   */
  async init(likes?: boolean, companion?: boolean, companionProfileId?: string) {
      this.loaded = false;
      this.badges = [];
      this.recentBadges = [];
      this.awardedBadges = [];
      try {
          await this.fetchBadges(likes, companion, companionProfileId);
      } catch (error) {
          console.log('Error initializing the badges service', error);
      }
  }

  /** 
   * The private method for retrieving all the badges informations.
   * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
   * @param {!boolean} companion - True if you are a companion, otherwise false if study_patient.
   * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
   */
  private async fetchBadges(likes, companion, companionProfileId) {
      this.badges = [];
      this.recentBadges = [];
      this.awardedBadges = [];
      let allBadgesData;
      let awardedBadgesData;
      try {
          let _allBadgesData = await clinical6.fetch(`/v3/badges`, 'GET'); // fetching all the badges
          let deserializer = new Deserializer({keyForAttribute: 'camelCase'});
          allBadgesData = await deserializer.deserialize(_allBadgesData);
          awardedBadgesData = await this.fetchAwardedBadges(); // fetching the awarded badges
      } catch (error) {
          console.log('Error fetching badges informations', error);
      }
      if (likes) {
        try {
          for (let aw_item of awardedBadgesData.data ) {
            await this.fetchLikes(aw_item, companion, companionProfileId);
          }
          console.log('fetchBadges, data', allBadgesData);
          this.fillBadges(allBadgesData, likes);
          
        } catch (error) {
          console.log('Error fetching the awarded badges', error);
        }
      }
      else {
          // building the awarded badges array without the like informations
          for (let aw_item of awardedBadgesData.data ) {
              let fullAwardedBadge = new AwardedBadge(aw_item.id, aw_item.relationships.badge.data.id, false, 0, aw_item.attributes.earned_on_date);
              this.awardedBadges.push(fullAwardedBadge);
            }
          this.fillBadges(allBadgesData, likes);
      }
  }

  async fetchAwardedBadges() {
    try {
      let awardedBadgesData = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/badges`); // fetching the awarded badges
      return awardedBadgesData;
    } catch (error) {
      console.log('Error fetching awarded badges', error);
    }
  }

  /**
   * @param aw_item - The awarded badge.
   * @param {!boolean} companion - True if you are a companion, otherwise false if study_patient.
   * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
   */
  async fetchLikes(aw_item, companion, companionProfileId) {
    try {
      let checkLike = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/badges/${aw_item.id}/likes`, 'GET'); // fetching the likes
            let alreadyLiked = false; // default value to false
            let likeNumber = 0;
            for ( let ch_item of checkLike.data ) { // checking if the like exists
              if ( companion ) { // if companion i need to know if the like exists
                if ( ch_item.relationships.mobile_user.data.id === companionProfileId
                    && ch_item.relationships.likeable.data.id === aw_item.id ) {
                  alreadyLiked = true;
                  break;
              }
              else alreadyLiked = false;
              }
              else if (!companion) { // if patient i need to know the number of likes
                if ( ch_item.relationships.likeable.data.id === aw_item.id ) {
                  likeNumber++;
                }
              }
            } 
            // building the awarded badges array with the like informations
            let fullAwardedBadge = new AwardedBadge(aw_item.id, aw_item.relationships.badge.data.id, alreadyLiked, likeNumber, aw_item.attributes.earned_on_date);
            this.awardedBadges.push(fullAwardedBadge);
      
    } catch (error) {
      console.log('Error fetching likes', error);
    }
  }

  /**
   * @param allBadgesData - All the badges on the platform.
   * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
   */
  private fillBadges(allBadgesData, likes?) {
      for (let badge of allBadgesData) {
          this.fillArray(this.badges, badge, likes); // fill all the badges
      }
      for (let row of this.badges) {
          for (let fullBadge of row) {
              if (fullBadge.awardedDate) {
                  this.fillRecentArray(this.recentBadges, fullBadge); // fill only the recent badges
              }
          }
      }
      this.loaded = true;
  }

  /**
   * @param badgesArray - All the badges on the platform.
   * @param badge - A single badge.
   * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
   */
  private fillArray(badgesArray, badge, likes?) {
      if(likes) {
          if (!badgesArray[0]) {
              badgesArray.push([]);
            }
            let last = badgesArray.length - 1;
            if ( badgesArray[last].length !== 0 && badgesArray[last].length % 2 === 0 ) {
              badgesArray.push([]);
                }
              let awardedInfo = this.findAwardedInfo(badge.id, likes);
              let awardedStatus, awardedTap, awardedId, image_earned, awardedDate, likeNumber;
              if ( awardedInfo ) {
                awardedStatus = true;
                awardedTap = awardedInfo.tap;
                awardedId = awardedInfo.id;
                image_earned = badge.image.url;
                awardedDate = awardedInfo.date;
                likeNumber = awardedInfo.number;
              }
              else {
                awardedStatus = false;
                awardedTap = false;
                awardedId = null;
                image_earned = 'assets/images/badge_missing.png';
                awardedDate = null;
                likeNumber = 0;
              }
              let fullBadge = new Badge(badge.title, image_earned, badge.description, 
                                          badge.id, awardedId, awardedStatus, 
                                          awardedDate, awardedTap, likeNumber);
              badgesArray[last].push(fullBadge);
      }
      else {
          if (!badgesArray[0]) {
              badgesArray.push([]);
            }
            let last = badgesArray.length - 1;
            if ( badgesArray[last].length !== 0 && badgesArray[last].length % 2 === 0 ) {
              badgesArray.push([]);
                }
              let awardedInfo = this.findAwardedInfo(badge.id);
              let awardedStatus, awardedTap, awardedId, image_earned, awardedDate, likeNumber;
              if ( awardedInfo ) {
                awardedStatus = true;
                awardedId = awardedInfo.id;
                image_earned = badge.image.url;
                awardedDate = awardedInfo.date;
              }
              else {
                awardedStatus = false;
                awardedId = null;
                image_earned = 'assets/images/badge_missing.png';
                awardedDate = null;
              }
              let fullBadge = new Badge(badge.title, image_earned, badge.description, 
                                          badge.id, awardedId, awardedStatus, 
                                          awardedDate, awardedTap, likeNumber);
              badgesArray[last].push(fullBadge);
      }
      
    }

   /**
    * @param recentBadgesArray - The array of recent badges.
    * @param badge - A single badge.
    */
    private fillRecentArray(recentBadgesArray, badge) {
      if (!recentBadgesArray[0]) {
        recentBadgesArray.push([]);
      }
      let last = recentBadgesArray.length - 1;
      recentBadgesArray[last].push(badge);
    }

    /**
     *  For adding informations on the awarded badges items 
     * @param id - The id of the awarded badge.
     * @param {!boolean} likes - True if you need 'Likes' informations on the badges too, otherwise false.
     */
    private findAwardedInfo(id, likes?) {
        if (likes) {
          for (let item of this.awardedBadges ) {
              if ( item.badgeId === id.toString() ) {
                return {
                  id: item.awardedId,
                  tap: item.alreadyLiked,
                  date: item.awardedDate,
                  number: item.likeNumber
                };
              }
            }
        }
        else {
          for (let item of this.awardedBadges ) {
              if ( item.badgeId === id.toString() ) {
                return {
                  id: item.awardedId,
                  tap: null,
                  date: item.awardedDate,
                  number: null
                };
              }
            }
        }
    }

    get(type, i, j) {
      let badgesData = this.badges;
      if (type === 'recentBadges') badgesData = this.recentBadges;
      return badgesData[i][j];
    }

    checkDisabled(type, i, j, direction) {
      let badgesData = this.badges;
      if (type === 'recentBadges') badgesData = this.recentBadges;
      let disabled = false;
      if (direction === 'prev') {
        if ( i === 0 && j === 0 ) disabled = true;
      }
      else {
        if ( (i === badgesData.length - 1) && j === (i === badgesData[i].length - 1) )
          disabled = true;
        else if ( (i === badgesData.length - 1) &&  badgesData[i][j + 1] && badgesData[i][j + 1].title === null )
          disabled = true;
      }
      return disabled;
    }
  
    next(type, i, j) {
      let badgesData = this.badges;
      if (type === 'recentBadges') badgesData = this.recentBadges;
      let row = i;
      let col = j;
      if (col < badgesData[row].length - 1) {
        if ( badgesData[row][col + 1].title )
          col++;
      }
      else if ( row < badgesData.length - 1 ) {
        col = 0;
        row++;
      }
      return {
        item: badgesData[row][col],
        i: row,
        j: col
      };
    }
  
    prev(type, i, j) {
      let badgesData = this.badges;
      if (type === 'recentBadges') badgesData = this.recentBadges;
      let row = i;
      let col = j;
      if (col > 0) {
        col--;
      }
      else if ( row > 0 ) {
        row--;
        col = badgesData[row].length - 1;
      }
      return {
        item: badgesData[row][col],
        i: row,
        j: col
      };
    }

    updateLike(id) {
        for ( let item of this.badges ) {
          for ( let el of item ) {
            if ( item.awardedId && item.awardedId === id ) {
              item.awardedTap = true;
              item.awardedStatus = true;
            }
          }
        }
    }

    /**
     * Methods for like, unlike and checking the like 
     * @param {!Badge} currBadge - The selected badge.
     * @param {!boolean} companion - True if you are a Companion.
     * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
     */
    async like(currBadge: Badge, companion?, companionProfileId?: string) {
      let check = await this.checkLike(currBadge, companion, companionProfileId);
      try {
        if (!check.alreadyLike) {
          let data = {
            data : {
              type: 'likes',
              relationships: {
                mobile_users: {
                    data: {
                        type: 'mobile_users',
                        id: companionProfileId
                  }
                },
                likeable: {
                    data: {
                        type: 'awarded_badges',
                        id: currBadge.awardedId // this should be the selected awarded badge
                  }
                }
              }
            }
          };
          let response = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/badges/${currBadge.awardedId}/likes`, 'POST', data);
        }
        else if (check.alreadyLike) {
          let response = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/badges/${currBadge.awardedId}/likes/${check.likeId.toString()}`, 'DELETE');
        }
        let _check = await this.checkLike(currBadge, companion, companionProfileId);
      } catch (error) {
        console.log('Error performing Like for badge', error);
      }
    }
    
    /**
     * Methods for like, unlike and checking the like 
     * @param {!Badge} currBadge - The selected badge.
     * @param {!boolean} companion - True if you are a Companion.
     * @param {!string} companionProfileId - If companion you must enter your profile id for fetching your 'Likes'.
     */
    async checkLike(currBadge: Badge, companion?: boolean, companionProfileId?: string) {
      if ( currBadge.awardedId ) {
        try {
          let response = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/badges/${currBadge.awardedId}/likes`, 'GET');
          if (response.data.length > 0) {
            let check = new likeInfo(false, '');
            for ( let item of response.data ) {
              if ( companion ) {
                if ( item.relationships.mobile_user.data.id === companionProfileId && item.relationships.likeable.data.id === currBadge.awardedId ) {
                  check.alreadyLike = true;
                  check.likeId = item.id;
                  return check;
                }
              }
            }
            return check;
          }
          else {
            let check = new likeInfo(false, '');
            return check;
          }
        }
        catch (error) {
          console.log('Error checking Like', error);         
        }
      }
    }
}
