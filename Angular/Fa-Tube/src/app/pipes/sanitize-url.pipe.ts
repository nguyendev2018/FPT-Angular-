import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeUrl'
})
export class SanitizeUrlPipe implements PipeTransform {

  constructor(private sanitizerService: DomSanitizer) { }

  transform(value: string): any {
    const url = `https://www.youtube.com/embed/${value}`;
    return this.sanitizerService.bypassSecurityTrustResourceUrl(url);
  }


}

