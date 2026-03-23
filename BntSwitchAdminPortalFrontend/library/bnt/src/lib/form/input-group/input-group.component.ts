import { AfterContentInit, Component, ContentChild, Input, OnDestroy } from '@angular/core';

import { removeSubscriptions } from '../../helpers';

import {
  InputGroupAddonLeftDirective,
  InputGroupAddonRightDirective,
  InputGroupContentDirective,
  InputGroupErrorDirective,
  InputGroupLabelDirective,
} from './input-group.directive';

import { InputTextDirective } from '../input-text/input-text.directive';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

/*
 *
 */
@Component({
  selector: 'rv-input-group',
  templateUrl: './input-group.component.html',
})
export class InputGroupComponent implements AfterContentInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  public currentColor: string;
  public currentFontColor: string;
  public fromInvalid = false;

  @Input() addonLeft: string;
  @Input() addonRight: string;
  @Input() inputColor = 'default';
  @Input() inputFontColor: string;
  @Input() inputErrorColor = 'danger';
  @Input() inputErrorFontColor: string;
  @Input() inputValidColor = 'success';
  @Input() inputValidFontColor: string;
  @Input() label: string;
  @Input() errorMessage: string;
  @Input() wrapperClasses = 'form-group';

  @ContentChild(InputGroupLabelDirective, { static: true })
  public inputGroupLabelDirective: InputGroupLabelDirective;
  @ContentChild(InputGroupAddonLeftDirective, { static: true })
  public inputGroupAddonLeftDirective: InputGroupAddonLeftDirective;
  @ContentChild(InputGroupAddonRightDirective, { static: true })
  public inputGroupAddonRightDirective: InputGroupAddonRightDirective;
  @ContentChild(InputGroupContentDirective, { static: true })
  public inputGroupContentDirective: InputGroupContentDirective;
  @ContentChild(InputGroupErrorDirective, { static: true })
  public inputGroupErrorDirective: InputGroupErrorDirective;

  @ContentChild(InputTextDirective, { static: true })
  public inputTextDirective: InputTextDirective;

  ngAfterContentInit() {
    if (this.inputTextDirective) {
      this.subscriptions.push(
        this.inputTextDirective.onKeyup.subscribe((value: NgControl) => {
          this.fromInvalid = value.invalid;
          if (value.invalid) {
            this.currentColor = this.inputErrorColor;
            this.currentFontColor = this.inputErrorFontColor;
          } else if (!value.invalid) {
            this.currentColor = this.inputValidColor;
            this.currentFontColor = this.inputValidFontColor;
          } else {
            this.currentColor = this.inputColor;
            this.currentFontColor = this.inputFontColor;
          }
        }),
      );
    }
  }

  ngOnDestroy() {
    removeSubscriptions(this.subscriptions);
  }
}
