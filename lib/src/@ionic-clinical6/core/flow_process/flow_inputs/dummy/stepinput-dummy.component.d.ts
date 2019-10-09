import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class StepInputDummyComponent implements ControlValueAccessor, OnInit {
    /** @type {EventEmmiter} - Callback function, executed when a value is written on the input */
    writtenValue: EventEmitter<any>;
    /** @type {EventEmmiter} - Callback function, executed a change is detected on the input */
    onChangeFunction: EventEmitter<any>;
    /** @type {EventEmmiter} - Callback function, executed the input its touched (received focus) */
    onTouchedFunction: EventEmitter<any>;
    /** Constructor */
    constructor();
    /** Lifecycle method */
    ngOnInit(): void;
    /** Angular Callback, executed when a change on the control is detected.
     *  Here we call the custom output property.
     */
    registerOnChange(fn: any): void;
    /** Angular Callback, executed when the control is touched.
     *  Here we call the custom output property.
     */
    registerOnTouched(fn: any): void;
    /** Angular Callback, executed when a change on the control's value is detected.
     *  Here we call the custom output property.
     */
    writeValue(value: any): void;
}
