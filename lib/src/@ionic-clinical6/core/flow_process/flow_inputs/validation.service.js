var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
/*
interface ValidationResult {
    [key: string]: boolean;
}
*/
let ValidationService = ValidationService_1 = class ValidationService {
    static setCodeMap(inputCode, inputId) {
        ValidationService_1.inputCodeMap[inputCode] = inputId;
    }
    static phoneMask(rawValue) {
        if (rawValue[0] === '+') {
            if (rawValue[1] === '1') {
                if (rawValue.length > 15)
                    return this.extendMask(this.maskPhone1, ' ', 17);
                else
                    return this.maskPhone1;
            }
            else {
                if (rawValue.length > 16)
                    return this.extendMask(this.maskPhone2, ' ', 16);
                else
                    return this.maskPhone2;
            }
        }
        else {
            if (rawValue.length > 12)
                return this.extendMask(this.maskPhone3, ' ', 20);
            else
                return this.maskPhone3;
        }
    }
    static zipCodeMask(rawValue) {
        if (rawValue.length > 5)
            return this.maskZipCode2;
        else
            return this.maskZipCode1;
    }
    static passwordMask(type, minLength, maxLength) {
        var mask = [];
        if (type === 'numeric') {
            return Array(maxLength).fill(/\d/);
        }
    }
    // format the zip code if the field is pre-populated
    static fillZipCode(format, length) {
        if (format.length >= length) {
            if (format.length > 5)
                return format.substring(0, 5).concat(' - ').concat(format.substring(5, 9));
            else
                return format;
        }
        return this.fillZipCode('0' + format, length);
    }
    static extendMask(mask, char, length) {
        let extend = mask;
        extend.push(char);
        for (let i = 0; i < length; i++)
            extend.push(/\d/);
        return extend;
    }
    static phoneValidator(control) {
        let phone_number = /^[0-9]{10}/;
        let numControl = '';
        if (control.value)
            numControl = control.value.replace(/[-|+| ]/gi, '');
        return phone_number.test(numControl) ? null : { 'invalidPattern': true };
    }
    // helper validator  to avoid white spaces/empty spaces
    static noWhitespaceValidator(control) {
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { 'invalidPattern': true };
    }
    static zipCodeValidator(control) {
        let postcode = /^\d{5}( - )?(\d{4})?$/;
        return postcode.test(control.value) ? null : { 'invalidPattern': true };
    }
    static cityValidator(control) {
        let postcode = /^[a-zA-Z\- ]+$/;
        return postcode.test(control.value) ? null : { 'invalidPattern': true };
    }
    static emailValidator(control) {
        let emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+([.][a-zA-Z0-9-]+)+$/;
        return emailPattern.test(control.value) ? null : { 'invalidPattern': true };
    }
    static pinValidator(control) {
        let pinPattern = /^[0-9]{4}/;
        return pinPattern.test(control.value) ? null : { 'invalidPattern': true };
    }
    static matchPasswords(passwordKey, confirmPasswordKey) {
        return (group) => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }
    static codeValidation(codeValue) {
        return (control) => {
            let inputValue = control.value;
            if (codeValue && (inputValue !== codeValue)) {
                return {
                    nonRegisteredEmail: true
                };
            }
        };
    }
    static equalityValidation(inputCode, equalityCode) {
        return (group) => {
            if (!inputCode || !equalityCode)
                return { misMatchValues: false };
            let inputId = ValidationService_1.inputCodeMap[inputCode];
            let equalityId = ValidationService_1.inputCodeMap[equalityCode];
            if (inputId && equalityId) {
                let codeValue = group.controls ? ((group.controls[inputId] && group.controls[inputId].value) || '') : '';
                let equalityValue = group.controls ? ((group.controls[equalityId] && group.controls[equalityId].value) || '') : '';
                if (equalityValue !== codeValue) {
                    return {
                        misMatchValues: true
                    };
                }
            }
        };
    }
};
ValidationService.inputCodeMap = {};
// phone_number masks
ValidationService.maskPhone1 = ['+', /[1]/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
ValidationService.maskPhone2 = ['+', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
ValidationService.maskPhone3 = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
// zip_code masks
ValidationService.maskZipCode1 = [/\d/, /\d/, /\d/, /\d/, /\d/];
ValidationService.maskZipCode2 = [/\d/, /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/];
// pin mask
ValidationService.maskPin = [/\d/, /\d/, /\d/, /\d/];
ValidationService.maskPassword = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
// patientId mask
ValidationService.maskPatientId = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];
ValidationService = ValidationService_1 = __decorate([
    Injectable()
], ValidationService);
export { ValidationService };
var ValidationService_1;

//# sourceMappingURL=validation.service.js.map
