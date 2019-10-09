import { ViewContainerRef, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputState } from './input.model';
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
export declare class StepInputDirective {
    viewContainerRef: ViewContainerRef;
    private componentFactoryResolver;
    /** @type {string} - Represents the style of the label ('floating' or 'stacked') */
    labelStyle: string;
    /** @type {InputState} - Represents the input model of the FlowProcess step */
    input: InputState;
    /** @type {any} - Represents the value of the input */
    value: any;
    /** @type {FormGroup} - The main FormGroup containing all inputs as FormControls */
    mainForm: FormGroup;
    /** @type {any} */
    filter: any;
    goToPage: EventEmitter<{}>;
    inputCodeMap: {
        [key: string]: string;
    };
    constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver);
    /** Angular lifecycle callback. */
    ngOnInit(): void;
}
