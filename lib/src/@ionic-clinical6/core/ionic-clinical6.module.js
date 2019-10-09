var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let IonicClinical6 = class IonicClinical6 {
};
IonicClinical6 = __decorate([
    NgModule({
        imports: [],
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
], IonicClinical6);
export { IonicClinical6 };

//# sourceMappingURL=ionic-clinical6.module.js.map
