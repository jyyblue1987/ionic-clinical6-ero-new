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
import { Component, Renderer, Input } from '@angular/core';
import { Events, MenuController, App, Platform, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../clinical6.service';
import { MenuService } from './menu.service';
import { SlidingMenuSubCategoryPage } from './submenu';
import { AppConfig } from '../config';
import { clinical6 } from 'clinical6';
let SlidingMenu = class SlidingMenu {
    constructor(app, events, alertCtrl, menu, menuService, platform, captiveReach, renderer) {
        this.app = app;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.menu = menu;
        this.menuService = menuService;
        this.platform = platform;
        this.captiveReach = captiveReach;
        this.renderer = renderer;
        this.addDebugItems = true;
        this.menus = [];
        this.alerts = 2; // demo data
        MenuService.FactoryMap = [
            { test: (m) => { return m.action === 'subcategory'; }, page: SlidingMenuSubCategoryPage }
        ];
    }
    getDefaultNextPage(menuItem) {
        var nextPage = null;
        switch (menuItem.action) {
            case 'subcategory':
                nextPage = SlidingMenuSubCategoryPage;
                break;
        }
        ;
        return nextPage;
    }
    ngOnInit() {
        console.log('SlidingMenu, ngOnInit');
        const self = this;
        this.menuService.initPages();
        this.nav = this.app.getRootNav();
    }
    openPage(menuItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nextScreen = this.menuService.getComponent(menuItem);
                this.menu.close();
                if (menuItem.action && (typeof menuItem.action === 'function')) {
                    menuItem.action['call']();
                    return;
                }
                if (nextScreen) {
                    this.nav.push(nextScreen.page, Object.assign({ menu: menuItem }, nextScreen.options), AppConfig.animationOpt);
                }
            }
            catch (e) {
                console.log('menu error');
            }
        });
    }
    get showProfileInfo() {
        if (clinical6.user && clinical6.user.profile)
            return `${clinical6.user.profile['first_name'] || ''} ${clinical6.user.profile['last_name'] || ''}`;
    }
    // to fix the issue related to the fetch method for old endpoint
    getImage(menuItem) {
        return `url(${menuItem.image.url || menuItem.image.image.url})`;
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], SlidingMenu.prototype, "logoUrl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SlidingMenu.prototype, "showProfile", void 0);
SlidingMenu = __decorate([
    Component({
        selector: 'sliding-menu',
        template: `
    <ion-content class="menu-content">
      <!-- Show Company Logo-->
      <div class="img-header" *ngIf="logoUrl">
          <img class="logo" src="{{logoUrl}}"/> 
      </div>
      <!-- Show User Profile Info-->
      <div *ngIf="showProfile" class="text-header">{{showProfileInfo}}</div>
      <ion-list no-lines no-padding no-margin class="menu-list">
          <ng-template ngFor let-menuItem [ngForOf]="menuService.menus" >    
            <button ion-item detail-none no-padding no-margin (click)="openPage(menuItem)" class="{{menuItem.action}}">
              <div class="icon" [style.background-image]="getImage(menuItem)"></div>
              <div class="label">{{menuItem.title}}</div>

              <!-- Badges -->
              <div class="badge" *ngIf="menuItem.badge"
                  [style.background-color]="'#DA452D' ">
                <div class="number">{{menuItem.badge}}</div>
              </div>            
            </button>
            <div class="custom-divider"></div>
          </ng-template>
        </ion-list>
    </ion-content>
    <ion-footer>
      <!--Footer Content (such as switch sites) here      -->
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [App,
        Events,
        AlertController,
        MenuController,
        MenuService,
        Platform,
        Clinical6Service,
        Renderer])
], SlidingMenu);
export { SlidingMenu };

//# sourceMappingURL=sliding-menu.js.map
