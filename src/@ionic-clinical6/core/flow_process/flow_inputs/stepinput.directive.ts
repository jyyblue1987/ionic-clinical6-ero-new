import { Directive, ViewContainerRef, EventEmitter, Output, Input, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputState } from './input.model';

import { StepInputFactory } from './stepinput.factory';
import { StepInputComponent } from './stepinput.component';
import { StepInputTextComponent } from '../flow_inputs/index';
import { ValidationService } from './validation.service';


/**
 * This Directive provides a dynamic way to create InputContainers,
 * it dinamically instantiates inputs using the {@link StepInputFactory}
 * with the given input type
 * 
 * Most of the times you won't need to use this directive, as its internally
 * used by the input container. Standalone use is still available.
 * 
 * @example
 * <ng-template step-input *ngFor="let input of inputList; let index = index"
 * [input]="input"
 * [value]="(fields && fields[input.inputId]) || ''" 
 * [group]="mainForm">
 * </ng-template>
 */
@Directive({
    selector: '[step-input]'
})
export class StepInputDirective {

    /** @type {string} - Represents the style of the label ('floating' or 'stacked') */
    @Input() labelStyle: string;

    /** @type {InputState} - Represents the input model of the FlowProcess step */
    @Input() input: InputState;

    /** @type {any} - Represents the value of the input */
    @Input() value: any;

    /** @type {FormGroup} - The main FormGroup containing all inputs as FormControls */
    @Input('group') public mainForm: FormGroup;

    /** @type {any} */
    @Input() filter: any;

    @Output() goToPage = new EventEmitter();   // Action associated to the 'Back' button click

    inputCodeMap: { [key: string]: string } = {};

    constructor(
        public viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    /** Angular lifecycle callback. */
    ngOnInit() {
        // We get the input component from a factory, given the {@link InputState.inputType}
        let inputComponent = StepInputFactory.factory(this.input);

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(inputComponent);
        let componentRef = this.viewContainerRef.createComponent(componentFactory);

        let inputInstance = componentRef.instance as StepInputComponent;


        // Initialize the Input decorators on the new instance
        inputInstance.flowInput = this.input;
        inputInstance.value = this.value;
        inputInstance.subForm = this.mainForm;
        inputInstance.labelStyle = this.labelStyle;
        inputInstance.inputFilter = this.filter;
        inputInstance.goToPage = this.goToPage;

        let inputId = inputInstance.flowInput.inputId;

        if (inputInstance.flowInput['code']) {
            ValidationService.setCodeMap(inputInstance.flowInput['code'], inputId.toString());
        }

        let hasEquality = (inputInstance.flowInput['validation_details'] && inputInstance.flowInput['validation_details']['equality']) || false;
        if (hasEquality) {
            let equalityCode = inputInstance.flowInput['validation_details']['equality']['input_question_code'] || null;
            let inputCode = inputInstance.flowInput['code'];

            this.mainForm.setValidators([ValidationService.equalityValidation(inputCode, equalityCode)]);
        }

        inputInstance.initInput();

        this.mainForm.addControl(`${this.input.inputId}`, new FormControl(this.value, Validators.compose(inputInstance.requiredValidators)));
    }
}