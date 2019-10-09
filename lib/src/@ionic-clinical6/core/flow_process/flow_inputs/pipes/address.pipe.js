var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/*
 * Pretty print address
 * Takes an exponent argument that address object
 * Usage:
 *   address | addressPrint
 * Example:
  
    { {
        'id': 2,
        'email': '',
        'phone_number': '',
        'category': 'mailing',
        'title': 'Secondary Address',
        'city': 'San Diego',
        'state': 'CA',
        'country': 'US',
        'zip_code': '92037',
        'latitude': null,
        'longitude': null,
        'street': '777 Fantasy Rd.',
        'address_line_2': 'Suite 650',
        'address_line_3': ''
        } | addressPrint
    }

    formats to:
    777 Fantasy Rd., Suite 650, San Diego, CA 92037, US
 *
 *
*/
let AddressPrintPipe = class AddressPrintPipe {
    /* assumes a data structure like this:
    {
      'id': 2,
      'email': '',
      'phone_number': '',
      'category': 'mailing',
      'title': 'Secondary Address',
      'city': 'San Diego',
      'state': 'CA',
      'country': 'US',
      'zip_code': '92037',
      'latitude': null,
      'longitude': null,
      'street': '777 Fantasy Rd.',
      'address_line_2': 'Suite 650',
      'address_line_3': ''
    } */
    transform(address) {
        let result = '';
        if (address['street'])
            result += this.addItem(result !== '', ', ', address['street']);
        if (address['address_line_1'])
            result += this.addItem(result !== '', ', ', address['address_line_1']);
        if (address['address_line_2'])
            result += this.addItem(result !== '', ', ', address['address_line_2']);
        if (address['address_line_3'])
            result += this.addItem(result !== '', ', ', address['address_line_3']);
        if (address['city'])
            result += this.addItem(result !== '', ',<br>', address['city']);
        if (address['state'])
            result += this.addItem(result !== '', ', ', address['state']);
        if (address['zip_code'])
            result += this.addItem(result !== '', ' ', address['zip_code']);
        if (address['country'])
            result += this.addItem(result !== '', ', ', address['country']);
        return result;
    }
    addItem(condition, a, b) {
        if (b !== '') {
            if (condition)
                return a + b;
            return b;
        }
        else
            return '';
    }
};
AddressPrintPipe = __decorate([
    Pipe({ name: 'addressPrint' })
], AddressPrintPipe);
export { AddressPrintPipe };

//# sourceMappingURL=address.pipe.js.map
