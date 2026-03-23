import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyJsonComponent } from './pretty-json.component';
import { PrettyJsonModule } from 'angular2-prettyjson';

@NgModule({
  declarations: [PrettyJsonComponent],
  exports: [PrettyJsonComponent],
  imports: [CommonModule, PrettyJsonModule],
})
export class PrettyJsonRvModule {}
