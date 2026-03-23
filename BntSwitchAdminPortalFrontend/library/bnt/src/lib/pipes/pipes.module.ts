import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldFilterPipe } from './field-filter.pipe';
import { MomentPipe } from './moment.pipe';
@NgModule({
  declarations: [FieldFilterPipe, MomentPipe],
  exports: [FieldFilterPipe, MomentPipe],
  imports: [CommonModule],
})
export class PipesModule {}
