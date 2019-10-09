import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { InputState, ChoiceState, InputStyle } from '../input.model';
import { StepInputComponent } from '../stepinput.component';

import { FormGroup } from '@angular/forms';

/**
 * This class represents an input of type agreement.
 * 
 * The value its the date the agreement was 
 * accepted.
 */
@Component({
  selector: 'agreement-checkbox',
  templateUrl: 'agreement.component.html',
})
export class AgreementCheckboxComponent extends StepInputComponent {

  /** @type {string} - The text to be displayed on the input */
  choiceText: string;

  /** @type {any} - The dom element for the input */
  @ViewChild('dropdownInput') dropdownInputEl;

  /** @type {Array<ChoiceState>} - The list of choices coming from   the flow */
  choiceItems: Array<ChoiceState> = [];

  /** @type {any} - Flag indicating if the choice has been selected */
  choiceSelected: any = null;  

  /** Angular lifecycle callback. */
  ngOnInit() {
    const self = this;
    // Set Values
    if (this.value && this.value !== '') {
      this.choiceSelected = true;
    }
  }

  /**
   * Indicates the checkbox on the input has been checked/unchecked.
   * 
   * @param opt - The value of the input when the change was made
   */
  selectOption(opt: any) {
    // here send `opt`, the index of the selected item
    if (!this.choiceSelected)
      this.choiceSelected = null; // Use the 'null' instead the 'false' value to disable the button
  }
}



