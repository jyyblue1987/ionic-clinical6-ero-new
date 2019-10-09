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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from 'clinical6';
import { COMPANION_PROFILE_FORM } from '../profile.mock';
import { UserProfilePage } from '../user-profile/user-profile';
import { ProfileService } from '../profile.service';
import { UtilsService } from '../../../utils.service';
let CompanionsDashboardPage = class CompanionsDashboardPage {
    constructor(utilsSvc, profileSvc, loadingController, navParams, nav) {
        this.utilsSvc = utilsSvc;
        this.profileSvc = profileSvc;
        this.loadingController = loadingController;
        this.navParams = navParams;
        this.nav = nav;
        /** @param  {Object} page  - Default values for the page */
        this.page = {
            toolbar: 'Companions',
            title: 'Companions List',
            image: null,
            description: 'Tap to see your companion info'
        };
        this.useOldApi = this.navParams.get('useOldApi') || false;
        this.getCompanionsList();
    }
    /**
     * @async
     * @function getCompanionsList - Get the Companions List
    **/
    getCompanionsList() {
        return __awaiter(this, void 0, void 0, function* () {
            this.utilsSvc.presentLoading('');
            try {
                this.companions = [];
                this.companions = yield this.profileSvc.getCompanionsList(this.useOldApi);
                console.log('companions list', this.companions);
            }
            catch (e) {
                console.error(e);
            }
            this.utilsSvc.dismissLoader();
        });
    }
    /**
     * @async
     * @function showCompanionProfile - Shows the companion profile
    **/
    showCompanionProfile(companion) {
        return __awaiter(this, void 0, void 0, function* () {
            this.utilsSvc.presentLoading('');
            try {
                let user = new User({ id: companion.id, type: companion.type });
                const profile = yield this.profileSvc.getUserProfile(false, user);
                let step = this.navParams.get('step') || COMPANION_PROFILE_FORM;
                this.nav.push(UserProfilePage, { step: step, profile: profile, useOldApi: false, user: user });
            }
            catch (e) {
                console.error(e);
            }
            this.utilsSvc.dismissLoader();
        });
    }
    /**
     * @type {string} - Returns the Companion info about the first and the last name
     **/
    getTitle(companion) {
        return companion.attributes.first_name ? (companion.attributes.first_name + ' ' +
            (companion.attributes.last_name ? companion.attributes.last_name : '')) : null;
    }
    /**
     * @type {string} - Returns the Companion info about the first and the last name
     **/
    getSubtitle(companion) {
        return companion.attributes.first_name ? (companion.attributes.first_name + ' ' +
            (companion.attributes.last_name ? companion.attributes.last_name : '')) : null;
    }
    /**
     * @type {string} - Returns the Companion info about the relationship
     **/
    getInfo(companion) {
        return companion.relationship ? companion.relationship : null;
    }
};
CompanionsDashboardPage = __decorate([
    Component({
        selector: 'companions-dashboard-page',
        template: `

    <ion-header>
        <app-toolbar [backLabel]="'Back'" [title]="page.toolbar"></app-toolbar>
    </ion-header>

    <ion-content>
    <div class="title" *ngIf="page.title" [innerHTML]="page.title" text-center></div>
    <div *ngIf="page.image" class="content-img">
        <img class="icon-image" src="{{page.image.original}}"/>
    </div>
    <div class="helper"  *ngIf="page.description" [innerHTML]="page.description" text-center></div>
    <div class="view-content">
        <ion-card  *ngFor="let comp of companions; let i = index" [attr.data-index]="i">
            <button ion-item class="item-ios" (click)="showCompanionProfile(comp)">
                <ion-avatar item-start>
                    <img class='avatar' *ngIf="comp.attributes.avatar" src="{{comp.attributes.avatar.thumb}}"/>
                    <img class="avatar" *ngIf="!comp.attributes.avatar" src="assets/icon/user.svg"/> 
                </ion-avatar>
                <h1 *ngIf="getTitle(comp)" class="comp-title" [innerHTML]="getTitle(comp)"></h1>
                <h3 *ngIf="getSubtitle(comp)" class="comp-subtitle" [innerHTML]="getSubtitle(comp)"></h3>
                <p *ngIf="getInfo(comp)" class="comp-info" [innerHTML]="getInfo(comp)"></p>
            </button>
        </ion-card>
    </div>
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [UtilsService,
        ProfileService,
        LoadingController,
        NavParams,
        NavController])
], CompanionsDashboardPage);
export { CompanionsDashboardPage };

//# sourceMappingURL=companions-dashboard.js.map
