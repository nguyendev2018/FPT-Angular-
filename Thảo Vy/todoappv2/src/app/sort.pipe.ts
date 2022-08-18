import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from './core/models/todo';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  // transform(value: ToDo[]): ToDo[] {
  //   let completedList: ToDo[] = [];
  //   let result: ToDo[] = [];
  //   if (value.length <= 1) return value;
  //   result = value.sort((a, b) => {
  //     if (a.status && !completedList.find((item) => item.id === a.id)) {
  //       completedList.push(a);
  //     }
  //     if (b.status && !completedList.find((item) => item.id === b.id)) {
  //       completedList.push(b);
  //     }
  //     if (b.priority < a.priority) {
  //       return -1;
  //     }
  //     if (b.priority > a.priority) {
  //       return 1;
  //     }
  //     return a.name < b.name ? -1 : 1;
  //   });
  //   if (completedList.length >= 1) {
  //     completedList.forEach((item) => {
  //       result = result.filter((ele) => ele.id !== item.id);
  //     });
  //     completedList.sort((x, y) =>
  //       x.name.toLowerCase() < y.name.toLowerCase()
  //         ? -1
  //         : x.name.toLowerCase() < y.name.toLowerCase()
  //         ? 1
  //         : 0
  //     );
  //     result = result.concat(completedList);
  //   }
  //   return result;
  // }
  transform(value: ToDo[]): ToDo[] {
    value.sort(
      (a, b) => b.priority - a.priority || a.name.localeCompare(b.name)
    );
    return value;
  }
}
