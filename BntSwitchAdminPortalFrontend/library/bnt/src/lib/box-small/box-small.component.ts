import { Component, Input, ContentChild } from '@angular/core';

import {
  BoxSmallContentDirective,
  BoxSmallFooterDirective,
  BoxSmallHeaderDirective,
} from './box-small.directive';

/*
 *
 */
@Component({
  selector: 'rv-box-small',
  styleUrls: ['./box-small.component.css'],
  templateUrl: './box-small.component.html',
})
export class BoxSmallComponent {
  @Input() public backgroundColor: string;
  @Input() public contentColor: string;
  @Input() public contentStyleClass = 'small-box-content';
  @Input() public footer: string;
  @Input() public footerColor: string;
  @Input() public footerStyleClass = 'small-box-footer';
  @Input() public header: string;
  @Input() public headerColor: string;
  @Input() public headerStyleClass = 'small-box-header';
  @Input() public iconColor: string;
  @Input() public iconStyleClass = 'ion ion-bag';
  @Input() public styleClass = 'small-box';

  @ContentChild(BoxSmallHeaderDirective, { static: true })
  public boxSmallHeaderDirective: BoxSmallHeaderDirective;
  @ContentChild(BoxSmallFooterDirective, { static: true })
  public boxSmallFooterDirective: BoxSmallFooterDirective;
  @ContentChild(BoxSmallContentDirective, { static: true })
  public boxSmallContentDirective: BoxSmallContentDirective;
}
