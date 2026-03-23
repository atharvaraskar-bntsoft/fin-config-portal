import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  styleUrls: ['./custom.component.css'],
  templateUrl: './custom.component.html',
})
export class CustomComponent implements AfterViewInit {
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
