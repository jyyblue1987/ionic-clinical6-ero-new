import { PipeTransform } from '@angular/core';
export declare class AddressPrintPipe implements PipeTransform {
    transform(address: any): string;
    addItem(condition: boolean, a: string, b: string): string;
}
