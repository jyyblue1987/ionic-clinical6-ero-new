import { FlowStep } from 'clinical6';
export declare class Flows {
    /**
     * @type {Object} - A way of assigning the mapping for flows
     */
    static FactoryMap: {
        [id: string]: any;
    };
    /**
     * Provides the appropriate Page template/class associated to the given contentType and/or step
     *
     * @param  {FlowStep} step  - Flow step item used to futher determine the following step template/class
     * @return {class}          - A class associated to the page to be pushed into the navigation stack
     */
    static Factory(step: FlowStep): any;
    /**
     *
     * @param {Object} map - A key/val mapping from contentType to FlowPage
     */
    static setMap(map: {
        [id: string]: any;
    }): void;
}
