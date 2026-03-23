import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent, FooterLeftComponent, FooterRightComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent, FooterLeftComponent, FooterRightComponent],
  exports: [FooterComponent, FooterLeftComponent, FooterRightComponent],
  imports: [CommonModule],
})
export class FooterModule {}
