import { NavController, NavParams, Platform } from 'ionic-angular';
import { User } from 'clinical6';
import { TransferObject } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { ProfileService } from '../profile.service';
import { UtilsService } from '../../../utils.service';
export declare class UserProfilePage {
    utilsSvc: UtilsService;
    profileSvc: ProfileService;
    transferObject: TransferObject;
    camera: Camera;
    actionSheetCtrl: ActionSheetController;
    navParams: NavParams;
    nav: NavController;
    platform: Platform;
    /** @param  {any} profile - Parameter to store the user's profile information  */
    profile: any;
    /** @param  {Object} step - Parameter used to get FlowStep information  */
    step: Object;
    /** @param  {Array<Object>} profileData - Parameter used to save/store the input values about the Profile  */
    profileData: any[];
    /** @param  {boolean} editing    - Checks the form editing status */
    editing: boolean;
    /** @param  {boolean} formValid  - Checks if the form is valid */
    formValid: boolean;
    /** @param  {boolean} useOldApi  - Enables the fetch methods in order to use old v1/v2 apis */
    useOldApi: boolean;
    /** @param  {boolean} loading    - Forces the DOM view refresh */
    loading: boolean;
    /** @param  {boolean} imgLoading - Checks if the image/photo is loading */
    imgLoading: boolean;
    /** @param  {boolean} imgLoading - Shows a spinner if the image is loading */
    showAvatar: boolean;
    /** @param  {string} photo - Stores the user's photo selected from the gallery  */
    photo: string;
    constructor(utilsSvc: UtilsService, profileSvc: ProfileService, transferObject: TransferObject, camera: Camera, actionSheetCtrl: ActionSheetController, navParams: NavParams, nav: NavController, platform?: Platform);
    /**
     * @async
     * @function getUserProfile - Maps all the profile attributes with the correct input
    **/
    getUserProfile(): Promise<void>;
    /**
     * @function mapRemoteProfileData - maps the profile form with the correct info
     * @param {Array<any>} inputs - FlowStep inputs
     * @param {any} profile - current profile object
    **/
    mapRemoteProfileData(inputs: Array<any>, profile: any): void;
    /**
     * @callback updateControlValue - Updates the value if an input changes
     * @param event
    **/
    updateControlValue(event: any): void;
    /**
     * @async
     * @function saveUserProfile - Save the User Profile info
     * @param event
    **/
    saveUserProfile(): Promise<void>;
    /**
     * @type {User} - Returns the current user object
    **/
    readonly user: User;
    /**
     * @type {Object} - Returns the filters for input-container
    **/
    readonly filter: Object;
    /**
     * @type {string} - Returns the user's image url
    **/
    readonly profileImg: string;
    /**
     * @callback doneEditingCallback - Callback to stop the form editing
    **/
    doneEditingCallback(): void;
    /**
     * @callback enterEditMode - Callback to start the form editing
    **/
    enterEditMode(): void;
    /**
     * @callback updateFormStatus - updates the status of the form
     * @param {Boolean} value     - the status of the form
    **/
    updateFormStatus(value: boolean): void;
    /**
     * @callback actionDoneEdit - checks the form status
    **/
    actionDoneEdit(): void | Promise<void>;
    /**
     * @callback actionDoneEdit - This is to Handle the 'Go' button on the device Keyboard for iOS
     * @param event
    **/
    handleGoButton(event: KeyboardEvent): void;
    /**
     * @callback imgLoaded - Sets to false the imgLoading variable once the image has been loaded correctly
    **/
    imgLoaded(): void;
    /**
     * @callback imgLoaded - Callback in case the image has not been loaded correctly
    **/
    imgError(event: any): void;
    /** HELPER METHODS TO MANAGE THE PHOTO UPLOAD  */
    /**
     * @async
     * @function savePhoto - Add a new image to the User profile (this uses the PATCH method of the old profile api)
     * @param event
    **/
    savePhoto(): Promise<void>;
    /**
     * @async
     * @function takePhoto - Gets the picture from the gallery
     * @param event
    **/
    takePhoto(): Promise<void>;
    /**
     * @async
     * @function openGallery - Opens the Device Gallery
     * @param event
    **/
    openGallery(): Promise<void>;
    /**
     * @function changePhoto - Shows the photo profile options if the form editng is not allowed
    **/
    changePhoto(): void;
    /**
     * @function showPhotoProfileOptions - Opens an action sheet with a title, subTitle, and an array of buttons
    **/
    showPhotoProfileOptions(): void;
}
