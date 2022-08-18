import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models';

@Pipe({
  name: 'sort'
})


export class SortPipe implements PipeTransform {
  transform(items: User[], direction: string, column: string, type: string): User[] {
    let sortedItems = [];
    sortedItems = direction === 'asc' ? this.sortAscending(items, column, type) : this.sortDescending(items, column, type);
    return sortedItems;
  }
  sortAscending(items: User[], column: string, type: string): User[] {

    return items.sort((a: User, b: User): number => {
      const indexA = Object.keys(a).findIndex(ele => ele === column);
      const indexB = Object.keys(b).findIndex(ele => ele === column);
      return Object.values(b)[indexB] > Object.values(a)[indexA] ? -1 : 1;
    });

  }
  sortDescending(items: User[], column: string, type: string): User[] {
    return items.sort((a: User, b: User): number => {
      const indexA = Object.keys(a).findIndex(ele => ele === column);
      const indexB = Object.keys(b).findIndex(ele => ele === column);
      return Object.values(a)[indexA] < Object.values(b)[indexB] ? 1 : -1;
    });
  }
}
