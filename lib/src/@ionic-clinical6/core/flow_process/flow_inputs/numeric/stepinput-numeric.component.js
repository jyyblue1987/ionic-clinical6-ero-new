var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StepInputTextComponent } from '../text/stepinput-text.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
/**
 * This class represents an input of type numeric.
 *
 * The value its the number input by the user.
 */
let StepInputNumericComponent = class StepInputNumericComponent extends StepInputTextComponent {
    constructor(platform, elementRef) {
        super();
        this.platform = platform;
        this.elementRef = elementRef;
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
};
StepInputNumericComponent = __decorate([
    Component({
        selector: 'stepinput-numeric',
        template: `
    <ion-row no-padding *ngIf="(body)  && !filter['excludeQuestion']" class="question-container">
      <div class="question">{{body}}</div>
    </ion-row>

    <!--These are the inputs in case of Floating Labels Style -->

    <div class="form-container" [formGroup]="subForm" novalidate *ngIf="!labelStyle || labelStyle !== 'placeholder'">
      <ion-item class="input-field" *ngIf="style===InputStyle.textBox" [class.readonly]="readOnly">
          <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
          <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
        <ion-input type="tel" name="text_box" class="input-{{style}}" [formControlName]="flowInput.inputId" (ionFocus)="focusOut=false"
          (ionBlur)="focusOut=true" [readonly]="readOnly" pattern="[0-9]+"></ion-input>
      </ion-item>

      <ion-item class="input-field" *ngIf="style===InputStyle.currency" [class.readonly]="readOnly">
            <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: hint}}</ion-label>
            <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: hint}}</ion-label>
        <ion-input name="text" type="tel" class="input-{{style}}" [textMask]="{mask: numberMask }" [readonly]="readOnly" (ionFocus)="focusOut=false"
          (ionBlur)="focusOut=true" [formControlName]="flowInput.inputId"></ion-input>
      </ion-item>

      <!-- Error Feedback -->
      <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>

    </div>
  `
    }),
    __metadata("design:paramtypes", [Platform,
        ElementRef])
], StepInputNumericComponent);
export { StepInputNumericComponent };

//# sourceMappingURL=stepinput-numeric.component.js.map
