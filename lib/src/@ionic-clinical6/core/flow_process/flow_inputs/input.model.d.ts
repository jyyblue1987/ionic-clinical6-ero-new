/**
 * Style used to display an input choices
 */
export declare class InputStyle {
    static checkBoxes: string;
    static radioButtons: string;
    static dropdown: string;
    static yesNo: string;
    static siteAddress: string;
    static attribute: string;
    static roles: string;
    static zipCode: string;
    static text: string;
    static textArea: string;
    static patientId: string;
    static password: string;
    static phoneNumber: string;
    static textBox: string;
    static currency: string;
    static email: string;
    static other: string;
    static spinner: string;
    static location: string;
}
/**
 * Helper class that takes a string and
 * returns a supported type of input style
 */
export declare class InputStyleUtil {
    static getStyle(style: string): InputStyle;
}
/**
 * Represents an input
 */
export interface InputState {
    inputId: number;
    inputType: string;
    inputStyle: string;
    inputTitle: string;
    inputSubtitle: string;
    inputEnabled: boolean;
    inputRequired: boolean;
    inputChoices: ChoiceState[];
}
/**
 * Represents a single choice
 * that belongs to an input
 */
export interface ChoiceState {
    choiceId: number;
    choiceBody: string;
    choiceSelected: boolean;
}
