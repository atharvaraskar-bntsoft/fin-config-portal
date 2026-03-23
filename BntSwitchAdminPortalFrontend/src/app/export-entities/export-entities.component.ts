import { Component, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-export-entities',
  styleUrls: ['./export-entities.component.scss'],
  templateUrl: './export-entities.component.html',
})
export class ExportEntitiesComponent implements AfterViewInit {
  componetDestroyed = new Subject();
  subscription = new Subscription();
  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute) {}

  public ngAfterViewInit(): void {
    this.subscription = this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const targetElement = this.document.querySelector('#' + fragment);
        if (fragment && targetElement) {
          targetElement.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
