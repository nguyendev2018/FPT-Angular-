import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const reg = /PT/g;
      const regMinus = /M/g;
      const regSecond = /S/g;
      const regHour = /H/g;
      let duration = value.replace(reg, '');
      duration = duration.replace(regMinus, ' minutes ');
      duration = duration.replace(regSecond, ' seconds ');
      duration = duration.replace(regHour, ' hour ');
      return duration;
    }
    return '';
  }

}
