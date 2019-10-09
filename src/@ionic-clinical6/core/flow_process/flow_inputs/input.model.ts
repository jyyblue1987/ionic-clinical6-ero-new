import { Input, Output, EventEmitter } from '@angular/core';
import { NavParams } from 'ionic-angular';

/**
 * Style used to display an input choices
 */
export class InputStyle {
  static checkBoxes = 'radio_buttons';
  static radioButtons = 'radio_buttons';
  static dropdown = 'dropdown';
  static yesNo = 'yes_no';
  static siteAddress = 'site_address';
  static attribute = 'attribute';
  static roles = 'roles';
  static zipCode = 'zip_code';
  static text = 'text';
  static textArea = 'text_area';
  static patientId = 'patient_id';
  static password = 'password';
  static phoneNumber = 'phone_number';
  static textBox = 'text_box';
  static currency = 'currency';
  static email = 'email';
  static other = 'other';
  static spinner = 'spinner';
  static location = 'location';
}

/**
 * Helper class that takes a string and
 * returns a supported type of input style
 */
export class InputStyleUtil {
  public static getStyle(style: string): InputStyle {
    switch (style) {
      case 'attribute':
      case 'phone':
      case 'role':
      case 'last_name':
      case 'first_name':
      case 'prefix':
        return InputStyle.attribute;
      case 'dropdown':
        return InputStyle.dropdown;
      case 'radio_buttons':
        return InputStyle.radioButtons;
      case 'zip_code':
        return InputStyle.zipCode;
      case 'text':
        return InputStyle.text;
      case 'text_area':
        return InputStyle.textArea;
      case 'patient_id':
        return InputStyle.patientId;
      case 'password':
        return InputStyle.password;
      case 'phone_number':
        return InputStyle.phoneNumber;
      case 'text_box':
        return InputStyle.textBox;
      case 'currency':
        return InputStyle.currency;
      case 'email':
        return InputStyle.email;
      case 'spinner':
        return InputStyle.spinner;
      case 'location' :
        return InputStyle.location;
      default:
        return InputStyle.other;
    }
  }
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