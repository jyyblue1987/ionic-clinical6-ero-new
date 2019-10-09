export class AlertsFactory {
    /**
   * Should be used in the app.component file to associate an action with a specific page to open.
   * @param item Object containing an Action and a Page.
   */
    static setAction(item) {
        this.ActionsMap.push(item);
    }
    /**
     * Should be used in the app.component file to specify the name of the dashboard page.
     * @param dashboardPageName
     */
    static setDashboardNameForRoute(dashboardPageName) {
        this.DashboardPageName = dashboardPageName;
    }
}
/** @param ActionsMap Data structure for storing an action and the related page.  */
AlertsFactory.ActionsMap = [];

//# sourceMappingURL=alert.factory.js.map
