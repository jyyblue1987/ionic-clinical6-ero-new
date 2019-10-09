import { InputState } from '../flow_inputs/input.model';
/**
 * Represents a class where all of the supported
 * types of input are defined by a key value map.
 *
 * It has the ability to override the components used for
 * a type or add new ones via the setMap method.
 *
 * @example <caption> Override existing input </caption>
 *  StepInputFactory.setMap('numeric', MyCustomNumericInput)
 *
 * @example <caption> Add a new type of input </caption>
 *  StepInputFactory.setMap('carousel', CarouselInput)
 */
export declare class StepInputFactory {
    /**
     * @type {{[id: string] : any]}} - A key/value map containing the relation of the
     *  type of input to its instance.
     */
    static FactoryMap: {
        [id: string]: any;
    };
    /**
     * Provides the appropriate Input Component for the given input type.
     *
     * @param  {InputState} input  - The input model object
     * @return {class}             - An instance of the component associated to the given input
     */
    static factory(input: InputState): any;
    /**
     * Sets or adds an InputComponent to the map.
     * @param {Object} map - A key/val mapping from contentType to Input component
     */
    static setMap(map: {
        [id: string]: any;
    }): void;
}
