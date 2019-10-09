var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { StepInputComponent } from '../stepinput.component';
import * as moment from 'moment';
let StepInputTimeComponent = class StepInputTimeComponent extends StepInputComponent {
    constructor() {
        super(...arguments);
        // @Output() choiceChanged = new EventEmitter();
        this.displayFormat = 'hh:mm A';
        this.formData = new EventEmitter();
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
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], StepInputTimeComponent.prototype, "formData", void 0);
StepInputTimeComponent = __decorate([
    Component({
        selector: 'stepinput-time',
        template: `
    <div class="form-container" [formGroup]="subForm" novalidate>   
      <ion-item button no-padding [class.readonly]="readOnly">
        <ion-label class="placeholder-label" floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title}}</ion-label>
        <ion-label class="placeholder-label" stacked *ngIf="labelStyle === 'stacked'">{{title}}</ion-label>
        <ion-datetime [formControlName]="flowInput.inputId" class="input-{{type}}"
          [pickerFormat]="displayFormat" [displayFormat]="displayFormat" [min]="minHour" [max]="maxHour"
           (ionCancel)="focusOut=true" >
        </ion-datetime>
      </ion-item>
      <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>
  
    </div>
  `
    })
], StepInputTimeComponent);
export { StepInputTimeComponent };

//# sourceMappingURL=stepinput-time.component.js.map
