import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    return (typeof value === 'string' && value.length > 0) ? value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() : value;
  }

}
