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
export declare class InputValidationFactory {
    /**
     * Adds or overrides a set of validators for the given input style
     *
     * @param style the style of input for the validator
     * @param validators the array of desired validators
     */
    static setValidatorRule(style: string, validators: any): void;
    /**
     * Returns the set of validation rules assigned to the given style
     *
     * @param style the desired style of input
     */
    static getValidatorRule(style: string): any;
    /**
     * Adds or overrides an error message for the given type of error.
     *
     * @param errorType the type of error on the input
     * @param errorMessage the message to show when the given error its present
     */
    static setValidationError(errorType: string, errorMessage: string): void;
    /**
     * Returns the error message for the given error type.
     *
     * @param errorType the error type
     */
    static getValidationError(errorType: string): string;
    private static validatorRules;
    private static inputErrors;
}
