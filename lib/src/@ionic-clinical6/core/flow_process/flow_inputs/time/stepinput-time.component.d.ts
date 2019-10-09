import { EventEmitter } from '@angular/core';
import { StepInputComponent } from '../stepinput.component';
export declare class StepInputTimeComponent extends StepInputComponent {
    displayFormat: string;
    time: any;
    formData: EventEmitter<{}>;
    focusOut: boolean;
    minHour: any;
    maxHour: any;
    ngOnInit(): void;
}
