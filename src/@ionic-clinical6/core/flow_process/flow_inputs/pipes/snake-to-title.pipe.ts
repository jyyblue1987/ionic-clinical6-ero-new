import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'snakeToTitleCase'})
export class SnakeToTitleCasePipe implements PipeTransform {

  transform ( text: string ): string {
    if (!text) return '';
    let result = text.replace(/_\w/g, function(m) { return ' ' + m[1].toUpperCase(); });
    return result[0].toUpperCase() + result.slice(1);
  }
}
