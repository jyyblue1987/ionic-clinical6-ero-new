import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { BasePage } from '../../../pages/base/base-page';

import { InputStyle } from '../input.model';
import { StepInputComponent } from '../stepinput.component';
import { InputValidationFactory } from '../validation.factory';

/**
 * This class represents an input of type text.
 * 
 * The value its text entered by the user.
 */
@Component({
  selector: 'stepinput-text',
  templateUrl: './stepinput-text.component.html'
})

export class StepInputTextComponent extends StepInputComponent {

  /** @type {Keyboard} - Native keyboard instance.  */
  keyboard: Keyboard = new Keyboard();

  /** Angular lifecycle callback. */
  ngOnInit() {
    this.keyboard.hideKeyboardAccessoryBar(false);
    this.readOnly && (this.focusOut = this.readOnly);

  }

  initInput() {
    let codeValue = localStorage.getItem(this.flowInput['code']);
    InputValidationFactory.setValidatorRule('email',
      [Validators.required,
      Validators.email,
      ValidationService.codeValidation(codeValue)]);

    InputValidationFactory.setValidatorRule('password',
      [Validators.required,
      Validators.minLength(this.validationMin),
      Validators.maxLength(this.validationMax)]
    )

    console.log(ValidationService.inputCodeMap)
  }

  /**
   * @param rawValue - The unvalidated/unformatted string of text.
   * 
   * @return - A string with a phone number format.
   */
  createPhoneMask(rawValue: string) {
    return ValidationService.phoneMask(rawValue);
  }

  /**
   * @param rawValue - The unvalidated/unformatted string of text.
   * 
   * @return - A string with a zip code format.
   */
  createZipCodeMask(rawValue: string) {
    return ValidationService.zipCodeMask(rawValue);
  }

  /**
   * @param rawValue - The unvalidated/unformatted string of text.
   * 
   * @return - A string with a patient id format.
   */
  createPatientIdMask(rawValue: any) {
    return ValidationService.maskPatientId;
  }

  /**
   * @param rawValue - The unvalidated/unformatted string of text.
   * 
   * @return - A string with a password4 format.
   */
  getPasswordMask() {
    return ValidationService.passwordMask('numeric', this.validationMin, this.validationMax);
  }

  public get validators(): any {
    if (InputValidationFactory.getValidatorRule(this.style)) {
      return InputValidationFactory.getValidatorRule(this.style);
    } else {
      return [Validators.required];
    }
  }

}