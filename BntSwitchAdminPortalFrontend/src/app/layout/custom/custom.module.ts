import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomRoutingModule } from './custom-routing.module';
import { CustomComponent } from './custom.component';

import { BoxModule } from 'bnt';

@NgModule({
  declarations: [CustomComponent],
  imports: [CommonModule, RouterModule, CustomRoutingModule, BoxModule],
})
export class CustomModule {}
