import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-content',
  styleUrls: ['./content.component.css'],
  templateUrl: './content.component.html',
})
export class ContentComponent implements AfterViewInit {
  /**
   * @method AfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
