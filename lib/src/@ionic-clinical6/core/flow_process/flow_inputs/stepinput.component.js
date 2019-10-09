var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputStyle } from '../flow_inputs/input.model';
import { FormGroup, Validators } from '@angular/forms';
import { InputValidationFactory } from './validation.factory';
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
let StepInputComponent = class StepInputComponent {
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
    constructor() {
        /**
         * @type {InputStyle} - Defines the style of the input, this definition its to be
         * used on the template
         */
        this.InputStyle = InputStyle;
        this.goToPage = new EventEmitter(); // Action associated to the 'Back' button click
    }
    initInput() {
    }
    /**
     * This method its used to retrieve an error message
     * for when the input its not valid
     *
     * @return the error if the input its invalid, null otherwise
     */
    getError() {
        const formControl = this.inputControl;
        if (!formControl.errors && !this.subForm.errors) {
            return null;
        }
        console.log('control errors:');
        console.log(formControl.errors);
        console.log('control errors:');
        console.log(formControl.errors);
        for (const key in formControl.errors) {
            let inputError = InputValidationFactory.getValidationError(key);
            if (formControl.errors['required']) {
                return `${this.style} input ${inputError}`;
            }
            else {
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
    get validationMin() {
        return this.flowInput['validation_details'] ? this.flowInput['validation_details'].min : 1;
    }
    /**
     * @type {any} - Represents the maximum length allowed, mostly used with
     * text inputs
     */
    get validationMax() {
        return this.flowInput['validation_details'] ? this.flowInput['validation_details'].max : 999;
    }
    /**
     * @type {string} - Represents the body of the input.
     */
    get body() {
        return this.inputBody ? this.inputBody : this.flowInput['body']; //this.flowInput.inputTitle;
    }
    /**
     * @type {string} - Represents the hint of the input.
     */
    get title() {
        return this.inputTitle ? this.inputTitle : this.flowInput['title'];
    }
    /**
     * @type {string} - Represents the hint of the input.
     */
    get hint() {
        return this.inputHint ? this.inputHint : this.flowInput['instructions']; //this.flowInput.inputSubtitle;
    }
    /**
     * @type {string} - Represents the type of the input.
     */
    get type() {
        return this.flowInput.inputType;
    }
    /**
     * @type {string} - Represents the style of the input.
     */
    get style() {
        return this.inputStyle ? this.inputStyle : this.flowInput.inputStyle;
    }
    /**
     * @type {string} - Represents the style of the input.
     */
    get filter() {
        return this.inputFilter ? this.inputFilter : {};
    }
    /**
     * @type {boolean} - Indicates if the input should not be editable.
     */
    get readOnly() {
        return this.inputEnabled ? !this.inputEnabled : (this.flowInput['locked']);
    }
    /**
     * @type {ChoiceState} - Represents the body of the input, in most cases
     * its not necessary to override
     */
    get choices() {
        return this.flowInput.inputChoices ? this.flowInput.inputChoices : [];
    }
    /**
     * @type {boolean} - Indicates if the input its required to have a value.
     */
    get required() {
        return this.flowInput['required'];
    }
    /**
     * @type {any} - Represents the list of validators to be used for this input.
     * If the input its not required we omit the validators.
     */
    get requiredValidators() {
        return this.required ? this.validators : [];
    }
    /**
     * @type {any} - Represents the validators available for this input and
     * its given style.
     */
    get validators() {
        if (InputValidationFactory.getValidatorRule(this.style)) {
            return InputValidationFactory.getValidatorRule(this.style);
        }
        else {
            return [Validators.required];
        }
    }
    /**
     * @type {FormControl} - Represents the FormControl object of this input.
     */
    get inputControl() {
        return this.subForm.get(`${this.flowInput.inputId}`);
    }
    /**
     * disabled attribute cannot be set dynamically anymore using reactive forms. It needs to use enable()/ disable()
     * @type {AbstractControl} - Disables the specific FormControl.
     */
    disableInput(control) {
        control && control.disable();
    }
    /**
     * @type {AbstractControl} - Enables the specific FormControl
     */
    enableInput(control) {
        control && control.enable();
    }
    /**
     * @type {AbstractControl} - Sets a value on the specif FormControl.
     */
    setValue(control, value) {
        control && control.setValue(value);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepInputComponent.prototype, "flowInput", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StepInputComponent.prototype, "inputStyle", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StepInputComponent.prototype, "inputBody", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StepInputComponent.prototype, "inputTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StepInputComponent.prototype, "inputHint", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], StepInputComponent.prototype, "inputEnabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepInputComponent.prototype, "value", void 0);
__decorate([
    Input('group'),
    __metadata("design:type", FormGroup)
], StepInputComponent.prototype, "subForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StepInputComponent.prototype, "labelStyle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepInputComponent.prototype, "inputFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], StepInputComponent.prototype, "goToPage", void 0);
StepInputComponent = __decorate([
    Component({
        selector: 'stepinput',
        template: `

    `,
    })
], StepInputComponent);
export { StepInputComponent };

//# sourceMappingURL=stepinput.component.js.map
