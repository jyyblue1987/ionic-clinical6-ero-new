import { Pipe, PipeTransform } from '@angular/core';
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

@Pipe({name: 'addressPrint'})
export class AddressPrintPipe implements PipeTransform {

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
  transform ( address: any ): string {
    let result = '';
    if (address['street']) result += this.addItem(result !== '', ', ', address['street']);
    if (address['address_line_1']) result += this.addItem(result !== '', ', ', address['address_line_1']);
    if (address['address_line_2']) result += this.addItem(result !== '', ', ', address['address_line_2']);
    if (address['address_line_3']) result += this.addItem(result !== '', ', ', address['address_line_3']);
    if (address['city']) result += this.addItem(result !== '', ',<br>', address['city']);
    if (address['state']) result += this.addItem(result !== '', ', ', address['state']);
    if (address['zip_code']) result += this.addItem(result !== '', ' ', address['zip_code']);
    if (address['country']) result += this.addItem(result !== '', ', ', address['country']);
    return result;
  }

  addItem(condition: boolean, a: string, b: string) {
    if (b !== '') {
        if (condition) return a + b;
        return b;
    }
    else return '';
  }

  /* assumes a data structure like this:
  {
        address1: {
            value: '7777 Fantasy Avenue',
            description: 'Site Address 1 (Street Address)'
        },
        address2: {
            value: 'Building Yellow',
            description: 'Site Address 2 (Building/Department)'
        },
        address3: {
            value: 'Suite 123',
            description: 'Site Address 3 (Suite/Unit Number)'
        },
        city: {
            value: 'San Diego',
            description: 'City'
        },
        state: {
            value: 'CA',
            description: 'State'
        },
        zip: {
            value: '92037',
            description: 'Postal Code'
        },
        country: {
            value: 'USA',
            description: 'Country'
        }
    }

  transform ( address: any ): string {
    let result = '';
    for (let itemKey in address ) {
        if (address[itemKey].value && address[itemKey].value !== '') {
            if (result !== '') {
                if (itemKey === 'zip')
                    result = result + ' ';
                else if (itemKey === 'city')
                    result = result + '<br>';
                else
                    result = result + ', ';
            }
            result = result + address[itemKey].value;
        } 
        result = result + address[itemKey];
    }*/

}
