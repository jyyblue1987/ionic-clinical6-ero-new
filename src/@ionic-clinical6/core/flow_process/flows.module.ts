import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ModalModule } from '../modal/modal.module';
import { InputsModule } from './flow_inputs/inputs.module';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { FlowIntroPage } from './flow_steps/flow-intro/flow-intro';
import { FlowStepPage } from './flow_steps/flowstep';
import { FlowStepHelpPage } from './flow_steps/flowstep-help/flowstep-help';
import { FlowStepHelpCardPage } from './flow_steps/flowstep-helpcard/flowstep-helpcard';
import { FlowStepSignPage } from './flow_steps/flowstep-signature/flowstep-signature';
import { FlowChoicePage } from './flow_steps/flow-choice/flow-choice';
import { FlowStepVerifyCardPage } from './flow_steps/verify-card/flowstep-verifycard';

import { VerifyCardComponent } from './items/verify-card/verify-card.component';

import { FlowService } from './flow.service';
import { AppToolbarModule } from '../toolbar/app-toolbar.module';

@NgModule({
  declarations: [
    FlowStepPage,
    FlowStepHelpPage,
    FlowStepHelpCardPage,
    FlowIntroPage,
    FlowStepSignPage,
    FlowChoicePage,
    FlowStepVerifyCardPage,
    VerifyCardComponent
  ],
  imports: [
    IonicModule,
    ModalModule,
    InputsModule,
    FormsModule,
    TextMaskModule,
    AppToolbarModule
  ],
  exports: [
  ],
  entryComponents: [
    FlowStepPage,
    FlowStepHelpPage,
    FlowStepHelpCardPage,
    FlowIntroPage,
    FlowStepSignPage,
    FlowChoicePage,
    FlowStepVerifyCardPage
  ],
  providers: [FlowService]
})
export class FlowsModule { }