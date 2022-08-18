import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: null | undefined): null;
  transform(value: Date | string | number | null | undefined): string | null;
  transform(value: Date | string | number | null | undefined): string | null {
    return super.transform(value, 'dd/MM/yyyy');
  }
}
