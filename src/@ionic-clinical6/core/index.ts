// Note: import from here whatever may cause circular ref

import { Clinical6Service } from './clinical6.service';

import { AppToolbar } from './toolbar/app-toolbar';
import { Flows } from './flow_process/flow-factory';
import { FlowService } from './flow_process/flow.service';
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
import { AboutPage } from './pages/about/about';
import { FAQsPage } from './pages/faq/faq';
import { GlossaryPage } from './pages/glossary/glossary';
import { PlainPage } from './pages/plain/plain-page';
import { BasePage } from './pages/base/base-page';
import { SlidingMenuSubCategoryPage } from './menu/submenu';
import { PdfViewPage } from './pages/pdf-view/pdf-view';
import { EnterEmailPage } from './pages/sign-up/login-email';
import { VerifyCodePage } from './pages/sign-up/login-verify-code';
// import { CreateNewUserPage } from './pages/sign-up/create-new-user';

import { AppToolbarModule } from './toolbar/app-toolbar.module';
import { FlowsModule } from './flow_process/flows.module';
import { InputsModule } from './flow_process/flow_inputs/inputs.module';
import { TranslatorService } from './translator/translator.service';

import { AlertModalPage } from './modal';

import { LoginFlowPage } from './pages/login-flow/login-flow';
import { UserProfilePage } from './pages/profile/user-profile/user-profile';
import { CompanionsDashboardPage } from './pages/profile/companions/companions-dashboard';
import { BadgesPluginService } from './badges/badges-plugin.service';
import { AlertsPage } from './pages/alerts/alerts';

import { ContactPage } from './pages/contact/contact';
import { AppointmentsPage } from './pages/appointments/appointments';
import { EditAppointmentPage } from './pages/appointments/edit/edit-appointment';

export {
  AlertModalPage,
  AppToolbar,
  AppToolbarModule,
  Clinical6Service,
  Flows,
  FlowsModule,
  FlowStepPage,
  FlowStepHelpPage,
  FlowStepHelpCardPage,
  FlowIntroPage,
  FlowStepSignPage,
  FlowChoicePage,
  FlowStepVerifyCardPage,
  FlowService,
  InputsModule,
  TranslatorService,
  LoginPage,
  LoginWithPinPage,
  PinPage,
  AboutPage,
  FAQsPage,
  GlossaryPage,
  PlainPage,
  SlidingMenuSubCategoryPage,
  BasePage,
  PdfViewPage,
  EnterEmailPage,
  VerifyCodePage,
  LoginFlowPage,
  UserProfilePage,
  CompanionsDashboardPage,
  BadgesPluginService,
  AlertsPage,
  ContactPage,
  AppointmentsPage,
  EditAppointmentPage
};