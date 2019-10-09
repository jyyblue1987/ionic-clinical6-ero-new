import { Injectable } from '@angular/core';
import { App, Events } from 'ionic-angular';

import { Clinical6Service } from '../clinical6.service';
import { AppConfig } from '../config';

import { ResourcesPage } from '../pages/resources/resources';

import { AppMenu } from 'clinical6';

import { BasePage } from '../pages/base/base-page';

@Injectable()
export class MenuService {
  menus: Array<AppMenu>;
  demoMenu: boolean = false;

  points: number;
  alerts: number;

  /**
   * @type {Object} - Add an item for every new menu item and routing path
   */
  static FactoryMap: Array<{
    test: ( m: AppMenu) => boolean,  // This is a test function used to lookup
                                        //    the items in the map

    page?: any,                         // This is the page to be loaded when a
                                        //    matching item is found
    options?: any,                      // Options to be passed to the Page above

    function?: ( m: AppMenu) => {page: any, options?: any}  // Function retirning a { page: ..., options: ... }

    }> = [];

  constructor(
    public app: App,
    public captiveReach: Clinical6Service,
    public events: Events
  ) {
    this.menus = [];
    this.demoMenu = false;
  }

  /**
   *
   * @param menuItem Custom routing handler to be defined by the calling app
   */
  customFactory (menuItem: AppMenu) {
    return null;
  }

  getMenuItem(test: (m: AppMenu) => boolean) {
      return this.menus.find((menuItem) => {
        return test(menuItem);
      });
  }

  getComponent(m: AppMenu) {
      var matchingItem = MenuService.FactoryMap.find((item) => {
        return item.test(m);
      });
      if (!matchingItem) return null;

      if (matchingItem.function) {
        return matchingItem.function(m);
      }
      if (matchingItem) return { page: matchingItem.page, options: matchingItem.options };
      else return null;
  }
  initPages(useOldApi = false) {
    return this.reloadMenus(useOldApi);
  }

  // TODO determine if mobile menus should be passed as attribute to tags instead of as service
  // Menu items could be altered by either badge updates or change of menus on server.
  //
  reloadMenus (useOldApi = false) {
    const self = this;
    return new Promise( resolve => {
      if (this.menus.length > 0) resolve();

      // Dynamic data on the Menu
      this.points = 1000;
      this.alerts = 2;

      // Set our app's pages through mobile menus.  We use the service so we can store the
      // menus into local storage and use our own error handling.
      const self = this;
      // Why is this necessary - why not just have a method that gets the page?
      this.captiveReach.getMenus(useOldApi)
      .then( menus => { // success
          console.log('MenuService, menus: ', menus);
          this.menus = menus.sort((a, b) => { return (a.position - b.position); });
          if (this.demoMenu) {
              this.addDemoMenuItems();
          }
          resolve();
      })
      .catch( reason => {
          console.log('MenuService, menus failed: ', reason);
          // failure
          ////////////////////////////////////
          // DEBUG: ADD MENU ITEMS FOR TESTS
          if (this.demoMenu) {
              this.addDemoMenuItems();
          }
          resolve();
          ////////////////////////////////////
      });

    });
  }


  addMenuItem (menu: any) {
    this.menus.push(menu);
  }

  addDemoMenuItems() {
      DEMOMENUITEMS.forEach( (i) => { this.menus.push(i); });
  }

  //////////////////////////////
  // DEBUG ADD ONS
  goToDemoMenu(thisRef: MenuService) {
      // thisRef.nav.push(DemoPage, { }, thisRef.appService.animationOpt);
  }

  addDebugMenuItems() {
     DEBUGMENUITEMS.forEach( (i) => { this.menus.push(i); });
  }

  //////////////////////////////
}

const DEMOMENUITEMS: any = [
  {
    title: 'My Profile',
    'action': 'profile',
    'action_object': null,
    'id': 1,
    'position': 1,
    'image': {
        'url': 'https://captivereach-ppdpassport.s3.amazonaws.com/uploads/staging/cms/mobile_menu/image/1/f095ee1e92f854242d9ea86fb509512ed5fb61b7.png',
      },
  },
  {
    title: 'Points Earned',
    'action': 'rewards',
    'action_object': null,
    'id': 2,
    'position': 2,
    'image': {
        'url': 'https://captivereach-ppdpassport.s3.amazonaws.com/uploads/staging/cms/mobile_menu/image/2/3e1e7a9bdb0c007e5f8ea3aa277e0b321e33c06e.png',
    }
  },
  {
    title: 'Alerts',
    'action': 'alerts',
    'action_object': null,
    'id': 3,
    'position': 3,
    'image': {
        'url': 'https://captivereach-ppdpassport.s3.amazonaws.com/uploads/staging/cms/mobile_menu/image/3/ecd538e0c37aa1662e5fb4c767e36f26fbae4f54.png',
    }
  },
  {
    title: 'Manage Site Profile',
    'action': 'no_action',
    'action_object': null,
    'id': 5,
    'position': 5,
    'image': {
        'url': 'https://captivereach-ppdpassport.s3.amazonaws.com/uploads/staging/cms/mobile_menu/image/5/1b3abb22a4152556b03809d53f4650494daf8297.png',
    }
  },
  {
    title: 'Resources',
    'action': 'resources',
    'action_object': null,
    'id': 6,
    'position': 6,
    'image': {
        'url': 'https://captivereach-ppdpassport.s3.amazonaws.com/uploads/staging/cms/mobile_menu/image/6/939cf911af6fb10ac3be215ef957e5242362a6c8.png',
    }
  },
];

const DEBUGMENUITEMS: any = [
    {
    title: 'Demo Item',
    'action': 'no_action',
    'action_object': null,
    'id': 1,
    'position': 1,
    'image': {
      'url': 'https://captivereach-ppdpassport.s3.amazonaws.com/uploads/staging/cms/mobile_menu/image/4/main_386ac30eb9311a6ce956571f076cb4d9eccbb68a.png'
    }
  }
];