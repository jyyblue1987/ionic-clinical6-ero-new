import { EventEmitter } from '@angular/core';
import { InputState, InputStyle } from './input.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepInputDirective } from './stepinput.directive';
export declare class InputContainerComponent {
    formBuilder: FormBuilder;
    /**
     * @type {InputStyle} - Defines the style of the input, this definition its to be
     * used on the template
     */
    InputStyle: typeof InputStyle;
    /** @type {any} - The list of saved values for the flow step, if present */
    fields: any;
    /** @type {InputState[]} - The list of inputs contained in the flow step */
    inputList: InputState[];
    /** @type {boolean} - Indicates if the input its editable */
    readonly: boolean;
    /** @type {any} */
    filter: any;
    /** @type {any} - Represents the step model for the active Flow Step */
    step: any;
    /** @type {string} - A global style the input hints */
    labelStyle: string;
    /** @type {EventEmmitter} - Callback to tell the FlowStep (or any class using this)
     *  the Form has changed status */
    formStatusChanged: EventEmitter<{}>;
    /** @type {EventEmmiter} - Callback to tell the FlowStep (or any class using this) the Form has changed value */
    formValueChanged: EventEmitter<{}>;
    /** @type {EventEmmiter} - Callback to tell the FlowStep which path to take */
    goToPage: EventEmitter<{}>;
    /** @type {FormGroup} - The main form containing the inputs (as form controls),
     *  this is the form used for input validation
     */
    mainForm: FormGroup;
    /** @type {StepInputDirective} - Represents the directive used in the container
     * template to dinamically add inputs as necessary */
    inputDirective: StepInputDirective;
    constructor(formBuilder: FormBuilder);
    /** Angular lifecycle callback. */
    ngOnInit(): void;
    ngAfterViewInit(): void;
    rgb2hex(rgb: any): string;
    forwardGoToPage(event: any): void;
}
