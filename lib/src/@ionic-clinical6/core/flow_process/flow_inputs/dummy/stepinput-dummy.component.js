var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { forwardRef, Component, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
const DUMMY_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StepInputDummyComponent),
    multi: true
};
let StepInputDummyComponent = 
/**
 * This class represents a placeholder input, use this to provide FormControl functionality
 * to a custom element.
 *
 * Use this element as the FormControl for your Form and provide the values manually
 * via the callback properties.
 *
 * @example
 * <dummy-input
 *  [formControlName]="inputId"
 *  (onChangeFunction)="myChangeFunction($event)"
 *  (onTouchedFunction)="myTouchFunction($event)"
 *  (writtenValue)="myWriteFunction($event)"
 * >
 * </dummy-input>
 */
class StepInputDummyComponent {
    /** Constructor */
    constructor() {
        /** @type {EventEmmiter} - Callback function, executed when a value is written on the input */
        this.writtenValue = new EventEmitter();
        /** @type {EventEmmiter} - Callback function, executed a change is detected on the input */
        this.onChangeFunction = new EventEmitter();
        /** @type {EventEmmiter} - Callback function, executed the input its touched (received focus) */
        this.onTouchedFunction = new EventEmitter();
    }
    /** Lifecycle method */
    ngOnInit() {
    }
    /** Angular Callback, executed when a change on the control is detected.
     *  Here we call the custom output property.
     */
    registerOnChange(fn) {
        this.onChangeFunction.emit(fn);
    }
    /** Angular Callback, executed when the control is touched.
     *  Here we call the custom output property.
     */
    registerOnTouched(fn) {
        this.onTouchedFunction.emit(fn);
    }
    /** Angular Callback, executed when a change on the control's value is detected.
     *  Here we call the custom output property.
     */
    writeValue(value) {
        this.writtenValue.emit(value);
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], StepInputDummyComponent.prototype, "writtenValue", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], StepInputDummyComponent.prototype, "onChangeFunction", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], StepInputDummyComponent.prototype, "onTouchedFunction", void 0);
StepInputDummyComponent = __decorate([
    Component({
        providers: [DUMMY_CONTROL_ACCESSOR],
        selector: 'dummy-input',
        template: `

    `
    })
    /**
     * This class represents a placeholder input, use this to provide FormControl functionality
     * to a custom element.
     *
     * Use this element as the FormControl for your Form and provide the values manually
     * via the callback properties.
     *
     * @example
     * <dummy-input
     *  [formControlName]="inputId"
     *  (onChangeFunction)="myChangeFunction($event)"
     *  (onTouchedFunction)="myTouchFunction($event)"
     *  (writtenValue)="myWriteFunction($event)"
     * >
     * </dummy-input>
     */
    ,
    __metadata("design:paramtypes", [])
], StepInputDummyComponent);
export { StepInputDummyComponent };

//# sourceMappingURL=stepinput-dummy.component.js.map
