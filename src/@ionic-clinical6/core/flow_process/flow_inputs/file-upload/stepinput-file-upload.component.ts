import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StepInputComponent } from '../stepinput.component';
import { InputStyle } from '../input.model';

@Component({
  selector: 'stepinput-file-upload',
  templateUrl: 'stepinput-file-upload.component.html',
})
// TODO: Low priority input
export class StepInputFileUploadComponent extends StepInputComponent {

  @Output() goToPage = new EventEmitter();

  choiceItems: Array<{ value: any, text: string, selected: boolean, order?: string }> = [];
  choice: any;

  filename: string;
  fileUrl: string;
  actionLabel: string;

  // objectKey: string;

  /* NOTE on the use of file_upload with forms:
  do set question_type: 'file_upload', style: 'tag_<string>', title: <filename string to display>
  and then set the path button_name:  'tag_<string>'  (this will allow flowste.ts to identify the button and hide it)
  File removal is managed is managed with a style: hidden field having storage_attribute: remove_<file_key>
  by setting that field to 'true' the file gets removed by the backend */

  constructor(public nav: NavController,
    private _sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.choiceItems = [];
    // this.objectKey = Object.keys(this.value)[0];
    this.actionLabel = 'Attach Document via Email';
    this.refreshView();
  }

  ngOnChanges(changes: any) {
    this.disableForm();
  }

  disableForm() { // disabled attribute cannot be set dynamically anymore using reactive forms. It needs to use enable()/ disable()
    if (this.readOnly)
      this.subForm.controls['input'].disable();
    else this.subForm.controls['input'].enable();
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
}