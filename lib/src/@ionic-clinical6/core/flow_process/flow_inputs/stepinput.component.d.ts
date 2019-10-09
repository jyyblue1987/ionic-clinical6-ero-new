import { EventEmitter } from '@angular/core';
import { ChoiceState, InputState, InputStyle } from '../flow_inputs/input.model';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
/**
 * This class represents the base for all types of inputs,
 * provides properties for displaying attributes, adding validation rules
 * and custom error messages.
 *
 * Override any of the properties to customize.
 *
 * @example <caption> Typescript </caption>
 * import { StepInputTextComponent } from '@ionic-clinical6/core/flow_process/flow_inputs/stepinput.component';
 *
 * export class WeigthInput extends StepInputComponent {
 *
 *  public get hint(): string {
 *      return 'Enter your weight';
 *  }
 *
 *  doCustomWeightReading() {}
 *
 * }
 */
export declare class StepInputComponent {
    /**
     * @type {InputStyle} - Defines the style of the input, this definition its to be
     * used on the template
     */
    InputStyle: typeof InputStyle;
    /** @type {boolean} - Flag indicating if the input has lost user focus. */
    focusOut: boolean;
    /** @type {InputState} - Represents the input model of the FlowProcess step */
    flowInput: InputState;
    /** @type {string} - Represents the style of the input */
    private inputStyle;
    /** @type {string} - Represents the body of the input */
    private inputBody;
    /** @type {string} - Represents the title of the input */
    private inputTitle;
    /** @type {string} - Represents the instructions of the input */
    private inputHint;
    /** @type {Boolean} - Represents the status of the input (read only) */
    private inputEnabled;
    /** @type {any} - Represents the value of the input */
    value: any;
    /** @type {FormGroup} - The main FormGroup containing all inputs as FormControls */
    subForm: FormGroup;
    /** @type {string} - Represents the style of the label ('floating' or 'stacked') */
    labelStyle: string;
    /** @type {any} */
    inputFilter: any;
    goToPage: EventEmitter<{}>;
    initInput(): void;
    /**
     * This method its used to retrieve an error message
     * for when the input its not valid
     *
     * @return the error if the input its invalid, null otherwise
     */
    getError(): string;
    /**
     * @type {any} - Represents the minimum length required, mostly used with
     * text inputs
     */
    readonly validationMin: any;
    /**
     * @type {any} - Represents the maximum length allowed, mostly used with
     * text inputs
     */
    readonly validationMax: any;
    /**
     * @type {string} - Represents the body of the input.
     */
    readonly body: string;
    /**
     * @type {string} - Represents the hint of the input.
     */
    readonly title: string;
    /**
     * @type {string} - Represents the hint of the input.
     */
    readonly hint: string;
    /**
     * @type {string} - Represents the type of the input.
     */
    readonly type: string;
    /**
     * @type {string} - Represents the style of the input.
     */
    readonly style: string;
    /**
     * @type {string} - Represents the style of the input.
     */
    readonly filter: string;
    /**
     * @type {boolean} - Indicates if the input should not be editable.
     */
    readonly readOnly: boolean;
    /**
     * @type {ChoiceState} - Represents the body of the input, in most cases
     * its not necessary to override
     */
    readonly choices: ChoiceState[];
    /**
     * @type {boolean} - Indicates if the input its required to have a value.
     */
    readonly required: boolean;
    /**
     * @type {any} - Represents the list of validators to be used for this input.
     * If the input its not required we omit the validators.
     */
    readonly requiredValidators: any;
    /**
     * @type {any} - Represents the validators available for this input and
     * its given style.
     */
    readonly validators: any;
    /**
     * @type {FormControl} - Represents the FormControl object of this input.
     */
    readonly inputControl: FormControl;
    /**
     * disabled attribute cannot be set dynamically anymore using reactive forms. It needs to use enable()/ disable()
     * @type {AbstractControl} - Disables the specific FormControl.
     */
    disableInput(control: AbstractControl): void;
    /**
     * @type {AbstractControl} - Enables the specific FormControl
     */
    enableInput(control: AbstractControl): void;
    /**
     * @type {AbstractControl} - Sets a value on the specif FormControl.
     */
    setValue(control: AbstractControl, value: any): void;
}
