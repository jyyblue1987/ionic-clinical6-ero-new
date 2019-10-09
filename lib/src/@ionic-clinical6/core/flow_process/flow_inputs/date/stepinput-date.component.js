var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import * as moment from 'moment';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type date.
 *
 * The value its the date the user selected in the input.
 */
let StepInputDateComponent = class StepInputDateComponent extends StepInputComponent {
    /**
     * This class represents an input of type date.
     *
     * The value its the date the user selected in the input.
     */
    constructor() {
        super(...arguments);
        /** @type {string} - The format in which the date is displayes */
        this.displayFormat = 'DD/MMMM/YYYY';
        /** @type {string} - Default min and max date values */
        this.minDate = '1917';
        this.maxDate = '2025';
    }
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
    getRelativeDate(relative) {
        if (relative === 'current') {
            return (new Date).toISOString();
        }
        let date = moment();
        // test string format
        var res = /-(\d+)\s*years/.exec(relative);
        if (res && res.length > 0)
            relative = { subtract: { year: res[1] } };
        if (relative.subtract) {
            var momentOptions = {
                years: relative.subtract.year || 0,
                months: relative.subtract.month || 0,
                days: relative.subtract.day || 0,
            };
            date.subtract(momentOptions);
        }
        else if (relative.add) {
            var momentOptions = {
                years: relative.add.year || 0,
                months: relative.add.month || 0,
                days: relative.add.day || 0,
            };
            date.add(momentOptions);
        }
        return date.toISOString();
    }
};
StepInputDateComponent = __decorate([
    Component({
        selector: 'stepinput-date',
        template: `
    <div class="form-container" [formGroup]="subForm" novalidate>
      <ion-item button no-padding [class.readonly]="readOnly">
        <ion-label class="placeholder-label" floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title}}</ion-label>
        <ion-label class="placeholder-label" stacked *ngIf="labelStyle === 'stacked'">{{title}}</ion-label>
        <ion-datetime [formControlName]="flowInput.inputId" class="input-{{type}}" [displayFormat]="displayFormat" [pickerFormat]="displayFormat"
          [min]="minDate" [max]="maxDate" (ionCancel)="focusOut=true">
        </ion-datetime>
      </ion-item>

      <!-- Error feedback  -->
      <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>

    </div>
  `
    })
], StepInputDateComponent);
export { StepInputDateComponent };

//# sourceMappingURL=stepinput-date.component.js.map
