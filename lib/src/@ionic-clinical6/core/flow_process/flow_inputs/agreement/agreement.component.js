var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type agreement.
 *
 * The value its the date the agreement was
 * accepted.
 */
let AgreementCheckboxComponent = class AgreementCheckboxComponent extends StepInputComponent {
    /**
     * This class represents an input of type agreement.
     *
     * The value its the date the agreement was
     * accepted.
     */
    constructor() {
        super(...arguments);
        /** @type {Array<ChoiceState>} - The list of choices coming from   the flow */
        this.choiceItems = [];
        /** @type {any} - Flag indicating if the choice has been selected */
        this.choiceSelected = null;
    }
    /** Angular lifecycle callback. */
    ngOnInit() {
        const self = this;
        // Set Values
        if (this.value && this.value !== '') {
            this.choiceSelected = true;
        }
    }
    /**
     * Indicates the checkbox on the input has been checked/unchecked.
     *
     * @param opt - The value of the input when the change was made
     */
    selectOption(opt) {
        // here send `opt`, the index of the selected item
        if (!this.choiceSelected)
            this.choiceSelected = null; // Use the 'null' instead the 'false' value to disable the button
    }
};
__decorate([
    ViewChild('dropdownInput'),
    __metadata("design:type", Object)
], AgreementCheckboxComponent.prototype, "dropdownInputEl", void 0);
AgreementCheckboxComponent = __decorate([
    Component({
        selector: 'agreement-checkbox',
        template: `
    <div [formGroup]="subForm" novalidate>
      <ion-row class="choice-container">
        <ion-checkbox [formControlName]="flowInput.inputId" [(ngModel)]="choiceSelected" (ionChange)="selectOption(i)"></ion-checkbox>
        <ion-label class="labelwrap">{{title}}</ion-label>
      </ion-row>
      <ion-col no-padding class="question-container">
        <div class="question">{{hint}}</div>
      </ion-col>

      <!-- Error feedback  -->
      <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>
    </div>
  `,
    })
], AgreementCheckboxComponent);
export { AgreementCheckboxComponent };

//# sourceMappingURL=agreement.component.js.map
