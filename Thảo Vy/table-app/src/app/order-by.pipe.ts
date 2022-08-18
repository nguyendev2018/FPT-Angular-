import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], field: string, option: string): any {
    if (field === 'id' || field === 'salary') {
      value.sort((a, b) => a[field] - b[field]);
    }
    if (
      field === 'firstName' ||
      field === 'lastName' ||
      field === 'email' ||
      field === 'phone' ||
      field === 'gender'
    ) {
      value.sort((a, b) => a[field].toString().localeCompare(b[field]));
    }
    if (field === 'birthday') {
      value.sort((a, b) => +new Date(a[field]) - +new Date(b[field]));
    }
    if (option === 'Ascending') {
      return value;
    } else {
      return value.reverse();
    }
  }
}
