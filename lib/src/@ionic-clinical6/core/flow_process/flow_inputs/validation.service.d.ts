import { FormControl, FormGroup } from '@angular/forms';
export declare class ValidationService {
    static inputCodeMap: {
        [inputCode: string]: string;
    };
    static maskPhone1: (string | RegExp)[];
    static maskPhone2: (string | RegExp)[];
    static maskPhone3: (string | RegExp)[];
    static maskZipCode1: RegExp[];
    static maskZipCode2: (string | RegExp)[];
    static maskPin: RegExp[];
    static maskPassword: RegExp[];
    static maskPatientId: (string | RegExp)[];
    static setCodeMap(inputCode: string, inputId: string): void;
    static phoneMask(rawValue: string): any;
    static zipCodeMask(rawValue: string): (string | RegExp)[];
    static passwordMask(type: string, minLength: number, maxLength: number): any[];
    static fillZipCode(format: string, length: number): any;
    static extendMask(mask: any, char: any, length: number): any;
    static phoneValidator(control: FormControl): {
        'invalidPattern': boolean;
    };
    static noWhitespaceValidator(control: FormControl): {
        'invalidPattern': boolean;
    };
    static zipCodeValidator(control: FormControl): {
        'invalidPattern': boolean;
    };
    static cityValidator(control: FormControl): {
        'invalidPattern': boolean;
    };
    static emailValidator(control: FormControl): {
        'invalidPattern': boolean;
    };
    static pinValidator(control: FormControl): {
        'invalidPattern': boolean;
    };
    static matchPasswords(passwordKey: string, confirmPasswordKey: string): (group: FormGroup) => {
        [key: string]: any;
    };
    static codeValidation(codeValue: string): (control: FormControl) => {
        [key: string]: any;
    };
    static equalityValidation(inputCode: string, equalityCode: string): (group: FormGroup) => {
        [key: string]: any;
    };
}
