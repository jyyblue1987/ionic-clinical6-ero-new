import { ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StepInputTextComponent } from '../text/stepinput-text.component';
/**
 * This class represents an input of type numeric.
 *
 * The value its the number input by the user.
 */
export declare class StepInputNumericComponent extends StepInputTextComponent {
    platform: Platform;
    elementRef: ElementRef;
    /** @type {boolean} - Flag indicating if the input has user focus. */
    focusOut: boolean;
    /** @type {any} - Represents a numeric text mask, used for validation. */
    numberMask: any;
    constructor(platform: Platform, elementRef: ElementRef);
    /** Angular lifecycle callback. */
    ngOnInit(): void;
    /**
     * Helper method that gets called when the done button on
     * the virtual keyboard its pressed.
     */
    doneCallback(): void;
}
