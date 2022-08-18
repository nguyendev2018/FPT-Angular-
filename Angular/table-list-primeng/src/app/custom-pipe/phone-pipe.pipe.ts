import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe'
})
export class PhonePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `(+84) ${value.split('-').join('')}`;
  }

}
