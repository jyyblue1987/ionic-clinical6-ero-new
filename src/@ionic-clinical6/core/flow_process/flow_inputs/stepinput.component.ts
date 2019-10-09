import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChoiceState, InputState, InputStyle } from '../flow_inputs/input.model';

import { FlowInput } from 'clinical6';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { InputValidationFactory } from './validation.factory';
import { ValidationService } from './validation.service';

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
@Component({
    selector: 'stepinput',
    templateUrl: 'stepinput.component.html',
})
export class StepInputComponent {
    /**
     * @type {InputStyle} - Defines the style of the input, this definition its to be 
     * used on the template
     */
    public InputStyle = InputStyle;

    /** @type {boolean} - Flag indicating if the input has lost user focus. */
    public focusOut: boolean;

    /** @type {InputState} - Represents the input model of the FlowProcess step */
    @Input() public flowInput: InputState;

    /** @type {string} - Represents the style of the input */
    @Input() private inputStyle: string;

    /** @type {string} - Represents the body of the input */
    @Input() private inputBody: string;

    /** @type {string} - Represents the title of the input */
    @Input() private inputTitle: string;

    /** @type {string} - Represents the instructions of the input */
    @Input() private inputHint: string;

    /** @type {Boolean} - Represents the status of the input (read only) */
    @Input() private inputEnabled: Boolean;

    /** @type {any} - Represents the value of the input */
    @Input() value: any;

    /** @type {FormGroup} - The main FormGroup containing all inputs as FormControls */
    @Input('group') public subForm: FormGroup;

    /** @type {string} - Represents the style of the label ('floating' or 'stacked') */
    @Input() labelStyle: string;

    /** @type {any} */
    @Input() inputFilter: any;

    @Output() goToPage = new EventEmitter();   // Action associated to the 'Back' button click

    initInput() {

    }

    /**
     * This method its used to retrieve an error message
     * for when the input its not valid
     *
     * @return the error if the input its invalid, null otherwise
     */
    public getError() {
        const formControl = this.inputControl;

        if (!formControl.errors && !this.subForm.errors) { return null; }

        console.log('control errors:')
        console.log(formControl.errors);

        console.log('control errors:')
        console.log(formControl.errors);

        for (const key in formControl.errors) {
            let inputError = InputValidationFactory.getValidationError(key);
            if (formControl.errors['required']) {
                return `${this.style} input ${inputError}`;
            } else {
                return inputError;
            }
        }

        for (const key in this.subForm.errors) {
            let inputError = InputValidationFactory.getValidationError(key);
            return inputError;
        }
    }

    /**
     * @type {any} - Represents the minimum length required, mostly used with
     * text inputs
     */
    public get validationMin(): any {
        return this.flowInput['validation_details'] ? this.flowInput['validation_details'].min : 1;
    }

    /**
     * @type {any} - Represents the maximum length allowed, mostly used with
     * text inputs
     */
    public get validationMax(): any {
        return this.flowInput['validation_details'] ? this.flowInput['validation_details'].max : 999;
    }

    /**
     * @type {string} - Represents the body of the input.
     */
    public get body(): string {
        return this.inputBody ? this.inputBody : this.flowInput['body'];//this.flowInput.inputTitle;
    }

    /**
     * @type {string} - Represents the hint of the input.
     */
    public get title(): string {
        return this.inputTitle ? this.inputTitle : this.flowInput['title'];
    }

    /**
     * @type {string} - Represents the hint of the input.
     */
    public get hint(): string {
        return this.inputHint ? this.inputHint : this.flowInput['instructions'];//this.flowInput.inputSubtitle;
    }

    /**
     * @type {string} - Represents the type of the input.
     */
    public get type(): string {
        return this.flowInput.inputType;
    }

    /**
     * @type {string} - Represents the style of the input.
     */
    public get style(): string {
        return this.inputStyle ? this.inputStyle : this.flowInput.inputStyle;
    }

    /**
     * @type {string} - Represents the style of the input.
     */
    public get filter(): string {
        return this.inputFilter ? this.inputFilter : {};
    }

    /**
     * @type {boolean} - Indicates if the input should not be editable.
     */
    public get readOnly(): boolean {
        return this.inputEnabled ? !this.inputEnabled : (this.flowInput['locked']);
    }

    /**
     * @type {ChoiceState} - Represents the body of the input, in most cases
     * its not necessary to override
     */
    public get choices(): ChoiceState[] {
        return this.flowInput.inputChoices ? this.flowInput.inputChoices : [];
    }

    /**
     * @type {boolean} - Indicates if the input its required to have a value.
     */
    public get required(): boolean {
        return this.flowInput['required'];
    }

    /**
     * @type {any} - Represents the list of validators to be used for this input.
     * If the input its not required we omit the validators.
     */
    public get requiredValidators(): any {
        return this.required ? this.validators : [];
    }

    /**
     * @type {any} - Represents the validators available for this input and
     * its given style.
     */
    public get validators(): any {
        if (InputValidationFactory.getValidatorRule(this.style)) {
            return InputValidationFactory.getValidatorRule(this.style);
        } else {
            return [Validators.required];
        }
    }

    /**
     * @type {FormControl} - Represents the FormControl object of this input.
     */
    public get inputControl(): FormControl {
        return this.subForm.get(`${this.flowInput.inputId}`) as FormControl;
    }

    /**
     * disabled attribute cannot be set dynamically anymore using reactive forms. It needs to use enable()/ disable()
     * @type {AbstractControl} - Disables the specific FormControl.
     */
    public disableInput(control: AbstractControl) { // disabled attribute cannot be set dynamically anymore using reactive forms. It needs to use enable()/ disable()
        (control as AbstractControl) && control.disable();
    }

    /**
     * @type {AbstractControl} - Enables the specific FormControl
     */
    public enableInput(control: AbstractControl) {
        (control as AbstractControl) && control.enable();
    }

    /**
     * @type {AbstractControl} - Sets a value on the specif FormControl.
     */
    public setValue(control: AbstractControl, value: any) {
        (control as AbstractControl) && control.setValue(value);
    }
}