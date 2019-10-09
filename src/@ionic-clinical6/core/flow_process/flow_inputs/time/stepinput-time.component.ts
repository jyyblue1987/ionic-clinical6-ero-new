import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepInputComponent } from '../stepinput.component';
import * as moment from 'moment';

@Component({
  selector: 'stepinput-time',
  templateUrl: './stepinput-time.component.html'
})

export class StepInputTimeComponent  extends StepInputComponent {
  // @Output() choiceChanged = new EventEmitter();
  displayFormat = 'hh:mm A';
  time: any;
  @Output() formData = new EventEmitter();
  focusOut: boolean;
  // @Input() dateFormat: string;
  minHour: any;
  maxHour: any;

  ngOnInit() {
    if (this.flowInput['title']) {
      let str = this.flowInput['title'];
      // setting up the time format
      this.displayFormat = this.body || str.substring(str.indexOf('(') + 1, str.indexOf(')')) || 'hh:mm A';
    }
    if (this.value !== '') {
      this.time = this.value;
    }

    if (this.flowInput['validation_details'] && this.flowInput['validation_details'].max && this.displayFormat.toLowerCase().indexOf('a') === -1) {
      this.maxHour = moment(this.flowInput['validation_details'].max, 'HH:mm').format();
    }
    if (this.flowInput['validation_details'] && this.flowInput['validation_details'].min && this.displayFormat.toLowerCase().indexOf('a') === -1) {
      this.minHour = moment(this.flowInput['validation_details'].min, 'HH:mm').format();
    }
  }
  // ngOnChanges(changes: any) {
  //   if (changes.value) {
  //     this.time = this.value;
  //     let emitValue = this.time; // do we need to reformat time?
  //     this.choiceChanged.emit(emitValue);
  //   }
  //   this.disableForm();
  // }

  // disableForm() { // disabled attribute cannot be set dynamically anymore using reactive forms. It needs to use enable()/ disable()
  //   if (this.readonly || this.inputData.locked)
  //     this.subForm.controls['input'].disable();
  //   else this.subForm.controls['input'].enable();
  // }

  // timeChanged() {
  //   if (this.time) {
  //     let emitValue = this.time; // do we need to reformat time?
  //     // this.choiceChanged.emit(emitValue);
  //   }
  // }
}