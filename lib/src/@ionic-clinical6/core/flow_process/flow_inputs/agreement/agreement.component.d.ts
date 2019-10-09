import { ChoiceState } from '../input.model';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type agreement.
 *
 * The value its the date the agreement was
 * accepted.
 */
export declare class AgreementCheckboxComponent extends StepInputComponent {
    /** @type {string} - The text to be displayed on the input */
    choiceText: string;
    /** @type {any} - The dom element for the input */
    dropdownInputEl: any;
    /** @type {Array<ChoiceState>} - The list of choices coming from   the flow */
    choiceItems: Array<ChoiceState>;
    /** @type {any} - Flag indicating if the choice has been selected */
    choiceSelected: any;
    /** Angular lifecycle callback. */
    ngOnInit(): void;
    /**
     * Indicates the checkbox on the input has been checked/unchecked.
     *
     * @param opt - The value of the input when the change was made
     */
    selectOption(opt: any): void;
}
