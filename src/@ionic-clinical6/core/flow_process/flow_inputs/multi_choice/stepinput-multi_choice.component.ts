import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { InputState, ChoiceState, InputStyle } from '../input.model';
import { StepInputComponent } from '../stepinput.component';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

/**
 * This class represents an input of type multiple choice.
 * 
 * The value its the list of choices selected by the user.
 */
@Component({
  selector: 'stepinput-multi_choice',
  templateUrl: 'stepinput-multi_choice.component.html',
})
export class StepInputMultiChoiceComponent extends StepInputComponent {

  /** @type {any} - Callback function for value changes, coming from the dummy input */
  changed;

  /** @type {any} - Callback function for focusing the input, coming from the dummy input */
  touched;

  /** @type {string} - A label containing the choice's body */
  choiceText: string;

  /** @type {boolean} - Flag indicating if the dropdown should shown on the input. Used when the style its that of dropdown. */
  showDropdown: boolean = false;

  /** @type {boolean} - Flag indicating if the dropdown its selected. Used when the style its that of dropdown. */
  dropdownSelected: boolean = false;

  /** @type {any} -  */
  timeoutBlur;

  /** @type {any} - The dom element for the input */
  @ViewChild('dropdownInput') dropdownInputEl;

  /** Angular lifecycle callback to check existing values and validate them */
  ngOnInit() {
    const self = this;

    // Set Values
    if ((this.value) && (this.value.length > 0)) {

      if (this.value.constructor !== Array) {
        // try to parse it to a JSON array,
        // TODO, check why the platform returns a string like "[\"Monday\", \"Wednesday\", \"Thursday\"]" instead of an Array
        let value = JSON.parse(this.value);
        if (value.constructor !== Array) return; // silently give up with setting the values
        this.value = value;
      }
      this.value.forEach(val => {
        let item = this.choices.find(choice => (choice.choiceBody === val));
        if (item) item.choiceSelected = true;
      });

      let numberSelected = this.emit();
      this.validate(numberSelected);
    }

    if (this.style === InputStyle.dropdown) this.renderChoiceText();

  }

  /**
  * Indicates the checkbox on the input has been checked/unchecked.
  * 
  * @param opt - The value of the input when the change was made
  */
  selectOption() {
    // When the checkboxeschange their value we manually
    // check for those selected and send it to the dummy input
    // via the changed callback
    let choiceValues = this.choices
      .filter(choice => { return choice.choiceSelected; })
      .map(choice => { return choice.choiceId; });
    this.changed(choiceValues);
    this.touched();

  }

  /** 
   * Sets the radio button to checked if there's a value for 
   * the radio.
   * 
   * @param numberSelected - The value of the radio, 0 if its not checked, different than 0 otherwise.
   */
  validate(numberSelected: number) {
    if (this.subForm.controls['input'])
      this.subForm.controls['input'].setValue(numberSelected === 0 ? undefined : 'true');
  }

  /** 
   * 
   */
  emit() {
    let choiceValues = [];
    for (let choiceItem of this.choices)
      if (choiceItem.choiceSelected) {
        choiceValues.push(choiceItem.choiceId);
        this.choiceText = choiceItem.choiceBody + ' ';
      }
    return choiceValues.length;
  }

  /**
   * Render the choice text if the values are week days.
   */
  renderChoiceText() {
    this.choiceText = '';
    for (let i = 0, prevChoice, choiceItem, n = 0; choiceItem = this.choices[i]; i++) {
      // for (let choiceItem of this.choiceItems)

      if (choiceItem.choiceSelected) {
        if (!prevChoice) {
          // first item of a group
          this.choiceText = this.choiceText +
            (this.choiceText.length > 0 ? ' ' : '') +
            choiceItem.choiceBody;
        }
        else {
          this.choiceText = this.choiceText;
        }
        prevChoice = choiceItem.choiceBody;
        n++;

        if (i >= this.choices.length - 1) {
          // handle last item
          this.choiceText = this.choiceText +
            (n === 2 ? ' ' + prevChoice + ' ' : (n > 2 ? ' - ' + prevChoice + ' ' : ''));
        }
      }
      else {
        if (prevChoice) {
          // last item of a group
          this.choiceText = this.choiceText +
            (n === 2 ? ' ' + prevChoice + ' ' : (n > 2 ? ' - ' + prevChoice + ' ' : ''));
        }
        prevChoice = null;
        n = 0;
      }
    }
  }

  /** 
   * Updates the value of the dropdown
   * flag when the input becomes focused.
   */
  inputFocus() {
    this.showDropdown ? this.showDropdown = false : this.showDropdown = true;
  }

  /** 
   * Updates the value of the dropdown
   * flag when the input its hovered by a mouse.
   */
  inputMousedown() {
    if (this.dropdownInputEl.hasFocus())
      this.showDropdown ? this.showDropdown = false : this.showDropdown = true;
  }

  /** 
   * Updates the value of the dropdown
   * flag when the input losses focus.
   */
  inputBlur() {
    if (!this.dropdownSelected) {
      this.timeoutBlur = setTimeout(() => {
        this.showDropdown = false;
      }, 300);
    }
  }

  /** 
   * Callback that gets executed when a change on the input 
   * has been detected.
   * 
   * @param fn - The output function defined on the dummy input
   */
  handleChangeFunction(fn) {
    this.changed = fn;
  }

  /** 
   * Callback that gets executed when the input becomes 
   * focused (touched).
   * 
   * @param fn - The output function defined on the dummy input
   */
  handleTouchFunction(fn) {
    this.touched = fn;
  }

  /** 
   * Callback that gets executed when a value is written on the input.
   * 
   * @param fn - The output function defined on the dummy input
   */
  handleWrite(value) {
    console.log('handle write', value);
  }

  /** 
   * Updates the value of the dropdown flag when the input
   * becomes focused for the first time.
   */
  itemTouchStart() {
    this.dropdownSelected = true;
  }
}



