import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mulitple',
})
export class MulitplePipe implements PipeTransform {
  transform(value: number, args?: number): any {
    if (!args) args = 1;
    return value * args;
  }
}
