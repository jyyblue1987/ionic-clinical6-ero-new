import { Keyboard } from '@ionic-native/keyboard';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type text.
 *
 * The value its text entered by the user.
 */
export declare class StepInputTextComponent extends StepInputComponent {
    /** @type {Keyboard} - Native keyboard instance.  */
    keyboard: Keyboard;
    /** Angular lifecycle callback. */
    ngOnInit(): void;
    initInput(): void;
    /**
     * @param rawValue - The unvalidated/unformatted string of text.
     *
     * @return - A string with a phone number format.
     */
    createPhoneMask(rawValue: string): any;
    /**
     * @param rawValue - The unvalidated/unformatted string of text.
     *
     * @return - A string with a zip code format.
     */
    createZipCodeMask(rawValue: string): (string | RegExp)[];
    /**
     * @param rawValue - The unvalidated/unformatted string of text.
     *
     * @return - A string with a patient id format.
     */
    createPatientIdMask(rawValue: any): (string | RegExp)[];
    /**
     * @param rawValue - The unvalidated/unformatted string of text.
     *
     * @return - A string with a password4 format.
     */
    getPasswordMask(): any[];
    readonly validators: any;
}
