import { Directive, ElementRef, forwardRef, HostListener, Renderer2, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LowerUpperDirective),
    },
  ],
  selector: '[LowerUpper]',
})
export class LowerUpperDirective implements ControlValueAccessor {
  _onChange: (_: any) => void;
  _touched: () => void;

  constructor(@Self() private el: ElementRef, private _renderer: Renderer2) {}

  /*
   *Host Listner
   * @param evt
   */

  @HostListener('keyup', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    let value = this.el.nativeElement.value;
    let firstChar = value.replace(/\d+/g, '');
    firstChar = firstChar.charAt(0);
    if (this.hasLowerCase(firstChar)) {
      value = value.toLowerCase();
    } else if (this.hasUpperCase(firstChar)) {
      value = value.toUpperCase();
    }
    this._renderer.setProperty(this.el.nativeElement, 'value', value);
    this._onChange(value);
    evt.preventDefault();
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    return this.omit_special_char(event);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: Event) {
    event.preventDefault();
    return false;
  }

  omit_special_char(e: any) {
    try {
      if (/^[a-fA-F0-9\s]*$/.test(e.key)) {
        let value = this.el.nativeElement.value;
        let firstChar = value.replace(/\d+/g, '');
        firstChar = firstChar.charAt(0);
        if (this.hasLowerCase(firstChar)) {
          value = value.toLowerCase();
        } else if (this.hasUpperCase(firstChar)) {
          value = value.toUpperCase();
        }
        this._renderer.setProperty(this.el.nativeElement, 'value', value);
        this._onChange(value);
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    } catch (e) {}
  }

  hasUpperCase(str) {
    return /^[A-F]/.test(str);
  }

  hasLowerCase(str) {
    return /^[a-f]/.test(str);
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this._touched();
  }

  writeValue(value: any): void {
    this._renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this.el.nativeElement, 'disbaled', isDisabled);
  }
}
