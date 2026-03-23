import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { ContentComponent } from './content.component';

@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  imports: [CommonModule, RouterModule, BreadcrumbsModule, SharedModule],
})
export class ContentModule {}
