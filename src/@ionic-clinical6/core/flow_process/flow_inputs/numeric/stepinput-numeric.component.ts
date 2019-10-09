import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FormGroup } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { StepInputTextComponent } from '../text/stepinput-text.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';

/**
 * This class represents an input of type numeric.
 * 
 * The value its the number input by the user.
 */
@Component({
  selector: 'stepinput-numeric',
  templateUrl: './stepinput-numeric.component.html'
})

export class StepInputNumericComponent extends StepInputTextComponent {

  /** @type {boolean} - Flag indicating if the input has user focus. */
  focusOut: boolean;

  /** @type {any} - Represents a numeric text mask, used for validation. */
  numberMask;

  constructor(
    public platform: Platform,
    public elementRef: ElementRef,
  ) {
    super();
    this.numberMask = createNumberMask({
      requireDecimal: true
    });
  }

  /** Angular lifecycle callback. */
  ngOnInit() {
    this.keyboard.hideKeyboardAccessoryBar(false);
    this.readOnly && (this.focusOut = this.readOnly);
  }

  /** 
   * Helper method that gets called when the done button on 
   * the virtual keyboard its pressed.
   */
  doneCallback() { }
}