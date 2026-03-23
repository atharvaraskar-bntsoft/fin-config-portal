import { Directive, Input, ElementRef } from '@angular/core';

/*
 *
 */
@Directive({
  selector: '[rvAccordionToggle]',
})
export class AccordionToggleDirective {
  @Input('rvAccordionToggle') accordionComponent;

  /**
   * @method constructor
   * @param elementRef [description]
   */
  constructor(public elementRef: ElementRef) {}
}
