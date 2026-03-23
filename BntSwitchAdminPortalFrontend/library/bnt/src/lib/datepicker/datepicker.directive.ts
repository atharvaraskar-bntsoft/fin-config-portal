import {
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Directive,
  Renderer2,
  OnInit,
} from '@angular/core';
declare var jQuery: any;
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[rv-myDatepicker]',
})
export class DatePickerDirective implements OnInit {
  @Input() value = '';
  @Input() mask = false;
  @Input() minimumDate = false;
  @Input() maximumDate = false;
  @Input() onlyDatePicker = false;
  @Output() dateChange = new EventEmitter();

  constructor(public el: ElementRef, public renderer: Renderer2) {}
  ngOnInit() {
    const This = this;
    if (this.onlyDatePicker === true) {
      jQuery(this.el.nativeElement).datetimepicker({
        maxDate: this.maximumDate === false ? false : new Date(),
        minDate: this.minimumDate === false ? 1 : new Date(),
        onChangeDateTime: function (dp, $input) {
          This.dateChange.next($input.val());
        },
        timepicker: false,
      });
    } else {
      jQuery(this.el.nativeElement).datetimepicker({
        maxDate: this.maximumDate === false ? false : new Date(),
        minDate: this.minimumDate === false ? 1 : new Date(),
        onChangeDateTime: function (dp, $input) {
          This.dateChange.next($input.val());
        },
      });
    }
  }
}
