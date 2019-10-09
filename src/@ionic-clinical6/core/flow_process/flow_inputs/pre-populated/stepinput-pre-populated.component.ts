import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Clinical6Service } from '../../../clinical6.service';

import { InputStyle } from '../input.model';
import { StepInputComponent } from '../stepinput.component';

import { FormGroup } from '@angular/forms';

/**
 * This class represents an input of type pre-populated.
 * 
 * The value its the value retrieved from a Search Service,
 * in this case the value its not editable and its used for 
 * information purposes..
 */
@Component({
  selector: 'stepinput-pre-populated',
  templateUrl: './stepinput-pre-populated.component.html'
})
// TODO: Low priority input
export class StepInputPrePopulatedComponent extends StepInputComponent {

  /** @type {string} - The role. */
  roleValue = '';

  /** @type {boolean} - Flag indicating if the type of value its supported. */
  supported: boolean = true;

  constructor(public captiveReach: Clinical6Service) {
    super();
  }

  /** Angular lifecycle callback. */
  ngOnInit() {

    // even if there's no input, if there's a pre filled value
    // we send the valid form event
    // this.choiceChanged.emit(this.value);
    if (this.value) {
      if (this.subForm.controls['input'])
        this.subForm.controls['input'].setValue('true');
    }
  }

  /**
   * Converts the string value to a a camel case.
   * 
   * @param s - The string to be formatted
   */
  snakeToCamel(s: string) {
    return s.replace(/_\w/g, function (m) { return m[1].toUpperCase(); });
  }

  /**
   * Converts the string value to a a title case.
   * 
   * @param s - The string to be formatted
   */
  snakeToTitle(s: string) {
    if (!s) return '';
    let result = s.replace(/_\w/g, function (m) { return ' ' + m[1].toUpperCase(); });
    return result[0].toUpperCase() + result.slice(1);
  }
}