import { Directive, Input, Renderer2, ElementRef } from '@angular/core';

import { ColorService } from './color.service';

@Directive({
  providers: [ColorService],
  selector: '[rvColor]',
})
export class BackgroundColorDirective {
  /**
   * @method constructor
   * @param elementRef   [description]
   * @param renderer2    [description]
   * @param colorService [description]
   */
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private colorService: ColorService,
  ) {}

  @Input('rvColorCondition') condition = true;
  @Input('rvColorPrefix') prefix: string;
  @Input('rvColorProperty') property: string;
  @Input('rvColor') set color(color: string) {
    this.colorService.setBackgroundColor(color, this.condition, this.property, this.prefix);
  }
}

@Directive({
  providers: [ColorService],
  selector: '[rvFontColor]',
})
export class ColorDirective {
  /**
   * @method constructor
   * @param elementRef   [description]
   * @param renderer2    [description]
   * @param colorService [description]
   */
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private colorService: ColorService,
  ) {}

  @Input('rvFontColor') set color(color: string) {
    this.colorService.setFontColor(color);
  }
}
