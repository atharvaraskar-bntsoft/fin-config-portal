import { Directive, Input, ElementRef } from '@angular/core';

/*
 *
 */
@Directive({
  selector: '[rvMenuToggle]',
})
export class SidebarLeftToggleDirective {
  @Input('rvMenuToggle') item;

  /**
   * @method constructor
   * @param elementRef [description]
   */
  constructor(public elementRef: ElementRef) {}
}
