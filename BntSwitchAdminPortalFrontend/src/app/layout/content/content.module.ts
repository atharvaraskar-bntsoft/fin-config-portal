import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';

import { BoxModule } from 'bnt';

@NgModule({
  declarations: [ContentComponent],
  imports: [CommonModule, ContentRoutingModule, BoxModule],
})
export class ContentModule {}
