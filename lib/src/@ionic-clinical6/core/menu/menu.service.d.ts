import { App, Events } from 'ionic-angular';
import { Clinical6Service } from '../clinical6.service';
import { AppMenu } from 'clinical6';
export declare class MenuService {
    app: App;
    captiveReach: Clinical6Service;
    events: Events;
    menus: Array<AppMenu>;
    demoMenu: boolean;
    points: number;
    alerts: number;
    /**
     * @type {Object} - Add an item for every new menu item and routing path
     */
    static FactoryMap: Array<{
        test: (m: AppMenu) => boolean;
        page?: any;
        options?: any;
        function?: (m: AppMenu) => {
            page: any;
            options?: any;
        };
    }>;
    constructor(app: App, captiveReach: Clinical6Service, events: Events);
    /**
     *
     * @param menuItem Custom routing handler to be defined by the calling app
     */
    customFactory(menuItem: AppMenu): any;
    getMenuItem(test: (m: AppMenu) => boolean): AppMenu;
    getComponent(m: AppMenu): {
        page: any;
        options?: any;
    };
    initPages(useOldApi?: boolean): Promise<{}>;
    reloadMenus(useOldApi?: boolean): Promise<{}>;
    addMenuItem(menu: any): void;
    addDemoMenuItems(): void;
    goToDemoMenu(thisRef: MenuService): void;
    addDebugMenuItems(): void;
}
