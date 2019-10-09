var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { InputStyle } from './input.model';
import { FormBuilder } from '@angular/forms';
import { StepInputDirective } from './stepinput.directive';
let InputContainerComponent = 
/**
 * Represents a component that contains all of the inputs for a given step.
 *
 * This class sets up the main FormGroup object, and handles updates to the form
 * status and values.
 *
 * @example <caption>html template</caption>
 * <input-container
 *     [inputList]="inputs"
 *     [fields]="fields"
 *     [filter]="filter"
 *     [readonly]="!editing"
 *     (formValueChanged)="updateControlValue($event)"
 *     (formStatusChanged)="updateFormStatus($event)"
 *     (goToPage)="goToPage($event)">
 *</input-container>
 */
class InputContainerComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        /**
         * @type {InputStyle} - Defines the style of the input, this definition its to be
         * used on the template
         */
        this.InputStyle = InputStyle;
        /** @type {EventEmmitter} - Callback to tell the FlowStep (or any class using this)
         *  the Form has changed status */
        this.formStatusChanged = new EventEmitter();
        /** @type {EventEmmiter} - Callback to tell the FlowStep (or any class using this) the Form has changed value */
        this.formValueChanged = new EventEmitter();
        /** @type {EventEmmiter} - Callback to tell the FlowStep which path to take */
        this.goToPage = new EventEmitter();
    }
    /** Angular lifecycle callback. */
    ngOnInit() {
        console.log('InputContainer initialized');
        this.mainForm = this.formBuilder.group({});
        this.mainForm.statusChanges.subscribe(status => {
            this.formStatusChanged.emit(this.mainForm.valid);
        });
        if (!this.inputList || this.inputList.length === 0) {
            // If there are no inputs to validate, the form its valid by default
            this.formStatusChanged.emit(true);
        }
        let self = this;
        // Everytime a value on the form changes we update the 
        // flow input values (avoiding sending too much calls)
        this.mainForm.valueChanges
            .debounceTime(300)
            .subscribe((value) => {
            for (let inputId in value) {
                let inputValue = value[inputId];
                this.formValueChanged.emit({ id: inputId, value: inputValue });
                console.log(`step values id: ${inputId} value: ${inputValue}`);
            }
        });
        console.log('FormGroup initialized');
    }
    // This warns the parent if the mainForm is valid
    ngAfterViewInit() {
        // Component views are initialized
        /* if (this.mainForm) {
          this.formValidate.emit(this.mainForm.controls['formArray'].valid);
        } */
    }
    rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? '#' +
            ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }
    forwardGoToPage(event) {
        this.goToPage.emit(event);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputContainerComponent.prototype, "fields", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], InputContainerComponent.prototype, "inputList", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], InputContainerComponent.prototype, "readonly", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputContainerComponent.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputContainerComponent.prototype, "step", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], InputContainerComponent.prototype, "labelStyle", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], InputContainerComponent.prototype, "formStatusChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], InputContainerComponent.prototype, "formValueChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], InputContainerComponent.prototype, "goToPage", void 0);
__decorate([
    ViewChild(StepInputDirective),
    __metadata("design:type", StepInputDirective)
], InputContainerComponent.prototype, "inputDirective", void 0);
InputContainerComponent = __decorate([
    Component({
        selector: 'input-container',
        template: `
    <form novalidate [class.readonly]="readonly">
      <ng-template step-input *ngFor="let input of inputList; let index = index" [input]="input" [value]="(fields && fields[input.inputId]) || ''"
        [group]="mainForm" [filter]="filter" (goToPage)="forwardGoToPage($event)">
      </ng-template>
    </form>
  `
    })
    /**
     * Represents a component that contains all of the inputs for a given step.
     *
     * This class sets up the main FormGroup object, and handles updates to the form
     * status and values.
     *
     * @example <caption>html template</caption>
     * <input-container
     *     [inputList]="inputs"
     *     [fields]="fields"
     *     [filter]="filter"
     *     [readonly]="!editing"
     *     (formValueChanged)="updateControlValue($event)"
     *     (formStatusChanged)="updateFormStatus($event)"
     *     (goToPage)="goToPage($event)">
     *</input-container>
     */
    ,
    __metadata("design:paramtypes", [FormBuilder])
], InputContainerComponent);
export { InputContainerComponent };

//# sourceMappingURL=input-container.component.js.map
