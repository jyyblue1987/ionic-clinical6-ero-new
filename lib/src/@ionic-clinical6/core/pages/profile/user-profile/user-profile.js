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
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { clinical6 } from 'clinical6';
import { InputStyleUtil } from '../../../flow_process/flow_inputs/input.model';
import { PATIENT_PROFILE_FORM } from '../profile.mock';
import { TransferObject } from '@ionic-native/transfer';
import { Camera, Direction } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { ProfileService } from '../profile.service';
import { UtilsService } from '../../../utils.service';
let UserProfilePage = class UserProfilePage {
    constructor(utilsSvc, profileSvc, transferObject, camera, actionSheetCtrl, navParams, nav, platform) {
        this.utilsSvc = utilsSvc;
        this.profileSvc = profileSvc;
        this.transferObject = transferObject;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.platform = platform;
        /** @param  {any} profile - Parameter to store the user's profile information  */
        this.profile = {};
        /** @param  {Object} step - Parameter used to get FlowStep information  */
        this.step = {};
        /** @param  {Array<Object>} profileData - Parameter used to save/store the input values about the Profile  */
        this.profileData = [];
        /** @param  {boolean} editing    - Checks the form editing status */
        this.editing = false;
        /** @param  {boolean} loading    - Forces the DOM view refresh */
        this.loading = true;
        /** @param  {boolean} imgLoading - Checks if the image/photo is loading */
        this.imgLoading = true;
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
    getUserProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            this.utilsSvc.presentLoading('');
            try {
                if (!this.profile) {
                    this.profile = yield this.profileSvc.getUserProfile(this.useOldApi, this.user);
                }
                clinical6.user.profile = this.profile;
                this.photo = this.profileImg;
                this.mapRemoteProfileData(this.step['inputs'], this.profile);
            }
            catch (e) {
                console.error(e);
            }
            this.utilsSvc.dismissLoader();
            this.loading = false;
        });
    }
    /**
     * @function mapRemoteProfileData - maps the profile form with the correct info
     * @param {Array<any>} inputs - FlowStep inputs
     * @param {any} profile - current profile object
    **/
    mapRemoteProfileData(inputs, profile) {
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
                    this.profileData[event.id] = event.value;
                    break;
                }
            default:
                this.profileData[event.id] = event.value;
        }
    }
    /**
     * @async
     * @function saveUserProfile - Save the User Profile info
     * @param event
    **/
    saveUserProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            this.utilsSvc.presentLoading('');
            this.savePhoto();
            try {
                this.profile = yield this.profileSvc.saveUserProfile(this.useOldApi, { profile: this.profile, user: this.user, profileData: this.profileData });
                console.log('new user profile: ', this.profile);
                clinical6.user.profile = this.profile;
                this.nav.pop();
            }
            catch (e) {
                console.error(e);
            }
            this.utilsSvc.dismissLoader();
        });
    }
    /**
     * @type {User} - Returns the current user object
    **/
    get user() {
        return this.navParams.get('user') || clinical6.user;
    }
    /**
     * @type {Object} - Returns the filters for input-container
    **/
    get filter() {
        return { excludeQuestion: true };
    }
    /**
     * @type {string} - Returns the user's image url
    **/
    get profileImg() {
        return (this.profile.avatar && (this.profile.avatar.thumb ? this.profile.avatar.thumb.url : this.profile.avatar.url));
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
    updateFormStatus(value) {
        this.formValid = value;
    }
    /**
     * @callback actionDoneEdit - checks the form status
    **/
    actionDoneEdit() {
        if (this.editing)
            return this.saveUserProfile();
        else if (!this.editing)
            return this.enterEditMode();
    }
    /**
     * @callback actionDoneEdit - This is to Handle the 'Go' button on the device Keyboard for iOS
     * @param event
    **/
    handleGoButton(event) {
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
    imgError(event) {
        console.log('image error called ', event);
        this.imgLoaded();
    }
    /** HELPER METHODS TO MANAGE THE PHOTO UPLOAD  */
    /**
     * @async
     * @function savePhoto - Add a new image to the User profile (this uses the PATCH method of the old profile api)
     * @param event
    **/
    savePhoto() {
        return __awaiter(this, void 0, void 0, function* () {
            let uri = clinical6.apiBaseUrl + '/api/profile';
            try {
                let success = yield this.transferObject.upload(this.photo, encodeURI(uri), {
                    fileKey: 'avatar',
                    httpMethod: 'PUT',
                    mimeType: 'image/jpeg',
                    headers: { 'Authorization': `Token token=${clinical6.authToken}` }
                });
                console.log('file uploaded', success);
            }
            catch (err) {
                console.log('file upload failed');
            }
        });
    }
    /**
     * @async
     * @function takePhoto - Gets the picture from the gallery
     * @param event
    **/
    takePhoto() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imageData = yield this.camera.getPicture({
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
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    /**
     * @async
     * @function openGallery - Opens the Device Gallery
     * @param event
    **/
    openGallery() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imageData = yield this.camera.getPicture({
                    quality: 80,
                    targetWidth: 600,
                    targetHeight: 600,
                    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: this.camera.DestinationType.DATA_URL
                });
                this.photo = 'data:image/jpeg;base64,' + imageData;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    /**
     * @function changePhoto - Shows the photo profile options if the form editng is not allowed
    **/
    changePhoto() {
        if (!this.editing)
            return;
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
};
UserProfilePage = __decorate([
    Component({
        selector: 'user-profile-page',
        template: `
    <ion-header>
        <app-toolbar [title]="step.toolbar" 
        layout="plain-action" 
        [backLabel]="'Back'">
        </app-toolbar>
      </ion-header>
      <ion-content padding>

          <div *ngIf="step.title" class="title" [innerHTML]="step.title"></div>

          <div *ngIf="step.image" class="content-img">
              <img class="icon-img" src="{{step.image.original}}"/>        
          </div>
    
          <div *ngIf="step.description" class="helper" [innerHTML]="step.description"></div>

          <div class="profile-image-container" *ngIf="showAvatar">
              <button no-padding ion-button clear class="img-mask no-photo" *ngIf="!photo" (click)="changePhoto()" [disabled]="!editing">
                <ion-icon name="camera"  class="image">
                </ion-icon>
              </button>
    
              <button no-padding ion-button clear class="img-mask photo" *ngIf="photo" (click)="changePhoto()">
                <img [src]="photo" class="image" [style.display]="imgLoading?'none':'block'" (load)="imgLoaded()" (error)="imgError($event)"/>
                <ion-spinner [style.display]="!imgLoading?'none':'inline-block'"></ion-spinner>
              </button>
          </div>
  
          <input-container *ngIf="!loading" [inputList]="step.inputs" [fields]="profileData" [filter]="filter" [readonly]="!editing"
            (formStatusChanged)="updateFormStatus($event)" (formValueChanged)="updateControlValue($event)"
            (keyup)="handleGoButton($event)" (goToPage)="goToPage($event)" labelStyle="stacked">
          </input-container> 
  
      </ion-content>
  
      <ion-footer no-border *ngIf="step.content_type==='profile_edit_page'">
        <ion-toolbar no-border >
          <ion-row class="footer-buttons">
            <ion-col no-padding>
              <button ion-button full color="std-button" [disabled]="!formValid && editing" (click)="actionDoneEdit()">{{editing?'Save':'Edit'}}</button>
            </ion-col>
          </ion-row>
        </ion-toolbar>
      </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [UtilsService,
        ProfileService,
        TransferObject,
        Camera,
        ActionSheetController,
        NavParams,
        NavController,
        Platform])
], UserProfilePage);
export { UserProfilePage };

//# sourceMappingURL=user-profile.js.map
