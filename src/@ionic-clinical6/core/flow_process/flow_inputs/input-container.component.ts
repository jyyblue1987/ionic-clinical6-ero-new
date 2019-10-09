import { Component, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { InputState, InputStyle } from './input.model';
import { Validators, FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';
import { StepInputDirective } from './stepinput.directive';
import { StepInputFactory } from './stepinput.factory';

import { StepInputComponent } from './stepinput.component';

@Component({
  selector: 'input-container',
  templateUrl: 'input-container.component.html'
})
/**
 * Represents a component that contains all of the inputs for a given step.
 *
 * This class sets up the main FormGroup object, and handles updates to the form
 * status and values.
 * 
 * @example <caption>html template</caption>
 * <input-container 
 *     [inputList]="inputs" 
 *     [fields]="fields" 
 *     [filter]="filter" 
 *     [readonly]="!editing" 
 *     (formValueChanged)="updateControlValue($event)"
 *     (formStatusChanged)="updateFormStatus($event)" 
 *     (goToPage)="goToPage($event)">
 *</input-container>
 */
export class InputContainerComponent {
  /** 
   * @type {InputStyle} - Defines the style of the input, this definition its to be
   * used on the template
   */
  public InputStyle = InputStyle;

  /** @type {any} - The list of saved values for the flow step, if present */
  @Input() fields: any;

  /** @type {InputState[]} - The list of inputs contained in the flow step */
  @Input() inputList: InputState[];

  /** @type {boolean} - Indicates if the input its editable */
  @Input() readonly: boolean;

  /** @type {any} */
  @Input() filter: any;

  /** @type {any} - Represents the step model for the active Flow Step */
  @Input() step: any;

  /** @type {string} - A global style the input hints */
  @Input() labelStyle: string;

  /** @type {EventEmmitter} - Callback to tell the FlowStep (or any class using this)
   *  the Form has changed status */
  @Output() formStatusChanged = new EventEmitter();

  /** @type {EventEmmiter} - Callback to tell the FlowStep (or any class using this) the Form has changed value */
  @Output() formValueChanged = new EventEmitter();

  /** @type {EventEmmiter} - Callback to tell the FlowStep which path to take */
  @Output() goToPage = new EventEmitter();

  /** @type {FormGroup} - The main form containing the inputs (as form controls),
   *  this is the form used for input validation
   */
  mainForm: FormGroup;

  /** @type {StepInputDirective} - Represents the directive used in the container
   * template to dinamically add inputs as necessary */
  @ViewChild(StepInputDirective) inputDirective: StepInputDirective;

  constructor(
    public formBuilder: FormBuilder) { }

  /** Angular lifecycle callback. */
  ngOnInit() {
    console.log('InputContainer initialized');

    this.mainForm = this.formBuilder.group({});
    this.mainForm.statusChanges.subscribe(status => {
      this.formStatusChanged.emit(this.mainForm.valid);
    });

    if (!this.inputList || this.inputList.length === 0) {
      // If there are no inputs to validate, the form its valid by default
      this.formStatusChanged.emit(true);
    }

    let self = this;
    // Everytime a value on the form changes we update the 
    // flow input values (avoiding sending too much calls)
    this.mainForm.valueChanges
      .debounceTime(300)
      .subscribe((value) => {
        for (let inputId in value) {
          let inputValue = value[inputId];
          this.formValueChanged.emit({ id: inputId, value: inputValue });

          console.log(`step values id: ${inputId} value: ${inputValue}`);
        }
      });
    console.log('FormGroup initialized');

  }

  // This warns the parent if the mainForm is valid
  ngAfterViewInit() {
    // Component views are initialized
    /* if (this.mainForm) {
      this.formValidate.emit(this.mainForm.controls['formArray'].valid);
    } */
  }

  rgb2hex(rgb: any) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  forwardGoToPage(event) {
    this.goToPage.emit(event);
  } 

}