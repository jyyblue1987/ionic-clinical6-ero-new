import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type multiple choice.
 *
 * The value its the list of choices selected by the user.
 */
export declare class StepInputMultiChoiceComponent extends StepInputComponent {
    /** @type {any} - Callback function for value changes, coming from the dummy input */
    changed: any;
    /** @type {any} - Callback function for focusing the input, coming from the dummy input */
    touched: any;
    /** @type {string} - A label containing the choice's body */
    choiceText: string;
    /** @type {boolean} - Flag indicating if the dropdown should shown on the input. Used when the style its that of dropdown. */
    showDropdown: boolean;
    /** @type {boolean} - Flag indicating if the dropdown its selected. Used when the style its that of dropdown. */
    dropdownSelected: boolean;
    /** @type {any} -  */
    timeoutBlur: any;
    /** @type {any} - The dom element for the input */
    dropdownInputEl: any;
    /** Angular lifecycle callback to check existing values and validate them */
    ngOnInit(): void;
    /**
    * Indicates the checkbox on the input has been checked/unchecked.
    *
    * @param opt - The value of the input when the change was made
    */
    selectOption(): void;
    /**
     * Sets the radio button to checked if there's a value for
     * the radio.
     *
     * @param numberSelected - The value of the radio, 0 if its not checked, different than 0 otherwise.
     */
    validate(numberSelected: number): void;
    /**
     *
     */
    emit(): number;
    /**
     * Render the choice text if the values are week days.
     */
    renderChoiceText(): void;
    /**
     * Updates the value of the dropdown
     * flag when the input becomes focused.
     */
    inputFocus(): void;
    /**
     * Updates the value of the dropdown
     * flag when the input its hovered by a mouse.
     */
    inputMousedown(): void;
    /**
     * Updates the value of the dropdown
     * flag when the input losses focus.
     */
    inputBlur(): void;
    /**
     * Callback that gets executed when a change on the input
     * has been detected.
     *
     * @param fn - The output function defined on the dummy input
     */
    handleChangeFunction(fn: any): void;
    /**
     * Callback that gets executed when the input becomes
     * focused (touched).
     *
     * @param fn - The output function defined on the dummy input
     */
    handleTouchFunction(fn: any): void;
    /**
     * Callback that gets executed when a value is written on the input.
     *
     * @param fn - The output function defined on the dummy input
     */
    handleWrite(value: any): void;
    /**
     * Updates the value of the dropdown flag when the input
     * becomes focused for the first time.
     */
    itemTouchStart(): void;
}
