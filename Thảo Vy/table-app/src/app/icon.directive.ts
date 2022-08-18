import { Input, OnChanges } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIcon]',
})
export class IconDirective implements OnChanges {
  @Input() field!: string;
  @Input() sort!: string;
  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (
      this.field ===
      this.el.nativeElement.innerHTML.replace('↑', '').replace('↓', '').trim()
    ) {
      this.el.nativeElement.innerHTML =
        this.sort === 'Ascending'
          ? `${this.field} &uarr;`
          : `${this.field} &darr;`;
    } else {
      this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML
        .replace('↑', '')
        .replace('↓', '')
        .trim();
    }
  }
}
