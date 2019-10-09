
import { FlowStepHelpPage } from './flow_steps/flowstep-help/flowstep-help';
import { FlowStepHelpCardPage } from './flow_steps/flowstep-helpcard/flowstep-helpcard';
import { FlowIntroPage } from './flow_steps/flow-intro/flow-intro';
import { FlowChoicePage } from './flow_steps/flow-choice/flow-choice';
import { FlowStepSignPage } from './flow_steps/flowstep-signature/flowstep-signature';
import { FlowStepVerifyCardPage } from './flow_steps/verify-card/flowstep-verifycard';
import { FlowStepPage } from './flow_steps/flowstep';

import { FlowStep } from 'clinical6';
import { LoginFlowPage } from '../pages/login-flow/login-flow';

export class Flows {

  /**
   * @type {Object} - A way of assigning the mapping for flows
   */
  static FactoryMap: { [id: string]: any } = {
    'choice_screen': FlowChoicePage,
    'edit_item': FlowStepPage,
    'flow_intro_screen': FlowIntroPage,
    'flowstep': FlowStepPage,
    'info_screen_with_help': FlowStepHelpCardPage,
    'info_screen_with_video': FlowIntroPage,
    'manage_lists': FlowStepPage,
    'review_pdf_screen': FlowStepSignPage,
    'signature_screen': FlowStepSignPage,
    'verify_card': FlowStepVerifyCardPage,
    'check_email': LoginFlowPage,
    'check_pin': LoginFlowPage,
    'check_code': LoginFlowPage,
    'forgot_pin': LoginFlowPage,
    'create_pin': LoginFlowPage,
    'email_sent': LoginFlowPage,
    'reset_pin': LoginFlowPage

  };

  /**
   * Provides the appropriate Page template/class associated to the given contentType and/or step
   *
   * @param  {FlowStep} step  - Flow step item used to futher determine the following step template/class
   * @return {class}          - A class associated to the page to be pushed into the navigation stack
   */
  static Factory(step: FlowStep) {
    console.log('Flow.Factory: contentType = ', step.content_type, ' step: ', step);
    return Flows.FactoryMap[step.content_type] || FlowStepPage;
  }

  /**
   *
   * @param {Object} map - A key/val mapping from contentType to FlowPage
   */
  static setMap(map: { [id: string]: any }) {
    Flows.FactoryMap = Object.assign({}, Flows.FactoryMap, map);
  }
}
