import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartJsComponent } from './chart-js.component';

@NgModule({
  declarations: [ChartJsComponent],
  exports: [ChartJsComponent],
  imports: [CommonModule],
})
export class ChartJsModule {}
