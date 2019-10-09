import { Component, ViewChild, ElementRef, Renderer, Input } from '@angular/core';
import { Events, MenuController, Nav, NavController, App, Platform, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../clinical6.service';
import { MenuService } from './menu.service';
import { SlidingMenuSubCategoryPage } from './submenu';
import { AppConfig } from '../config';
import { AppMenu } from 'clinical6';
import { clinical6, mobileUserService } from 'clinical6';


@Component({
  selector: 'sliding-menu',
  templateUrl: 'sliding-menu.html'
})
export class SlidingMenu {

  addDebugItems: boolean = true;
  rootPage: any;
  nav: NavController;

  menus: AppMenu[] = [];

  alerts: number;
  /** @type {String}  - Shows the company logo in the header of the menu */
  @Input() logoUrl: String;
  /** @type {boolean} - Shows the user profile info in the header of the menu */
  @Input() showProfile: boolean;
  
  constructor(
    public app: App,
    public events: Events,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public menuService: MenuService,
    public platform: Platform,
    public captiveReach: Clinical6Service,
    public renderer: Renderer) {

    this.alerts = 2; // demo data

    MenuService.FactoryMap = [
      {test: (m: AppMenu) => { return m.action === 'subcategory'; }, page: SlidingMenuSubCategoryPage}
    ];
  }

  getDefaultNextPage(menuItem: AppMenu) {
    var nextPage = null;

    switch (menuItem.action) {
      case 'subcategory':
        nextPage = SlidingMenuSubCategoryPage;
        break;
    };

    return nextPage;
  }

  ngOnInit() {
    console.log('SlidingMenu, ngOnInit');
    const self = this;
    this.menuService.initPages();
    this.nav = this.app.getRootNav();
  }

  async openPage(menuItem: AppMenu) {
    try {
      const nextScreen = this.menuService.getComponent(menuItem);
  
      this.menu.close();
  
      if (menuItem.action && (typeof menuItem.action === 'function')){
        menuItem.action['call']();
        return;
      }
  
      if (nextScreen) {
        this.nav.push(nextScreen.page, Object.assign({ menu: menuItem }, nextScreen.options), AppConfig.animationOpt);
      }
    } catch(e) {
      console.log('menu error');
    }
  }

  get showProfileInfo() {
    if (clinical6.user && clinical6.user.profile)
      return `${clinical6.user.profile['first_name'] || ''} ${clinical6.user.profile['last_name'] || ''}`;
  }

  // to fix the issue related to the fetch method for old endpoint
  getImage(menuItem: any) {
    return `url(${menuItem.image.url || menuItem.image.image.url})`;
  }
  
}
