import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { clinical6, User } from 'clinical6';
import { InputStyleUtil } from '../../../flow_process/flow_inputs/input.model';
import { PATIENT_PROFILE_FORM } from '../profile.mock';
import { TransferObject } from '@ionic-native/transfer';
import { Camera, Direction } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { ProfileService } from '../profile.service';
import { UtilsService } from '../../../utils.service';

@Component({
  selector: 'user-profile-page',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
  /** @param  {any} profile - Parameter to store the user's profile information  */
  profile: any = {};
  /** @param  {Object} step - Parameter used to get FlowStep information  */
  step: Object = {};
  /** @param  {Array<Object>} profileData - Parameter used to save/store the input values about the Profile  */
  profileData = [];
  /** @param  {boolean} editing    - Checks the form editing status */
  editing: boolean = false;
  /** @param  {boolean} formValid  - Checks if the form is valid */
  formValid: boolean;
  /** @param  {boolean} useOldApi  - Enables the fetch methods in order to use old v1/v2 apis */
  useOldApi: boolean;
  /** @param  {boolean} loading    - Forces the DOM view refresh */
  loading: boolean = true;
  /** @param  {boolean} imgLoading - Checks if the image/photo is loading */
  imgLoading: boolean = true;
  /** @param  {boolean} imgLoading - Shows a spinner if the image is loading */
  showAvatar: boolean;
  /** @param  {string} photo - Stores the user's photo selected from the gallery  */
  photo: string;

    constructor(
      public utilsSvc: UtilsService,
      public profileSvc: ProfileService,
      public transferObject: TransferObject,
      public camera: Camera,
      public actionSheetCtrl: ActionSheetController,
      public navParams: NavParams,
      public nav: NavController,
      public platform?: Platform) {

    this.filter['excludeQuestion'] = true;
    /** retrieve the nav parameters */
    this.step = this.navParams.get('step') || PATIENT_PROFILE_FORM;
    this.profile = this.navParams.get('profile') || null;
    this.useOldApi = this.navParams.get('useOldApi') || false;
    this.showAvatar = this.navParams.get('showAvatar') || false;
    // maps the profile form with the correct info
    this.getUserProfile();
    // input-container setup
    for (let inputState of this.step['inputs']) {
      inputState.inputId = inputState.id;
      inputState.inputTitle = inputState.title;
      inputState.inputStyle = InputStyleUtil.getStyle(inputState.style);
      inputState.inputChoices = inputState.choice_list;
      for (let choiceState of inputState.inputChoices) {
        choiceState.choiceId = choiceState.id;
        choiceState.choiceBody = choiceState.body;
        choiceState.choiceSelected = false;
      }
    }
  }

  /**
   * @async 
   * @function getUserProfile - Maps all the profile attributes with the correct input
  **/
  async getUserProfile() {
    this.utilsSvc.presentLoading('');
    try {
      if (!this.profile) {
        this.profile = await this.profileSvc.getUserProfile(this.useOldApi, this.user)
      }
      clinical6.user.profile = this.profile;
      this.photo = this.profileImg;
      this.mapRemoteProfileData(this.step['inputs'], this.profile);
    } catch (e) {
      console.error(e);
    }
    this.utilsSvc.dismissLoader();
    this.loading = false;
  }
  
  /**
   * @function mapRemoteProfileData - maps the profile form with the correct info
   * @param {Array<any>} inputs - FlowStep inputs
   * @param {any} profile - current profile object
  **/
  mapRemoteProfileData(inputs: Array<any>, profile: any) {
    for (let input of inputs) {
      switch (input.id) {
        case 'street':
        case 'city':
        case 'state':
        case 'zip_code':
        case 'country':
          this.profileData[input.id] = profile[input.id] || (profile['home_location'] ? profile['home_location'][input.id] : '');
          break;
        default:
          this.profileData[input.id] = profile[input.id];
      }
    }
  }

  /**
   * @callback updateControlValue - Updates the value if an input changes
   * @param event
  **/
  updateControlValue(event) {
    switch (event.id) {
      case 'state':
      case 'city':
      case 'street':
      case 'zip_code':
      case 'country':
        if (this.useOldApi) {
          if (!this.profileData['home_location'])
            this.profileData['home_location'] = {};
          this.profileData['home_location'][event.id] = event.value;
          this.profileData[event.id] =  event.value;
          break;
        }
      default:
        this.profileData[event.id] =  event.value;
    }
  }

  /**
   * @async
   * @function saveUserProfile - Save the User Profile info
   * @param event
  **/
  async saveUserProfile() {
    this.utilsSvc.presentLoading('');
    this.savePhoto();

    try {
      this.profile = await this.profileSvc.saveUserProfile(this.useOldApi, {profile: this.profile, user: this.user, profileData: this.profileData})
      console.log('new user profile: ', this.profile);
      clinical6.user.profile = this.profile;
      this.nav.pop();
    } catch (e) {
      console.error(e);
    }
    this.utilsSvc.dismissLoader();
  }

  /**
   * @type {User} - Returns the current user object
  **/
  get user(): User {
    return this.navParams.get('user') || clinical6.user;
  }

  /**
   * @type {Object} - Returns the filters for input-container
  **/
  get filter(): Object {
    return {excludeQuestion: true};
  }

  /**
   * @type {string} - Returns the user's image url
  **/
  get profileImg(): string {
    return (this.profile.avatar && (this.profile.avatar.thumb ? this.profile.avatar.thumb.url: this.profile.avatar.url));
  }

  /**
   * @callback doneEditingCallback - Callback to stop the form editing
  **/
  doneEditingCallback() {
    this.editing = false;
  }


  /**
   * @callback enterEditMode - Callback to start the form editing
  **/
  enterEditMode() {
    this.editing = true;
  }

  /**
   * @callback updateFormStatus - updates the status of the form
   * @param {Boolean} value     - the status of the form 
  **/
  updateFormStatus(value: boolean) {
    this.formValid = value;
  }

  /**
   * @callback actionDoneEdit - checks the form status
  **/
  actionDoneEdit() {
    if (this.editing) return this.saveUserProfile();
    else if (!this.editing) return this.enterEditMode();
  }

  /**
   * @callback actionDoneEdit - This is to Handle the 'Go' button on the device Keyboard for iOS
   * @param event
  **/
  handleGoButton(event: KeyboardEvent) {
    if (this.platform && this.platform.is('ios')) {
      if (event.keyCode === 13) {
        this.doneEditingCallback();
      }
    }
  }

  /**
   * @callback imgLoaded - Sets to false the imgLoading variable once the image has been loaded correctly
  **/
  imgLoaded() {
    this.imgLoading = false;
  }

  /**
   * @callback imgLoaded - Callback in case the image has not been loaded correctly
  **/
  imgError(event: any) {
    console.log('image error called ', event);
    this.imgLoaded();
  }

  /** HELPER METHODS TO MANAGE THE PHOTO UPLOAD  */

  /**
   * @async
   * @function savePhoto - Add a new image to the User profile (this uses the PATCH method of the old profile api)
   * @param event
  **/
  async savePhoto() {
    let uri = clinical6.apiBaseUrl +  '/api/profile';
    try {
      let success = await this.transferObject.upload(this.photo, encodeURI(uri), {
        fileKey: 'avatar',
        httpMethod: 'PUT',
        mimeType: 'image/jpeg',
        headers: {'Authorization': `Token token=${clinical6.authToken}`}
      });
      console.log('file uploaded', success);
    } catch (err) {
      console.log('file upload failed');
    }
  }

  /**
   * @async
   * @function takePhoto - Gets the picture from the gallery
   * @param event
  **/
  async takePhoto() {
    try {
      let imageData = await this.camera.getPicture({
        quality: 80,
        targetWidth: 600,
        targetHeight: 600,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.DATA_URL,
        cameraDirection: Direction.FRONT,
        allowEdit: true
      });
      this.photo = 'data:image/jpeg;base64,' + imageData;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @async
   * @function openGallery - Opens the Device Gallery
   * @param event
  **/
  async openGallery() {
    try {
      let imageData = await this.camera.getPicture({
        quality: 80,
        targetWidth: 600,
        targetHeight: 600,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL
      });
      this.photo = 'data:image/jpeg;base64,' + imageData;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @function changePhoto - Shows the photo profile options if the form editng is not allowed 
  **/
  changePhoto() {
    if (!this.editing) return;
    this.showPhotoProfileOptions();
  }

  /**
   * @function showPhotoProfileOptions - Opens an action sheet with a title, subTitle, and an array of buttons
  **/
  showPhotoProfileOptions() {
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Profile Photo',
      buttons: [
        {
          text: 'Take a new Photo',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
                this.openGallery();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
   });

   actionSheet.present();
 }

}

