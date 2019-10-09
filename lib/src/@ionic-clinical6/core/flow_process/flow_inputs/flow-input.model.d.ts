import { InputState } from '../flow_inputs/input.model';
import { FlowInput } from 'clinical6';
export declare class AppFlowInput extends FlowInput implements InputState {
    constructor(response: any);
    inputId: any;
    inputType: any;
    inputStyle: any;
    inputTitle: any;
    inputSubtitle: any;
    inputEnabled: any;
    inputRequired: any;
    inputChoices: any;
}
