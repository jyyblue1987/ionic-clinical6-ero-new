import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NavController, NavParams, Loading } from 'ionic-angular';

import { InputState, ChoiceState, InputStyle } from '../input.model';
import { StepInputComponent } from '../stepinput.component';

import { FormGroup } from '@angular/forms';
import { COUNTRIES, STATE } from './location-list';

/**
 * This class represents an input of type single choice.
 * 
 * The value its the choice selected by the user.
 */
@Component({
  selector: 'stepinput-single_choice',
  templateUrl: 'stepinput-single_choice.component.html',
})
export class StepInputSingleChoiceComponent extends StepInputComponent {

  /**
   * @type {string} - A color used to paint the radio buttons,
   * in accordance to a define app theme color.
   */
  themeColor: string;
  step: any;
  constructor(public navParams: NavParams) {
    super();
    this.themeColor = this.navParams.get('themeColor');
    this.step = this.navParams.data && this.navParams.data.step ? this.navParams.data.step : null;
  }

  ngOnInit() {
    if (this.value && this.style == 'location') {
        this.fixStateInput();
      }
  }

  select(data) {
      this.value = data;
      this.fixStateInput();
  }

  fixStateInput() {
      if (this.flowInput['storage_attribute'] === 'country' && this.style == 'location') {
          let input = this.step.inputs.filter(input => input.id === 'state')[0];
          let control = this.subForm.controls[input.id]; // this modifies the Formcontrol of the "State" input field  when a country is selected
          if (this.value !== 'United States' && control) {
              this.disableInput(control);
              this.setValue(control, '');
              // this.step.inputs[3]['locked'] = true;
          } else {
              this.enableInput(control);
              this.setValue(control, 'Alabama');
          }
      }
  }
}