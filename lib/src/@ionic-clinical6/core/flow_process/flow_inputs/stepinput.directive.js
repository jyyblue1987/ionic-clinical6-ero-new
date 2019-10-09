var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ViewContainerRef, EventEmitter, Output, Input, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepInputFactory } from './stepinput.factory';
import { ValidationService } from './validation.service';
/**
 * This Directive provides a dynamic way to create InputContainers,
 * it dinamically instantiates inputs using the {@link StepInputFactory}
 * with the given input type
 *
 * Most of the times you won't need to use this directive, as its internally
 * used by the input container. Standalone use is still available.
 *
 * @example
 * <ng-template step-input *ngFor="let input of inputList; let index = index"
 * [input]="input"
 * [value]="(fields && fields[input.inputId]) || ''"
 * [group]="mainForm">
 * </ng-template>
 */
let StepInputDirective = class StepInputDirective {
    constructor(viewContainerRef, componentFactoryResolver) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.goToPage = new EventEmitter(); // Action associated to the 'Back' button click
        this.inputCodeMap = {};
    }
    /** Angular lifecycle callback. */
    ngOnInit() {
        // We get the input component from a factory, given the {@link InputState.inputType}
        let inputComponent = StepInputFactory.factory(this.input);
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(inputComponent);
        let componentRef = this.viewContainerRef.createComponent(componentFactory);
        let inputInstance = componentRef.instance;
        // Initialize the Input decorators on the new instance
        inputInstance.flowInput = this.input;
        inputInstance.value = this.value;
        inputInstance.subForm = this.mainForm;
        inputInstance.labelStyle = this.labelStyle;
        inputInstance.inputFilter = this.filter;
        inputInstance.goToPage = this.goToPage;
        let inputId = inputInstance.flowInput.inputId;
        if (inputInstance.flowInput['code']) {
            ValidationService.setCodeMap(inputInstance.flowInput['code'], inputId.toString());
        }
        let hasEquality = (inputInstance.flowInput['validation_details'] && inputInstance.flowInput['validation_details']['equality']) || false;
        if (hasEquality) {
            let equalityCode = inputInstance.flowInput['validation_details']['equality']['input_question_code'] || null;
            let inputCode = inputInstance.flowInput['code'];
            this.mainForm.setValidators([ValidationService.equalityValidation(inputCode, equalityCode)]);
        }
        inputInstance.initInput();
        this.mainForm.addControl(`${this.input.inputId}`, new FormControl(this.value, Validators.compose(inputInstance.requiredValidators)));
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], StepInputDirective.prototype, "labelStyle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepInputDirective.prototype, "input", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepInputDirective.prototype, "value", void 0);
__decorate([
    Input('group'),
    __metadata("design:type", FormGroup)
], StepInputDirective.prototype, "mainForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepInputDirective.prototype, "filter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], StepInputDirective.prototype, "goToPage", void 0);
StepInputDirective = __decorate([
    Directive({
        selector: '[step-input]'
    }),
    __metadata("design:paramtypes", [ViewContainerRef,
        ComponentFactoryResolver])
], StepInputDirective);
export { StepInputDirective };

//# sourceMappingURL=stepinput.directive.js.map
