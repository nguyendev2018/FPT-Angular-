import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private safeUrl: DomSanitizer) { }
  transform(value: string): any {
    const url = `https://www.youtube.com/embed/${value}`;
    return this.safeUrl.bypassSecurityTrustResourceUrl(url);
  }

}
