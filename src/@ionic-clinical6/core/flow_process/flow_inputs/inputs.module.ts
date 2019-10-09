import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FlowsModule } from '../flows.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import {
  StepInputDateComponent,
  StepInputTimeComponent,
  StepInputSingleChoiceComponent,
  StepInputMultiChoiceComponent,
  StepInputTextComponent,
  StepInputPrePopulatedComponent,
  StepInputNumericComponent,
  StepInputFileUploadComponent,
  AgreementCheckboxComponent,
  StepInputDummyComponent,
  CustomStepInputLoginComponent
} from '../flow_inputs/index';

import { InputContainerComponent } from './input-container.component';
import { StepInputComponent } from './stepinput.component';
import { StepInputDirective } from './stepinput.directive';

import { AddressPrintPipe } from './pipes/address.pipe';
import { SnakeToTitleCasePipe } from './pipes/snake-to-title.pipe';
import { MomentDatePipe } from './pipes/momentdate.pipe';


@NgModule({
  imports: [IonicModule, FormsModule, TextMaskModule, ReactiveFormsModule],
  declarations: [
    InputContainerComponent,
    StepInputSingleChoiceComponent,
    StepInputMultiChoiceComponent,
    StepInputTextComponent,
    StepInputPrePopulatedComponent,
    StepInputDateComponent,
    StepInputTimeComponent,
    StepInputNumericComponent,
    StepInputFileUploadComponent,
    AddressPrintPipe,
    SnakeToTitleCasePipe,
    StepInputDummyComponent,
    MomentDatePipe,
    AgreementCheckboxComponent,
    StepInputComponent,
    StepInputDirective,
    CustomStepInputLoginComponent
  ],
  exports: [
    InputContainerComponent,
    StepInputSingleChoiceComponent,
    StepInputMultiChoiceComponent,
    StepInputTextComponent,
    StepInputPrePopulatedComponent,
    StepInputDateComponent,
    StepInputTimeComponent,
    StepInputNumericComponent,
    StepInputFileUploadComponent,
    AddressPrintPipe,
    SnakeToTitleCasePipe,
    StepInputDummyComponent,
    MomentDatePipe,
    AgreementCheckboxComponent,
    StepInputComponent,
    StepInputDirective,
    CustomStepInputLoginComponent
  ],
  entryComponents: [
    InputContainerComponent,
    StepInputSingleChoiceComponent,
    StepInputMultiChoiceComponent,
    StepInputTextComponent,
    StepInputPrePopulatedComponent,
    StepInputDateComponent,
    StepInputTimeComponent,
    StepInputNumericComponent,
    StepInputFileUploadComponent,
    AgreementCheckboxComponent,
    StepInputComponent,
    CustomStepInputLoginComponent
  ],
  providers: []
})

export class InputsModule {

}