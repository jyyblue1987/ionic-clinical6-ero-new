var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { StepInputComponent } from '../stepinput.component';
import { InputValidationFactory } from '../validation.factory';
/**
 * This class represents an input of type text.
 *
 * The value its text entered by the user.
 */
let StepInputTextComponent = class StepInputTextComponent extends StepInputComponent {
    /**
     * This class represents an input of type text.
     *
     * The value its text entered by the user.
     */
    constructor() {
        super(...arguments);
        /** @type {Keyboard} - Native keyboard instance.  */
        this.keyboard = new Keyboard();
    }
    /** Angular lifecycle callback. */
    ngOnInit() {
        this.keyboard.hideKeyboardAccessoryBar(false);
        this.readOnly && (this.focusOut = this.readOnly);
    }
    initInput() {
        let codeValue = localStorage.getItem(this.flowInput['code']);
        InputValidationFactory.setValidatorRule('email', [Validators.required,
            Validators.email,
            ValidationService.codeValidation(codeValue)]);
        InputValidationFactory.setValidatorRule('password', [Validators.required,
            Validators.minLength(this.validationMin),
            Validators.maxLength(this.validationMax)]);
        console.log(ValidationService.inputCodeMap);
    }
    /**
     * @param rawValue - The unvalidated/unformatted string of text.
     *
     * @return - A string with a phone number format.
     */
    createPhoneMask(rawValue) {
        return ValidationService.phoneMask(rawValue);
    }
    /**
     * @param rawValue - The unvalidated/unformatted string of text.
     *
     * @return - A string with a zip code format.
     */
    createZipCodeMask(rawValue) {
        return ValidationService.zipCodeMask(rawValue);
    }
    /**
     * @param rawValue - The unvalidated/unformatted string of text.
     *
     * @return - A string with a patient id format.
     */
    createPatientIdMask(rawValue) {
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
    get validators() {
        if (InputValidationFactory.getValidatorRule(this.style)) {
            return InputValidationFactory.getValidatorRule(this.style);
        }
        else {
            return [Validators.required];
        }
    }
};
StepInputTextComponent = __decorate([
    Component({
        selector: 'stepinput-text',
        template: `
    <ion-row no-padding *ngIf="(body) && !filter['excludeQuestion']" class="question-container">
      <div class="question">{{body}}</div>
    </ion-row>

    <!--These are the inputs in case of Floating Labels Style -->
      <div class="form-container" [formGroup]="subForm" novalidate *ngIf="!labelStyle || labelStyle !== 'placeholder'">
    
          <ion-item class="input-field" *ngIf="style===InputStyle.text" [class.readonly]="readOnly">
            <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
            <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
            <ion-input type="text" class="input-{{style}}" [formControlName]="flowInput.inputId" [readonly]="readOnly" (ionFocus)="focusOut=false"
              (ionBlur)="focusOut=true"></ion-input>
          </ion-item>

          <ion-item class="input-field" *ngIf="style===InputStyle.patientId" [class.readonly]="readOnly">
              <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
              <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
              <ion-input type="tel" [formControlName]="flowInput.inputId" [readonly]="readOnly" class="input-{{style}}"
                [textMask]="{mask: createPatientIdMask, guide: true}" (ionFocus)="focusOut=false" (ionBlur)="focusOut=true">
              </ion-input>
          </ion-item>

          <ion-item class="input-field" *ngIf="style===InputStyle.password" [class.readonly]="readOnly">
            <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
            <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
            <ion-input type="tel" style="-webkit-text-security:disc;" [formControlName]="flowInput.inputId" [readonly]="readOnly" class="input-{{style}}"
              [minlength]="validationMin" [maxlength]="validationMax" [textMask]="{mask: getPasswordMask(), guide: false}" (ionFocus)="focusOut=false"
              (ionBlur)="focusOut=true">
            </ion-input>
          </ion-item>
    
          <ion-item class="input-field" *ngIf="style===InputStyle.email" [class.readonly]="readOnly">
            <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
            <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
            <ion-input type="email" [formControlName]="flowInput.inputId" [readonly]="readOnly" class="input-{{style}}" autocapitalize="off"
              (ionFocus)="focusOut=false" (ionBlur)="focusOut=true">
            </ion-input>
          </ion-item>
    
          <ion-item class="input-field" *ngIf="style===InputStyle.phoneNumber" [class.readonly]="readOnly">
            <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
            <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
            <ion-input name="tel" type="tel" [textMask]="{mask: createPhoneMask, guide: false}" [formControlName]="flowInput.inputId"
              class="input-{{style}}" [readonly]="readOnly" (ionFocus)="focusOut=false" (ionBlur)="focusOut=true"></ion-input>
          </ion-item>
    
          <ion-item class="input-field" *ngIf="style===InputStyle.zipCode" [class.readonly]="readOnly">
            <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
            <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
            <ion-input type="tel" [textMask]="{mask: createZipCodeMask, guide: false}" [formControlName]="flowInput.inputId" class="input-{{style}}"
              [readonly]="readOnly" (ionFocus)="focusOut=false" (ionBlur)="focusOut=true"></ion-input>
          </ion-item>
    
          <ion-item class="text_area-field" *ngIf="style===InputStyle.textArea" [class.readonly]="readOnly">
            <ion-textarea placeholder="{{hint}}" rows="8" [formControlName]="flowInput.inputId" class="input-{{style}}" [readonly]="readOnly"
              (ionFocus)="focusOut=false" (ionBlur)="focusOut=true"></ion-textarea>
          </ion-item>
        </div>


    <!-- Error feedback  -->
    <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>
  `
    })
], StepInputTextComponent);
export { StepInputTextComponent };

//# sourceMappingURL=stepinput-text.component.js.map
