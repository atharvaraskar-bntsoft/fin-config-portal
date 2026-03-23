import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]',
})
export class AlphabetOnlyDirective {
  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const reg = new RegExp('^[a-zA-Z ]+$');
    if (!reg.test(event.key)) {
      event.preventDefault();
    }
  }
}
