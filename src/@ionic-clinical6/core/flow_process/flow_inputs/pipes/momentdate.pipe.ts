import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'momentdate'
})
export class MomentDatePipe implements PipeTransform {
  transform(value: string, arg: string): string {
    if (arg === 'calendar')
      return moment(value).calendar();
    else
      return moment(value).format(arg);
  }
}