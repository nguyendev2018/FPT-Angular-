import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(items: User[], searchTerm: string): User[] {
    if (searchTerm) {
      const newSearchTerm = searchTerm.toString().toUpperCase();

      // return items.filter(item => Object.values(item).some(ele => ele.toString().toUpperCase().indexOf(newSearchTerm)));
      return items.filter(item => Object.values(item).some(ele => ele.toString().toUpperCase() === newSearchTerm));


    }
    else {
      return items;
    }
  }


}
