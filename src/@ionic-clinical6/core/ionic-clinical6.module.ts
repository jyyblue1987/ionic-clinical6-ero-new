import { NgModule } from '@angular/core';

import { Clinical6Service } from './clinical6.service';

import { FlowStepPage } from './flow_process/flow_steps/flowstep';
import { FlowStepHelpPage } from './flow_process/flow_steps/flowstep-help/flowstep-help';
import { FlowStepHelpCardPage } from './flow_process/flow_steps/flowstep-helpcard/flowstep-helpcard';
import { FlowIntroPage } from './flow_process/flow_steps/flow-intro/flow-intro';
import { FlowStepSignPage } from './flow_process/flow_steps/flowstep-signature/flowstep-signature';
import { FlowChoicePage } from './flow_process/flow_steps/flow-choice/flow-choice';
import { FlowStepVerifyCardPage } from './flow_process/flow_steps/verify-card/flowstep-verifycard';
import { LoginPage } from './pages/login/login';
import { LoginWithPinPage } from './pages/login-with-pin/login-with-pin';
import { PinPage } from './pages/pin/pin';

import { AppToolbarModule } from './toolbar/app-toolbar.module';
import { FlowsModule } from './flow_process/flows.module';
import { InputsModule } from './flow_process/flow_inputs/inputs.module';
import { AppConfig } from './config';
import { LoginFlowPage } from './pages/login-flow/login-flow';

@NgModule({
  imports: [
  ],
  exports: [
    AppToolbarModule,
    Clinical6Service,
    FlowsModule,
    FlowStepPage,
    FlowStepHelpPage,
    FlowStepHelpCardPage,
    FlowIntroPage,
    FlowStepSignPage,
    FlowChoicePage,
    FlowStepVerifyCardPage,
    InputsModule,
    LoginPage,
    LoginWithPinPage,
    PinPage,
    LoginFlowPage
  ],
  declarations: [
    AppToolbarModule,
    Clinical6Service,
    FlowsModule,
    FlowStepPage,
    FlowStepHelpPage,
    FlowStepHelpCardPage,
    FlowIntroPage,
    FlowStepSignPage,
    FlowChoicePage,
    FlowStepVerifyCardPage,
    InputsModule,
    LoginPage,
    LoginWithPinPage,
    PinPage,
    LoginFlowPage
  ],
  providers: [
    AppConfig
  ],
})
export class IonicClinical6 { }