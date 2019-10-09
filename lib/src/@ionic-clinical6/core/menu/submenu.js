var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, ModalController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../clinical6.service';
import { MenuService } from './menu.service';
import { AppConfig } from '../config';
import { flowService } from 'clinical6';
import { Flows } from '../flow_process/flow-factory';
let SlidingMenuSubCategoryPage = class SlidingMenuSubCategoryPage {
    constructor(captiveReach, nav, loader, modalCtrl, viewCtrl, navParams, menuService, menuCtrl, alertCtrl) {
        this.captiveReach = captiveReach;
        this.nav = nav;
        this.loader = loader;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.menuService = menuService;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.menuItem = this.navParams.get('menu');
        this.pages = this.menuItem['subcategories'];
        this.loadingProcess = false;
        this.loadFlowProcessAction = 'flow_process';
    }
    openPage(menuItem) {
        if (menuItem.action === this.loadFlowProcessAction) {
            this.goToFlow(menuItem);
            return;
        }
        const nextScreen = this.menuService.getComponent(menuItem);
        if (nextScreen) {
            this.nav.push(nextScreen.page, Object.assign({ menu: menuItem }, nextScreen.options), AppConfig.animationOpt);
        }
    }
    /**
     * This is called in case a flow is completed
     * it should be overridden whenever needed
     * @param flow
     */
    flowCompleteCallback(flow) {
    }
    goToFlow(menuItem) {
        this.loadingProcess = true;
        flowService.getFlow(menuItem.action)
            .then(flow => {
            if (flow.first) {
                flow.end = (step) => {
                    this.flowCompleteCallback(flow);
                };
                flowService.getInputDataByFlow(flow)
                    .then((result) => {
                    this.loadingProcess = false;
                    this.nav.push(Flows.Factory(flow.first), { step: flow.first });
                    this.menuCtrl.close();
                }).catch((result) => {
                    this.loadingProcess = false;
                    console.error('Flow Data Retrieval Error: ', result);
                    // TODO: Ignoring errors here because of a bug on the Mobile Menu API
                    // returning flow id instead of permanent_link
                    this.nav.push(Flows.Factory(flow.first), { step: flow.first });
                    this.menuCtrl.close();
                    // this.showError(null, 'Error Connecting to Server. (2)');
                });
            }
            else {
                this.loadingProcess = false;
                this.showError(null, 'Details: received flow is inconsistent.');
            }
        })
            .catch(reason => {
            this.loadingProcess = false;
            this.showError(null, 'Details: ' + reason);
        });
    }
    showError(title = 'Error', errorText) {
        let alert = this.alertCtrl.create({
            title: title,
            message: errorText,
            cssClass: 'email-alert',
            buttons: [
                {
                    text: 'Ok',
                    handler: data => {
                    }
                }
            ]
        });
        alert.present();
    }
    // to fix the issue related to the fetch method for old endpoint
    getImage(page) {
        return `url(${page.image.url || page.image.image.url})`;
    }
};
SlidingMenuSubCategoryPage = __decorate([
    Component({
        selector: 'sliding-submenu',
        template: `
    <ion-header>
      <app-toolbar [title]="menuItem.title" [backLabel]="'Home'"
                  layout="plain"
                 ></app-toolbar>
    </ion-header>

    <ion-content no-padding (click)="return;">
      <ion-list>
        <button ion-button clear full *ngFor="let page of pages" (click)="openPage(page)" class="list-button">
          <div class="text">{{page.title}}</div>
          <div class="action-label"><div class="app-p6-icon-chevron-right action-arrow"></div></div>
        </button>
      </ion-list>
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [Clinical6Service,
        NavController,
        LoadingController,
        ModalController,
        ViewController,
        NavParams,
        MenuService,
        MenuController,
        AlertController])
], SlidingMenuSubCategoryPage);
export { SlidingMenuSubCategoryPage };

//# sourceMappingURL=submenu.js.map
