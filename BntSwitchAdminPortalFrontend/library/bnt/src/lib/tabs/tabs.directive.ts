import { Directive, Input, ElementRef } from '@angular/core';

/*
 *
 */
@Directive({
  selector: '[rvTabToggle]',
})
export class TabToggleDirective {
  @Input('rvTabToggle') tabComponent;

  /**
   * @method constructor
   * @param elementRef [description]
   */
  constructor(public elementRef: ElementRef) {}
}
