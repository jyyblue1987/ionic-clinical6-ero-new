import { forwardRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const DUMMY_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StepInputDummyComponent),
    multi: true
};

@Component({
    providers: [DUMMY_CONTROL_ACCESSOR],
    selector: 'dummy-input',
    templateUrl: './stepinput-dummy.component.html'
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
export class StepInputDummyComponent implements ControlValueAccessor, OnInit {

    /** @type {EventEmmiter} - Callback function, executed when a value is written on the input */
    @Output() writtenValue: EventEmitter<any> = new EventEmitter();

    /** @type {EventEmmiter} - Callback function, executed a change is detected on the input */
    @Output() onChangeFunction: EventEmitter<any> = new EventEmitter();

    /** @type {EventEmmiter} - Callback function, executed the input its touched (received focus) */
    @Output() onTouchedFunction: EventEmitter<any> = new EventEmitter();

    /** Constructor */
    constructor() { }

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

}