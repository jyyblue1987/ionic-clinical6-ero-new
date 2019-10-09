import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type date.
 *
 * The value its the date the user selected in the input.
 */
export declare class StepInputDateComponent extends StepInputComponent {
    /** @type {string} - The format in which the date is displayes */
    displayFormat: string;
    /** @type {any} - The selected date */
    date: any;
    /** @type {boolean} - Flag indicating if the input has user focus */
    focusOut: boolean;
    /** @type {string} - Default min and max date values */
    minDate: string;
    maxDate: string;
    /** Angular lifecycle callback to calculate the displayFormat, the pickerFormat, the minDate and the maxDate to use in the ion-datetime picker */
    ngOnInit(): void;
    /** TODO: Need details */
    getRelativeDate(relative: any): string;
}
