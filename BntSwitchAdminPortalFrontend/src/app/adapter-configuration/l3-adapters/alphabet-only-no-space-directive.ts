import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnlyNoSpace]',
})
export class AlphabetOnlyNoSpaceDirective {
  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const reg = new RegExp('^[a-z]+$');
    if (!reg.test(event.key)) {
      event.preventDefault();
    }
  }
}
