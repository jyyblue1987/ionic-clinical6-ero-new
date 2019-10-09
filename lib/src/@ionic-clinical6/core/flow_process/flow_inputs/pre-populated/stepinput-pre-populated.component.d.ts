import { Clinical6Service } from '../../../clinical6.service';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type pre-populated.
 *
 * The value its the value retrieved from a Search Service,
 * in this case the value its not editable and its used for
 * information purposes..
 */
export declare class StepInputPrePopulatedComponent extends StepInputComponent {
    captiveReach: Clinical6Service;
    /** @type {string} - The role. */
    roleValue: string;
    /** @type {boolean} - Flag indicating if the type of value its supported. */
    supported: boolean;
    constructor(captiveReach: Clinical6Service);
    /** Angular lifecycle callback. */
    ngOnInit(): void;
    /**
     * Converts the string value to a a camel case.
     *
     * @param s - The string to be formatted
     */
    snakeToCamel(s: string): string;
    /**
     * Converts the string value to a a title case.
     *
     * @param s - The string to be formatted
     */
    snakeToTitle(s: string): string;
}
