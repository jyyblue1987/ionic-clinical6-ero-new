import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { StepInputComponent } from '../stepinput.component';

/**
 * This class represents an input of type date.
 * 
 * The value its the date the user selected in the input.
 */
@Component({
  selector: 'stepinput-date',
  templateUrl: './stepinput-date.component.html'
})

export class StepInputDateComponent extends StepInputComponent {

  /** @type {string} - The format in which the date is displayes */
  displayFormat = 'DD/MMMM/YYYY';

  /** @type {any} - The selected date */
  date: any;

  /** @type {boolean} - Flag indicating if the input has user focus */
  focusOut: boolean;

  /** @type {string} - Default min and max date values */
  minDate = '1917';
  maxDate = '2025';

  /** Angular lifecycle callback to calculate the displayFormat, the pickerFormat, the minDate and the maxDate to use in the ion-datetime picker */
  ngOnInit() {
    if (this.flowInput['title']) {
      let str = this.flowInput['title'];
      this.displayFormat = this.body || str.substring(str.indexOf('(') + 1, str.indexOf(')')) || 'DD/MMMM/YYYY';
    }
    if (this.value !== '') {
      this.date = this.value;
    }
    if (this.flowInput['validation_details'] && this.flowInput['validation_details'].max) {
      this.maxDate = this.getRelativeDate(this.flowInput['validation_details'].max);
    }
    if (this.flowInput['validation_details'] && this.flowInput['validation_details'].min) {
      this.minDate = this.getRelativeDate(this.flowInput['validation_details'].min);
    }
  }

  /** TODO: Need details */
  getRelativeDate(relative: any) {
    if (relative === 'current') {
      return (new Date).toISOString();
    }
    let date = moment();

    // test string format
    var res = /-(\d+)\s*years/.exec(relative);
    if (res && res.length > 0) relative = { subtract: { year: res[1] } };

    if (relative.subtract) {
      var momentOptions = {
        years: relative.subtract.year || 0,
        months: relative.subtract.month || 0,
        days: relative.subtract.day || 0,
      };
      date.subtract(momentOptions);
    } else if (relative.add) {
      var momentOptions = {
        years: relative.add.year || 0,
        months: relative.add.month || 0,
        days: relative.add.day || 0,
      };
      date.add(momentOptions);
    }

    return date.toISOString();
  }
}