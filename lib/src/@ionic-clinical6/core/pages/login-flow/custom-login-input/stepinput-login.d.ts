import { ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { StepInputTextComponent } from '../../../flow_process/flow_inputs/text/stepinput-text.component';
import { NavParams } from 'ionic-angular';
export declare class CustomStepInputLoginComponent extends StepInputTextComponent {
    navParams: NavParams;
    platform: Platform;
    elementRef: ElementRef;
    _keyboard: Keyboard;
    step: any;
    link_button: any;
    constructor(navParams: NavParams, platform: Platform, elementRef: ElementRef, _keyboard: Keyboard);
    /** Angular lifecycle callback to calculate the displayFormat, the pickerFormat, the minDate and the maxDate to use in the ion-datetime picker */
    ngOnInit(): void;
    btnClicked(ev: UIEvent): void;
    readonly linkButton: any;
}
