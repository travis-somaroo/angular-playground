import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
  standalone: true
})
export class ToArrayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value !== null && value !== undefined ? value.toString().split('') : [];
  }

}
