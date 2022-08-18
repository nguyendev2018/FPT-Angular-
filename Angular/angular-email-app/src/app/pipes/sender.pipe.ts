import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'senderPipe',
})
export class SenderPipe implements PipeTransform {
    transform(value: { last: string; first: string }): string {
        return value.first + ' ' + value.last;
    }
}
