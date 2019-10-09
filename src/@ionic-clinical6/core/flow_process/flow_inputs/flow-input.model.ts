import { InputState, ChoiceState } from '../flow_inputs/input.model';
import { FlowInput } from 'clinical6';

export class AppFlowInput extends FlowInput implements InputState {
  constructor(response) {
    super(response);
  }

  inputId;
  inputType;
  inputStyle;
  inputTitle;
  inputSubtitle;
  inputEnabled;
  inputRequired;
  inputChoices;
}