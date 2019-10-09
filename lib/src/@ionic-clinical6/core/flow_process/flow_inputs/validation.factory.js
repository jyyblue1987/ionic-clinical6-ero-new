import { Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
/**
 * Helper class that holds all predefined validator rules
 * for the basic types of inputs and the error messages to show
 * the user when an input its invalid
 *
 * Use the helper methods to add or override input validators and
 * input error messages
 *
 * @example
 *  import { Validators } from '@angular/forms';
 *
 *  InputValidationFactory.setValidatorRule('password',[Validators.required, Validators.minLength(8)])
 */
export class InputValidationFactory {
    /**
     * Adds or overrides a set of validators for the given input style
     *
     * @param style the style of input for the validator
     * @param validators the array of desired validators
     */
    static setValidatorRule(style, validators) {
        InputValidationFactory.validatorRules[style] = validators;
    }
    /**
     * Returns the set of validation rules assigned to the given style
     *
     * @param style the desired style of input
     */
    static getValidatorRule(style) {
        return InputValidationFactory.validatorRules[style];
    }
    /**
     * Adds or overrides an error message for the given type of error.
     *
     * @param errorType the type of error on the input
     * @param errorMessage the message to show when the given error its present
     */
    static setValidationError(errorType, errorMessage) {
        InputValidationFactory.inputErrors[errorType] = errorMessage;
    }
    /**
     * Returns the error message for the given error type.
     *
     * @param errorType the error type
     */
    static getValidationError(errorType) {
        return InputValidationFactory.inputErrors[errorType];
    }
}
InputValidationFactory.validatorRules = {
    checkbox: [Validators.required],
    email: [Validators.required, Validators.email],
    other: [Validators.required],
    password: [Validators.required],
    phone_number: [Validators.required, ValidationService.phoneValidator],
    radio_button: [Validators.required],
    text: [Validators.required, ValidationService.noWhitespaceValidator],
    zip_code: [Validators.required, ValidationService.zipCodeValidator],
};
InputValidationFactory.inputErrors = {
    email: 'Incorrect email format',
    required: ' is required',
};

//# sourceMappingURL=validation.factory.js.map
