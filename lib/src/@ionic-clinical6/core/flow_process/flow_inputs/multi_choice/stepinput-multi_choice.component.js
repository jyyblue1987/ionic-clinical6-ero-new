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
import { InputStyle } from '../input.model';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type multiple choice.
 *
 * The value its the list of choices selected by the user.
 */
let StepInputMultiChoiceComponent = class StepInputMultiChoiceComponent extends StepInputComponent {
    /**
     * This class represents an input of type multiple choice.
     *
     * The value its the list of choices selected by the user.
     */
    constructor() {
        super(...arguments);
        /** @type {boolean} - Flag indicating if the dropdown should shown on the input. Used when the style its that of dropdown. */
        this.showDropdown = false;
        /** @type {boolean} - Flag indicating if the dropdown its selected. Used when the style its that of dropdown. */
        this.dropdownSelected = false;
    }
    /** Angular lifecycle callback to check existing values and validate them */
    ngOnInit() {
        const self = this;
        // Set Values
        if ((this.value) && (this.value.length > 0)) {
            if (this.value.constructor !== Array) {
                // try to parse it to a JSON array,
                // TODO, check why the platform returns a string like "[\"Monday\", \"Wednesday\", \"Thursday\"]" instead of an Array
                let value = JSON.parse(this.value);
                if (value.constructor !== Array)
                    return; // silently give up with setting the values
                this.value = value;
            }
            this.value.forEach(val => {
                let item = this.choices.find(choice => (choice.choiceBody === val));
                if (item)
                    item.choiceSelected = true;
            });
            let numberSelected = this.emit();
            this.validate(numberSelected);
        }
        if (this.style === InputStyle.dropdown)
            this.renderChoiceText();
    }
    /**
    * Indicates the checkbox on the input has been checked/unchecked.
    *
    * @param opt - The value of the input when the change was made
    */
    selectOption() {
        // When the checkboxeschange their value we manually
        // check for those selected and send it to the dummy input
        // via the changed callback
        let choiceValues = this.choices
            .filter(choice => { return choice.choiceSelected; })
            .map(choice => { return choice.choiceId; });
        this.changed(choiceValues);
        this.touched();
    }
    /**
     * Sets the radio button to checked if there's a value for
     * the radio.
     *
     * @param numberSelected - The value of the radio, 0 if its not checked, different than 0 otherwise.
     */
    validate(numberSelected) {
        if (this.subForm.controls['input'])
            this.subForm.controls['input'].setValue(numberSelected === 0 ? undefined : 'true');
    }
    /**
     *
     */
    emit() {
        let choiceValues = [];
        for (let choiceItem of this.choices)
            if (choiceItem.choiceSelected) {
                choiceValues.push(choiceItem.choiceId);
                this.choiceText = choiceItem.choiceBody + ' ';
            }
        return choiceValues.length;
    }
    /**
     * Render the choice text if the values are week days.
     */
    renderChoiceText() {
        this.choiceText = '';
        for (let i = 0, prevChoice, choiceItem, n = 0; choiceItem = this.choices[i]; i++) {
            // for (let choiceItem of this.choiceItems)
            if (choiceItem.choiceSelected) {
                if (!prevChoice) {
                    // first item of a group
                    this.choiceText = this.choiceText +
                        (this.choiceText.length > 0 ? ' ' : '') +
                        choiceItem.choiceBody;
                }
                else {
                    this.choiceText = this.choiceText;
                }
                prevChoice = choiceItem.choiceBody;
                n++;
                if (i >= this.choices.length - 1) {
                    // handle last item
                    this.choiceText = this.choiceText +
                        (n === 2 ? ' ' + prevChoice + ' ' : (n > 2 ? ' - ' + prevChoice + ' ' : ''));
                }
            }
            else {
                if (prevChoice) {
                    // last item of a group
                    this.choiceText = this.choiceText +
                        (n === 2 ? ' ' + prevChoice + ' ' : (n > 2 ? ' - ' + prevChoice + ' ' : ''));
                }
                prevChoice = null;
                n = 0;
            }
        }
    }
    /**
     * Updates the value of the dropdown
     * flag when the input becomes focused.
     */
    inputFocus() {
        this.showDropdown ? this.showDropdown = false : this.showDropdown = true;
    }
    /**
     * Updates the value of the dropdown
     * flag when the input its hovered by a mouse.
     */
    inputMousedown() {
        if (this.dropdownInputEl.hasFocus())
            this.showDropdown ? this.showDropdown = false : this.showDropdown = true;
    }
    /**
     * Updates the value of the dropdown
     * flag when the input losses focus.
     */
    inputBlur() {
        if (!this.dropdownSelected) {
            this.timeoutBlur = setTimeout(() => {
                this.showDropdown = false;
            }, 300);
        }
    }
    /**
     * Callback that gets executed when a change on the input
     * has been detected.
     *
     * @param fn - The output function defined on the dummy input
     */
    handleChangeFunction(fn) {
        this.changed = fn;
    }
    /**
     * Callback that gets executed when the input becomes
     * focused (touched).
     *
     * @param fn - The output function defined on the dummy input
     */
    handleTouchFunction(fn) {
        this.touched = fn;
    }
    /**
     * Callback that gets executed when a value is written on the input.
     *
     * @param fn - The output function defined on the dummy input
     */
    handleWrite(value) {
        console.log('handle write', value);
    }
    /**
     * Updates the value of the dropdown flag when the input
     * becomes focused for the first time.
     */
    itemTouchStart() {
        this.dropdownSelected = true;
    }
};
__decorate([
    ViewChild('dropdownInput'),
    __metadata("design:type", Object)
], StepInputMultiChoiceComponent.prototype, "dropdownInputEl", void 0);
StepInputMultiChoiceComponent = __decorate([
    Component({
        selector: 'stepinput-multi_choice',
        template: `
    <div [formGroup]="subForm" novalidate>
      <ion-col no-padding *ngIf="(style == InputStyle.radioButtons) && !filter['excludeQuestion']" class="question-container">
          <div class="question">{{title}}</div>      
          <div class="question" *ngIf="body">{{body}}</div>
      </ion-col>

      <dummy-input [formControlName]="flowInput.inputId" (onChangeFunction)="handleChangeFunction($event)" (onTouchedFunction)="handleTouchFunction($event)"
        (writtenValue)="handleWrite($event)">
      </dummy-input>

      <!-- Radio Button (Checkbox) -->
      <ion-row class="choice-container" *ngIf="(style == InputStyle.radioButtons)" [class.readonly]="readOnly">
        <span>
          <ion-item class="item" *ngFor="let choiceItem of choices">
            <ion-label class="labelwrap">{{choiceItem.choiceBody}}</ion-label>
            <ion-checkbox class="input-{{style}}" [(ngModel)]="choiceItem.choiceSelected" [ngModelOptions]="{standalone: true}" (ionChange)="selectOption()">
            </ion-checkbox>
          </ion-item>
        </span>
      </ion-row>

      <!-- Dropdown -->
      <ion-item *ngIf="(style == InputStyle.dropdown)" class="input-field" [class.readonly]="readOnly">
        <ion-label floating>{{title}}</ion-label>
        <ion-input class="input-{{style}}" type="text" readonly value="{{choiceText}}" #dropdownInput (ionFocus)="inputFocus()" (ionBlur)="inputBlur()"
          (mousedown)="inputMousedown()"></ion-input>
      </ion-item>
      <ion-col *ngIf="(style == InputStyle.dropdown) && showDropdown" class="choice-box">
        <ion-item class="item" *ngFor="let choiceItem of choices">
          <ion-label class="labelwrap">{{choiceItem.choiceBody}}</ion-label>
          <ion-checkbox class="input-{{style}}" [(ngModel)]="choiceItem.choiceSelected" [ngModelOptions]="{standalone: true}" (ionChange)="selectOption()"
            (touchstart)="itemTouchStart()" (touchend)="itemTouchEnd()"></ion-checkbox>
        </ion-item>
      </ion-col>

      <!-- Error feedback  -->
      <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>

    </div>
  `,
    })
], StepInputMultiChoiceComponent);
export { StepInputMultiChoiceComponent };

//# sourceMappingURL=stepinput-multi_choice.component.js.map
