export declare class AlertsFactory {
    /** @param ActionsMap Data structure for storing an action and the related page.  */
    static ActionsMap: Array<{
        action: string;
        page: any;
    }>;
    /** @param DashboardPageName Variable for storing the dashboard page name. */
    static DashboardPageName: string;
    /**
   * Should be used in the app.component file to associate an action with a specific page to open.
   * @param item Object containing an Action and a Page.
   */
    static setAction(item: {
        action: string;
        page: any;
    }): void;
    /**
     * Should be used in the app.component file to specify the name of the dashboard page.
     * @param dashboardPageName
     */
    static setDashboardNameForRoute(dashboardPageName: string): void;
}
