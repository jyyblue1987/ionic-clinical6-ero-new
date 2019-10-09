import { FormControl, FormGroup } from '@angular/forms';
import { Component, Injectable } from '@angular/core';
/*
interface ValidationResult {
    [key: string]: boolean;
}
*/
@Injectable()
export class ValidationService {

    static inputCodeMap: { [inputCode: string]: string } = {};

    // phone_number masks
    static maskPhone1 = ['+', /[1]/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    static maskPhone2 = ['+', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    static maskPhone3 = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    // zip_code masks
    static maskZipCode1 = [/\d/, /\d/, /\d/, /\d/, /\d/];
    static maskZipCode2 = [/\d/, /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/];
    // pin mask
    static maskPin = [/\d/, /\d/, /\d/, /\d/];
    static maskPassword = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    // patientId mask
    static maskPatientId = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];


    static setCodeMap(inputCode: string, inputId: string, ) {
        ValidationService.inputCodeMap[inputCode] = inputId;
    }

    static phoneMask(rawValue: string) {
        if (rawValue[0] === '+') {
            if (rawValue[1] === '1') {
                if (rawValue.length > 15) return this.extendMask(this.maskPhone1, ' ', 17);
                else return this.maskPhone1;
            }
            else {
                if (rawValue.length > 16) return this.extendMask(this.maskPhone2, ' ', 16);
                else return this.maskPhone2;
            }
        }
        else {
            if (rawValue.length > 12) return this.extendMask(this.maskPhone3, ' ', 20);
            else return this.maskPhone3;
        }
    }

    static zipCodeMask(rawValue: string) {
        if (rawValue.length > 5) return this.maskZipCode2;
        else return this.maskZipCode1;
    }

    static passwordMask(type: string, minLength: number, maxLength: number) {
        var mask = [];
        if (type === 'numeric') {
            return Array(maxLength).fill(/\d/);
        }
    }

    // format the zip code if the field is pre-populated
    static fillZipCode(format: string, length: number) {
        if (format.length >= length) {
            if (format.length > 5) return format.substring(0, 5).concat(' - ').concat(format.substring(5, 9));
            else return format;
        }
        return this.fillZipCode('0' + format, length);
    }

    static extendMask(mask: any, char: any, length: number) {
        let extend = mask;
        extend.push(char);
        for (let i = 0; i < length; i++)
            extend.push(/\d/);
        return extend;
    }

    static phoneValidator(control: FormControl) {
        let phone_number = /^[0-9]{10}/;
        let numControl = '';
        if (control.value)
            numControl = control.value.replace(/[-|+| ]/gi, '');
        return phone_number.test(numControl) ? null : { 'invalidPattern': true };
    }

    // helper validator  to avoid white spaces/empty spaces
    static noWhitespaceValidator(control: FormControl) {
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { 'invalidPattern': true };
    }

    static zipCodeValidator(control: FormControl) {
        let postcode = /^\d{5}( - )?(\d{4})?$/;
        return postcode.test(control.value) ? null : { 'invalidPattern': true };
    }

    static cityValidator(control: FormControl) {
        let postcode = /^[a-zA-Z\- ]+$/;
        return postcode.test(control.value) ? null : { 'invalidPattern': true };
    }

    static emailValidator(control: FormControl) {
        let emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+([.][a-zA-Z0-9-]+)+$/;
        return emailPattern.test(control.value) ? null : { 'invalidPattern': true };
    }

    static pinValidator(control: FormControl) {
        let pinPattern = /^[0-9]{4}/;
        return pinPattern.test(control.value) ? null : { 'invalidPattern': true };
    }
    static matchPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    static codeValidation(codeValue: string) {
        return (control: FormControl): { [key: string]: any } => {
            let inputValue = control.value;

            if (codeValue && (inputValue !== codeValue)) {
                return {
                    nonRegisteredEmail: true
                };
            }

        }
    }

    static equalityValidation(inputCode: string, equalityCode: string) {
        return (group: FormGroup): { [key: string]: any } => {
            if (!inputCode || !equalityCode) return { misMatchValues: false };

            let inputId = ValidationService.inputCodeMap[inputCode];
            let equalityId = ValidationService.inputCodeMap[equalityCode];

            if (inputId && equalityId) {
                let codeValue = group.controls ? ((group.controls[inputId] && group.controls[inputId].value) || '') : '';
                let equalityValue = group.controls ? ((group.controls[equalityId] && group.controls[equalityId].value) || '') : '';
                if (equalityValue !== codeValue) {
                    return {
                        misMatchValues: true
                    }
                }
            }

        }
    }
}