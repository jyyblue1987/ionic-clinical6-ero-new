import { Renderer } from '@angular/core';
import { Events, MenuController, NavController, App, Platform, AlertController } from 'ionic-angular';
import { Clinical6Service } from '../clinical6.service';
import { MenuService } from './menu.service';
import { AppMenu } from 'clinical6';
export declare class SlidingMenu {
    app: App;
    events: Events;
    alertCtrl: AlertController;
    menu: MenuController;
    menuService: MenuService;
    platform: Platform;
    captiveReach: Clinical6Service;
    renderer: Renderer;
    addDebugItems: boolean;
    rootPage: any;
    nav: NavController;
    menus: AppMenu[];
    alerts: number;
    /** @type {String}  - Shows the company logo in the header of the menu */
    logoUrl: String;
    /** @type {boolean} - Shows the user profile info in the header of the menu */
    showProfile: boolean;
    constructor(app: App, events: Events, alertCtrl: AlertController, menu: MenuController, menuService: MenuService, platform: Platform, captiveReach: Clinical6Service, renderer: Renderer);
    getDefaultNextPage(menuItem: AppMenu): any;
    ngOnInit(): void;
    openPage(menuItem: AppMenu): Promise<void>;
    readonly showProfileInfo: string;
    getImage(menuItem: any): string;
}
