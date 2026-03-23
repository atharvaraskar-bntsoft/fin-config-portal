import { Directive } from '@angular/core';

/*
 *
 */
@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'rv-input-group-label',
})
export class InputGroupLabelDirective {}

/*
 *
 */
@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'rv-input-group-addon-left',
})
export class InputGroupAddonLeftDirective {}

/*
 *
 */
@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'rv-input-group-addon-right',
})
export class InputGroupAddonRightDirective {}

/*
 *
 */
@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'rv-input-group-content',
})
export class InputGroupContentDirective {}

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'rv-input-group-error',
})
export class InputGroupErrorDirective {}
