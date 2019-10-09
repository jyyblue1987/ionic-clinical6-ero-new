var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type single choice.
 *
 * The value its the choice selected by the user.
 */
let StepInputSingleChoiceComponent = class StepInputSingleChoiceComponent extends StepInputComponent {
    constructor(navParams) {
        super();
        this.navParams = navParams;
        this.themeColor = this.navParams.get('themeColor');
        this.step = this.navParams.data && this.navParams.data.step ? this.navParams.data.step : null;
    }
    ngOnInit() {
        if (this.value && this.style == 'location') {
            this.fixStateInput();
        }
    }
    select(data) {
        this.value = data;
        this.fixStateInput();
    }
    fixStateInput() {
        if (this.flowInput['storage_attribute'] === 'country' && this.style == 'location') {
            let input = this.step.inputs.filter(input => input.id === 'state')[0];
            let control = this.subForm.controls[input.id]; // this modifies the Formcontrol of the "State" input field  when a country is selected
            if (this.value !== 'United States' && control) {
                this.disableInput(control);
                this.setValue(control, '');
                // this.step.inputs[3]['locked'] = true;
            }
            else {
                this.enableInput(control);
                this.setValue(control, 'Alabama');
            }
        }
    }
};
StepInputSingleChoiceComponent = __decorate([
    Component({
        selector: 'stepinput-single_choice',
        template: `
    <div [formGroup]="subForm">
      <ion-col *ngIf="(style != InputStyle.dropdown) && !filter['excludeQuestion']" no-padding class="question-container">
        <div class="question" *ngIf="title">{{title}}</div>      
        <div class="question" *ngIf="body">{{body}}</div>
      </ion-col>

      <!-- // Radio Button -->
      <ion-row *ngIf="(style == InputStyle.radioButtons)" padding class="radio-buttons">
        <div radio-group [formControlName]="flowInput.inputId">
          <ion-item class="item-radio" *ngFor="let choiceItem of choices; let i = index;">
            <ion-label class="labelwrap" [innerHTML]="choiceItem.choiceBody !== '' ? choiceItem.choiceBody : '(none)'"></ion-label>
            <ion-radio value="{{choiceItem.choiceId}}" [disabled]="readOnly"></ion-radio>
          </ion-item>
        </div>
      </ion-row>

      <!-- // Dropdown -->
      <ion-item *ngIf="(style == InputStyle.dropdown)" class="item-select">
          <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title}}</ion-label>
          <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title}}</ion-label>
        <ion-select [formControlName]="flowInput.inputId" (ionCancel)="focusOut=true">
          <ion-option value="{{choiceItem.choiceId}}" *ngFor="let choiceItem of choices; let i = index;" [innerHTML]="choiceItem.choiceBody !== '' ? choiceItem.choiceBody : '(none)'"></ion-option>
        </ion-select>
      </ion-item>

      <ion-item  *ngIf="(style == 'location')" [class.readonly]="readonly" class="item-select">
        <ion-label *ngIf="labelStyle==='stacked'" stacked class="label">{{title}}</ion-label>
        <ion-label *ngIf="!labelStyle || labelStyle==='floating'" floating class="label">{{title}}</ion-label>
        <ion-select [formControlName]="flowInput.inputId" [(ngModel)]="value" (ngModelChange)="select($event)" [disabled]="readOnly">
                <ion-option value="{{choiceItem.choiceId}}" *ngFor="let choiceItem of choices; let i = index;" 
                    [innerHTML]="choiceItem.choiceBody !== '' ? choiceItem.choiceBody : '(none)'"></ion-option>
        </ion-select>
      </ion-item>

      <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>
    </div>
  `,
    }),
    __metadata("design:paramtypes", [NavParams])
], StepInputSingleChoiceComponent);
export { StepInputSingleChoiceComponent };

//# sourceMappingURL=stepinput-single_choice.component.js.map
