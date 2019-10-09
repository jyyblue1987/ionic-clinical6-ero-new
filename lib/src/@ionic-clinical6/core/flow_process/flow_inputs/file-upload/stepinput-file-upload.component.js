var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { StepInputComponent } from '../stepinput.component';
let StepInputFileUploadComponent = 
// TODO: Low priority input
class StepInputFileUploadComponent extends StepInputComponent {
    // objectKey: string;
    /* NOTE on the use of file_upload with forms:
    do set question_type: 'file_upload', style: 'tag_<string>', title: <filename string to display>
    and then set the path button_name:  'tag_<string>'  (this will allow flowste.ts to identify the button and hide it)
    File removal is managed is managed with a style: hidden field having storage_attribute: remove_<file_key>
    by setting that field to 'true' the file gets removed by the backend */
    constructor(nav, _sanitizer) {
        super();
        this.nav = nav;
        this._sanitizer = _sanitizer;
        this.goToPage = new EventEmitter();
        this.choiceItems = [];
    }
    ngOnInit() {
        this.choiceItems = [];
        // this.objectKey = Object.keys(this.value)[0];
        this.actionLabel = 'Attach Document via Email';
        this.refreshView();
    }
    ngOnChanges(changes) {
        this.disableForm();
    }
    disableForm() {
        if (this.readOnly)
            this.subForm.controls['input'].disable();
        else
            this.subForm.controls['input'].enable();
    }
    refreshView() {
        // this.value[this.objectKey] && (this.fileUrl = this.value[this.objectKey].url);
        if (this.value && this.value !== 'nil') {
            this.fileUrl = this.value;
            this.filename = this.body;
        }
        // this.fileUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.value[Object.keys(this.value)[0]].url);
    }
    openFile() {
        // sends an event up to the flowstep page since that one has
        // all info related to theme colors and flow steps to follow paths
        this.goToPage.emit({ id: 'viewFile', value: this.value });
    }
    removeFile() {
        // Set bound variable to 'nil' and propagates the change
        this.fileUrl = this.filename = null;
        this.value = 'nil';
        // this.choiceChanged.emit({ value: this.value });
        if (this.subForm.controls['input'])
            this.subForm.controls['input'].setValue(this.value);
        this.refreshView();
        // sends an event up to the flowstep page since that one has
        // all info tell the backend to remove the file
        this.goToPage.emit({ id: 'removeFile', value: this.flowInput['storage_attribute'] });
    }
    buttonClick() {
        this.goToPage.emit({ id: 'uploadFile', value: this.style.toString() });
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], StepInputFileUploadComponent.prototype, "goToPage", void 0);
StepInputFileUploadComponent = __decorate([
    Component({
        selector: 'stepinput-file-upload',
        template: `
    <div class = "file-container" *ngIf="fileUrl">
      <a class = "url" (click)="openFile()">{{filename}}</a>
      <a class = "remove-icon app-p6-icon-exit-large" *ngIf="!readonly"  (click)="removeFile()"></a>
    </div>
    <button ion-button class="upload_button" *ngIf="!fileUrl" (click)="buttonClick()">{{actionLabel}}</button>
  `,
    })
    // TODO: Low priority input
    ,
    __metadata("design:paramtypes", [NavController,
        DomSanitizer])
], StepInputFileUploadComponent);
export { StepInputFileUploadComponent };

//# sourceMappingURL=stepinput-file-upload.component.js.map
