import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [CommonModule, TranslateModule],
  imports: [
    CommonModule,
    // tslint:disable-next-line: deprecation
    HttpClientModule,
    TranslateModule.forChild({}),
  ],
})
export class SharedLazyModule {}
