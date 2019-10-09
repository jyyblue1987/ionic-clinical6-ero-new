import { EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { StepInputComponent } from '../stepinput.component';
export declare class StepInputFileUploadComponent extends StepInputComponent {
    nav: NavController;
    private _sanitizer;
    goToPage: EventEmitter<{}>;
    choiceItems: Array<{
        value: any;
        text: string;
        selected: boolean;
        order?: string;
    }>;
    choice: any;
    filename: string;
    fileUrl: string;
    actionLabel: string;
    constructor(nav: NavController, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    disableForm(): void;
    refreshView(): void;
    openFile(): void;
    removeFile(): void;
    buttonClick(): void;
}
