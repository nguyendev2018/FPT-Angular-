import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'body'})
export class BodyPiPe implements PipeTransform {
  transform(body: string): string {
    return body.replace(/\n/g, '<p></p>');
  }
}