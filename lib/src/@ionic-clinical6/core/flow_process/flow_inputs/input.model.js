/**
 * Style used to display an input choices
 */
export class InputStyle {
}
InputStyle.checkBoxes = 'radio_buttons';
InputStyle.radioButtons = 'radio_buttons';
InputStyle.dropdown = 'dropdown';
InputStyle.yesNo = 'yes_no';
InputStyle.siteAddress = 'site_address';
InputStyle.attribute = 'attribute';
InputStyle.roles = 'roles';
InputStyle.zipCode = 'zip_code';
InputStyle.text = 'text';
InputStyle.textArea = 'text_area';
InputStyle.patientId = 'patient_id';
InputStyle.password = 'password';
InputStyle.phoneNumber = 'phone_number';
InputStyle.textBox = 'text_box';
InputStyle.currency = 'currency';
InputStyle.email = 'email';
InputStyle.other = 'other';
InputStyle.spinner = 'spinner';
InputStyle.location = 'location';
/**
 * Helper class that takes a string and
 * returns a supported type of input style
 */
export class InputStyleUtil {
    static getStyle(style) {
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
            case 'location':
                return InputStyle.location;
            default:
                return InputStyle.other;
        }
    }
}

//# sourceMappingURL=input.model.js.map
